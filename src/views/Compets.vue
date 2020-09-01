<template>
  <v-layout class="d-flex pa-4" column>
    <v-card class="mb-6">
      <v-app-bar dense flat tile class="relative">
        <div class="spacer_1"></div>
        <h1>Упоминания конкурентов</h1>
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
      <v-flex class="mx-2" md4>
        <v-card class="total total--blue" style="background: #639FF8">
          <v-layout
            class="justify-center align-center white--text"
            column
            fill-height
          >
            <h2>Билайн</h2>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex class="mx-2" md4>
        <v-card class="total total--red" style="background: #639FF8">
          <v-layout
            class="justify-center align-center white--text"
            column
            fill-height
          >
            <h2>МТС</h2>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex class="mx-2" md4>
        <v-card class="total total--red" style="background: #639FF8">
          <v-layout
            class="justify-center align-center white--text"
            column
            fill-height
          >
            <h2>Теле2</h2>
          </v-layout>
        </v-card>
      </v-flex>
    </div>
    <div class="d-flex mx-n2 mb-4">
      <v-flex class="ma-2" md4>
        <v-card
          class="pa-2 elevation-0 d-flex justify-center aling-center"
          style="width: 100%; height: 100%; min-height: 300px"
        >
          <word-cloud
            :color="cloud.beeline.color"
            :data="cloud.beeline.items"
            :margin="{top: 0, right: 0, bottom: 0, left: 0}"
            :rotate="{from: -0, to: 0, numOfOrientation: 0}"
            :showTooltip="false"
            :wordPadding="2"
            nameKey="word"
            v-if="!cloud.beeline.loading"
            valueKey="count"
          >
          </word-cloud>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            style="height: 100%"
            v-if="cloud.beeline.loading"
          ></v-progress-circular>
          <div class="float-right">
            <v-btn
              class="ml-2"
              color="primary--text"
              icon
              @click="export_wordcloud_beeline"
            >
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-flex>
      <v-flex class="ma-2" md4>
        <v-card
          class="pa-2 elevation-0 d-flex justify-center aling-center"
          style="width: 100%; height: 100%; min-height: 300px"
        >
          <word-cloud
            :color="cloud.mts.color"
            :data="cloud.mts.items"
            :margin="{top: 0, right: 0, bottom: 0, left: 0}"
            :rotate="{from: -0, to: 0, numOfOrientation: 0}"
            :showTooltip="false"
            :wordPadding="2"
            nameKey="word"
            v-if="!cloud.mts.loading"
            valueKey="count"
          >
          </word-cloud>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            style="height: 100%"
            v-if="cloud.mts.loading"
          ></v-progress-circular>
          <div class="float-right">
            <v-btn
              class="ml-2"
              color="primary--text"
              icon
              @click="export_wordcloud_mts"
            >
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-flex>
      <v-flex class="ma-2" md4>
        <v-card
          class="pa-2 elevation-0 d-flex justify-center aling-center"
          style="width: 100%; height: 100%; min-height: 300px"
        >
          <word-cloud
            :color="cloud.tele2.color"
            :data="cloud.tele2.items"
            :margin="{top: 0, right: 0, bottom: 0, left: 0}"
            :rotate="{from: -0, to: 0, numOfOrientation: 0}"
            :showTooltip="false"
            :wordPadding="2"
            nameKey="word"
            v-if="!cloud.tele2.loading"
            valueKey="count"
          >
          </word-cloud>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            style="height: 100%"
            v-if="cloud.tele2.loading"
          ></v-progress-circular>
          <div class="float-right">
            <v-btn
              class="ml-2"
              color="primary--text"
              icon
              @click="export_wordcloud_tele2"
            >
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </div>

    <div class="mb-6 d-flex mx-n2">
      <v-flex class="mx-2" md4>
        <v-card class="pa-2" style="width: 100%; min-height: 300px">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Топ каналов YT</h2>
            <v-btn class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>

          <horizontal-bar-chart
            :chart-data="charts.horizontal_bar.channel_beeline.data"
            v-if="!charts.horizontal_bar.channel_beeline.loading"
          ></horizontal-bar-chart>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            v-if="charts.horizontal_bar.channel_beeline.loading"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex class="mx-2" md4>
        <v-card class="pa-2" style="width: 100%; min-height: 300px">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Топ каналов YT</h2>
            <v-btn class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>

          <horizontal-bar-chart
            :chart-data="charts.horizontal_bar.channel_mts.data"
            v-if="!charts.horizontal_bar.channel_mts.loading"
          ></horizontal-bar-chart>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            v-if="charts.horizontal_bar.channel_mts.loading"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex class="mx-2" md4>
        <v-card class="pa-2" style="width: 100%; min-height: 300px">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Топ каналов YT</h2>
            <v-btn class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>

          <horizontal-bar-chart
            :chart-data="charts.horizontal_bar.channel_tele2.data"
            v-if="!charts.horizontal_bar.channel_tele2.loading"
          ></horizontal-bar-chart>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            v-if="charts.horizontal_bar.channel_tele2.loading"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <div class="mb-6 d-flex mx-n2">
      <v-flex class="mx-2" md4>
        <v-card class="pa-2" style="width: 100%; min-height: 300px">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Топ каналов IG</h2>
            <v-btn class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>

          <horizontal-bar-chart
            :chart-data="charts.horizontal_bar.user_beeline.data"
            v-if="!charts.horizontal_bar.user_beeline.loading"
          ></horizontal-bar-chart>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            v-if="charts.horizontal_bar.user_beeline.loading"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex class="mx-2" md4>
        <v-card class="pa-2" style="width: 100%; min-height: 300px">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Топ каналов IG</h2>
            <v-btn class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>

          <horizontal-bar-chart
            :chart-data="charts.horizontal_bar.user_mts.data"
            v-if="!charts.horizontal_bar.user_mts.loading"
          ></horizontal-bar-chart>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            v-if="charts.horizontal_bar.user_mts.loading"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex class="mx-2" md4>
        <v-card class="pa-2" style="width: 100%; min-height: 300px">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Топ каналов IG</h2>
            <v-btn class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>

          <horizontal-bar-chart
            :chart-data="charts.horizontal_bar.user_tele2.data"
            v-if="!charts.horizontal_bar.user_tele2.loading"
          ></horizontal-bar-chart>
          <v-progress-circular
            color="#639FF8"
            indeterminate
            size="48"
            v-if="charts.horizontal_bar.user_tele2.loading"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <div class="d-flex mx-n2 mb-4" wrap>
      <v-flex
        class="px-2"
        md4
        v-for="(name, i) in ['beeline', 'mts', 'tele2']"
        :key="i"
        wrap
      >
        <template>
          <v-card
            class="pa-2 mb-4"
            style="width: 100%"
            :disabled="tables.video[name].disabled"
          >
            <div class="d-flex justify-center align-center">
              <h2 class="text-center">Список упоминаний в видео</h2>
              <v-btn class="ml-2" color="primary--text" icon>
                <v-icon class="">mdi-download</v-icon>
              </v-btn>
            </div>
            <v-data-table
              :headers="tables.video[name].headers"
              :items="tables.video[name].items"
              :items-per-page="5"
              :loading="tables.video[name].loading"
              class="elevation-0 transparent"
              loading-text="Загрузка..."
            >
              <template v-slot:body="{items}">
                <tbody>
                  <tr :key="item.link" v-for="item in items">
                    <td
                      :key="header.value"
                      v-for="header in tables.video[name].headers"
                    >
                      <a
                        :href="item[header.value]"
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
        </template>
      </v-flex>
    </div>

    <div class="d-flex mx-n2 mb-4" wrap>
      <v-flex
        class="px-2"
        md4
        v-for="(name, i) in ['beeline', 'mts', 'tele2']"
        :key="i"
        wrap
      >
        <template>
          <v-card
            class="pa-2 mb-4"
            style="width: 100%"
            :disabled="tables.video[name].disabled"
          >
            <div class="d-flex justify-center align-center">
              <h2 class="text-center">Список упоминаний в постах</h2>
              <v-btn class="ml-2" color="primary--text" icon>
                <v-icon class="">mdi-download</v-icon>
              </v-btn>
            </div>

            <v-data-table
              :headers="tables.posts[name].headers"
              :items="tables.posts[name].items"
              :items-per-page="5"
              :loading="tables.posts[name].loading"
              class="elevation-0 transparent"
              loading-text="Загрузка..."
            >
              <template v-slot:body="{items}">
                <tbody>
                  <tr :key="item.link" v-for="item in items">
                    <td
                      :key="header.value"
                      v-for="header in tables.posts[name].headers"
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
        </template>
      </v-flex>
    </div>
  </v-layout>
