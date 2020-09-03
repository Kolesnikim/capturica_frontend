<template>
  <div class="mb-4 d-flex mx-n2">
    <v-flex md6 class="mx-2">
      <v-card class="pa-2" style="width: 100%;">
        <div class="d-flex justify-center align-center">
          <h2 class="text-center">
            {{ charts.horizontal_bar.youtube[getRequestType.value].title }}
          </h2>
          <v-btn
            @click="request_yt_ordered_exp"
            class="ml-2"
            color="primary--text"
            icon
          >
            <v-icon class="">mdi-download</v-icon>
          </v-btn>
        </div>
        <horizontal-bar-chart
          v-if="!charts.horizontal_bar.youtube.loading"
          :chart-data="charts.horizontal_bar.youtube.data"
          style="width: 99%"
        ></horizontal-bar-chart>
        <v-progress-circular
          v-if="charts.horizontal_bar.youtube.loading"
          size="48"
          indeterminate
          color="#639FF8"
        ></v-progress-circular>
      </v-card>
    </v-flex>
    <v-flex md6 class="mx-2">
      <v-card class="pa-2" style="width: 100%;">
        <div class="d-flex justify-center align-center">
          <h2 class="text-center">
            {{ charts.horizontal_bar.instagram[getRequestType.value].title }}
          </h2>
          <v-btn
            @click="request_ig_ordered_exp"
            class="ml-2"
            color="primary--text"
            icon
          >
            <v-icon class="">mdi-download</v-icon>
          </v-btn>
        </div>
        <horizontal-bar-chart
          v-if="!charts.horizontal_bar.instagram.loading"
          :chart-data="charts.horizontal_bar.instagram.data"
          style="width: 99%"
        ></horizontal-bar-chart>
        <v-progress-circular
          v-if="charts.horizontal_bar.instagram.loading"
          size="48"
          indeterminate
          color="#639FF8"
        ></v-progress-circular>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import horizontalBarChart from '../charts/horizontalBar'
import {mapGetters} from 'vuex'
import http from '@/api/http'
import * as fileDownload from 'js-file-download'

export default {
  name: 'horizontal-bars-yt-ig',
  components: {
    horizontalBarChart
  },
  data: () => ({
    path: '',
    charts: {
      horizontal_bar: {
        youtube: {
          mentions: {
            title: 'Топ каналов по упоминаниям YT'
          },
          reach: {
            title: 'Топ каналов по охвату YT'
          },
          impressions: {
            title: 'Топ каналов по вовлеченности YT'
          },
          loading: true,
          data: {},
          options: null
        },
        instagram: {
          mentions: {
            title: 'Топ каналов по упоминаниям IG'
          },
          reach: {
            title: 'Топ каналов по охвату IG'
          },
          impressions: {
            title: 'Топ каналов по вовлеченности IG'
          },
          loading: true,
          data: {},
          options: null
        }
      }
    }
  }),
  computed: {
    ...mapGetters(['getRequestType', 'getDates'])
  },
  created() {
    this.path = this.$route.fullPath.slice(1)
    this.init()
  },
  watch: {
    getRequestType() {
      this.init()
    },
    getDates() {
      this.init()
    }
  },
  methods: {
    async request_yt_ordered_exp() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value

      let route = ''

      if (this.path === 'general') {
        route = `megafon/channel?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/channel?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/channel?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }
      await http.get(route).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async request_ig_ordered_exp() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value

      let route = ''

      if (this.path === 'general') {
        route = `megafon/user?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/user?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/user?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }

      await http.get(route).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      this.getHorizontalBarYoutube()
      this.getHorizontalBarInstagram()
    },
    async getHorizontalBarYoutube() {
      this.charts.horizontal_bar.youtube.loading = true

      let apiData = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_yt_ordered')
        apiData = this.$store.getters[`get_yt_ordered_count`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_yt_ordered')
        apiData = this.$store.getters[`posit_get_yt_ordered_count`]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_yt_ordered')
        apiData = this.$store.getters[`negat_get_yt_ordered_count`]
      }

      const labels = apiData.map(item => item.channel_name)

      let datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const channel_name = apiData.find(obj => obj.channel_name === label)
          return total + parseFloat(channel_name[item] || 0)
        }, 0)
      })
      datasets = datasets.sort((i, j) => j - i)

      this.charts.horizontal_bar.youtube.data = {
        labels,
        datasets: [
          {
            label: 'Соотношение',
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      }
      this.charts.horizontal_bar.youtube.loading = false
    },
    async getHorizontalBarInstagram() {
      this.charts.horizontal_bar.instagram.loading = true

      let apiData = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_ig_ordered')
        apiData = this.$store.getters[`get_ig_ordered_count`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_ig_ordered')
        apiData = this.$store.getters[`posit_get_ig_ordered_count`]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_ig_ordered')
        apiData = this.$store.getters[`negat_get_ig_ordered_count`]
      }

      const labels = apiData.map(item => item.user_name)
      let datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const user_name = apiData.find(obj => obj.user_name === label)
          return total + parseFloat(user_name[item] || 0)
        }, 0)
      })
      datasets = datasets.sort((i, j) => j - i)

      this.charts.horizontal_bar.instagram.data = {
        labels,
        datasets: [
          {
            label: 'Мегафон',
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      }

      this.charts.horizontal_bar.instagram.loading = false
    }
  }
}
</script>

<style scoped></style>
