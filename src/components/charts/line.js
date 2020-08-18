import {Line, mixins} from 'vue-chartjs'

export default {
  extends: Line,

  mixins: [mixins.reactiveProp],

  props: {
    chartData: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  mounted() {
    const options = {
      legend: {
        labels: {
          fontFamily: 'century-gothic, Roboto, sans-serif'
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontFamily: 'century-gothic, Roboto, sans-serif'
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontFamily: 'century-gothic, Roboto, sans-serif'
            }
          }
        ]
      }
    }

    this.renderChart(
      this.chartData,
      Object.assign(
        {
          responsive: true,
          maintainAspectRatio: false
        },
        this.options,
        options
      )
    )
  },

  methods: {
    goToTablesPage(e) {
      // console.log(this.$data._chart.getElementAtEvent)
      const point = this.$data._chart.getElementAtEvent(e)[0]
      if (point) {
        const start_date = this.$data._chart.data.labels[point._index]
        const brand = this.$data._chart.data.datasets[point._datasetIndex].label
        this.$router.push(`/tables?brand=${brand}&start_date=${start_date}`)
      }
    }
  }
}
