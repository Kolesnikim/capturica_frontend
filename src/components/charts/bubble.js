import {Bubble, mixins} from 'vue-chartjs'

export default {
  extends: Bubble,

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
    this.renderChart(
      this.chartData,
      Object.assign(
        {
          responsive: true,
          maintainAspectRatio: false
        },
        this.options
      )
    )
  }
}
