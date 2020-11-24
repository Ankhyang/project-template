/**
 * 路由跳转前 , 校验权限 ，处理tab页签
 **/
import router from './index'
import store from "@utils/store";
import NProgress from 'nprogress' //跳转进度条
import 'nprogress/nprogress.css'
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    const {access_token} = store.getters.tokensInfo;
    if (access_token) { //判断 token 是否存在 ，API 请求 token 超时 ，会清空token 执行该跳转
        if(to.path === '/login'){
            next()
        }else{
            next()
        }
    } else {
        if (to.path === '/login') { // 如果是登录页面的话，直接next()
            next();
        } else { // 否则 跳转到登录页面
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})