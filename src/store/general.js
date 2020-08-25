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
    word_cloud: {},
    yt_ordered_mentions: {},
    yt_ordered_reach: {},
    yt_ordered_impressions: {},
    ig_ordered_mentions: {},
    ig_ordered_reach: {},
    ig_ordered_impressions: {}
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
    },
    get_yt_ordered_mentions(state) {
      return state.yt_ordered_mentions
    },
    get_yt_ordered_reach(state) {
      return state.yt_ordered_reach
    },
    get_yt_ordered_impressions(state) {
      return state.yt_ordered_impressions
    },
    get_ig_ordered_mentions(state) {
      return state.ig_ordered_mentions
    },
    get_ig_ordered_reach(state) {
      return state.ig_ordered_reach
    },
    get_ig_ordered_impressions(state) {
      return state.ig_ordered_impressions
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
    },
    set_yt_ordered_mentions(state, payload) {
      state.yt_ordered_mentions = payload
    },
    set_yt_ordered_reach(state, payload) {
      state.yt_ordered_reach = payload
    },
    set_yt_ordered_impressions(state, payload) {
      state.yt_ordered_impressions = payload
    },
    set_ig_ordered_mentions(state, payload) {
      state.ig_ordered_mentions = payload
    },
    set_ig_ordered_reach(state, payload) {
      state.ig_ordered_reach = payload
    },
    set_ig_ordered_impressions(state, payload) {
      state.ig_ordered_impressions = payload
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
    },
    async request_yt_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/channel?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_yt_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_ig_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/user?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_ig_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
