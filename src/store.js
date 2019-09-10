import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    msg:"",
    new:[]
  },
  mutations: {
  msg(state,data){
    state.msg=data
    }
  },
  actions: {

  }
})
