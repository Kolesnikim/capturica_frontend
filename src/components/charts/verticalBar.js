import {Bar, mixins} from 'vue-chartjs'

export default {
  extends: Bar,

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
          onClick: this.handleClickVertical
        },
        this.options,
        options
      )
    )
  },
  methods: {
    handleClickVertical(e) {
      const point = this.$data._chart.getElementAtEvent(e)[0]
      if (point) {
        const [start_date, end_date] = this.$store.getters.getDates
        const product = this.$data._chart.data.labels[point._index]
        this.$router.push(
          `/tables?product=${product}&start_date=${start_date}&end_date=${end_date}`
        )
      }
    }
  }
}
