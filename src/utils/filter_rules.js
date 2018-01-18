/**
 * Created by 赵浩 on 17/11/04
 */

import { validateMoneyNumber,validateMoneyNumberA,qq,mobile,regexn,integer,num} from '@/utils/validate'
import Assist from '@/utils/assist'

exports.install = function (Vue, options) {
	
	
	/**
	 * 注意:  定义type 规则时 不用做非空验证 
	 *        只需要传入 required:true 即可
	 * */
	/*保留两位小数*/
	const isvalidateMoney = (rule, value, callback) => {
		if(value != null && value != "") {
			if(value == 0){
				callback(new Error('最多保留两位小数!'))
			}else{
				if(!validateMoneyNumber(value)) {
					callback(new Error('最多保留两位小数!'))
				} else {
					callback()
				}
			}
		}
		else{
			callback();
		}
	}
	/*保留两位小数 可以为0*/
	const isvalidateMoney1 = (rule, value, callback) => {
		if(value != null && value != "") {	
			if(!validateMoneyNumber(value)) {
				callback(new Error('最多保留两位小数!'))
			} else {
				callback()
			}		
		}
		else{
			callback();
		}
	}
	/*保留一位小数*/
	const isvalidateintegral = (rule, value, callback) => {
		if(value != null && value != "") {
			if(value == 0){
				callback(new Error('最多保留一位小数!'))
			}else{
				if(!validateMoneyNumberA(value)) {
					callback(new Error('最多保留一位小数!'))
				} else {
					callback()
				}
			}
		}
		else{
			callback();
		}
	}
	/*验证QQ号码*/
	const isvalidateQQ= (rule, value, callback) => {		
		if(value != null && value != "") {
			if(!qq(value)) {
				callback(new Error('您输入的QQ号不正确!'))
			} else {
				callback()
			}
		}
		else{
			callback();
		}
	}
	/*验证手机号*/
   	const isvalidateMobile= (rule, value, callback) => {		
		if(value != null && value != "") {
			if(!mobile(value)) {
				callback(new Error('您输入的手机号不正确!'))
			} else {
				callback()
			}
		}
		else{
			callback();
		}
	}
   	
   	/*含有非法字符(只能输入字母、汉字)*/
   	const isvalidateRegexn= (rule, value, callback) => {		
		if(value != null && value != "") {
			if(!regexn(value)) {
				callback(new Error('含有非法字符(只能输入字母、汉字)!'))
			} else {
				callback()
			}
		}
		else{
			callback();
		}
	}
   	 /*请输入正整数*/
   	const isvalidateInteger= (rule, value, callback) => {		
		if(value != null && value != "") {
			if(!integer(value)) {
				callback(new Error('请输入正整数!'))
			} else {
				callback()
			}
		}
		else{
			callback();
		}
	}
   	
   	 /*请输入自然数*/
   	const isvalidateNum= (rule, value, callback) => {		
		if(value != null && value != "") {
			if(!num(value)) {
				callback(new Error('请输入整数,且不能为负值!'))
			} else {
				callback()
			}
		}
		else{
			callback();
		}
	}
	
	
	
	
	/**
	 * 参数 item 
	 * required true  必填项
	 * maxLength  字符串的最大长度
	 * min 和 max 必须同时给 min < max  type=number
	 * type 手机号 mobile
	 *      邮箱   email
	 *      网址   url 
	 *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
	 * */
	
    Vue.prototype.filter_rules = function (item){  	
        let rules = [];
        if(item.required){
           rules.push({ required: true, message: '该输入项为必填项!',trigger: 'blur,change' });
        }
        if(item.maxLength){
           rules.push({ min:1,max:item.maxLength, message: '最多输入'+item.maxLength+'个字符!', trigger: 'blur,change' })
        }
        if(item.min&&item.max){       
           rules.push({ min:item.min,max:item.max, message: '字符长度在'+item.min+'至'+item.max+'之间!', trigger: 'blur,change' })
        }
        if(item.type){
        	let type = item.type;
			switch(type) {
				case 'email':
					rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'  });
					break;
				case 'qq':
					rules.push( { validator: isvalidateQQ, trigger: 'blur,change' });
					break;
				case 'mobile':
					rules.push( { validator: isvalidateMobile, trigger: 'blur,change' });
					break;	
				case 'regexn':
				    rules.push( { validator: isvalidateRegexn, trigger: 'blur,change' });
					break;	
				case 'integer':
				    rules.push( { validator: isvalidateInteger, trigger: 'blur,change' });
					break;	
				case 'money':
				    rules.push( { validator: isvalidateMoney, trigger: 'blur,change' });
					break;
				case 'money1':
			    	rules.push({ validator: isvalidateMoney1, trigger: 'blur,change' } );
					break;	
				case 'integral':
				    rules.push( { validator: isvalidateintegral, trigger: 'blur,change' });
					break;	
				case 'num':
				    rules.push( { validator: isvalidateNum, trigger: 'blur,change' });
					break;		
				case 'array':
				    rules.push({ type: 'array', required: true, message: '该输入项为必填项!', trigger: 'change'} );
					break;	
			    		
				default:
				    rules.push({});
				    break;
			}
        }
       
     
        return rules;
    };
    
    /*表格中的空值显示问题*/ 
    Vue.prototype.isNotNullFormat = function (row,column){
		let value = row[column.property];
		if(value == "" || value == null || value == undefined) {
			return '--'
		}
		return value;  	
    }
    /*将表格中的数据强制保留两位小数*/
     Vue.prototype.toDecimal2Format = function (row,column){
		let value = row[column.property];
		if(value == "" || value == null || value == undefined) {
			return '--'
		}
		else{
			return Assist.toDecimal(value,2);  	
		}
		
    }
    
};

