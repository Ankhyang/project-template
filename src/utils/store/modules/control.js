import HTTP from "@httpServer";
import httpServer from "@httpServer/serverConfig";

const state = { 
    
}

const actions = {
    reset({ commit }, data) {
        commit('RESET', data);
    }
}

const mutations = {
    ['RESET'] (state, data) {

    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
