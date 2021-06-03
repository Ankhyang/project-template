/*
 * @Author: your name
 * @Date: 2020-12-07 10:37:52
 * @LastEditTime: 2021-06-03 15:11:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\main.js
 */
import Vue from 'vue'
import router from './router' // 挂载路由
// import './router/permissions' // 挂载路由权限校验
import store from "./utils/store" //加载状态管理
import app from './App'  //主页面
import './utils/element-ui'
import './base.less'
import './common.less'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

new Vue({
    el:'#app',
    router,
    store,
    render:(h)=>h(app)
})