/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 请输入整数 数字前不能加0*/
export function validateNumber(str) {
  const reg = /^[1-9]\d*$/;
  return reg.test(str)
}

/* 人民币保留两位小数*/
export function validateMoneyNumber(str) {
  const reg =  /^([1-9]\d*|0)(\.\d{0,2})?$/;
  return reg.test(str)
}

/* 人民币保留一位小数*/
export function validateMoneyNumberA(str) {
  const reg =  /^([1-9]\d*|0)(\.\d{0,1})?$/;
  return reg.test(str)
}

/* 积分保留位一位小数*/
export function validateJiFenNumber(str) {
  const reg =  /^([1-9]\d*|0)(\.\d{0,1})?$/;
  return reg.test(str)
}
/* QQ号*/
export function qq(str){
	const reg = /^[1-9]\d{4,9}$/;
	return reg.test(str)
}
/* 手机号*/
export function mobile(str){
	const reg = /^(13[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
	return reg.test(str)
}

/*含有非法字符(只能输入字母、汉字)*/
export function regexn(str){	
	const reg = /^[A-Za-z\u4e00-\u9fa5]+$/;
	return reg.test(str)
}
/* 请输入正整数 */
export function integer(str){
	const reg = /^[1-9]\d*$/;
	return reg.test(str)
}
/* 不能为负值 且为整数 */
export function num(str){
	const reg = /^(0|[1-9][0-9]*)$/;			
	return reg.test(str)
}



