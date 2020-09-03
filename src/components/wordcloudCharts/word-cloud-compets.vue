<template>
  <div class="d-flex mx-n2 mb-4">
    <v-flex class="ma-2" md4 v-for="(operator, idx) in cloud" :key="idx">
      <v-card
        class="pa-2 elevation-0 d-flex justify-center aling-center"
        style="width: 100%; height: 100%; min-height: 300px"
      >
        <word-cloud
          :color="operator.color"
          :data="operator.items"
          :margin="{top: 0, right: 0, bottom: 0, left: 0}"
          :rotate="{from: -0, to: 0, numOfOrientation: 0}"
          :showTooltip="false"
          :wordPadding="2"
          nameKey="word"
          v-if="!operator.loading"
          valueKey="count"
        >
        </word-cloud>
        <v-progress-circular
          color="#639FF8"
          indeterminate
          size="48"
          style="height: 100%"
          v-if="operator.loading"
        ></v-progress-circular>
        <div class="float-right">
          <v-btn
            class="ml-2"
            color="primary--text"
            icon
            @click="export_wordcloud_operator(operator.rus)"
          >
            <v-icon class="">mdi-download</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import wordCloud from 'vue-wordcloud'
import {mapGetters} from 'vuex'
import http from '@/api/http'
import fileDownload from 'js-file-download'

export default {
  name: 'word-cloud-compets',
  components: {
    wordCloud
  },
  data: () => ({
    cloudOperators: [
      {operatorRus: 'билайн', operatorEng: 'beeline'},
      {operatorRus: 'мтс', operatorEng: 'mts'},
      {operatorRus: 'теле2', operatorEng: 'tele2'}
    ],
    cloud: {
      beeline: {
        color: ['#639FF8'],
        loading: true,
        items: [],
        rus: 'билайн'
      },
      mts: {
        color: ['#639FF8'],
        loading: true,
        items: [],
        rus: 'мтс'
      },
      tele2: {
        color: ['#639FF8'],
        loading: true,
        items: [],
        rus: 'теле2'
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
    async export_wordcloud_operator(operator) {
      const [start, end] = this.getDates

      let route = ''
      route = `megafon/wordcloud?brand=${operator}&start_date=${start}&end_date=${end}&export_format=csv`

      await http.get(route).then(response => {
        fileDownload('\uFEFF' + response.data, 'report.csv', 'text/csv')
      })
    },
    async init() {
      this.cloudOperators.forEach(operator => {
        this.getCloudWords(operator)
      })
    },
    async getCloudWords({operatorRus, operatorEng}) {
      this.cloud[operatorEng].loading = true

      const config = {
        operatorRus,
        operatorEng
      }

      await this.$store.dispatch('request_cloud_word', config)
      const data = this.$store.getters[`get_wordcloud_${operatorEng}`]
      this.cloud[operatorEng].items = data.youtube
      this.cloud[operatorEng].loading = false
    }
  }
}
</script>

<style scoped></style>
