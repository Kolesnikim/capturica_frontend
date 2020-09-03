import http from '@/api/http'

export default {
  state: {},
  actions: {
    async posit_request({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/count?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_coeff({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/count?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_count_coeff`, response.data['мегафон'])
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_date({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/date?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_count_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_prod({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/products/count?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_count_prod`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_prod_date({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/${rootGetters.getRequestType.value}/products/date?start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_count_prod_date`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_word_cloud({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_word_cloud`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_yt_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/channel?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_yt_ordered_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_ig_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/user?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_ig_ordered_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_video_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/video?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}&sentiment=positive`
        )
        .then(response => {
          commit(`set_video_ordered_count`, response.data)
        })
        .catch(err => {
          console.warn(err.message)
        })
    },
    async posit_request_post_ordered({commit, rootGetters}) {
      const [start, end] = rootGetters.getDates
      await http
        .get(
          `megafon/post?brand=мегафон&order_by=${rootGetters.getRequestType.value}&start_date=${start}&end_date=${end}&sentiment=positive`
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
