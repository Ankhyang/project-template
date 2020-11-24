/**
 * 全局公共方法
 **/

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUrlKey(){ //截取url 参数
    let urlParams={};
    let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
    str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
    let arr=str.split("&"); //各个参数放到数组里
    for(let i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            urlParams[name] = decodeURI(value)
        }
    }
    return  urlParams ;
}