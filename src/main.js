import Vue from 'vue'
import router from './router' // 挂载路由
import './router/permissions' // 挂载路由权限校验
import store from "./utils/store" //加载状态管理
import app from './app'  //主页面
import './utils/element-ui'

new Vue({
    el:'#app',
    router,
    store,
    render:(h)=>h(app)
})