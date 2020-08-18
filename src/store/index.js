import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_data: {},
    request_type: {
      value: 'views'
    }
  },
  getters: {
    getUserData: state => state.user_data,
    getRequestType: state => state.request_type
  },
  mutations: {
    SET_USER_DATA: (state, payload) => {
      state.user_data = payload
    },
    SET_REQUEST_TYPE: (state, payload) => {
      state.request_type = payload
    }
  },
  actions: {},
  modules: {}
})
