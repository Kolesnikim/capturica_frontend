<template>
  <v-layout class="d-flex pa-4" column>
    <v-card class="mb-6">
      <v-app-bar dense flat tile class="relative">
        <div class="spacer_1"></div>
        <h1>Упоминания</h1>
        <v-spacer></v-spacer>
        <date-picker
          v-model="dates"
          class="date-picker"
          type="date"
          range
          value-type="format"
          format="YYYY-MM-DD"
          placeholder="Выберите период"
          confirm
          confirm-text="Применить"
          range-separator=" - "
          :clearable="false"
          @confirm="updateCharts($event)"
        ></date-picker>
      </v-app-bar>
      <request-types class="mt-16"></request-types>
    </v-card>

    <div class="d-flex mx-n2 mb-4">
      <horizontal-bar1></horizontal-bar1>
      <horizontal-bar2></horizontal-bar2>
    </div>
    <line-1-3-4></line-1-3-4>

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

    <div class="mb-4 d-flex mx-n2">
      <v-flex md12 class="ma-2 pb-4">
        <v-card class="px-2 elevation-0" style="height: 100%">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Облако слов для бренда Мегафон</h2>
            <v-btn
              @click="export_wordcloud"
              class="ml-2"
              color="primary--text"
              icon
            >
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
          <word-cloud
            v-if="!cloud.loading"
            :rotate="{from: -0, to: 0, numOfOrientation: 0}"
            :wordPadding="2"
            :margin="{top: 0, right: 0, bottom: 0, left: 0}"
            :color="cloud.color"
            :data="cloud.items"
            nameKey="word"
            valueKey="count"
            :showTooltip="false"
          >
          </word-cloud>
          <v-progress-circular
            v-if="cloud.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

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

    <v-layout class="pa-4 mx-n6" wrap>
      <v-flex class="px-2" md6>
        <v-card class="pa-2 mb-4" style="width: 100%">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">
              {{ tables.video[getRequestType.value].title }}
            </h2>
            <v-btn
              @click="request_video_ordered_exp"
              class="ml-2"
              color="primary--text"
              icon
            >
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
          <v-data-table
            :headers="tables.video.headers"
            :items="tables.video.items"
            :items-per-page="5"
            :loading="tables.video.loading"
            class="elevation-0 transparent"
            loading-text="Загрузка..."
          >
            <template v-slot:body="{items}">
              <tbody>
                <tr :key="item.link" v-for="item in items">
                  <td
                    :key="header.value"
                    v-for="header in tables.video.headers"
                  >
                    <a
                      :href="`http://youtu.be/${item[header.value]}`"
                      v-if="header.value === 'yt_video_id'"
                      >{{ item[header.value] | filterLength(20) }}</a
                    >
                    <span v-else>{{
                      item[header.value] | filterLength(20)
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex class="px-2" md6>
        <v-card class="pa-2 mb-4" style="width: 100%">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">
              {{ tables.posts[getRequestType.value].title }}
            </h2>
            <v-btn
              @click="request_post_ordered_exp"
              class="ml-2"
              color="primary--text"
              icon
            >
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>

          <v-data-table
            :headers="tables.posts.headers"
            :items="tables.posts.items"
            :items-per-page="5"
            :loading="tables.posts.loading"
            class="elevation-0 transparent"
            loading-text="Загрузка..."
          >
            <template v-slot:body="{items}">
              <tbody>
                <tr :key="item.link" v-for="item in items">
                  <td
                    :key="header.value"
                    v-for="header in tables.posts.headers"
                  >
                    <a
                      :href="item[header.value]"
                      v-if="header.value === 'ig_post_id'"
                      >{{ item[header.value] | filterLength(20) }}</a
                    >
                    <span v-else>{{
                      item[header.value] | filterLength(20)
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import lineChart from '@/components/charts/line.js'
import horizontalBarChart from '@/components/charts/horizontalBar.js'
import verticalBarChart from '@/components/charts/verticalBar.js'
import requestTypes from '@/components/request-types'

import horizontalBar1 from '@/components/horizontalBarCharts/horizontal-bar-1'
import horizontalBar2 from '@/components/horizontalBarCharts/horizontal-bar-2'
import line134 from '@/components/lineCharts/line-1-3-4'

import wordCloud from 'vue-wordcloud'
import {mapGetters} from 'vuex'

// import moment from 'moment'
import DatePicker from 'vue2-datepicker'

import http from '@/api/http'
import * as fileDownload from 'js-file-download'

export default {
  components: {
    horizontalBar1,
    horizontalBar2,
    line134,
    lineChart,
    horizontalBarChart,
    verticalBarChart,
    wordCloud,
    requestTypes,
    DatePicker
  },

  filters: {
    filterLength(value, length) {
      if (!value) return
      if (value.length > length) {
        return value.slice(0, length - 3) + '...'
      }
      return value
    }
  },

  data: () => ({
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
      },
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
      },
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
    },
    cloud: {
      items: [],
      loading: true,
      color: ['#639FF8']
    },
    count_mentions: {
      megafon: 0,
      youtube: 0,
      instagram: 0
    },
    tables: {
      posts: {
        mentions: {
          title: 'Список упоминаний IG'
        },
        reach: {
          title: 'Список охвата IG'
        },
        impressions: {
          title: 'Список вовлечений IG'
        },
        headers: [
          {
            text: 'Имя пользователя',
            align: 'left',
            sortable: false,
            value: 'user_name'
          },
          {
            text: 'Описание',
            align: 'left',
            sortable: false,
            value: 'description'
          },
          {
            text: 'Ссылка',
            align: 'left',
            sortable: false,
            value: 'ig_post_id'
          },
          {
            text: 'Просмотры',
            align: 'left',
            value: 'views'
          },
          {
            text: 'Лайки',
            align: 'left',
            value: 'likes'
          },
          {
            text: 'Комментариев',
            align: 'left',
            value: 'comments'
          }
        ],
        items: [],
        loading: true
      },
      video: {
        mentions: {
          title: 'Список упоминаний YT'
        },
        reach: {
          title: 'Список охвата YT'
        },
        impressions: {
          title: 'Список вовлечений YT'
        },
        headers: [
          {
            text: 'Имя пользователя',
            align: 'left',
            sortable: false,
            value: 'channel_name'
          },
          {
            text: 'Название',
            align: 'left',
            sortable: false,
            value: 'title'
          },
          {
            text: 'Ссылка',
            align: 'left',
            sortable: false,
            value: 'yt_video_id'
          },
          {
            text: 'Упоминаний',
            align: 'left',
            value: 'mentions'
          },
          {
            text: 'Охват',
            align: 'left',
            value: 'views'
          },
          {
            text: 'Комментариев',
            align: 'left',
            value: 'comments'
          }
        ],
        items: [],
        loading: true
      }
    }
  }),
  computed: {
    ...mapGetters(['getRequestType']),
    dates: {
      get() {
        return this.$store.getters.getDates
      },
      set(value) {
        this.$store.dispatch('setDates', value)
      }
    }
  },

  created() {
    this.init()
  },
  watch: {
    getRequestType() {
      this.init()
    }
  },

  methods: {
    async export_request_prod() {
      const [start, end] = this.dates
      const action = this.getRequestType.value
      await http
        .get(
          `megafon/${action}/products/count?start_date=${start}&end_date=${end}&export_format=csv`,
          {
            responseType: 'blob'
          }
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async export_request_prod_date() {
      const [start, end] = this.dates
      const action = this.getRequestType.value
      await http
        .get(
          `megafon/${action}/products/date?start_date=${start}&end_date=${end}&export_format=csv`,
          {
            responseType: 'blob'
          }
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async export_wordcloud() {
      const [start, end] = this.dates
      await http
        .get(
          `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async request_yt_ordered_exp() {
      const [start, end] = this.dates
      const action = this.getRequestType.value
      await http
        .get(
          `megafon/channel?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async request_ig_ordered_exp() {
      const [start, end] = this.dates
      const action = this.getRequestType.value
      await http
        .get(
          `megafon/user?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async request_video_ordered_exp() {
      const [start, end] = this.dates
      const action = this.getRequestType.value
      await http
        .get(
          `megafon/video?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async request_post_ordered_exp() {
      const [start, end] = this.dates
      const action = this.getRequestType.value
      await http
        .get(
          `megafon/post?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async init() {
      this.getCloudWords()
      this.getHorizontalBarYoutube()
      this.getHorizontalBarInstagram()

      this.setDataOfVerticalBar()

      this.getListPosts()
      this.getListVideo()

      this.getLineData()
    },
    // updateProgress(e) {
    //   console.log(e)
    // },
    async getLineData() {
      this.charts.line.line_2.loading = true
      const [start_date, end_date] = this.dates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }
      const jsons = {}

      await this.$store.dispatch('request_prod_date', config)
      jsons[config.action] = this.$store.getters[
        `get${config.action}_prod_date`
      ]

      let service_labels = [...new Set([...Object.keys(jsons[config.action])])]

      let labels = [
        ...new Set([
          ...service_labels.flatMap(label =>
            Object.keys(jsons[config.action][label])
          )
        ])
      ]

      const getData = label => {
        const data = []
        labels.forEach(date => {
          let data_1 = 0
          for (let operator in jsons[config.action][label][date]) {
            const {instagram = {count: 0}, youtube = {count: 0}} =
              jsons[config.action][label][date][operator] || {}
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
    },
    async getListPosts() {
      this.tables.posts.loading = true
      const [start_date, end_date] = this.dates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }

      const jsons = {}
      await this.$store.dispatch('request_post_ordered', config)

      jsons[config.action] = this.$store.getters[
        `get_post_ordered_${config.action}`
      ]

      this.tables.posts.items = jsons[config.action]
      this.tables.posts.loading = false
    },
    async getListVideo() {
      this.tables.video.loading = true
      const [start_date, end_date] = this.dates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }

      const jsons = {}
      await this.$store.dispatch('request_video_ordered', config)

      jsons[config.action] = this.$store.getters[
        `get_video_ordered_${config.action}`
      ]

      this.tables.video.items = jsons[config.action]
      this.tables.video.loading = false
      // console.dir(data)
    },
    async getCloudWords() {
      this.cloud.loading = true
      const [start_date, end_date] = this.dates

      const config = {
        start: start_date,
        end: end_date
      }

      await this.$store.dispatch('request_word_cloud', config)
      this.cloud.items = this.$store.getters.get_word_cloud.youtube

      this.cloud.loading = false
    },

    async getHorizontalBarYoutube() {
      this.charts.horizontal_bar.youtube.loading = true
      const [start_date, end_date] = this.dates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }

      const jsons = {}
      await this.$store.dispatch('request_yt_ordered', config)

      jsons[config.action] = this.$store.getters[
        `get_yt_ordered_${config.action}`
      ]
      console.log(jsons[config.action])
      const labels = jsons[config.action].map(item => item.channel_name)

      let datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const channel_name = jsons[config.action].find(
            obj => obj.channel_name === label
          )
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
      const [start_date, end_date] = this.dates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }

      const jsons = {}
      await this.$store.dispatch('request_ig_ordered', config)

      jsons[config.action] = this.$store.getters[
        `get_ig_ordered_${config.action}`
      ]
      console.log(jsons[config.action])
      const labels = jsons[config.action].map(item => item.user_name)
      let datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const user_name = jsons[config.action].find(
            obj => obj.user_name === label
          )
          return total + parseFloat(user_name[item] || 0)
        }, 0)
      })
      datasets = datasets.sort((i, j) => j - i)
      console.log(datasets)
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
    },
    async setDataOfVerticalBar() {
      this.charts.vertical_bar.vertical_bar_1.loading = true
      const [start_date, end_date] = this.dates

      const config = {
        action: this.getRequestType.value,
        start: start_date,
        end: end_date
      }

      const jsons = {}
      await this.$store.dispatch('request_prod', config)

      jsons[config.action] = this.$store.getters[`get${config.action}_prod`]

      const labels = Object.keys(jsons[config.action])
      const operators = ['билайн', 'теле2', 'мегафон', 'мтс']
      const colors = ['#F2DC5D', '#0C090D', '#7FC29B', '#EA2B1F']

      const datasets = operators.map((operator, index) => ({
        label: operator,
        backgroundColor: colors[index],
        stack: 1,
        data: labels.map(label => {
          let sum = 0
          if (
            jsons[config.action] &&
            jsons[config.action][label] &&
            jsons[config.action][label][operator] &&
            jsons[config.action][label][operator].youtube
          ) {
            sum += jsons[config.action][label][operator].youtube.count || 0
          }

          if (
            jsons[config.action] &&
            jsons[config.action][label] &&
            jsons[config.action][label][operator] &&
            jsons[config.action][label][operator].instagram
          ) {
            sum += jsons[config.action][label][operator].instagram.count || 0
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
    },

    updateCharts() {
      this.init()
    }
  }
}
</script>

<style scoped lang="sass">
.spacer_1
  width: 200px
.relative
  position: fixed
  top: 80px
  z-index: 1
.total
  height: 100px
  &--red
    background: linear-gradient(45deg,#e55353,#d93737)
</style>
