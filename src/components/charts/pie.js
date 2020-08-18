import {Pie, mixins} from 'vue-chartjs'

export default {
  extends: Pie,

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
  }
}
