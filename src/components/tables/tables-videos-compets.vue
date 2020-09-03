<template>
  <div class="d-flex mx-n2 mb-4" wrap>
    <v-flex
      class="px-2"
      md4
      v-for="(operator, i) in tables.video"
      :key="i"
      wrap
    >
      <template>
        <v-card
          class="pa-2 mb-4"
          style="width: 100%"
          :disabled="operator.disabled"
        >
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">Список упоминаний в видео</h2>
            <v-btn
              class="ml-2"
              color="primary--text"
              icon
              @click="export_table_video(operator.rus)"
            >
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
          <v-data-table
            :headers="operator.headers"
            :items="operator.items"
            :items-per-page="5"
            :loading="operator.loading"
            class="elevation-0 transparent"
            loading-text="Загрузка..."
          >
            <template v-slot:body="{items}">
              <tbody>
                <tr :key="item.link" v-for="item in items">
                  <td :key="header.value" v-for="header in operator.headers">
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
</template>

<script>
import http from '@/api/http'
import fileDownload from 'js-file-download'
import {mapGetters} from 'vuex'

export default {
  name: 'tables-videos-compets',
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
    tables: {
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
          loading: true,
          rus: 'билайн'
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
          loading: true,
          rus: 'мтс'
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
          loading: true,
          rus: 'теле2'
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
    async export_table_video(operator) {
      console.log(operator)
      const [start, end] = this.dates
      const action = this.getRequestType.value

      await http
        .get(
          `megafon/video?brand=${operator}&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
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
        this.getListVideo(operator)
      })
    },
    async getListVideo(operator) {
      this.tables.video[operator.operatorEng].loading = true

      await this.$store.dispatch('request_video', operator)
      const data = this.$store.getters[`get_video_${operator.operatorEng}`]

      this.tables.video[operator.operatorEng].items = data
      this.tables.video[operator.operatorEng].loading = false
    }
  }
}
</script>

<style scoped></style>
