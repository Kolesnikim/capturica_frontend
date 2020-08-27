import http from '@/api/http'

export default {
  state: {
    posit_mentions: {},
    posit_reach: {},
    posit_impressions: {},
    posit_mentions_coeff: {},
    posit_reach_coeff: {},
    posit_impressions_coeff: {},
    posit_mentions_date: {},
    posit_reach_date: {},
    posit_impressions_date: {},
    posit_mentions_prod: {},
    posit_reach_prod: {},
    posit_impressions_prod: {},
    posit_mentions_prod_date: {},
    posit_reach_prod_date: {},
    posit_impressions_prod_date: {},
    posit_word_cloud: {},
    posit_yt_ordered_mentions: {},
    posit_yt_ordered_views: {},
    posit_yt_ordered_comments: {},
    posit_ig_ordered_mentions: {},
    posit_ig_ordered_views: {},
    posit_ig_ordered_comments: {},
    posit_video_ordered_mentions: {},
    posit_video_ordered_views: {},
    posit_video_ordered_comments: {},
    posit_post_ordered_mentions: {},
    posit_post_ordered_views: {},
    posit_post_ordered_comments: {}
  },
  getters: {
    posit_getmentions(state) {
      return state.posit_mentions
    },
    posit_getreach(state) {
      return state.posit_reach
    },
    posit_getimpressions(state) {
      return state.posit_impressions
    },
    posit_getmentions_coeff(state) {
      return state.posit_mentions_coeff
    },
    posit_getreach_coeff(state) {
      return state.posit_reach_coeff
    },
    posit_getimpressions_coeff(state) {
      return state.posit_impressions_coeff
    },
    posit_getmentions_date(state) {
      return state.posit_mentions_date
    },
    posit_getreach_date(state) {
      return state.posit_reach_date
    },
    posit_getimpressions_date(state) {
      return state.posit_impressions_date
    },
    posit_getmentions_prod(state) {
      return state.posit_mentions_prod
    },
    posit_getreach_prod(state) {
      return state.posit_reach_prod
    },
    posit_getimpressions_prod(state) {
      return state.posit_impressions_prod
    },
    posit_getmentions_prod_date(state) {
      return state.posit_mentions_prod_date
    },
    posit_getreach_prod_date(state) {
      return state.posit_reach_prod_date
    },
    posit_getimpressions_prod_date(state) {
      return state.posit_impressions_prod_date
    },
    posit_get_word_cloud(state) {
      return state.posit_word_cloud
    },
    posit_get_yt_ordered_mentions(state) {
      return state.posit_yt_ordered_mentions
    },
    posit_get_yt_ordered_views(state) {
      return state.posit_yt_ordered_views
    },
    posit_get_yt_ordered_comments(state) {
      return state.posit_yt_ordered_comments
    },
    posit_get_ig_ordered_mentions(state) {
      return state.posit_ig_ordered_mentions
    },
    posit_get_ig_ordered_views(state) {
      return state.posit_ig_ordered_views
    },
    posit_get_ig_ordered_comments(state) {
      return state.posit_ig_ordered_comments
    },
    posit_get_video_ordered_mentions(state) {
      return state.posit_video_ordered_mentions
    },
    posit_get_video_ordered_views(state) {
      return state.posit_video_ordered_views
    },
    posit_get_video_ordered_comments(state) {
      return state.posit_video_ordered_comments
    },
    posit_get_post_ordered_mentions(state) {
      return state.posit_post_ordered_mentions
    },
    posit_get_post_ordered_views(state) {
      return state.posit_post_ordered_views
    },
    posit_get_post_ordered_comments(state) {
      return state.posit_post_ordered_comments
    }
  },
  mutations: {
    posit_setmentions(state, payload) {
      state.posit_mentions = payload
    },
    posit_setreach(state, payload) {
      state.posit_reach = payload
    },
    posit_setimpressions(state, payload) {
      state.posit_impressions = payload
    },
    posit_setmentions_coeff(state, payload) {
      state.posit_mentions_coeff = payload
    },
    posit_setreach_coeff(state, payload) {
      state.posit_reach_coeff = payload
    },
    posit_setimpressions_coeff(state, payload) {
      state.posit_impressions_coeff = payload
    },
    posit_setmentions_date(state, payload) {
      state.posit_mentions_date = payload
    },
    posit_setreach_date(state, payload) {
      state.posit_reach_date = payload
    },
    posit_setimpressions_date(state, payload) {
      state.posit_impressions_date = payload
    },
    posit_setmentions_prod(state, payload) {
      state.posit_mentions_prod = payload
    },
    posit_setreach_prod(state, payload) {
      state.posit_reach_prod = payload
    },
    posit_setimpressions_prod(state, payload) {
      state.posit_impressions_prod = payload
    },
    posit_setmentions_prod_date(state, payload) {
      state.posit_mentions_prod_date = payload
    },
    posit_setreach_prod_date(state, payload) {
      state.posit_reach_prod_date = payload
    },
    posit_setimpressions_prod_date(state, payload) {
      state.posit_impressions_prod_date = payload
    },
    posit_set_word_cloud(state, payload) {
      state.posit_word_cloud = payload
    },
    posit_set_yt_ordered_mentions(state, payload) {
      state.posit_yt_ordered_mentions = payload
    },
    posit_set_yt_ordered_views(state, payload) {
      state.posit_yt_ordered_views = payload
    },
    posit_set_yt_ordered_comments(state, payload) {
      state.posit_yt_ordered_comments = payload
    },
    posit_set_ig_ordered_mentions(state, payload) {
      state.posit_ig_ordered_mentions = payload
    },
    posit_set_ig_ordered_views(state, payload) {
      state.posit_ig_ordered_views = payload
    },
    posit_set_ig_ordered_comments(state, payload) {
      state.posit_ig_ordered_comments = payload
    },
    posit_set_video_ordered_mentions(state, payload) {
      state.posit_video_ordered_mentions = payload
    },
    posit_set_video_ordered_views(state, payload) {
      state.posit_video_ordered_views = payload
    },
    posit_set_video_ordered_comments(state, payload) {
      state.posit_video_ordered_comments = payload
    },
    posit_set_post_ordered_mentions(state, payload) {
      state.posit_post_ordered_mentions = payload
    },
    posit_set_post_ordered_views(state, payload) {
      state.posit_post_ordered_views = payload
    },
    posit_set_post_ordered_comments(state, payload) {
      state.posit_post_ordered_comments = payload
    }
  },
  actions: {
    async posit_request({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/count?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_coeff({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/count?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set${action}_coeff`, response.data['мегафон'])
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_date({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/date?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set${action}_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_prod({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/products/count?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set${action}_prod`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_prod_date({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/${action}/products/date?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set${action}_prod_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_word_cloud({commit}, {start, end}) {
      await http
        .get(
          `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set_word_cloud`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_yt_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/channel?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set_yt_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_ig_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/user?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set_ig_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_video_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/video?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set_video_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_post_ordered({commit}, {action, start, end}) {
      await http
        .get(
          `megafon/post?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`posit_set_post_ordered_${action}`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
