<template>
  <v-layout class="d-flex pa-4" column>
    <div class="d-flex mx-n2 mb-4 px-2 align-center">
      <h1>Упоминания конкурентов</h1>
      <v-spacer></v-spacer>
      <date-picker
        v-model="date_picker.dates"
        class="date-picker"
        type="date"
        range
        disabled="True"
        value-type="format"
        format="YYYY-MM-DD"
        placeholder="Выберите период"
        confirm
        confirm-text="Применить"
        range-separator=" - "
        :clearable="false"
        @confirm="updateCharts($event)"
      ></date-picker>
    </div>
    <request-types></request-types>
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
            <h2>Мегафон</h2>
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
        </v-card>
      </v-flex>
      <v-flex class="ma-2" md4>
        <v-card
          class="pa-2 elevation-0 d-flex justify-center aling-center"
          style="width: 100%; height: 100%; min-height: 300px"
          disabled="True"
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
        </v-card>
      </v-flex>
      <v-flex class="ma-2" md4>
        <v-card
          class="pa-2 elevation-0 d-flex justify-center aling-center"
          style="width: 100%; height: 100%; min-height: 300px"
          disabled="True"
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
        </v-card>
      </v-flex>
    </div>

    <div class="mb-6 d-flex mx-n2">
      <v-flex class="mx-2" md4>
        <v-card class="pa-2" style="width: 100%; min-height: 300px">
          <h2 class="text-center">Топ каналов YT</h2>
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
        <v-card
          class="pa-2"
          style="width: 100%; min-height: 300px"
          disabled="True"
        >
          <h2 class="text-center">Топ каналов YT</h2>
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
        <v-card
          class="pa-2"
          style="width: 100%; min-height: 300px"
          disabled="True"
        >
          <h2 class="text-center">Топ каналов YT</h2>
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
          <h2 class="text-center">Топ каналов IG</h2>
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
        <v-card
          class="pa-2"
          style="width: 100%; min-height: 300px"
          disabled="True"
        >
          <h2 class="text-center">Топ каналов IG</h2>
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
        <v-card
          class="pa-2"
          style="width: 100%; min-height: 300px"
          disabled="True"
        >
          <h2 class="text-center">Топ каналов IG</h2>
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
              <v-btn
                disabled="disabled"
                class="ml-2"
                color="primary--text"
                icon
              >
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
              <v-btn
                disabled="disabled"
                class="ml-2"
                color="primary--text"
                icon
              >
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
// import VueWordCloud from "vuewordcloud";
import HTTP from '@/api/http'
import wordCloud from 'vue-wordcloud'

import requestTypes from '@/components/request-types'

import {mapGetters} from 'vuex'

// import moment from 'moment'
import DatePicker from 'vue2-datepicker'

// import json_1_5 from '@/assets/chartData/json_1_5.json'
// import json_2_5 from '@/assets/chartData/json_2_5.json'
// import json_3_5 from '@/assets/chartData/json_3_5.json'
//
// import json_1_6 from '@/assets/chartData/json_1_6.json'
// import json_2_6 from '@/assets/chartData/json_2_6.json'
// import json_3_6 from '@/assets/chartData/json_3_6.json'
//
// import json_1_7 from '@/assets/chartData/json_1_7.json'
// import json_2_7 from '@/assets/chartData/json_2_7.json'
// import json_3_7 from '@/assets/chartData/json_3_7.json'

// import json_1_8 from '@/assets/chartData/json_1_8.json'
// import json_2_8 from '@/assets/chartData/json_2_8.json'
// import json_3_8 from '@/assets/chartData/json_3_8.json'

import json_1_9 from '@/assets/chartData/json_1_9.json'
import json_2_9 from '@/assets/chartData/json_2_9.json'
import json_3_9 from '@/assets/chartData/json_3_9.json'

import json_1_10 from '@/assets/chartData/json_1_10.json'
import json_2_10 from '@/assets/chartData/json_2_10.json'
import json_3_10 from '@/assets/chartData/json_3_10.json'

import json_1_11 from '@/assets/chartData/json_1_11.json'
import json_2_11 from '@/assets/chartData/json_2_11.json'
import json_3_11 from '@/assets/chartData/json_3_11.json'

import json_1_12 from '@/assets/chartData/json_1_12.json'
import json_2_12 from '@/assets/chartData/json_2_12.json'
import json_3_12 from '@/assets/chartData/json_3_12.json'

import json_1_13 from '@/assets/chartData/json_1_13.json'

