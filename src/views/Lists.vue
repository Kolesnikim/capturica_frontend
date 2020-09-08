<template>
  <v-layout class="pa-4 mx-n2" style="margin-top: -140px" wrap>
    <v-flex class="px-2" md6>
      <v-card class="pa-2 mb-4" style="width: 100%">
        <div class="d-flex justify-center align-center">
          <h2 class="text-center">Видео в YT</h2>
          <v-btn @click="export_yt" class="ml-2" color="primary--text" icon>
            <v-icon class="">mdi-download</v-icon>
          </v-btn>
        </div>

        <v-data-table
          :headers="tables.video.headers"
          :items="tables.video.items"
          :items-per-page="15"
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
          <h2 class="text-center">Посты в IG</h2>
          <v-btn @click="export_ig" class="ml-2" color="primary--text" icon>
            <v-icon class="">mdi-download</v-icon>
          </v-btn>
        </div>
        <v-data-table
          :headers="tables.posts.headers"
          :items="tables.posts.items"
          :items-per-page="15"
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
import HTTP from '@/api/http'

export default {
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
        headers: [
          {
            text: 'Имя пользователя',
            align: 'left',
            sortable: false,
            value: 'user_name'
          },
          {text: 'Описание', value: 'description'},
          {text: 'Ссылка', value: 'ig_post_id'},
          {text: 'Просмотры', value: 'views'},
          {text: 'Лайки', value: 'likes'},
          {text: 'Комментариев', value: 'comments'}
        ],
        items: [],
        loading: true
      },
      video: {
        headers: [
          {
            text: 'Название канала',
            align: 'left',
            sortable: false,
            value: 'channel_name'
          },
          {text: 'Название', value: 'title'},
          {text: 'Ссылка', value: 'yt_video_id'},
          {text: 'Охват', value: 'views'},
          {text: 'Вовлечения', value: 'comments'},
          {text: 'Упоминания', value: 'mentions'}
        ],
        items: [],
        loading: true
      }
    }
  }),

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.getListPosts()
      this.getListVideo()
    },
    async getListPosts() {
      const params = this.$route.query
      const brandOrProd = params.brand ? 'brand' : 'product'
      const {data} = await HTTP.get(
        `megafon/post?${brandOrProd}=${params[brandOrProd]}&start_date=${params.start_date}&end_date=${params.end_date}`
      )
      this.tables.posts.items = data
      this.tables.posts.loading = false
    },
    async getListVideo() {
      const params = this.$route.query
      const brandOrProd = params.brand ? 'brand' : 'product'

      let sentiment = params.sentiment
      let sentimentStr = ''
      if (sentiment) sentimentStr = `&sentiment=${sentiment}`

      const {data} = await HTTP.get(
        `megafon/video?${brandOrProd}=${params[brandOrProd]}&start_date=${params.start_date}&end_date=${params.end_date}${sentimentStr}`
      )
      this.tables.video.items = data
      this.tables.video.loading = false
      // console.dir(data)
    }
  }
}
</script>
