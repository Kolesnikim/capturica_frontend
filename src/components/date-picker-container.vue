<template>
  <date-picker
    v-model="dates"
    class="date-picker"
    type="date"
    range
    value-type="format"
    format="YYYY-MM-DD"
    placeholder="Выберите период"
    confirm
    confirm-text="Применить"
    range-separator=" - "
    :clearable="false"
  ></date-picker>
</template>

<script>
import {mapGetters} from 'vuex'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'date-picker-container',
  components: {
    DatePicker
  },
  computed: {
    ...mapGetters(['getRequestType']),
    dates: {
      get() {
        return this.$store.getters.getDates
      },
      set(value) {
        this.$store.dispatch('setDates', value)
      }
    }
  }
}
</script>

<style scoped></style>
