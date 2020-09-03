<template>
  <v-card class="pa-2 mb-4" style="width: 100%">
    <div class="d-flex justify-center align-center">
      <h2 class="text-center">
        {{ charts.vertical_bar.vertical_bar_1[getRequestType.value].title }}
      </h2>
      <v-btn
        @click="export_request_prod"
        class="ml-2"
        color="primary--text"
        icon
      >
        <v-icon class="">mdi-download</v-icon>
      </v-btn>
    </div>
    <vertical-bar-chart
      v-if="!charts.vertical_bar.vertical_bar_1.loading"
      style="max-width: 99%"
      :chart-data="charts.vertical_bar.vertical_bar_1.data"
      :options="charts.vertical_bar.vertical_bar_1.options"
    ></vertical-bar-chart>
    <v-progress-circular
      v-if="charts.vertical_bar.vertical_bar_1.loading"
      size="48"
      indeterminate
      color="#639FF8"
    ></v-progress-circular>
  </v-card>
</template>

<script>
import verticalBarChart from '../charts/verticalBar'

import {mapGetters} from 'vuex'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  name: 'vertical-bar-1',
  components: {
    verticalBarChart
  },
  data: () => ({
    path: '',
    charts: {
      vertical_bar: {
        vertical_bar_1: {
          mentions: {
            title: 'Упоминания продуктов брендов'
          },
          reach: {
            title: 'Охват по упоминаниям продуктов'
          },
          impressions: {
            title: 'Вовлеченность по упоминаниям продуктов'
          },
          loading: true,
          labels: [],
          datasets: [],
          data: {
            datasets: [
              {
                label: 'beeline',
                backgroundColor: '#F2DC5D',
                data: [],
                stack: 1
              },
              {
                label: 'megafon',
                backgroundColor: '#7FC29B',
                data: [],
                stack: 1
              },
              {
                label: 'mts',
                backgroundColor: '#EA2B1F',
                data: [],
                stack: 1
              },
              {
                label: 'tele2',
                backgroundColor: '#0C090D',
                data: [],
                stack: 1
              }
            ]
          },
          options: {
            // onClick(e, i) {
            //   const chart = i[0]
            //   console.dir(chart._view.label)
            // },
            animation: false,
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  stacked: true
                }
              ]
            }
          }
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
    async export_request_prod() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value

      let route = ''

      if (this.path === 'general') {
        route = `megafon/${action}/products/count?start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/${action}/products/count?start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/${action}/products/count?start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }

      await http.get(route, {responseType: 'blob'}).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      this.setDataOfVerticalBar()
    },
    async setDataOfVerticalBar() {
      this.charts.vertical_bar.vertical_bar_1.loading = true

      let apiData = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_prod')
        apiData = this.$store.getters[`get_count_prod`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_prod')
        apiData = this.$store.getters[`posit_get_count_prod`]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_prod')
        apiData = this.$store.getters[`negat_get_count_prod`]
      }

      const labels = Object.keys(apiData)
      const operators = ['билайн', 'теле2', 'мегафон', 'мтс']
      const colors = ['#F2DC5D', '#0C090D', '#7FC29B', '#EA2B1F']

      const datasets = operators.map((operator, index) => ({
        label: operator,
        backgroundColor: colors[index],
        stack: 1,
        data: labels.map(label => {
          let sum = 0
          if (
            apiData &&
            apiData[label] &&
            apiData[label][operator] &&
            apiData[label][operator].youtube
          ) {
            sum += apiData[label][operator].youtube.count || 0
          }

          if (
            apiData &&
            apiData[label] &&
            apiData[label][operator] &&
            apiData[label][operator].instagram
          ) {
            sum += apiData[label][operator].instagram.count || 0
          }

          return sum
        })
      }))

      const chart_data = {
        labels,
        datasets
      }

      this.charts.vertical_bar.vertical_bar_1.data = chart_data
      this.charts.vertical_bar.vertical_bar_1.loading = false
    }
  }
}
</script>

<style scoped></style>
