import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

export default class Assist {
	//判断值在数组中是否存在
	static oneOf(value, validList) {
		for(let i = 0; i < validList.length; i++) {
			if(value === validList[i]) {
				return true;
			}
		}
		return false;
	}
	//驼峰命名转连字符（-）     eg：ToLowerCase  ==>  to-lower-case
	static camelcaseToHyphen(str) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
	//: - _  转驼峰命名
	static camelCase(name) {
		return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
			return offset ? letter.toUpperCase() : letter;
		}).replace(MOZ_HACK_REGEXP, 'Moz$1');
	}
	//首字母大写
	static firstUpperCase(str) {
		return str.toString()[0].toUpperCase() + str.toString().slice(1);
	}

	//判断类型
	static typeOf(obj) {
		const toString = Object.prototype.toString;
		const map = {
			'[object Boolean]': 'boolean',
			'[object Number]': 'number',
			'[object String]': 'string',
			'[object Function]': 'function',
			'[object Array]': 'array',
			'[object Date]': 'date',
			'[object RegExp]': 'regExp',
			'[object Undefined]': 'undefined',
			'[object Null]': 'null',
			'[object Object]': 'object'
		};
		return map[toString.call(obj)];
	}
	static deepCopy(data) {
		const t = this.typeOf(data);
		let o;
		if(t === 'array') {
			o = [];
		} else if(t === 'object') {
			o = {};
		} else {
			return data;
		}

		if(t === 'array') {
			for(let i = 0; i < data.length; i++) {
				o.push(this.deepCopy(data[i]));
			}
		} else if(t === 'object') {
			for(let i in data) {
				o[i] = this.deepCopy(data[i]);
			}
		}
		return o;
	}
	static getCurrentTimeStamp() {
		return new Date().getTime();
	}
	static MD5(str) {
		return window.hex_md5(str);
	}
	static uuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			let r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	};

	//获取时间戳
	static getCurrentDatetime(type) {
		let date = new Date();
		if(type == "date") {
			let distributionTime = (date.getFullYear()) + "-" +
				(date.getMonth() + 1) + "-" +
				(date.getDate());
			return distributionTime;
		} else {
			var distributionTime = (date.getFullYear()) + "-" +
				(date.getMonth() + 1) + "-" +
				(date.getDate()) + " " +
				(date.getHours()) + ":" +
				(date.getMinutes()) + ":" +
				(date.getSeconds());
			return distributionTime;
		}
	}
	//加法
	static BPFun_accAdd(arg1, arg2) {
		var r1,
			r2,
			m;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch(e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch(e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2));
		return(arg1 * m + arg2 * m) / m;
	}
	//乘法
	static BPFun_accMul(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch(e) {}
		try {
			m += s2.split(".")[1].length;
		} catch(e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}

	//减法
	static BPFun_Subtr(arg1, arg2) {
		var r1,
			r2,
			m,
			n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		//last modify by deeka
		//动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return((arg1 * m - arg2 * m) / m).toFixed(n);
	}

	//克隆对象
	static CloneObj(arg) {
		var obj = new Object();
		for(var item in arg) {
			if(arg[item] instanceof Array) {
				obj[item] = this.CloneArray(arg[item]);
			} else if(typeof arg[item] == "object") {
				obj[item] = this.CloneObj(arg[item]);
			} else {
				obj[item] = arg[item];
			}
		}
		return obj;
	}
	static CloneArray(arr) {
		var returnarr = new Array();
		for(var i = 0; i < arr.length; i++) {
			var obj = new Object();
			for(var item in arr[i]) {
				if(arr[i][item] instanceof Array) {
					obj[item] = this.CloneArray(arr[i][item]);
				} else if(typeof arr[i][item] == "object") {
					obj[item] = this.CloneObj(arr[i][item]);
				} else {
					obj[item] = arr[i][item];
				}
			}
			returnarr.push(obj);
		}
		return returnarr;
	}

	static CloneArray(arr) {
		var returnarr = new Array();
		for(var i = 0; i < arr.length; i++) {
			var obj = new Object();
			for(var item in arr[i]) {
				if(arr[i][item] instanceof Array) {
					obj[item] = this.CloneArray(arr[i][item]);
				} else if(typeof arr[i][item] == "object") {
					obj[item] = this.CloneObj(arr[i][item]);
				} else {
					obj[item] = arr[i][item];
				}
			}
			returnarr.push(obj);
		}
		return returnarr;
	}

	static GetPageArguments() {
		//url 地址参数设置系统变量
		//var result = {}
		var url = location.search //获取url中"?"符后的字串
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			var strs = str.split("#");
			for(var i = 0; i < strs.length; i++) {
				var str = strs[i].split("=");
				var key = str[0];
				var value = str[1];
				// result[key] = unescape(unescape(value))
				return unescape(unescape(value));
			}
		}

	}
	static formatDate(time) {
		if(time==null||time==undefined||time==''){
			return ''
		}
		else{		
    		let date = new Date(time);
    		let year = date.getFullYear();
			let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1): date.getMonth() + 1;			  
			let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			let dateStr = year + "-" + month + "-" + day;
			return dateStr;
		}
	};
	
	/* 
	 * time 当前时间
	 * str 格式化字符串
	 * */
	static formatDateAll(time,str) {
		if(time==null||time==undefined||time==''){
			return ''
		}else{
			let date = new Date(time);
	    	let year = date.getFullYear();
			let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1): date.getMonth() + 1;			  
			let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			let hh = date.getHours()<10 ? "0" + date.getHours() : date.getHours();;
			let mm = date.getMinutes()<10 ? "0" + date.getMinutes() : date.getMinutes();;
			let ss = date.getSeconds()<10 ? "0" + date.getSeconds() : date.getSeconds();;
			
			let format_time = time;
			
			if(str == "yyyy-MM-dd HH:mm:ss"){
				format_time =  year + "-" + month + "-" + day+" "+hh+":"+mm+":"+ss;
			}else if(str == "yyyy-MM-dd HH:mm" ){
				format_time =  year + "-" + month + "-" + day+" "+hh+":"+mm;
			}else if(str == "yyyy-MM-dd HH" ){
				format_time =  year + "-" + month + "-" + day+" "+hh;
			}else if(str == "yyyy-MM-dd" ){
				format_time =  year + "-" + month + "-" + day;
			}else if(str == "HH:mm:ss" ){
				format_time =  hh+":"+mm+":"+ss;
			}else if(str == "HH:mm" ){
				format_time =  hh+":"+mm;
			}else if(str == "HH" ){
				format_time =  hh;
			}
			
			return format_time
		}
		
	};
	
	/* 将数字强制保留 n位小树
	 * x 传入的数字
	 * 要保留到几位小数
	 * */
	 static toDecimal(x,n) {    
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return false;    
        }    
        var f = Math.round(x*100)/100;    
        var s = f.toString();    
        var rs = s.indexOf('.');    
        if (rs < 0) {    
            rs = s.length;    
            s += '.';    
        }    
        while (s.length <= rs + n) {    
            s += '0';    
        }    
        return s;    
    }    

	/*static GetPageArgumentsUrl() {
	    var hostname = "http://"+location.hostname+":"+location.port;
	    return hostname;
	}*/
	/*static GetPageArgumentsUrl() {
	    var hostname = "http://"+location.hostname+":"+location.port+"/tzxsaas";
	    return hostname;
	}*/
	
	
    /*
     *字符串修转化成 date类型
     **/
	static formatStrToDate(datestr) {
       return new Date(datestr.replace(/-/g, '/'));  //开始时间  
	};
	
	/**
	 * 判断年份是否为润年
	 *
	 * @param {Number} year
	 */
	static isLeapYear(year) {
	  return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
	}
	
	/**
	 * 获取某一年份的某一月份的天数
	 *
	 * @param {Number} year
	 * @param {Number} month
	 */
	static getMonthDays(year, month) {
	  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (this.isLeapYear(year) ? 29 : 28);
	}
	
	/**
	 *检查数组中是否有空数据或者重复数据
	 * @param {arrays} arrays
	 */
	static isRepeatArrays(arrays) {
		let isNull = false;//是否是空数据
		let isRepeatData = false;//是否是重复数据
		let isZero = false;//是否是0
		arrays.forEach((item,index)=>{
			if(item == null || item == "") {//是否是空数据
		        isNull = true;
		    }
			if(item == 0){//是否是0
				isZero = true;
			}
		    arrays.forEach((item2,index2)=>{
		    	if (index <index2 && item2 == item) {//是否是重复数据
		            isRepeatData = true;
		        }
		    });
		})
	  	return {'isNull':isNull,'isRepeatData':isRepeatData,'isZero':isZero};
	}
	
	
	
}