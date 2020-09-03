<template>
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
                <td :key="header.value" v-for="header in tables.video.headers">
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
                <td :key="header.value" v-for="header in tables.posts.headers">
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
</template>

<script>
import {mapGetters} from 'vuex'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  name: 'tables-posts-videos',
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
    path: '',
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
    async request_video_ordered_exp() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value
      let route = ''

      if (this.path === 'general') {
        route = `megafon/video?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/video?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/video?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }

      await http.get(route).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async request_post_ordered_exp() {
      const [start, end] = this.getDates
      const action = this.getRequestType.value
      let route = ''

      if (this.path === 'general') {
        route = `megafon/post?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/post?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/post?brand=мегафон&order_by=${action}&start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }

      await http.get(route).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      this.getListPosts()
      this.getListVideo()
    },
    async getListPosts() {
      this.tables.posts.loading = true

      let apiData = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_post_ordered')
        apiData = this.$store.getters[`get_post_ordered_count`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_post_ordered')
        apiData = this.$store.getters[`posit_get_post_ordered_count`]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_post_ordered')
        apiData = this.$store.getters[`negat_get_post_ordered_count`]
      }

      this.tables.posts.items = apiData
      this.tables.posts.loading = false
    },
    async getListVideo() {
      this.tables.video.loading = true

      let apiData = {}

      if (this.path === 'general') {
        await this.$store.dispatch('request_video_ordered')
        apiData = this.$store.getters[`get_video_ordered_count`]
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_video_ordered')
        apiData = this.$store.getters[`posit_get_video_ordered_count`]
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_video_ordered')
        apiData = this.$store.getters[`negat_get_video_ordered_count`]
      }

      this.tables.video.items = apiData
      this.tables.video.loading = false
    }
  }
}
</script>

<style scoped></style>
