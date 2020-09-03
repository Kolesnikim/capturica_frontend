<template>
  <v-flex md6 class="mx-2">
    <v-card class="pa-2" style="width: 100%">
      <div class="d-flex justify-center align-center">
        <h2 class="text-center">
          {{ charts.horizontal_bar_1[getRequestType.value].title }}
        </h2>
        <v-btn @click="export_request" class="ml-2" color="primary--text" icon>
          <v-icon class="">mdi-download</v-icon>
        </v-btn>
      </div>

      <horizontal-bar
        v-if="!charts.horizontal_bar_1.loading"
        :chart-data="charts.horizontal_bar_1.data"
        style="height: 150px; width: 99%"
      ></horizontal-bar>
      <v-progress-circular
        v-if="charts.horizontal_bar_1.loading"
        size="48"
        indeterminate
        color="#639FF8"
      ></v-progress-circular>
    </v-card>
  </v-flex>
</template>

<script>
import horizontalBar from '../charts/horizontalBar'

import {mapGetters} from 'vuex'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  name: 'horizontal-bar-1',
  components: {
    horizontalBar
  },
  data: () => ({
    path: '',
    charts: {
      horizontal_bar_1: {
        mentions: {
          title: 'Общее количество упоминаний брендов'
        },
        reach: {
          title: 'Общий охват упоминаний брендов'
        },
        impressions: {
          title: 'Общая вовлеченность упоминаний брендов'
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
    async export_request() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value

      let route = ''

      if (this.path === 'general') {
        route = `megafon/${action}/count?start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/${action}/count?start_date=${start}&end_date=${end}&sentiment=positive&export_format=csv`
      } else if (this.path === 'negative') {
        route = `megafon/${action}/count?start_date=${start}&end_date=${end}&sentiment=negative&export_format=csv`
      }

      await http.get(route, {responseType: 'blob'}).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      this.getHorizontalBarMentions()
    },
    async getHorizontalBarMentions() {
      this.charts.horizontal_bar_1.loading = true

      let apiData = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request')
        apiData = this.$store.getters[`get_count`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request')
        apiData = this.$store.getters[`posit_get_count`]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request')
        apiData = this.$store.getters[`negat_get_count`]
      }

      const labels = ['мегафон', 'мтс', 'билайн', 'теле2']
      const mentions = labels.map(label =>
        Object.values(apiData[label]).reduce(
          (total, item) => total + parseFloat(item.count),
          0
        )
      )
      const datasets = []

      datasets.push({
        label: 'Количество упоминаний',
        backgroundColor: ['#7FC29B', '#EA2B1F', '#F2DC5D', '#0C090D'],
        data: mentions
      })

      this.charts.horizontal_bar_1.data = {
        labels,
        datasets
      }

      this.charts.horizontal_bar_1.loading = false
    }
  }
}
</script>

<style scoped></style>
