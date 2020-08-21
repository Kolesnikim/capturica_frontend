import http from '@/api/http'

export default {
  state: {
    mentions: {},
    reach: {},
    impressions: {},
    mentions_coeff: {},
    reach_coeff: {},
    impressions_coeff: {},
    mentions_date: {},
    reach_date: {},
    impressions_date: {},
    mentions_prod: {},
    reach_prod: {},
    impressions_prod: {},
    mentions_prod_date: {},
    reach_prod_date: {},
    impressions_prod_date: {},
    word_cloud: {}
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
    },
    getmentions_date(state) {
      return state.mentions_date
    },
    getreach_date(state) {
      return state.reach_date
    },
    getimpressions_date(state) {
      return state.impressions_date
    },
    getmentions_prod(state) {
      return state.mentions_prod
    },
    getreach_prod(state) {
      return state.reach_prod
    },
    getimpressions_prod(state) {
      return state.impressions_prod
    },
    getmentions_prod_date(state) {
      return state.mentions_prod_date
    },
    getreach_prod_date(state) {
      return state.reach_prod_date
    },
    getimpressions_prod_date(state) {
      return state.impressions_prod_date
    },
    get_word_cloud(state) {
      return state.word_cloud
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
    },
    setmentions_date(state, payload) {
      state.mentions_date = payload
    },
    setreach_date(state, payload) {
      state.reach_date = payload
    },
    setimpressions_date(state, payload) {
      state.impressions_date = payload
    },
    setmentions_prod(state, payload) {
      state.mentions_prod = payload
    },
    setreach_prod(state, payload) {
      state.reach_prod = payload
    },
    setimpressions_prod(state, payload) {
      state.impressions_prod = payload
    },
    setmentions_prod_date(state, payload) {
      state.mentions_prod_date = payload
    },
    setreach_prod_date(state, payload) {
      state.reach_prod_date = payload
    },
    setimpressions_prod_date(state, payload) {
      state.impressions_prod_date = payload
    },
    set_word_cloud(state, payload) {
      state.word_cloud = payload
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
    },
    async request_date({commit}, {action, start, end}) {
      await http
        .get(`megafon/${action}/date?start_date=${start}&end_date=${end}`)
        .then(response => {
          commit(`set${action}_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_prod({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/products/count?start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set${action}_prod`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_prod_date({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/products/date?start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set${action}_prod_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_word_cloud({commit}, {start, end}) {
      await http
        .get(
          `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_word_cloud`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
