import Vue from 'vue'
import Vuex from 'vuex'
import *  as getters from './getters'
import *  as  actions from './actions'
import  mutations from './mutations'

Vue.use(Vuex)

const state = {
  isLogin:localStorage.getItem("loginStatus")||false,
  userInfo:JSON.parse(localStorage.getItem("userInfo"))||{},
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})