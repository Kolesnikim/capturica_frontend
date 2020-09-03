<template>
  <v-card class="pa-2 mb-4" style="width: 100%">
    <div class="d-flex justify-center align-center">
      <h2 class="text-center">
        {{ charts.line.line_2[getRequestType.value].title }}
      </h2>
      <v-btn
        @click="export_request_prod_date"
        class="ml-2"
        color="primary--text"
        icon
      >
        <v-icon class="">mdi-download</v-icon>
      </v-btn>
    </div>
    <line-chart
      v-if="!charts.line.line_2.loading"
      :chart-data="charts.line.line_2.data"
      :options="charts.line.line_2.options"
    ></line-chart>
    <v-progress-circular
      v-if="charts.line.line_2.loading"
      size="48"
      indeterminate
      color="#639FF8"
    ></v-progress-circular>
  </v-card>
</template>

<script>
import lineChart from '../charts/line_modified'

import {mapGetters} from 'vuex'
import http from '@/api/http'
import * as fileDownload from 'js-file-download'

export default {
  name: 'line-2',
  components: {
    lineChart
  },
  data: () => ({
    path: '',
    charts: {
      line: {
        line_2: {
          mentions: {
            title: 'Динамика упоминаний брендов'
          },
          reach: {
            title: 'Динамика охвата по брендам'
          },
          impressions: {
            title: 'Динамика вовлеченности по брендам'
          },
          loading: true,
          data: {},
          options: {
            fill: false,
            responsive: true,
            maintainAspectRatio: false
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
    async export_request_prod_date() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value

      let route = ''

      if (this.path === 'general') {
        route = `megafon/${action}/products/date?start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/${action}/products/date?start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/${action}/products/date?start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }

      await http.get(route).then(response => {
        console.log(response.data)
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      this.getLineData()
    },
    async getLineData() {
      this.charts.line.line_2.loading = true

      let apiData = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_prod_date')
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_prod_date')
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_prod_date')
      }

      apiData = this.$store.getters[`get_count_prod_date`]

      let service_labels = [...new Set([...Object.keys(apiData)])]

      let labels = [
        ...new Set([
          ...service_labels.flatMap(label => Object.keys(apiData[label]))
        ])
      ]

      const getData = label => {
        const data = []
        labels.forEach(date => {
          let data_1 = 0
          for (let operator in apiData[label][date]) {
            const {instagram = {count: 0}, youtube = {count: 0}} =
              apiData[label][date][operator] || {}
            const sum = instagram.count + youtube.count
            data_1 += sum
          }
          data.push(data_1)
        })
        return data
      }
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      }
      const colors = service_labels.map(() => getRandomColor)

      const datasets = service_labels.map((label, index) => ({
        label,
        backgroundColor: colors[index],
        borderColor: colors[index],
        data: getData(label),
        fill: false
      }))
      labels = labels.map(label => {
        label = label.split('T')
        label.pop().toString()
        return label
      })

      const chart_data = {
        labels,
        datasets
      }

      this.charts.line.line_2.data = chart_data
      this.charts.line.line_2.loading = false
    }
  }
}
</script>

<style scoped></style>
