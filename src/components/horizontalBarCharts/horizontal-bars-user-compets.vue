<template>
  <div class="mb-6 d-flex mx-n2">
    <v-flex
      class="mx-2"
      md4
      v-for="(operator, idx) in charts.horizontal_bar"
      :key="idx"
    >
      <v-card class="pa-2" style="width: 100%; min-height: 300px">
        <div class="d-flex justify-center align-center">
          <h2 class="text-center">Топ каналов IG</h2>
          <v-btn
            class="ml-2"
            color="primary--text"
            icon
            @click="export_bars_user(operator.rus)"
          >
            <v-icon class="">mdi-download</v-icon>
          </v-btn>
        </div>

        <horizontal-bar-chart
          :chart-data="operator.data"
          v-if="!operator.loading"
        ></horizontal-bar-chart>
        <v-progress-circular
          color="#639FF8"
          indeterminate
          size="48"
          v-if="operator.loading"
        ></v-progress-circular>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import horizontalBarChart from '@/components/charts/horizontalBar'
import {mapGetters} from 'vuex'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  name: 'horizontal-bars-channel-compets',
  components: {
    horizontalBarChart
  },
  data: () => ({
    charts: {
      horizontal_bar: {
        beeline: {
          loading: true,
          data: {},
          options: null,
          rus: 'билайн',
          title_mentions: 'Упоминания',
          title_reach: 'Охват',
          title_impressions: 'Вовлеченность'
        },
        mts: {
          loading: true,
          data: {},
          options: null,
          rus: 'мтс',
          title_mentions: 'Упоминания',
          title_reach: 'Охват',
          title_impressions: 'Вовлеченность'
        },
        tele2: {
          loading: true,
          data: {},
          options: null,
          rus: 'теле2',
          title_mentions: 'Упоминания',
          title_reach: 'Охват',
          title_impressions: 'Вовлеченность'
        }
      }
    }
  }),
  computed: {
    ...mapGetters(['getRequestType', 'getDates'])
  },
  created() {
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
    async export_bars_user(operator) {
      const [start, end] = this.getDates
      const action = this.getRequestType.value
      await http
        .get(
          `megafon/user?brand=${operator}&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    init() {
      const horizontalBarDatas = [
        {
          operator: 'билайн',
          column: 'user_name',
          prop: 'user_beeline',
          platform: 'youtube',
          field: 'user_name',
          type: 'user',
          operatorEng: 'beeline'
        },
        {
          operator: 'мтс',
          column: 'user_name',
          prop: 'user_mts',
          platform: 'youtube',
          field: 'user_name',
          type: 'user',
          operatorEng: 'mts'
        },
        {
          operator: 'теле2',
          column: 'user_name',
          prop: 'user_tele2',
          platform: 'youtube',
          field: 'user_name',
          type: 'user',
          operatorEng: 'tele2'
        }
      ]
      horizontalBarDatas.forEach(item => {
        this.getHorizontalBarData(item)
      })
    },
    async getHorizontalBarData({field, operator, operatorEng}) {
      this.charts.horizontal_bar[operatorEng].loading = true

      const config = {
        operator,
        operatorEng
      }

      await this.$store.dispatch('request_bar_charts_user', config)
      const data = this.$store.getters[`get_horizontal_bar_${operatorEng}_user`]
      const labels = data.map(item => item[field])

      const datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const obj = data.find(obj => obj[field] === label)
          return total + parseFloat(obj[item] || 0)
        }, 0)
      })

      this.charts.horizontal_bar[operatorEng].data = {
        labels,
        datasets: [
          {
            label: this.charts.horizontal_bar[operatorEng][
              `title_${this.getRequestType.value}`
            ],
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      }

      this.charts.horizontal_bar[operatorEng].loading = false
    }
  }
}
</script>

<style scoped></style>
