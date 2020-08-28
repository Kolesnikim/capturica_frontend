import http from '@/api/http'

export default {
  state: {
    negat_mentions: {},
    negat_reach: {},
    negat_impressions: {},
    negat_mentions_coeff: {},
    negat_reach_coeff: {},
    negat_impressions_coeff: {},
    negat_mentions_date: {},
    negat_reach_date: {},
    negat_impressions_date: {},
    negat_mentions_prod: {},
    negat_reach_prod: {},
    negat_impressions_prod: {},
    negat_mentions_prod_date: {},
    negat_reach_prod_date: {},
    negat_impressions_prod_date: {},
    negat_word_cloud: {},
    negat_yt_ordered_mentions: {},
    negat_yt_ordered_reach: {},
    negat_yt_ordered_impressions: {},
    negat_ig_ordered_mentions: {},
    negat_ig_ordered_reach: {},
    negat_ig_ordered_impressions: {},
    negat_video_ordered_mentions: {},
    negat_video_ordered_reach: {},
    negat_video_ordered_impressions: {},
    negat_post_ordered_mentions: {},
    negat_post_ordered_reach: {},
    negat_post_ordered_impressions: {}
  },
  getters: {
    negat_getmentions(state) {
      return state.negat_mentions
    },
    negat_getreach(state) {
      return state.negat_reach
    },
    negat_getimpressions(state) {
      return state.negat_impressions
    },
    negat_getmentions_coeff(state) {
      return state.negat_mentions_coeff
    },
    negat_getreach_coeff(state) {
      return state.negat_reach_coeff
    },
    negat_getimpressions_coeff(state) {
      return state.negat_impressions_coeff
    },
    negat_getmentions_date(state) {
      return state.negat_mentions_date
    },
    negat_getreach_date(state) {
      return state.negat_reach_date
    },
    negat_getimpressions_date(state) {
      return state.negat_impressions_date
    },
    negat_getmentions_prod(state) {
      return state.negat_mentions_prod
    },
    negat_getreach_prod(state) {
      return state.negat_reach_prod
    },
    negat_getimpressions_prod(state) {
      return state.negat_impressions_prod
    },
    negat_getmentions_prod_date(state) {
      return state.negat_mentions_prod_date
    },
    negat_getreach_prod_date(state) {
      return state.negat_reach_prod_date
    },
    negat_getimpressions_prod_date(state) {
      return state.negat_impressions_prod_date
    },
    negat_get_word_cloud(state) {
      return state.negat_word_cloud
    },
    negat_get_yt_ordered_mentions(state) {
      return state.negat_yt_ordered_mentions
    },
    negat_get_yt_ordered_reach(state) {
      return state.negat_yt_ordered_reach
    },
    negat_get_yt_ordered_impressions(state) {
      return state.negat_yt_ordered_impressions
    },
    negat_get_ig_ordered_mentions(state) {
      return state.negat_ig_ordered_mentions
    },
    negat_get_ig_ordered_reach(state) {
      return state.negat_ig_ordered_reach
    },
    negat_get_ig_ordered_impressions(state) {
      return state.negat_ig_ordered_impressions
    },
    negat_get_video_ordered_mentions(state) {
      return state.negat_video_ordered_mentions
    },
    negat_get_video_ordered_reach(state) {
      return state.negat_video_ordered_reach
    },
    negat_get_video_ordered_impressions(state) {
      return state.negat_video_ordered_impressions
    },
    negat_get_post_ordered_mentions(state) {
      return state.negat_post_ordered_mentions
    },
    negat_get_post_ordered_reach(state) {
      return state.negat_post_ordered_reach
    },
    negat_get_post_ordered_impressions(state) {
      return state.negat_post_ordered_impressions
    }
  },
  mutations: {
    negat_setmentions(state, payload) {
      state.negat_mentions = payload
    },
    negat_setreach(state, payload) {
      state.negat_reach = payload
    },
    negat_setimpressions(state, payload) {
      state.negat_impressions = payload
    },
    negat_setmentions_coeff(state, payload) {
      state.negat_mentions_coeff = payload
    },
    negat_setreach_coeff(state, payload) {
      state.negat_reach_coeff = payload
    },
    negat_setimpressions_coeff(state, payload) {
      state.negat_impressions_coeff = payload
    },
    negat_setmentions_date(state, payload) {
      state.negat_mentions_date = payload
    },
    negat_setreach_date(state, payload) {
      state.negat_reach_date = payload
    },
    negat_setimpressions_date(state, payload) {
      state.negat_impressions_date = payload
    },
    negat_setmentions_prod(state, payload) {
      state.negat_mentions_prod = payload
    },
    negat_setreach_prod(state, payload) {
      state.negat_reach_prod = payload
    },
    negat_setimpressions_prod(state, payload) {
      state.negat_impressions_prod = payload
    },
    negat_setmentions_prod_date(state, payload) {
      state.negat_mentions_prod_date = payload
    },
    negat_setreach_prod_date(state, payload) {
      state.negat_reach_prod_date = payload
    },
    negat_setimpressions_prod_date(state, payload) {
      state.negat_impressions_prod_date = payload
    },
    negat_set_word_cloud(state, payload) {
      state.negat_word_cloud = payload
    },
    negat_set_yt_ordered_mentions(state, payload) {
      state.negat_yt_ordered_mentions = payload
    },
    negat_set_yt_ordered_reach(state, payload) {
      state.negat_yt_ordered_reach = payload
    },
    negat_set_yt_ordered_impressions(state, payload) {
      state.negat_yt_ordered_impressions = payload
    },
    negat_set_ig_ordered_mentions(state, payload) {
      state.negat_ig_ordered_mentions = payload
    },
    negat_set_ig_ordered_reach(state, payload) {
      state.negat_ig_ordered_reach = payload
    },
    negat_set_ig_ordered_impressions(state, payload) {
      state.negat_ig_ordered_impressions = payload
    },
    negat_set_video_ordered_mentions(state, payload) {
      state.negat_video_ordered_mentions = payload
    },
    negat_set_video_ordered_reach(state, payload) {
      state.negat_video_ordered_reach = payload
    },
    negat_set_video_ordered_impressions(state, payload) {
      state.negat_video_ordered_impressions = payload
    },
    negat_set_post_ordered_mentions(state, payload) {
      state.negat_post_ordered_mentions = payload
    },
    negat_set_post_ordered_reach(state, payload) {
      state.negat_post_ordered_reach = payload
    },
    negat_set_post_ordered_impressions(state, payload) {
      state.negat_post_ordered_impressions = payload
    }
  },
  actions: {
    async negat_request({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/count?start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_coeff({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/count?start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set${action}_coeff`, response.data['мегафон'])
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_date({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/date?start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set${action}_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_prod({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/products/count?start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set${action}_prod`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_prod_date({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/products/date?start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set${action}_prod_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_word_cloud({commit}, {start, end}) {
      await http
        .get(
          `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set_word_cloud`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_yt_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/channel?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set_yt_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_ig_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/user?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set_ig_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_video_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/video?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set_video_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async negat_request_post_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/post?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=negative`
        )
        .then(response => {
          commit(`negat_set_post_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
