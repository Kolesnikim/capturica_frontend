<template>
  <v-layout class="d-flex pa-4" column>
    <v-card class="mb-6">
      <v-app-bar dense flat tile class="relative">
        <div class="spacer_1"></div>
        <h1>Упоминания конкурентов</h1>
        <v-spacer></v-spacer>
        <date-picker-container></date-picker-container>
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
    <word-cloud-compets></word-cloud-compets>
    <horizontal-bar-channels-compets></horizontal-bar-channels-compets>
    <horizontal-bar-user-compets></horizontal-bar-user-compets>

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
                class="ml-2"
                color="primary--text"
                icon
                @click="export_table_video(name)"
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
                class="ml-2"
                color="primary--text"
                icon
                @click="export_table_post(name)"
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
import HTTP from '@/api/http'
import wordCloudCompets from '@/components/wordcloudCharts/word-cloud-compets'
import horizontalBarChannelsCompets from '@/components/horizontalBarCharts/horizontal-bars-channel-compets'
import horizontalBarUserCompets from '@/components/horizontalBarCharts/horizontal-bars-user-compets'

import requestTypes from '@/components/request-types'

import {mapGetters} from 'vuex'

// import moment from 'moment'
import DatePickerContainer from '@/components/date-picker-container'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  components: {
    wordCloudCompets,
    horizontalBarChannelsCompets,
    horizontalBarUserCompets,
    requestTypes,
    DatePickerContainer
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
    operators: [{beeline: 'билайн'}, {mts: 'мтс'}, {tele2: 'теле2'}],
    count_mentions: {
      beeline: 0,
      mts: 0,
      tele2: 0
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
    async export_table_video(operator) {
      const [start, end] = this.dates
      const action = this.getRequestType.value

      let operatorQuery = ''
      operatorQuery = operator === 'beeline' ? 'билайн' : ''
      operatorQuery = operator === 'mts' ? 'мтс' : ''
      operatorQuery = operator === 'tele2' ? 'теле2' : ''

      await http
        .get(
          `megafon/video?brand=${operatorQuery}&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    async export_table_post(operator) {
      const [start, end] = this.dates
      const action = this.getRequestType.value

      let operatorQuery = ''
      operatorQuery = operator === 'beeline' ? 'билайн' : ''
      operatorQuery = operator === 'mts' ? 'мтс' : ''
      operatorQuery = operator === 'tele2' ? 'теле2' : ''

      await http
        .get(
          `megafon/post?brand=${operatorQuery}&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
        )
        .then(response => {
          fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
        })
    },
    init() {
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
