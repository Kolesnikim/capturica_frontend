import HTTP from '@/api/http'

export default {
  state: {
    horizontal_bar_beeline_channel: {},
    horizontal_bar_mts_channel: {},
    horizontal_bar_tele2_channel: {},
    horizontal_bar_beeline_user: {},
    horizontal_bar_mts_user: {},
    horizontal_bar_tele2_user: {},
    wordcloud_beeline: {},
    wordcloud_mts: {},
    wordcloud_tele2: {},
    posts_beeline: {},
    posts_mts: {},
    posts_tele2: {},
    video_beeline: {},
    video_mts: {},
    video_tele2: {}
  },
  getters: {
    get_horizontal_bar_beeline_channel(state) {
      return state.horizontal_bar_beeline_channel
    },
    get_horizontal_bar_mts_channel(state) {
      return state.horizontal_bar_mts_channel
    },
    get_horizontal_bar_tele2_channel(state) {
      return state.horizontal_bar_tele2_channel
    },
    get_horizontal_bar_beeline_user(state) {
      return state.horizontal_bar_beeline_user
    },
    get_horizontal_bar_mts_user(state) {
      return state.horizontal_bar_mts_user
    },
    get_horizontal_bar_tele2_user(state) {
      return state.horizontal_bar_tele2_user
    },
    get_wordcloud_beeline(state) {
      return state.wordcloud_beeline
    },
    get_wordcloud_mts(state) {
      return state.wordcloud_mts
    },
    get_wordcloud_tele2(state) {
      return state.wordcloud_tele2
    },
    get_posts_beeline(state) {
      return state.posts_beeline
    },
    get_posts_mts(state) {
      return state.posts_mts
    },
    get_posts_tele2(state) {
      return state.posts_tele2
    },
    get_video_beeline(state) {
      return state.video_beeline
    },
    get_video_mts(state) {
      return state.video_mts
    },
    get_video_tele2(state) {
      return state.video_tele2
    }
  },
  mutations: {
    set_horizontal_bar_beeline_channel(state, payload) {
      state.horizontal_bar_beeline_channel = payload
    },
    set_horizontal_bar_mts_channel(state, payload) {
      state.horizontal_bar_mts_channel = payload
    },
    set_horizontal_bar_tele2_channel(state, payload) {
      state.horizontal_bar_tele2_channel = payload
    },
    set_horizontal_bar_beeline_user(state, payload) {
      state.horizontal_bar_beeline_user = payload
    },
    set_horizontal_bar_mts_user(state, payload) {
      state.horizontal_bar_mts_user = payload
    },
    set_horizontal_bar_tele2_user(state, payload) {
      state.horizontal_bar_tele2_user = payload
    },
    set_wordcloud_beeline(state, payload) {
      state.wordcloud_beeline = payload
    },
    set_wordcloud_mts(state, payload) {
      state.wordcloud_mts = payload
    },
    set_wordcloud_tele2(state, payload) {
      state.wordcloud_tele2 = payload
    },
    set_posts_beeline(state, payload) {
      state.posts_beeline = payload
    },
    set_posts_mts(state, payload) {
      state.posts_mts = payload
    },
    set_posts_tele2(state, payload) {
      state.posts_tele2 = payload
    },
    set_video_beeline(state, payload) {
      state.video_beeline = payload
    },
    set_video_mts(state, payload) {
      state.video_mts = payload
    },
    set_video_tele2(state, payload) {
      state.video_tele2 = payload
    }
  },
  actions: {
    async request_bar_charts_channel(
      {commit, rootGetters},
      {operator, operatorEng}
    ) {
      const [start, end] = rootGetters.getDates
      await HTTP.get(
        `megafon/channel?brand=${operator}&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
      ).then(response => {
        commit(`set_horizontal_bar_${operatorEng}_channel`, response.data)
      })
    },
    async request_bar_charts_user(
      {commit, rootGetters},
      {operator, operatorEng}
    ) {
      const [start, end] = rootGetters.getDates
      await HTTP.get(
        `megafon/user?brand=${operator}&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
      ).then(response => {
        commit(`set_horizontal_bar_${operatorEng}_user`, response.data)
      })
    },
    async request_cloud_word(
      {commit, rootGetters},
      {operatorRus, operatorEng}
    ) {
      const [start, end] = rootGetters.getDates
      await HTTP.get(
        `megafon/wordcloud?brand=${operatorRus}&start_date=${start}&end_date=${end}`
      ).then(response => {
        commit(`set_wordcloud_${operatorEng}`, response.data)
      })
    },
    async request_posts({commit, rootGetters}, operator) {
      const [start, end] = rootGetters.getDates
      await HTTP.get(
        `megafon/post?brand=${operator.operatorRus}&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
      ).then(response => {
        commit(`set_posts_${operator.operatorEng}`, response.data)
      })
    },
    async request_video({commit, rootGetters}, operator) {
      const [start, end] = rootGetters.getDates
      await HTTP.get(
        `megafon/video?brand=${operator.operatorRus}&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
      ).then(response => {
        commit(`set_video_${operator.operatorEng}`, response.data)
      })
    }
  }
}
