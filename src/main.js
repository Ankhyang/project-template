import Vue from 'vue'
import router from './router' // 挂载路由
import store from "./utils/store" //加载状态管理
import App from './App'  //主页面

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

new Vue({
    el:'#app',
    router,
    store,
    render:(h)=>h(App)
})