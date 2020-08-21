import http from '@/api/http'

export default {
  state: {
    mentions: {},
    reach: {},
    impressions: {},
    mentions_coeff: {},
    reach_coeff: {},
    impressions_coeff: {}
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
    },
    getmentions_coeff(state) {
      return state.mentions_coeff
    },
    getreach_coeff(state) {
      return state.reach_coeff
    },
    getimpressions_coeff(state) {
      return state.impressions_coeff
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
    },
    setmentions_coeff(state, payload) {
      state.mentions_coeff = payload
    },
    setreach_coeff(state, payload) {
      state.reach_coeff = payload
    },
    setimpressions_coeff(state, payload) {
      state.impressions_coeff = payload
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
    },
    async request_coeff({commit}, {action, start, end}) {
      await http
        .get(`megafon/${action}/count?start_date=${start}&end_date=${end}`)
        .then(response => {
          commit(`set${action}_coeff`, response.data['мегафон'])
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
