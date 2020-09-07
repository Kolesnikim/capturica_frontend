<template>
  <v-layout class="d-flex pa-4" column>
    <v-card>
      <v-app-bar dense flat tile class="relative mx-2">
        <div style="width: 260px"></div>
        <h1>Позитивные упоминания</h1>
        <v-spacer></v-spacer>
        <date-picker-container></date-picker-container>
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
    <tables-posts-videos></tables-posts-videos>
  </v-layout>
</template>

<script>
import requestTypes from '@/components/request-types'
import datePickerContainer from '@/components/date-picker-container'

import horizontalBar1 from '@/components/horizontalBarCharts/horizontal-bar-1'
import horizontalBar2 from '@/components/horizontalBarCharts/horizontal-bar-2'
import line134 from '@/components/lineCharts/line-1-3-4'
import line2 from '@/components/lineCharts/line-2'
import verticalBar1 from '@/components/verticalBars/vertical-bar-1'
import wordCloud1 from '@/components/wordcloudCharts/word-cloud-1'
import horizontalBarsYtIg from '@/components/horizontalBarCharts/horizontal-bars-yt-ig'
import tablesPostsVideos from '@/components/tables/tables-posts-videos'

export default {
  components: {
    horizontalBar1,
    horizontalBar2,
    line134,
    line2,
    verticalBar1,
    horizontalBarsYtIg,
    tablesPostsVideos,
    wordCloud1,
    requestTypes,
    datePickerContainer
  },
  data: () => ({})
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
