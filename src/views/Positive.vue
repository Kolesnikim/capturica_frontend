<template>
  <v-layout class="d-flex pa-4" column>
    <div class="d-flex mx-n2 mb-4 px-2 align-center">
      <h1>Позитивные упоминания</h1>
      <v-spacer></v-spacer>
      <date-picker
        v-model="date_picker.dates"
        class="date-picker"
        type="date"
        range
        disabled="true"
        value-type="format"
        format="YYYY-MM-DD"
        placeholder="Выберите период"
        confirm
        confirm-text="Применить"
        range-separator=" - "
        :clearable="false"
        @confirm="updateCharts($event)"
      ></date-picker>
    </div>
    <div class="d-flex mx-n2 mb-4">
      <v-flex md6 class="mx-2">
        <v-card class="pa-2" style="width: 100%">
          <h2 class="text-center">
            {{ charts.horizontal_bar_1[getRequestType.value].title }}
          </h2>
          <horizontal-bar-chart
            v-if="!charts.horizontal_bar_1.loading"
            :chart-data="charts.horizontal_bar_1.data"
            style="height: 150px; width: 99%"
          ></horizontal-bar-chart>
          <v-progress-circular
            v-if="charts.horizontal_bar_1.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex md6 class="mx-2">
        <v-card class="pa-2" style="width: 100%">
          <h2 class="text-center">
            {{ charts.horizontal_bar_2[getRequestType.value].title }}
          </h2>
          <horizontal-bar-chart
            v-if="!charts.horizontal_bar_2.loading"
            :chart-data="charts.horizontal_bar_2.data"
            style="height: 150px; width: 99%"
          ></horizontal-bar-chart>
          <v-progress-circular
            v-if="charts.horizontal_bar_2.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>
    <v-card class="pa-2 mb-4" style="width: 100%" disabled="true">
      <h2 class="text-center">
        {{ charts.line.line_1[getRequestType.value].title }}
      </h2>
      <line-chart
        v-if="!charts.line.line_1.loading"
        :chart-data="charts.line.line_1.data"
        :options="charts.line.line_1.options"
      ></line-chart>
      <v-progress-circular
        v-if="charts.line.line_1.loading"
        size="48"
        indeterminate
        color="#639FF8"
      ></v-progress-circular>
    </v-card>
    <div class="d-flex mx-n2 mb-4">
      <v-flex md6 class="mx-2">
        <v-card class="pa-2 mb-4" style="width: 100%" disabled="true">
          <h2 class="text-center">
            {{ charts.line.line_3[getRequestType.value].title }}
          </h2>
          <line-chart
            v-if="!charts.line.line_3.loading"
            :chart-data="charts.line.line_3.data"
            :options="charts.line.line_3.options"
            style="width: 99%"
          ></line-chart>
          <v-progress-circular
            v-if="charts.line.line_3.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex md6 class="mx-2">
        <v-card class="pa-2 mb-4" style="width: 100%" disabled="true">
          <h2 class="text-center">
            {{ charts.line.line_4[getRequestType.value].title }}
          </h2>
          <line-chart
            v-if="!charts.line.line_4.loading"
            :chart-data="charts.line.line_4.data"
            :options="charts.line.line_4.options"
            style="width: 99%"
          ></line-chart>
          <v-progress-circular
            v-if="charts.line.line_4.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>
    <div class="d-flex mx-n2 mb-4">
      <v-flex md12 class="mx-2">
        <v-card class="pa-2" style="width: 100%" disabled="true">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">
              {{
                charts.vertical_bar.vertical_bar_1[getRequestType.value].title
              }}
            </h2>
          </div>
          <vertical-bar-chart
            v-if="!charts.vertical_bar.vertical_bar_1.loading"
            style="max-width: 99%"
            :chart-data="charts.vertical_bar.vertical_bar_1.data"
            :options="charts.vertical_bar.vertical_bar_1.options"
          ></vertical-bar-chart>
          <v-progress-circular
            v-if="charts.vertical_bar.vertical_bar_1.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <div class="mb-4 d-flex mx-n2">
      <v-flex md6 class="mx-2">
        <v-card class="pa-2" style="width: 100%;" disabled="true">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">
              {{ charts.horizontal_bar.youtube[getRequestType.value].title }}
            </h2>
            <v-btn disabled="disabled" class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
          <horizontal-bar-chart
            v-if="!charts.horizontal_bar.youtube.loading"
            :chart-data="charts.horizontal_bar.youtube.data"
            style="width: 99%"
          ></horizontal-bar-chart>
          <v-progress-circular
            v-if="charts.horizontal_bar.youtube.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
      <v-flex md6 class="mx-2">
        <v-card class="pa-2" style="width: 100%;" disabled="true">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">
              {{ charts.horizontal_bar.instagram[getRequestType.value].title }}
            </h2>
            <v-btn disabled="disabled" class="ml-2" color="primary--text" icon>
              <v-icon class="">mdi-download</v-icon>
            </v-btn>
          </div>
          <horizontal-bar-chart
            v-if="!charts.horizontal_bar.instagram.loading"
            :chart-data="charts.horizontal_bar.instagram.data"
            style="width: 99%"
          ></horizontal-bar-chart>
          <v-progress-circular
            v-if="charts.horizontal_bar.instagram.loading"
            size="48"
            indeterminate
            color="#639FF8"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <v-layout class="pa-4 mx-n6" wrap>
      <v-flex class="px-2" md6>
        <v-card class="pa-2 mb-4" style="width: 100%">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">
              {{ tables.video[getRequestType.value].title }}
            </h2>
            <v-btn disabled="disabled" class="ml-2" color="primary--text" icon>
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
                  <td
                    :key="header.value"
                    v-for="header in tables.video.headers"
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
      </v-flex>
      <v-flex class="px-2" md6>
        <v-card class="pa-2 mb-4" style="width: 100%">
          <div class="d-flex justify-center align-center">
            <h2 class="text-center">
              {{ tables.posts[getRequestType.value].title }}
            </h2>
            <v-btn disabled="disabled" class="ml-2" color="primary--text" icon>
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
                  <td
                    :key="header.value"
                    v-for="header in tables.posts.headers"
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
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import lineChart from '@/components/charts/line.js'
import horizontalBarChart from '@/components/charts/horizontalBar.js'
import verticalBarChart from '@/components/charts/verticalBar.js'
// import requestTypes from '@/components/request-types'

