/**
 *  store
 **/

import Vuex from 'vuex'
import getters from "./getters";
import createPersistedState from "vuex-persistedstate" //本地化存储

/****
 * 读取modules 下自定义 state ，mutations ，并暴露给全局 ，
 * 文件名作为 state 字段名 ，例： 读取 user.js 下定义的 userInfo , 取 state.user.userInfo
 */
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters,
    plugins: [createPersistedState({ //本地化存储state 到 sessionStorage
        storage: window.sessionStorage,
        reducer: state => ({
            user: state.user,
            tagViews: state.tagViews
        })
    })]
})

export default store

