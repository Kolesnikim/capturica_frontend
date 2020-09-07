<template>
  <v-col>
    <v-card
      dense
      flat
      tile
      class="d-flex justify-space-between align-center mb-2"
    >
      <h1>Упоминания конкурентов</h1>
      <v-spacer></v-spacer>
      <date-picker-container></date-picker-container>
    </v-card>
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
    <tables-videos-compets></tables-videos-compets>
    <tables-posts-compets></tables-posts-compets>
  </v-col>
</template>

<script>
import wordCloudCompets from '@/components/wordcloudCharts/word-cloud-compets'
import horizontalBarChannelsCompets from '@/components/horizontalBarCharts/horizontal-bars-channel-compets'
import horizontalBarUserCompets from '@/components/horizontalBarCharts/horizontal-bars-user-compets'
import tablesVideosCompets from '@/components/tables/tables-videos-compets'
import tablesPostsCompets from '@/components/tables/tables-posts-compets'

import requestTypes from '@/components/request-types'
import DatePickerContainer from '@/components/date-picker-container'

export default {
  components: {
    wordCloudCompets,
    horizontalBarChannelsCompets,
    horizontalBarUserCompets,
    tablesVideosCompets,
    tablesPostsCompets,
    requestTypes,
    DatePickerContainer
  },
  data: () => ({}),
  computed: {},
  methods: {}
}
</script>

<style scoped lang="sass">

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
