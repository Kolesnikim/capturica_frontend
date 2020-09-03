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
    <vertical-bar1></vertical-bar1>
    <line2></line2>
    <word-cloud1></word-cloud1>
    <horizontal-bars-yt-ig></horizontal-bars-yt-ig>

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
import requestTypes from '@/components/request-types'

import horizontalBar1 from '@/components/horizontalBarCharts/horizontal-bar-1'
import horizontalBar2 from '@/components/horizontalBarCharts/horizontal-bar-2'
import line134 from '@/components/lineCharts/line-1-3-4'
import line2 from '@/components/lineCharts/line-2'
import verticalBar1 from '@/components/verticalBars/vertical-bar-1'
import wordCloud1 from '@/components/wordcloudCharts/word-cloud-1'
import horizontalBarsYtIg from '@/components/horizontalBarCharts/horizontal-bars-yt-ig'

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
    line2,
    verticalBar1,
    horizontalBarsYtIg,
    wordCloud1,
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
      this.getListPosts()
      this.getListVideo()
    },
    // updateProgress(e) {
    //   console.log(e)
    // },
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
