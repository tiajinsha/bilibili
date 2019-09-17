import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    msg:"",
    new:[],
    show:false
  },
  mutations: {
  msg(state,data){
    state.msg=data
    },
  showBar(state){
      state.show=true
    }
  },
  actions: {

  },
/*   getters:{
    show:state =>{
      return state.show
    }
  }, */
})
