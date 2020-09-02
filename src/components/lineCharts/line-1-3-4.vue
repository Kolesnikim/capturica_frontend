<template>
  <div>
    <v-card class="pa-2 mb-4" style="width: 100%">
      <div class="d-flex justify-center align-center">
        <h2 class="text-center">
          {{ charts.line.line_1[getRequestType.value].title }}
        </h2>
        <v-btn
          @click="export_request_date"
          class="ml-2"
          color="primary--text"
          icon
        >
          <v-icon class="">mdi-download</v-icon>
        </v-btn>
      </div>
      <line-chart
        v-if="!charts.line.line_1.loading"
        :chart-data="charts.line.line_1.data"
        :options="charts.line.line_1.options"
      ></line-chart>
      <v-progress-circular
        v-if="charts.line.line_1.loading"
        size="48"
        indeterminate
        color="#639FF8"
      ></v-progress-circular>
    </v-card>
    <div class="d-flex mx-n2 mb-4">
      <v-flex md6 class="mx-2">
        <v-card class="pa-2 mb-4" style="width: 100%">
          <h2 class="text-center">
            {{ charts.line.line_3[getRequestType.value].title }}
          </h2>
          <line-chart
            v-if="!charts.line.line_3.loading"
            :chart-data="charts.line.line_3.data"
            :options="charts.line.line_3.options"
            style="width: 99%"
          ></line-chart>
          <v-progress-circular
            v-if="charts.line.line_3.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex md6 class="mx-2">
        <v-card class="pa-2 mb-4" style="width: 100%">
          <h2 class="text-center">
            {{ charts.line.line_4[getRequestType.value].title }}
          </h2>

          <line-chart
            v-if="!charts.line.line_4.loading"
            :chart-data="charts.line.line_4.data"
            :options="charts.line.line_4.options"
            style="width: 99%"
          ></line-chart>
          <v-progress-circular
            v-if="charts.line.line_4.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>
  </div>
</template>

<script>
import lineChart from '../charts/line'

import {mapGetters} from 'vuex'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  name: 'line-1-3-4',
  components: {
    lineChart
  },
  data: () => ({
    path: '',
    charts: {
      line: {
        line_1: {
          mentions: {
            title: 'Упоминания брендов'
          },
          reach: {
            title: 'Охват по брендам'
          },
          impressions: {
            title: 'Вовлеченность по брендам'
          },
          data: {},
          loading: true,
          options: {
            fill: false,
            responsive: true,
            maintainAspectRatio: false
          }
        },
        line_3: {
          mentions: {
            title: 'Упоминания брендов YT'
          },
          reach: {
            title: 'Охват по брендам YT'
          },
          impressions: {
            title: 'Вовлеченность по брендам YT'
          },
          data: {},
          loading: true,
          options: {
            fill: false,
            responsive: true,
            maintainAspectRatio: false
          }
        },
        line_4: {
          mentions: {
            title: 'Упоминания брендов IG'
          },
          reach: {
            title: 'Охват по брендам IG'
          },
          impressions: {
            title: 'Вовлеченность по брендам IG'
          },
          data: {},
          loading: true,
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
    async export_request_date() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value

      let route = ''

      if (this.path === 'general') {
        route = `megafon/${action}/date?start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/${action}/date?start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/${action}/date?start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }

      await http.get(route, {responseType: 'blob'}).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      const mentions = [
        {
          platform: 'youtube',
          chart_name: 'line_3'
        },
        {
          platform: 'instagram',
          chart_name: 'line_4'
        },
        {
          platform: 'all',
          chart_name: 'line_1'
        }
      ]
      mentions.forEach(mention => {
        this.getMentions(mention)
      })
    },

    async getMentions({chart_name, platform}) {
      this.charts.line[chart_name].loading = true
      const [start_date, end_date] = this.getDates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }

      const jsons = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_date', config)
        jsons[config.action] = this.$store.getters[`get${config.action}_date`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_date', config)
        jsons[config.action] = this.$store.getters[
          `posit_get${config.action}_date`
        ]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_date', config)
        jsons[config.action] = this.$store.getters[
          `negat_get${config.action}_date`
        ]
      }

      const brands_labels = ['мегафон', 'билайн', 'мтс', 'теле2']

      const colors = ['#7FC29B', '#F2DC5D', '#EA2B1F', '#0C090D']
      let labels = [
        ...new Set([
          ...brands_labels.flatMap(label =>
            Object.keys(jsons[config.action][label])
          )
        ])
      ]

      const getData = label => {
        const data = []
        labels.forEach(date => {
          const {instagram = {count: 0}, youtube = {count: 0}} =
            jsons[config.action][label][date] || {}
          const obj = {
            instagram,
            youtube
          }
          if (platform === 'all') {
            const sum = instagram.count + youtube.count
            data.push(sum)
          } else {
            data.push(obj[platform].count)
          }
        })
        return data
      }

      const datasets = brands_labels.map((label, index) => ({
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

      this.charts.line[chart_name].data = chart_data
      this.charts.line[chart_name].loading = false
    }
  }
}
</script>

<style scoped></style>
