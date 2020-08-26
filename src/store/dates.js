export default {
  state: {
    dates: ['2019-01-01', '2020-01-01']
  },
  getters: {
    getDates(state) {
      return state.dates
    }
  },
  mutations: {
    setDates(state, payload) {
      state.dates = payload
    }
  },
  actions: {
    setDates({commit}, payload) {
      commit('setDates', payload)
    }
  }
}
