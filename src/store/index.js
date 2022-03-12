import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import get from "../api/get"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      base:{
        baseURL: 'http://localhost:7000/api',
        headers: ""
      },
      info:"",
      tribs:"",
      ratesSerie:""
    },
  },
  plugins: [createPersistedState()],
  mutations: {
    DATA_USER(state, payload){
      state.user.info = payload;
      state.user.base.headers= {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer '+payload.token
      }
    },
    async GET_TRIBS_USER(state) {
      const ENDPOINT = "/tribe/"+state.user.info.id;
      get(ENDPOINT, state)
      .then(res =>{
        state.tribs= res.data.result
      })
    },

  },
  
  actions: {
  },
  modules: {
  }
})