// import wordCloud from 'vue-wordcloud'
import {mapGetters} from 'vuex'

import HTTP from '@/api/http'

// import moment from 'moment'
import DatePicker from 'vue2-datepicker'

import json_1_14 from '@/assets/chartData/json_1_14.json'
import json_1_15 from '@/assets/chartData/json_1_15.json'

import json_1_16 from '@/assets/chartData/json_1_16.json'
// import json_2 from '@/assets/chartData/json_2.json'
// import json_3 from '@/assets/chartData/json_3.json'

import json_1_17 from '@/assets/chartData/json_1_17.json'
// import json_2_1 from '@/assets/chartData/json_2_1.json'
// import json_3_1 from '@/assets/chartData/json_3_1.json'

import json_1_18 from '@/assets/chartData/json_1_18.json'
// import json_2_2 from '@/assets/chartData/json_2_2.json'
// import json_3_2 from '@/assets/chartData/json_3_2.json'

import json_1_19 from '@/assets/chartData/json_1_19.json'
// import json_2_3 from '@/assets/chartData/json_2_3.json'
// import json_3_3 from '@/assets/chartData/json_3_3.json'

import json_1_20 from '@/assets/chartData/json_1_20.json'

import json_1_21 from '@/assets/chartData/json_1_21.json'
// import json_2_5 from '@/assets/chartData/json_2_5.json'
// import json_3_5 from '@/assets/chartData/json_3_5.json'
//
import json_1_22 from '@/assets/chartData/json_1_22.json'
// import json_2_6 from '@/assets/chartData/json_2_6.json'
// import json_3_6 from '@/assets/chartData/json_3_6.json'

// import json_1_7 from '@/assets/chartData/json_1_7.json'
// import json_2_7 from '@/assets/chartData/json_2_7.json'
// import json_3_7 from '@/assets/chartData/json_3_7.json'

// import json_1_8 from '@/assets/chartData/json_1_8.json'
// import json_2_8 from '@/assets/chartData/json_2_8.json'
// import json_3_8 from '@/assets/chartData/json_3_8.json'

