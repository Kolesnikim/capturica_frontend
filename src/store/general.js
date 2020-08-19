import http from '@/api/http'

export default {
  state: {
    mentions: {},
    reach: {},
    impressions: {}
  },
  getters: {
    getmentions(state) {
      return state.mentions
    },
    getreach(state) {
      return state.reach
    },
    getimpressions(state) {
      return state.impressions
    }
  },
  mutations: {
    setmentions(state, payload) {
      state.mentions = payload
    },
    setreach(state, payload) {
      state.reach = payload
    },
    setimpressions(state, payload) {
      state.impressions = payload
    }
  },
  actions: {
    async request({commit}, {action, start, end}) {
      await http
        .get(`megafon/${action}/count?start_date=${start}&end_date=${end}`)
        .then(response => {
          commit(`set${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
