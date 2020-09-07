<template>
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
</template>

<script>
import wordCloud from 'vue-wordcloud'
import {mapGetters} from 'vuex'
import http from '@/api/http'
import * as fileDownload from 'js-file-download'

export default {
  name: 'word-cloud1',
  components: {
    wordCloud
  },
  data: () => ({
    path: '',
    cloud: {
      items: [],
      loading: true,
      color: ['#639FF8']
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
    async getRequestType() {
      await this.init()
    },
    async getDates() {
      await this.init()
    }
  },
  methods: {
    async export_wordcloud() {
      const [start, end] = this.getDates
      let route = ''

      if (this.path === 'general') {
        route = `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}&export_format=csv`
      } else if (this.path === 'positive') {
        route = `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}&export_format=csv&sentiment=positive`
      } else if (this.path === 'negative') {
        route = `megafon/wordcloud?brand=мегафон&start_date=${start}&end_date=${end}&export_format=csv&sentiment=negative`
      }

      await http.get(route).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      await this.getCloudWords()
    },
    async getCloudWords() {
      this.cloud.loading = true
      const [start_date, end_date] = this.getDates

      const config = {
        start: start_date,
        end: end_date
      }

      if (this.path === 'general') {
        await this.$store.dispatch('request_word_cloud', config)
      } else if (this.path === 'positive') {
        await this.$store.dispatch('posit_request_word_cloud', config)
      } else if (this.path === 'negative') {
        await this.$store.dispatch('negat_request_word_cloud', config)
      }

      this.cloud.items = this.$store.getters.get_word_cloud.youtube
      this.cloud.loading = false
    }
  }
}
</script>

<style scoped></style>
