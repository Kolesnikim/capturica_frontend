<template>
  <div class="d-flex mx-n2 mb-4" wrap>
    <v-flex
      class="px-2"
      md4
      v-for="(operator, i) in tables.posts"
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
            <h2 class="text-center">Список упоминаний в постах</h2>
            <v-btn
              class="ml-2"
              color="primary--text"
              icon
              @click="export_table_post(operator.rus)"
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
</template>

<script>
import http from '@/api/http'
import fileDownload from 'js-file-download'
import {mapGetters} from 'vuex'

export default {
  name: 'tables-posts-compets',
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
          loading: true,
          rus: 'билайн'
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
          loading: true,
          rus: 'мтс'
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
    async export_table_post(operator) {
      const [start, end] = this.dates
      const action = this.getRequestType.value

      await http
        .get(
          `megafon/post?brand=${operator}&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
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
      })
    },
    async getListPosts(operator) {
      this.tables.posts[operator.operatorEng].loading = true

      await this.$store.dispatch('request_posts', operator)
      const data = this.$store.getters[`get_posts_${operator.operatorEng}`]

      this.tables.posts[operator.operatorEng].items = data
      this.tables.posts[operator.operatorEng].loading = false
    }
  }
}
</script>

<style scoped></style>