export default {
  components: {
    lineChart,
    horizontalBarChart,
    verticalBarChart,
    // wordCloud,
    // requestTypes,
    DatePicker
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
    date_picker: {
      dates: [
        // moment()
        //   .subtract(1, 'months')
        //   .format('YYYY-MM-DD'),
        // moment().format('YYYY-MM-DD')
        '2020-01-01',
        '2020-02-01'
      ],
      shortcuts: [
        {
          text: 'Сегодня',
          onClick: () => {
            return [
              // moment()
              //   .subtract(1, 'days')
              //   .format('YYYY-MM-DD'),
              // moment()
              //   .format('YYYY-MM-DD')
              '2019-04-04',
              '2019-04-05'
            ]
          }
        },
        {
          text: 'Вчера',
          onClick: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        }
      ]
    },
    charts: {
      bubble: {
        data: {
          datasets: [
            {
              backgroundColor: '#639FF8',
              radius: 1,
              label: 'Топ видео Мегафон',
              data: [
                {
                  x: 184,
                  y: 10,
                  r: 24
                },
                {
                  x: 2356546, // просмотров
                  y: 181973, // лайков
                  r: 16 // упоминаний
                },
                {
                  x: 1043304, // просмотров
                  y: 31047, // лайков
                  r: 4 // упоминаний
                },
                {
                  x: 693395, // просмотров
                  y: 27374, // лайков
                  r: 4 // упоминаний
                },
                {
                  x: 435177, // просмотров
                  y: 28575, // лайков
                  r: 16 // упоминаний
                },
                {
                  x: 241489, // просмотров
                  y: 5565, // лайков
                  r: 24 // упоминаний
                }
              ]
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              beforeTitle(tooltip) {
                return `${tooltip[0].value} ${tooltip[0].x} ${tooltip[0].y}`
              }
              // labelColor: function() {
              //   return {
              //     borderColor: 'rgb(255, 0, 0)',
              //     backgroundColor: 'grey'
              //   }
              // },
              // labelTextColor: function() {
              //   return '#543453'
              // }
            }
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Количество упоминаний'
                }
                // gridLines: {
                //   color: 'red',
                //   zeroLineColor: 'violet'
                // }
              }
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Количество чего-либо еще'
                }
              }
            ]
          }
        }
      },
      line: {
        line_1: {
          mentions: {
            title: 'Позитивные упоминания брендов'
          },
          views: {
            title: 'Позитивные упоминания брендов'
          },
          comments: {
            title: 'Позитивные упоминания брендов'
          },
          data: {},
          loading: true,
          options: {
            fill: false,
            responsive: true,
            maintainAspectRatio: false
          }
        },
        line_3: {
          mentions: {
            title: 'Упоминания брендов YT'
          },
          views: {
            title: 'Упоминания брендов YT'
          },
          comments: {
            title: 'Упоминания брендов YT'
          },
          data: {},
          loading: true,
          options: {
            fill: false,
            responsive: true,
            maintainAspectRatio: false
          }
        },
        line_4: {
          mentions: {
            title: 'Упоминания брендов IG'
          },
          views: {
            title: 'Упоминания брендов IG'
          },
          comments: {
            title: 'Упоминания брендов IG'
          },
          data: {},
          loading: true,
          options: {
            fill: false,
            responsive: true,
            maintainAspectRatio: false
          }
        },
        line_2: {
          mentions: {
            title: 'Динамика упоминаний брендов'
          },
          views: {
            title: 'Динамика упоминаний брендов'
          },
          comments: {
            title: 'Динамика упоминаний брендов'
          },
          loading: true,
          data: {
            labels: [
              '2019-08-05',
              '2019-08-12',
              '2019-08-19',
              '2019-08-26',
              '2019-09-02',
              '2019-09-09',
              '2019-09-16',
              '2019-09-23',
              '2019-09-30',
              '2019-10-07',
              '2019-10-14',
              '2019-10-21',
              '2019-10-28',
              '2019-11-04',
              '2019-11-11',
              '2019-11-18',
              '2019-11-25',
              '2019-12-02',
              '2019-12-09',
              '2019-12-16',
              '2019-12-23',
              '2019-12-30',
              '2020-01-06',
              '2020-01-13',
              '2020-01-20',
              '2020-01-27',
              '2020-02-03',
              '2020-02-10',
              '2020-02-17',
              '2020-02-24'
            ],
            datasets: [
              {
                label: '5g',
                borderColor: '#4d089a',
                fill: false,
                data: [
                  0.0,
                  0.0,
                  0.03,
                  0.0,
                  0.0,
                  0.03,
                  0.14,
                  0.03,
                  0.03,
                  0.05,
                  0.03,
                  0.0,
                  0.03,
                  0.0,
                  0.05,
                  0.08,
                  0.05,
                  0.03,
                  0.24,
                  0.03,
                  0.05,
                  0.03,
                  0.0,
                  0.0,
                  0.03,
                  0.03,
                  0.0,
                  0.03,
                  0.0,
                  0.0
                ]
              },
              {
                label: 'cashback',
                borderColor: '#1b262c',
                fill: false,
                data: [
                  0.04,
                  0.04,
                  0.16,
                  0.04,
                  0.0,
                  0.0,
                  0.12,
                  0.0,
                  0.0,
                  0.04,
                  0.0,
                  0.04,
                  0.0,
                  0.04,
                  0.0,
                  0.12,
                  0.04,
                  0.0,
                  0.04,
                  0.08,
                  0.04,
                  0.08,
                  0.0,
                  0.0,
                  0.0,
                  0.04,
                  0.0,
                  0.0,
                  0.04,
                  0.0
                ]
              },
              {
                label: 'банковская карта',
                borderColor: '#ed6663',
                fill: false,
                data: [
                  0.0,
                  0.03,
                  0.09,
                  0.03,
                  0.06,
                  0.0,
                  0.0,
                  0.03,
                  0.0,
                  0.0,
                  0.0,
                  0.03,
                  0.03,
                  0.09,
                  0.06,
                  0.03,
                  0.0,
                  0.09,
                  0.09,
                  0.03,
                  0.06,
                  0.03,
                  0.03,
                  0.0,
                  0.0,
                  0.0,
                  0.06,
                  0.0,
                  0.09,
                  0.0
                ]
              },
              {
                label: 'забугорище',
                borderColor: '#ffa372',
                fill: false,
                data: [
                  0.5,
                  0.2,
                  0.1,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.2,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0
                ]
              },
              {
                label: 'искусственный интеллект',
                borderColor: '#f35588',
                fill: false,
                data: [
                  0.02,
                  0.0,
                  0.0,
                  0.02,
                  0.0,
                  0.0,
                  0.0,
                  0.02,
                  0.04,
                  0.02,
                  0.0,
                  0.02,
                  0.06,
                  0.0,
                  0.0,
                  0.0,
                  0.02,
                  0.09,
                  0.11,
                  0.06,
                  0.11,
                  0.11,
                  0.02,
                  0.04,
                  0.04,
                  0.04,
                  0.02,
                  0.09,
                  0.02,
                  0.02
                ]
              },
              {
                label: 'объединяй',
                borderColor: '#05dfd7',
                fill: false,
                data: [
                  0.0,
                  0.0,
                  0.0,
                  0.08,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.08,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.08,
                  0.0,
                  0.08,
                  0.0,
                  0.25,
                  0.0,
                  0.42,
                  0.0,
                  0.0,
                  0.0
                ]
              },
              {
                label: 'роуминг',
                borderColor: '#a3f7bf',
                fill: false,
                data: [
                  0.01,
                  0.0,
                  0.02,
                  0.01,
                  0.02,
                  0.02,
                  0.02,
                  0.0,
                  0.03,
                  0.02,
                  0.01,
                  0.02,
                  0.08,
                  0.0,
                  0.06,
                  0.03,
                  0.06,
                  0.03,
                  0.05,
                  0.07,
                  0.08,
                  0.01,
                  0.04,
                  0.06,
                  0.08,
                  0.09,
                  0.05,
                  0.05,
                  0.02,
                  0.0
                ]
              },
              {
                label: 'самый быстрый',
                borderColor: '#fff591',
                fill: false,
                data: [
                  0.07,
                  0.0,
                  0.0,
                  0.04,
                  0.07,
                  0.0,
                  0.04,
                  0.07,
                  0.07,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.11,
                  0.04,
                  0.04,
                  0.04,
                  0.07,
                  0.0,
                  0.04,
                  0.07,
                  0.0,
                  0.04,
                  0.04,
                  0.04,
                  0.0,
                  0.04,
                  0.07,
                  0.0
                ]
              },
              {
                label: 'тариф x',
                borderColor: '#323edd',
                fill: false,
                data: [
                  0.15,
                  0.25,
                  0.4,
                  0.15,
                  0.05,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.0
                ]
              },
              {
                label: 'тарифище',
                borderColor: '#dc2ade',
                fill: false,
                data: [
                  0.0,
                  0.08,
                  0.0,
                  0.0,
                  0.0,
                  0.0,
                  0.08,
                  0.08,
                  0.0,
                  0.0,
                  0.0,
                  0.08,
                  0.0,
                  0.17,
                  0.0,
                  0.0,
                  0.0,
                  0.08,
                  0.0,
                  0.0,
                  0.0,
                  0.08,
                  0.0,
                  0.08,
                  0.0,
                  0.08,
                  0.17,
                  0.0,
                  0.0,
                  0.0
                ]
              }
            ]
          },
          options: {
            fill: false
          }
        }
      },
      vertical_bar: {
        vertical_bar_1: {
          mentions: {
            title: 'Позитивные упоминания продуктов брендов'
          },
          views: {
            title: 'Позитивные упоминания продуктов брендов'
          },
          comments: {
            title: 'Позитивные упоминания продуктов брендов'
          },
          loading: true,
          labels: [],
          datasets: [],
          data: {
            datasets: [
              {
                label: 'beeline',
                backgroundColor: '#F2DC5D',
                data: [],
                stack: 1
              },
              {
                label: 'megafon',
                backgroundColor: '#7FC29B',
                data: [],
                stack: 1
              },
              {
                label: 'mts',
                backgroundColor: '#EA2B1F',
                data: [],
                stack: 1
              },
              {
                label: 'tele2',
                backgroundColor: '#0C090D',
                data: [],
                stack: 1
              }
            ]
          },
          options: {
            // onClick(e, i) {
            //   const chart = i[0]
            //   console.dir(chart._view.label)
            // },
            animation: false,
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  stacked: true
                }
              ]
            }
          }
        },
        vertical_bar_2: {
          mentions: {
            title: 'Упоминания слоганов',
            loading: true,
            data: {
              labels: [
                'начинается с тебя',
                'другие правила',
                'быть лучше каждый день',
                'живи на яркой стороне'
              ],
              datasets: [
                {
                  label: 'билайн',
                  backgroundColor: '#F2DC5D',
                  data: [3, 1, 0, 173],
                  stack: 1
                },
                {
                  label: 'мегафон',
                  backgroundColor: '#7FC29B',
                  data: [142, 2, 0, 0],
                  stack: 1
                },
                {
                  label: 'мтс',
                  backgroundColor: '#EA2B1F',
                  data: [7, 1, 15, 2],
                  stack: 1
                },
                {
                  label: 'теле2',
                  backgroundColor: '#0C090D',
                  data: [1, 14, 0, 0],
                  stack: 1
                }
              ]
            }
          },
          views: {
            title: 'Слоганы',
            loading: true,
            data: {
              labels: [
                'начинается с тебя',
                'другие правила',
                'быть лучше каждый день',
                'живи на яркой стороне'
              ],
              datasets: [
                {
                  label: 'билайн',
                  backgroundColor: '#F2DC5D',
                  data: [342269, 7375, 0, 228300],
                  stack: 1
                },
                {
                  label: 'мегафон',
                  backgroundColor: '#7FC29B',
                  data: [351055456, 90619, 0, 1291],
                  stack: 1
                },
                {
                  label: 'мтс',
                  backgroundColor: '#EA2B1F',
                  data: [1555127, 90601, 4879769, 530],
                  stack: 1
                },
                {
                  label: 'теле2',
                  backgroundColor: '#0C090D',
                  data: [96762772, 115383605, 0, 0],
                  stack: 1
                }
              ]
            }
          },
          comments: {
            title: 'Вовлеченность по слоганам',
            loading: true,
            data: {
              labels: [
                'начинается с тебя',
                'другие правила',
                'быть лучше каждый день',
                'живи на яркой стороне'
              ],
              datasets: [
                {
                  label: 'билайн',
                  backgroundColor: '#F2DC5D',
                  data: [3503, 357, 0, 7280],
                  stack: 1
                },
                {
                  label: 'мегафон',
                  backgroundColor: '#7FC29B',
                  data: [2152770, 2819, 0, 29],
                  stack: 1
                },
                {
                  label: 'мтс',
                  backgroundColor: '#EA2B1F',
                  data: [12670, 2817, 0, 2763],
                  stack: 1
                },
                {
                  label: 'теле2',
                  backgroundColor: '#0C090D',
                  data: [930289, 44552, 0, 0],
                  stack: 1
                }
              ]
            }
          },
          options: {
            // onClick(e, i) {
            //   const chart = i[0]
            //   console.dir(chart._view.label)
            // },
            scales: {
              xAxes: [
                {
                  stacked: true
                }
              ],
              yAxes: [
                {
                  stacked: true
                }
              ]
            }
          }
        }
      },
      horizontal_bar: {
        youtube: {
          mentions: {
            title: 'Топ каналов по упоминаниям YT'
          },
          views: {
            title: 'Топ каналов по охвату YT'
          },
          comments: {
            title: 'Топ каналов по вовлеченности YT'
          },
          loading: true,
          data: {},
          options: null
        },
        instagram: {
          mentions: {
            title: 'Топ каналов по упоминаниям IG'
          },
          views: {
            title: 'Топ каналов по охвату IG'
          },
          comments: {
            title: 'Топ каналов по вовлеченности IG'
          },
          loading: true,
          data: {},
          options: null
        }
      },
      horizontal_bar_1: {
        mentions: {
          title: 'Позитивных упоминаний брендов'
        },
        views: {
          title: 'Позитивных упоминаний брендов'
        },
        comments: {
          title: 'Позитивных упоминаний брендов'
        },
        loading: true,
        data: {},
        options: null
      },
      horizontal_bar_2: {
        mentions: {
          title: 'Соотношение позитивных упоминаний'
        },
        views: {
          title: 'Соотношение позитивных упоминаний'
        },
        comments: {
          title: 'Соотношение позитивных упоминаний'
        },
        loading: true,
        data: {},
        options: null
      },
      pie: {
        loading: true,
        data: {},
        options: null
      }
    },
    cloud: {
      items: [],
      loading: true,
      color: ['#639FF8']
    },
    count_mentions: {
      megafon: 0,
      youtube: 0,
      instagram: 0
    },
    tables: {
      posts: {
        mentions: {
          title: 'Список упоминаний IG'
        },
        views: {
          title: 'Список упоминаний IG'
        },
        comments: {
          title: 'Список упоминаний IG'
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
        views: {
          title: 'Список упоминаний YT'
        },
        comments: {
          title: 'Список упоминаний YT'
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
    ...mapGetters(['getRequestType'])
  },

  created() {
    this.init()
  },
  watch: {
    getRequestType() {
      this.init()
    }
  },

  methods: {
    async init() {
      const mentions = [
        {
          platform: 'youtube',
          chart_name: 'line_3'
        },
        {
          platform: 'instagram',
          chart_name: 'line_4'
        },
        {
          platform: 'all',
          chart_name: 'line_1'
        }
      ]
      mentions.forEach(mention => {
        this.getMentions(mention)
      })
      this.getCloudWords()
      this.getHorizontalBarYoutube()
      this.getHorizontalBarInstagram()
      this.getHorizontalBarMentions()
      this.getHorizontalBarCoeff()

      this.setDataOfVerticalBar()

      this.getListPosts()
      this.getListVideo()

      this.getLineData()

      this.charts.vertical_bar.vertical_bar_2[
        this.getRequestType.value
      ].loading = true
      setTimeout(() => {
        this.charts.vertical_bar.vertical_bar_2[
          this.getRequestType.value
        ].loading = false
      }, 1000)
    },
    // updateProgress(e) {
    //   console.log(e)
    // },
    async getLineData() {
      const {data: line_data} = this.charts.line.line_2
      this.charts.line.line_2.loading = true

      const [start_date, end_date] = this.date_picker.dates
      const {data} = await HTTP.get(
        `${this.getRequestType.value}/products?platform=youtube&start_date=${start_date}&end_date=${end_date}`
      )

      const getData = label => {
        return line_data.labels.reduce((total, item) => {
          if (data[0][item][label]) {
            total.push(data[0][item][label])
            return total
          } else {
            total.push(0)
            return total
          }
        }, [])
      }

      const getRandomColor = () => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      }

      line_data.labels = [...new Set(Object.keys(data[0]))].reverse()
      line_data.datasets = Object.keys(data[1]).map(label => ({
        label,
        fill: false,
        borderColor: getRandomColor(),
        data: getData(label)
      }))

      this.charts.line.line_2.loading = false
    },
    async getListPosts() {
      this.tables.posts.loading = true

      const jsons = {
        mentions: json_1_15,
        views: json_1_15,
        comments: json_1_15
      }

      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `list/post/megafon/${this.getRequestType.value}?start_date=${start_date}&end_date=${end_date}`
      // )

      this.tables.posts.items = jsons[this.getRequestType.value]
      this.tables.posts.loading = false
      // console.dir(data)
    },
    async getListVideo() {
      this.tables.video.loading = true

      const jsons = {
        mentions: json_1_14,
        views: json_1_14,
        comments: json_1_14
      }

      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `list/video/megafon/${this.getRequestType.value}?start_date=${start_date}&end_date=${end_date}`
      // )

      this.tables.video.items = jsons[this.getRequestType.value]
      this.tables.video.loading = false
      // console.dir(data)
    },
    async getMentions({chart_name, platform}) {
      this.charts.line[chart_name].loading = true

      const jsons = {
        mentions: json_1_18,
        views: json_1_18,
        comments: json_1_18
      }

      const brands_labels = ['мегафон', 'билайн', 'мтс', 'теле2']

      const colors = ['#7FC29B', '#F2DC5D', '#EA2B1F', '#0C090D']
      const labels = [
        ...new Set([
          ...brands_labels.flatMap(label =>
            Object.keys(jsons[this.getRequestType.value][label])
          )
        ])
      ]

      const getData = label => {
        const data = []
        labels.forEach(date => {
          const {instagram = {count: 0}, youtube = {count: 0}} =
            jsons[this.getRequestType.value][label][date] || {}
          const obj = {
            instagram,
            youtube
          }
          if (platform === 'all') {
            const sum = instagram.count + youtube.count
            data.push(sum)
          } else {
            data.push(obj[platform].count)
          }
        })
        return data
      }

      const datasets = brands_labels.map((label, index) => ({
        label,
        backgroundColor: colors[index],
        borderColor: colors[index],
        data: getData(label),
        fill: false
      }))

      const chart_data = {
        labels,
        datasets
      }

      this.charts.line[chart_name].data = chart_data
      this.charts.line[chart_name].loading = false
    },
    async getCloudWords() {
      this.cloud.loading = true
      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `wordcloud?brand=megafon&start_date=${start_date}&end_date=${end_date}`
      // )

      this.cloud.items = json_1_20.youtube
      // this.cloud.items = data.slice(0, 100)
      this.cloud.loading = false
    },
    async getPieData() {
      this.charts.pie.loading = true

      const [start_date, end_date] = this.date_picker.dates
      const {data} = await HTTP.get(
        `count/${this.getRequestType.value}/megafon?start_date=${start_date}&end_date=${end_date}`
      )
      const colors = ['#7FC29B', '#639FF8']
      const labels = Object.keys(data)
      const datasets = Object.values(data)

      this.charts.pie.data = {
        labels,
        datasets: [
          {
            backgroundColor: colors,
            data: datasets
          }
        ]
      }

      this.charts.pie.loading = false
    },
    async getSum(url) {
      const [start_date, end_date] = this.date_picker.dates
      const {data} = await HTTP.get(
        `${this.getRequestType.value}/count?brand=${url}&start_date=${start_date}&end_date=${end_date}`
      )
      const sumMentions = Object.values(data).reduce(
        (sum, item) => sum + item[0].count,
        0
      )
      return sumMentions
    },
    async getHorizontalBarMentions() {
      this.charts.horizontal_bar_1.loading = true

      console.log(this.getRequestType.value, this.getRequestType.name)

      const jsons = {
        mentions: json_1_16,
        views: json_1_16,
        comments: json_1_16
      }

      // const labels = Object.keys(jsons[this.getRequestType.value])
      const labels = ['мегафон', 'мтс', 'билайн', 'теле2']
      const mentions = labels.map(label =>
        Object.values(jsons[this.getRequestType.value][label]).reduce(
          (total, item) => total + parseFloat(item.count),
          0
        )
      )
      const datasets = []

      datasets.push({
        label: 'Количество упоминаний',
        backgroundColor: ['#7FC29B', '#EA2B1F', '#F2DC5D', '#0C090D'],
        data: mentions
      })

      this.charts.horizontal_bar_1.data = {
        labels,
        datasets
      }

      this.charts.horizontal_bar_1.loading = false
    },
    async getHorizontalBarCoeff() {
      this.charts.horizontal_bar_2.loading = true

      const jsons = {
        mentions: json_1_17,
        views: json_1_17,
        comments: json_1_17
      }

      const obj = jsons[this.getRequestType.value]['мтс']
      const labels = Object.keys(obj)
      const sum_mentions = labels.map(label => obj[label].count)

      this.charts.horizontal_bar_2.data = {
        labels,
        datasets: [
          {
            label: 'Соотношение',
            backgroundColor: '#639FF8',
            data: sum_mentions
          }
        ]
      }

      this.charts.horizontal_bar_2.loading = false
    },
    async getHorizontalBarYoutube() {
      this.charts.horizontal_bar.youtube.loading = true

      const jsons = {
        mentions: json_1_21,
        views: json_1_21,
        comments: json_1_21
      }

      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `list/channel/megafon/${this.getRequestType.value}?start_date=${start_date}&end_date=${end_date}`
      // )
      const labels = jsons[this.getRequestType.value].map(
        item => item.channel_name
      )
      const datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const channel_name = jsons[this.getRequestType.value].find(
            obj => obj.channel_name === label
          )
          return total + parseFloat(channel_name[item] || 0)
        }, 0)
      })

      this.charts.horizontal_bar.youtube.data = {
        labels,
        datasets: [
          {
            label: 'Соотношение',
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      }

      console.log({
        labels,
        datasets: [
          {
            label: 'Соотношение',
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      })

      this.charts.horizontal_bar.youtube.loading = false
    },
    async getHorizontalBarInstagram() {
      this.charts.horizontal_bar.instagram.loading = true

      const jsons = {
        mentions: json_1_22,
        views: json_1_22,
        comments: json_1_22
      }

      // const [start_date, end_date] = this.date_picker.dates
      // const {data} = await HTTP.get(
      //   `list/user/megafon/${this.getRequestType.value}?start_date=${start_date}&end_date=${end_date}`
      // )
      const labels = jsons[this.getRequestType.value].map(
        item => item.user_name
      )
      const datasets = labels.map(label => {
        return ['count'].reduce((total, item) => {
          const user_name = jsons[this.getRequestType.value].find(
            obj => obj.user_name === label
          )
          return total + parseFloat(user_name[item] || 0)
        }, 0)
      })

      this.charts.horizontal_bar.instagram.data = {
        labels,
        datasets: [
          {
            label: 'Мегафон',
            backgroundColor: '#639FF8',
            data: datasets
          }
        ]
      }

      this.charts.horizontal_bar.instagram.loading = false
    },
    async setDataOfVerticalBar() {
      this.charts.vertical_bar.vertical_bar_1.loading = true

      const jsons = {
        mentions: json_1_19,
        views: json_1_19,
        comments: json_1_19
      }

      const labels = Object.keys(jsons[this.getRequestType.value])
      const operators = ['билайн', 'теле2', 'мегафон', 'мтс']
      const colors = ['#F2DC5D', '#0C090D', '#7FC29B', '#EA2B1F']

      // console.log(labels)

      const datasets = operators.map((operator, index) => ({
        label: operator,
        backgroundColor: colors[index],
        stack: 1,
        data: labels.map(label => {
          let sum = 0
          if (
            jsons[this.getRequestType.value] &&
            jsons[this.getRequestType.value][label] &&
            jsons[this.getRequestType.value][label][operator] &&
            jsons[this.getRequestType.value][label][operator].youtube
          ) {
            sum +=
              jsons[this.getRequestType.value][label][operator].youtube.count ||
              0
          }

          if (
            jsons[this.getRequestType.value] &&
            jsons[this.getRequestType.value][label] &&
            jsons[this.getRequestType.value][label][operator] &&
            jsons[this.getRequestType.value][label][operator].instagram
          ) {
            sum +=
              jsons[this.getRequestType.value][label][operator].instagram
                .count || 0
          }

          return sum
        })
      }))

      const chart_data = {
        labels,
        datasets
      }

      this.charts.vertical_bar.vertical_bar_1.data = chart_data
      this.charts.vertical_bar.vertical_bar_1.loading = false
    },
    updateCharts() {
      this.init()
    }
  }
}
</script>

<style scoped lang="sass">
.total
    height: 100px

    &--red
        background: linear-gradient(45deg, #e55353, #d93737)
</style>
