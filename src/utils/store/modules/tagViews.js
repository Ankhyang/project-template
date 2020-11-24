/**
 * tag 页签store ，用作缓存页面
 **/

const defaultView= {name: "regionalEconomy", path: "/regionalEconomy", title: "区域经济大脑"}//默认页签
const state={
    visitedViews:[  //当前打开的页签队列
        defaultView
    ],
    activeView:defaultView,  // 当前active的页签
    cachedViews:[]  //开启缓存的页面
}

const mutations = {
    ['ADD_VIEWS'](state , view){
        state.visitedViews.push(view)
        state.activeView = view
    },
    ['CHANGE_VIEWS'](state , view){
        state.activeView = view
    },
    ['REMOVE_VIEWS'](state , view){
        let activeIndex=0
        let pageTabs = state?.visitedViews?.reduce((prev, cur, index) =>{
            if(cur.path !== view.path){
                prev.push(cur)
            }else{
                activeIndex = index
            }
            return prev
        },[])
        state.visitedViews=pageTabs
        this.commit('DEL_CACHE_VIEWS',view.name)
        if(activeIndex < pageTabs.length){
            state.activeView = pageTabs[activeIndex]
        }else{
            state.activeView = pageTabs[pageTabs.length-1]
        }

    },
    ['RESULT_VIEWS'](state){
        state.activeView = defaultView;
        state.visitedViews = [defaultView]
    },
    ['ADD_CACHE_VIEWS'](state , name){
        let cachedViews = state.cachedViews ;
        let hasCache =  cachedViews.some(item => item === name);
        if(hasCache) return false
        cachedViews.push(name)
        state.cachedViews = cachedViews
    },
    ['DEL_CACHE_VIEWS'](state , name){
        let hasCache =  state.cachedViews.some(item => item === name);
        if(!hasCache) return false
        let cachedViews = state.cachedViews.filter( item =>{
            return item !== name
        })
        state.cachedViews = cachedViews
    }
}
const actions = {
    addViewList({commit} , view) {
        commit('ADD_VIEWS',view)
    },
    changeViewList({commit} , view) {
        commit('CHANGE_VIEWS',view)
    },
    removeViewList({commit} , view) {
        commit('REMOVE_VIEWS',view)
        commit('DEL_CACHE_VIEWS',view.name)
    },
    resultViews({commit}){
        commit('RESULT_VIEWS')
    },
    addCacheView({commit} ,name){
        commit('ADD_CACHE_VIEWS',name)
    },
    delCacheView({commit} ,name){
        commit('DEL_CACHE_VIEWS',name)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}