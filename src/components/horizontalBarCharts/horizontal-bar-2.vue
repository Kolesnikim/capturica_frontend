<template>
  <v-flex md6 class="mx-2">
    <v-card class="pa-2" style="width: 100%">
      <div class="d-flex justify-center align-center">
        <h2 class="text-center">
          {{ charts.horizontal_bar_2[getRequestType.value].title }}
        </h2>
        <v-btn
          @click="export_request_coeff"
          class="ml-2"
          color="primary--text"
          icon
        >
          <v-icon class="">mdi-download</v-icon>
        </v-btn>
      </div>
      <horizontal-bar-chart
        v-if="!charts.horizontal_bar_2.loading"
        :chart-data="charts.horizontal_bar_2.data"
        style="height: 150px; width: 99%"
      ></horizontal-bar-chart>
      <v-progress-circular
        v-if="charts.horizontal_bar_2.loading"
        size="48"
        indeterminate
        color="#639FF8"
      ></v-progress-circular>
    </v-card>
  </v-flex>
</template>

<script>
import horizontalBarChart from '../charts/horizontalBar'

import {mapGetters} from 'vuex'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  name: 'horizontal-bar-2',
  components: {
    horizontalBarChart
  },
  data: () => ({
    path: '',
    charts: {
      horizontal_bar_2: {
        mentions: {
          title: 'Соотношение упоминаний'
        },
        reach: {
          title: 'Соотношение охвата'
        },
        impressions: {
          title: 'Соотношение вовлеченности'
        },
        loading: true,
        data: {},
        options: null
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
    async export_request_coeff() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value

      let route = ''

      if (this.path === 'general') {
        route = `megafon/${action}/count?start_date=${start}&end_date=${end}&brand=мегафон&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/${action}/count?start_date=${start}&end_date=${end}&brand=мегафон&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/${action}/count?start_date=${start}&end_date=${end}&brand=мегафон&export_format=csv&sentiment=negative`
      }

      await http.get(route, {responseType: 'blob'}).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      await this.getHorizontalBarCoeff()
    },
    async getHorizontalBarCoeff() {
      this.charts.horizontal_bar_2.loading = true
      const [start_date, end_date] = this.getDates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }

      const jsons = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_coeff', config)
        jsons[config.action] = this.$store.getters[`get${config.action}_coeff`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_coeff', config)
        jsons[config.action] = this.$store.getters[
          `posit_get${config.action}_coeff`
        ]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_coeff', config)
        jsons[config.action] = this.$store.getters[
          `negat_get${config.action}_coeff`
        ]
      }

      const obj = jsons[config.action]
      const labels = Object.keys(obj)
      const sum_mentions = labels.map(label => obj[label].count)

      this.charts.horizontal_bar_2.data = {
        labels,
        datasets: [
          {
            label: 'Соотношение',
            backgroundColor: '#639FF8',
            data: sum_mentions
          }
        ]
      }

      this.charts.horizontal_bar_2.loading = false
    }
  }
}
</script>

<style scoped></style>
