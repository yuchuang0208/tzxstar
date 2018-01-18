import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
/*import '@/mock' // 该项目开发请求使用mockjs模拟*/
import Validate from '@/utils/filter_rules'
import thirdparty from '@/utils/thirdparty';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(Validate)
Vue.use(ElementUI)
Vue.use(echarts)
Vue.config.productionTip = false

//千分符
Vue.filter('thousand', function(num) {
    var num = (num || 0).toString(),
        re = /\d{3}$/,
        result = '';
    while (re.test(num)) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) { result = num + result; }
    return result;
});
//货币格式化
Vue.filter('currency', function(s) {
    /*if (!value) { return ''}
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)*/
    //if (!s) { return ''}
    if (/[^0-9\.]/.test(s)) return "¥0.00";
    s = s.toString();
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return "¥" + s.replace(/^\./, "0.")
});

//字符串长度格式化 ，超过的补...
Vue.filter('stringformat', function(str, len) {
    if (str == null || str == "") {
        return str;
    }
    var str_length = 0;
    var str_cut = new String();
    var str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        var a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        if (str_length <= len) {
            str_cut = str_cut.concat(a);
        }
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
});
//split("-"),取前两级父级
Vue.filter('treecheckedname', function(str) {
    if (str.indexOf('-') > 0) {
        var arrys = str.split('-');
        var str2 = arrys[0] + '-' + arrys[1]
        return str2;
    } else {
        return "";
    }
});

//阶段数据统计取绝对值，环比下降是负数
Vue.filter('abs', function(num) {
    return Math.abs(num);
});

//筛选门店确定后，对门店名称进行处理   奇乐奇乐上海档口店,奇乐奇乐我格广场店  面香总部;管理公司等17家等17家
Vue.filter('mendianStrFormat', function(str, len) {
    var zonglen = 15;
    if (str != "" && str != null) {
        if (str.length < zonglen) {
            return str;
        }
    } else {
        return str;
    }
    //先截取 str中 等(n)家 字符串
    var weizhi = -1;
    if (str != "" && str != null) {
        weizhi = str.lastIndexOf("等");
    }
    var dengjia = new String();
    if (weizhi != -1) {
        dengjia = str.substring(weizhi, str.length);
        str = str.substring(0, weizhi);
    }
    if (str != "" && str != null && str.indexOf(",") != -1) { //门店名称数组
        var strings = str.split(",");
        var myArray = new Array();
        for (var k = 0; k < 2; k++) { //取前两家公司
            var str_length = 0;
            var str_cut = new String();
            var str_len = strings[k].length;
            for (var i = 0; i < str_len; i++) {
                var a = strings[k].charAt(i);
                str_length++;
                if (escape(a).length > 4) {
                    //中文字符的长度经编码之后大于4
                    str_length++;
                }
                if (str_length <= len) { //10
                    str_cut = str_cut.concat(a);
                }
                if (str_length >= len) {
                    str_cut = str_cut.concat("...");
                    myArray[k] = str_cut;
                    break;
                }
            }
            //如果给定字符串小于指定长度，则返回源字符串；
            if (str_length < len) {
                myArray[k] = str_cut;
            }
        }
        return myArray.join(",").toString() + dengjia;

    } else { //门店名称
        var str_length = 0;
        var str_cut = new String();
        var str_len = 0;
        if (str != "" && str != null) {
            str_len = str.length;
        }
        len = len * 4;
        for (var i = 0; i < str_len; i++) {
            var a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            if (str_length <= len) {
                str_cut = str_cut.concat(a);
            }
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut + dengjia;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str + dengjia;
        }
    }


});
//日期格式化
Vue.filter('strDateFomater', function(str) {

    do {
        if (str != "" && str != null) {
            if (str.indexOf(".")) {
                /*return str.replace(/./g,"-");*/
                str = str.replace(".", "-");
            }
        }
    }
    while (str != "" && str != null && str.indexOf(".") != -1)

    return str;
});

//传入的数据为空值时 做 返回--
Vue.filter('isNotNullFilter', function(str) {
	if(str==null || str=='' || str==undefined){
		return '--'
	}
	else{
		 return str;
	}
});
//传入毫秒数返回 yyyy-MM-dd HH:mm:ss
Vue.filter('dateFilter', function(time) {
	
		if(time==null||time==undefined||time==''){
			return '--'
		}else{
			let date = new Date(time);
	    	let year = date.getFullYear();
			let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1): date.getMonth() + 1;			  
			let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			let hh = date.getHours()<10 ? "0" + date.getHours() : date.getHours();;
			let mm = date.getMinutes()<10 ? "0" + date.getMinutes() : date.getMinutes();;
			let ss = date.getSeconds()<10 ? "0" + date.getSeconds() : date.getSeconds();;
			return year + "-" + month + "-" + day+" "+hh+":"+mm+":"+ss;
		}
		
	
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