</template>

<script>
import horizontalBarChart from '@/components/charts/horizontalBar.js'

import HTTP from '@/api/http'
import wordCloud from 'vue-wordcloud'

import requestTypes from '@/components/request-types'

import {mapGetters} from 'vuex'

// import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  components: {
    horizontalBarChart,
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
      horizontal_bar: {
        mentions: {
          title: 'Упоминания'
        },
        reach: {
          title: 'Охват'
        },
        impressions: {
          title: 'Вовлеченность'
        },
        channel_beeline: {
          loading: true,
          data: {},
          options: null
        },
        channel_mts: {
          loading: true,
          data: {},
          options: null
        },
        channel_tele2: {
          loading: true,
          data: {},
          options: null
        },
        user_beeline: {
          loading: true,
          data: {},
          options: null
        },
        user_mts: {
          loading: true,
          data: {},
          options: null
        },
        user_tele2: {
          loading: true,
          data: {},
          options: null
        }
      }
    },
    count_mentions: {
      beeline: 0,
      mts: 0,
      tele2: 0
    },
    cloud: {
      beeline: {
        color: ['#639FF8'],
        loading: true,
        items: []
      },
      mts: {
        color: ['#639FF8'],
        loading: true,
        items: []
      },
      tele2: {
        color: ['#639FF8'],
        loading: true,
        items: []
      }
    },
    tables: {
      posts: {
        beeline: {
          disabled: false,
          failed: false,
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
        mts: {
          disabled: false,
          failed: false,
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
        tele2: {
          disabled: false,
          failed: false,
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
          ]
        }
      },
      video: {
        beeline: {
          disabled: false,
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
        },
        mts: {
          disabled: false,
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
        },
        tele2: {
          disabled: false,
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

  mounted() {
    this.init()
  },
  watch: {
    getRequestType() {
      this.init()
    }
  },

  methods: {
    async export_wordcloud_beeline() {
      const [start, end] = this.dates
      await http
        .get(
          `megafon/wordcloud?brand=билайн&start_date=${start}&end_date=${end}&export_format=csv`,
          {
            responseType: 'blob'
          }
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async export_wordcloud_mts() {
      const [start, end] = this.dates
      await http
        .get(
          `megafon/wordcloud?brand=мтс&start_date=${start}&end_date=${end}&export_format=csv`,
          {
            responseType: 'blob'
          }
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async export_wordcloud_tele2() {
      const [start, end] = this.dates
      await http
        .get(
          `megafon/wordcloud?brand=теле2&start_date=${start}&end_date=${end}&export_format=csv`,
          {
            responseType: 'blob'
          }
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    init() {
      const horizontalBarDatas = [
        {
          operator: 'билайн',
          column: 'channel_name',
          prop: 'channel_beeline',
          platform: 'youtube',
          field: 'channel_name',
          type: 'channel',
          operatorEng: 'beeline'
        },
        {
          operator: 'мтс',
          column: 'channel_name',
          prop: 'channel_mts',
          platform: 'youtube',
          field: 'channel_name',
          type: 'channel',
          operatorEng: 'mts'
        },
        {
          operator: 'теле2',
          column: 'channel_name',
          prop: 'channel_tele2',
          platform: 'youtube',
          field: 'channel_name',
          type: 'channel',
          operatorEng: 'tele2'
        },
        {
          operator: 'билайн',
          column: 'user_name',
          prop: 'user_beeline',
          platform: 'instagram',
          field: 'user_name',
          type: 'user',
          operatorEng: 'beeline'
        },
        {
          operator: 'мтс',
          column: 'user_name',
          prop: 'user_mts',
          platform: 'instagram',
          field: 'user_name',
          type: 'user',
          operatorEng: 'mts'
        },
        {
          operator: 'теле2',
          column: 'user_name',
          prop: 'user_tele2',
          platform: 'instagram',
          field: 'user_name',
          type: 'user',
          operatorEng: 'tele2'
        }
      ]
      horizontalBarDatas.forEach(item => {
        this.getHorizontalBarData(item)
      })

      const cloudWords = [
        {operatorRus: 'билайн', operatorEng: 'beeline'},
        {operatorRus: 'мтс', operatorEng: 'mts'},
        {operatorRus: 'теле2', operatorEng: 'tele2'}
      ]
      cloudWords.forEach(operator => {
        this.getCloudWords(operator)
      })

      const tables = [
        {operatorRus: 'билайн', operatorEng: 'beeline'},
        {operatorRus: 'мтс', operatorEng: 'mts'},
        {operatorRus: 'теле2', operatorEng: 'tele2'}
      ]
      tables.forEach(operator => {
        this.getListPosts(operator)
        this.getListVideo(operator)
      })
    },
    async getHorizontalBarData({prop, field, operator, type, operatorEng}) {
      this.charts.horizontal_bar[prop].loading = true
      const [start_date, end_date] = this.$store.getters.getDates
      const config = {
        start: start_date,
        end: end_date,
        action: this.getRequestType.value,
        type,
        operator,
        operatorEng
      }
      await this.$store.dispatch('request_bar_charts', config)
      const data = this.$store.getters[
        `get_horizontal_bar_${operatorEng}_${type}`
      ]
      const labels = data.map(item => item[field])

      const datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const obj = data.find(obj => obj[field] === label)
          return total + parseFloat(obj[item] || 0)
        }, 0)
      })

      this.charts.horizontal_bar[prop].data = {
        labels,
        datasets: [
          {
            label: this.charts.horizontal_bar[this.getRequestType.value].title,
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      }

      this.charts.horizontal_bar[prop].loading = false
    },
    async getSumMentions(url) {
      const [start_date, end_date] = this.dates
      const {data} = await HTTP.get(
        `count/mentions/${url}?start_date=${start_date}&end_date=${end_date}`
      )
      const sumMentions = Object.values(data).reduce(
        (sum, item) => sum + item,
        0
      )
      this.count_mentions[url] = sumMentions
    },
    async getCloudWords({operatorRus, operatorEng}) {
      this.cloud[operatorEng].loading = true

      const [start, end] = this.dates

      const config = {
        start,
        end,
        operatorRus,
        operatorEng
      }
      await this.$store.dispatch('request_cloud_word', config)
      const data = this.$store.getters[`get_wordcloud_${operatorEng}`]
      this.cloud[operatorEng].items = data.youtube
      this.cloud[operatorEng].loading = false
    },

    async getListPosts(operator) {
      this.tables.posts[operator.operatorEng].loading = true

      const [start, end] = this.dates
      const config = {start, end, action: this.getRequestType.value, operator}
      await this.$store.dispatch('request_posts', config)
      const data = this.$store.getters[`get_posts_${operator.operatorEng}`]

      this.tables.posts[operator.operatorEng].items = data
      this.tables.posts[operator.operatorEng].loading = false
    },
    async getListVideo(operator) {
      this.tables.video[operator.operatorEng].loading = true
      const [start, end] = this.dates

      const config = {start, end, action: this.getRequestType.value, operator}
      await this.$store.dispatch('request_video', config)
      const data = this.$store.getters[`get_video_${operator.operatorEng}`]

      this.tables.video[operator.operatorEng].items = data
      this.tables.video[operator.operatorEng].loading = false
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
    height: 100%

    // &--blue
    // background: #B35041
    &--red
        background: linear-gradient(45deg, #e55353, #d93737)

.input__multi
  margin: 0
  padding: 0

.input__multi ::v-deep .v-input__slot
  border: solid 1px grey
  border-radius: 4px
  &::before
    // background: red
    border: none !important
</style>