export default {
  components: {
    horizontalBarChart,
    // [VueWordCloud.name]: VueWordCloud
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
    date_picker: {
      dates: [
        // moment()
        //   .subtract(1, 'months')
        //   .format('YYYY-MM-DD'),
        // moment().format('YYYY-MM-DD')
        '2020-01-01',
        '2020-02-01'
      ]
    },
    charts: {
      horizontal_bar: {
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
          failed: true,
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
          disabled: true,
          failed: true,
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
          disabled: true,
          failed: true,
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
          disabled: true,
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
          disabled: true,
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
    ...mapGetters(['getRequestType'])
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
    init() {
      const horizontalBarDatas = [
        {
          url: `channel/beeline/${this.getRequestType.value}`,
          column: 'channel_name',
          prop: 'channel_beeline',
          platform: 'youtube',
          field: 'channel_name'
        },
        {
          url: `channel/mts/${this.getRequestType.value}`,
          column: 'channel_name',
          prop: 'channel_mts',
          platform: 'youtube',
          field: 'channel_name'
        },
        {
          url: `channel/tele2/${this.getRequestType.value}`,
          column: 'channel_name',
          prop: 'channel_tele2',
          platform: 'youtube',
          field: 'channel_name'
        },
        {
          url: `user/beeline/${this.getRequestType.value}`,
          column: 'user_name',
          prop: 'user_beeline',
          platform: 'instagram',
          field: 'user_name'
        },
        {
          url: `user/mts/${this.getRequestType.value}`,
          column: 'user_name',
          prop: 'user_mts',
          platform: 'instagram',
          field: 'user_name'
        },
        {
          url: `user/tele2/${this.getRequestType.value}`,
          column: 'user_name',
          prop: 'user_tele2',
          platform: 'instagram',
          field: 'user_name'
        }
      ]
      horizontalBarDatas.forEach(item => {
        this.getHorizontalBarData(item)
      })

      // const countMentions = ['beeline', 'mts', 'tele2']
      // countMentions.forEach(url => {
      //   this.getSumMentions(url)
      // })

      const cloudWords = ['beeline', 'mts', 'tele2']
      cloudWords.forEach(url => {
        this.getCloudWords(url)
      })

      const tables = ['beeline', 'mts', 'tele2']
      tables.forEach(operator => {
        this.getListPosts(operator)
        this.getListVideo(operator)
      })
    },
    async getHorizontalBarData({prop, platform, field}) {
      this.charts.horizontal_bar[prop].loading = true
      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `list/${url}?start_date=${start_date}&end_date=${end_date}`
      // )
      // const prop = url.replace(/(\w+)\/(\w+)\/(\w+)/, '$1_$2')
      // const labels = data.map(item => item[column])
      // const datasets = data.map(item => item.mentions)

      const jsons = {
        youtube: {
          mentions: json_1_11,
          views: json_2_11,
          comments: json_3_11
        },
        instagram: {
          mentions: json_1_12,
          views: json_2_12,
          comments: json_3_12
        }
      }

      const labels = jsons[platform][this.getRequestType.value].map(
        item => item[field]
      )
      const datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const obj = jsons[platform][this.getRequestType.value].find(
            obj => obj[field] === label
          )
          return total + parseFloat(obj[item] || 0)
        }, 0)
      })

      this.charts.horizontal_bar[prop].data = {
        labels,
        datasets: [
          {
            label: this.getRequestType.value,
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      }

      this.charts.horizontal_bar[prop].loading = false
    },
    async getSumMentions(url) {
      const [start_date, end_date] = this.date_picker.dates
      const {data} = await HTTP.get(
        `count/mentions/${url}?start_date=${start_date}&end_date=${end_date}`
      )
      const sumMentions = Object.values(data).reduce(
        (sum, item) => sum + item,
        0
      )
      this.count_mentions[url] = sumMentions
    },
    async getCloudWords(url) {
      this.cloud[url].loading = true

      this.cloud.mts.items = [...json_1_13.youtube]
      this.cloud.beeline.items = [...json_1_13.youtube]
      this.cloud.tele2.items = [...json_1_13.youtube]

      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `wordcloud?brand=${url}&start_date=${start_date}&end_date=${end_date}`
      // )
      // this.cloud[url].items = data.slice(0, 100)
      this.cloud[url].loading = false
    },
    async getListPosts(operator) {
      this.tables.posts[operator].loading = true

      const jsons = {
        mentions: json_1_10,
        views: json_2_10,
        comments: json_3_10
      }

      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `list/post/${operator}/${this.getRequestType.value}?start_date=${start_date}&end_date=${end_date}`
      // ).catch(() => (this.tables.posts[operator].failed = true))

      this.tables.posts[operator].items = [...jsons[this.getRequestType.value]]
      this.tables.posts[operator].loading = false
    },
    async getListVideo(operator) {
      this.tables.video[operator].loading = true

      const jsons = {
        mentions: json_1_9,
        views: json_2_9,
        comments: json_3_9
      }

      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `list/video/${operator}/${this.getRequestType.value}?start_date=${start_date}&end_date=${end_date}`
      // ).catch(() => (this.tables.video[operator].failed = true))

      this.tables.video[operator].items = [...jsons[this.getRequestType.value]]
      this.tables.video[operator].loading = false
    },
    updateCharts() {
      this.init()
    }
  }
}
</script>

<style scoped lang="sass">
.total
    height: 100

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
