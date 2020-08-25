<template>
  <v-layout class="pa-4 mx-n2" wrap>
    <v-flex class="px-2" md6>
      <v-card class="pa-2 mb-4" style="width: 100%">
        <h2 class="text-center">Список упоминаний в постах</h2>
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
                    v-if="header.value === 'link'"
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
        <h2 class="text-center">Список упоминаний в видео</h2>
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
                    :href="item[header.value]"
                    v-if="header.value === 'link'"
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
            text: 'user_name',
            align: 'left',
            sortable: false,
            value: 'user_name'
          },
          {text: 'Description', value: 'description'},
          {text: 'Published', value: 'published'},
          {text: 'Link', value: 'link'}
        ],
        items: [],
        loading: true
      },
      video: {
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {text: 'Title', value: 'title'},
          {text: 'Published', value: 'published'},
          {text: 'Link', value: 'link'},
          {text: 'Mentions', value: 'mentions'}
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
      const {data} = await HTTP.get(
        `megafon/post?brand=${params.brand}&start_date=${params.start_date}&end_date=${params.end_date}`
      )
      console.log(data)
      this.tables.posts.items = data
      this.tables.posts.loading = false
      // console.dir(data)
    },
    async getListVideo() {
      const params = this.$route.query
      const {data} = await HTTP.get(
        `megafon/video?brand=${params.brand}&start_date=${params.start_date}&end_date=${params.end_date}`
      )
      this.tables.video.items = data
      this.tables.video.loading = false
      // console.dir(data)
    }
  }
}
</script>
