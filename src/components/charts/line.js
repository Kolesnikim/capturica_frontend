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
          maintainAspectRatio: false,
          onClick: this.handleСlick
        },
        this.options,
        options
      )
    )
  },

  methods: {
    handleСlick(e) {
      // console.log(this.$data._chart.getElementAtEvent)
      const point = this.$data._chart.getElementAtEvent(e)[0]
      const sentiments = this.$route.fullPath.slice(1)

      let sentiment = ''
      if (sentiments === 'positive') sentiment = `&sentiment=${sentiments}`
      else if (sentiments === 'negative') sentiment = `&sentiment=${sentiments}`

      if (point) {
        const start_date = this.$data._chart.data.labels[point._index]
        const end_date = this.$data._chart.data.labels[point._index + 1]
        const brand = this.$data._chart.data.datasets[point._datasetIndex].label
        this.$router.push(
          `/tables?brand=${brand}&start_date=${start_date}&end_date=${end_date}${sentiment}`
        )
      }
    }
  }
}
