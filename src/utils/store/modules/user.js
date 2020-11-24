import CryptoJS from 'crypto-js'
import HTTP from "@httpServer";
import httpServer from "@httpServer/serverConfig";
import store from "../index";


const getToken= (params)=>{
  return HTTP.post(httpServer.user.getTokens,params).then(res=>{ //通过用户名密码 ，请求token
    return res.data?res.data:{}
  })
}
const getUserInfo= (userId)=>{ //获取 用户信息
  return  HTTP.get(`/uc/v0.1/users/${userId}/detail`).then(res=>{
    return res.data?res.data:{}
  })
}


const state={ //定义登录用户相关state
  userInfo:{},  //用户信息
  tokensInfo:{} //token相关
}

const mutations = {
  ['USER_LOGIN'] (state,data) {  //用户登录行为触发修改
    state.userInfo = {...data}
  },
  ['SET_TOKEN'] (state,data) {  //缓存token
    state.tokensInfo = {...data}
  },
  ['USER_EXIT'] (state,data) {  //用户登出
    let vuexData = sessionStorage.getItem('vuex')
    sessionStorage.setItem('store', vuexData)
    state.tokensInfo = {}
    state.userInfo = {}
  }
}

const actions = {
  async userLogin ({ commit, rootState }, data) {
    let {login_name,password} = data,
        params={login_name, password:CryptoJS.MD5(password).toString()} , //组装请求参数 ，密码 md5 加密
        tokens= await getToken(params) , //token 容器
        userInfo={};  // 用户信息容器
    commit('SET_TOKEN',tokens);  //设置token

    if(tokens.user_id){
      userInfo = await getUserInfo(tokens.user_id) // 获取用户信息
    }
    // 重置显示控制台和区域经济大脑
    rootState.control.configInfo.curPag = 0;
    rootState.control.configInfo.curTab = 0;

    commit('USER_LOGIN',userInfo);
    return userInfo
  },
  userExit({ commit },data) {
    commit('USER_EXIT',data)
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions
}
