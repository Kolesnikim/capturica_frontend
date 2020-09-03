import http from '@/api/http'
import {mapGetters} from 'vuex'

const request = () => {
  mapGetters(['getRequestType'])
}
console.log(request())

export default {
  state: {
    count: {},
    count_coeff: {},
    count_date: {},
    count_prod: {},
    count_prod_date: {},
    word_cloud: {},
    yt_ordered_count: {},
    ig_ordered_count: {},
    video_ordered_count: {},
    post_ordered_count: {}
  },
  getters: {
    get_count(state) {
      return state.count
    },
    get_count_coeff(state) {
      return state.count_coeff
    },
    get_count_date(state) {
      return state.count_date
    },
    get_count_prod(state) {
      return state.count_prod
    },
    get_count_prod_date(state) {
      return state.count_prod_date
    },
    get_word_cloud(state) {
      return state.word_cloud
    },
    get_yt_ordered_count(state) {
      return state.yt_ordered_count
    },
    get_ig_ordered_count(state) {
      return state.ig_ordered_count
    },
    get_video_ordered_count(state) {
      return state.video_ordered_count
    },
    get_post_ordered_count(state) {
      return state.post_ordered_count
    }
  },
  mutations: {
    set_count(state, payload) {
      state.count = payload
    },
    set_count_coeff(state, payload) {
      state.count_coeff = payload
    },
    set_count_date(state, payload) {
      state.count_date = payload
    },
    set_count_prod(state, payload) {
      state.count_prod = payload
    },
    set_count_prod_date(state, payload) {
      state.count_prod_date = payload
    },
    set_word_cloud(state, payload) {
      state.word_cloud = payload
    },
    set_yt_ordered_count(state, payload) {
      state.yt_ordered_count = payload
    },
    set_ig_ordered_count(state, payload) {
      state.ig_ordered_count = payload
    },
    set_video_ordered_count(state, payload) {
      state.video_ordered_count = payload
    },
    set_post_ordered_count(state, payload) {
      state.post_ordered_count = payload
    }
  },
  actions: {
    async request({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/count?start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_coeff({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/count?start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_count_coeff`, response.data['мегафон'])
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_date({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/date?start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_count_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_prod({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/products/count?start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_count_prod`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_prod_date({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/products/date?start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_count_prod_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_word_cloud({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
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
    async request_yt_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/channel?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_yt_ordered_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_ig_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/user?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_ig_ordered_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_video_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/video?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_video_ordered_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async request_post_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/post?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}`
        )
        .then(response => {
          commit(`set_post_ordered_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    }
  }
}
