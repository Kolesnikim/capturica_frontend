<template>
  <div class="d-flex mx-n2 mb-4">
    <v-flex
      class="px-2"
      md4
      v-for="(item, index) in tabs"
      :key="index"
      absolute
    >
      <v-btn
        style="width: 100%"
        :class="[
          getRequestType.value === item.value
            ? 'toolbar__btn--blue'
            : 'accent_color',
          'white--text'
        ]"
        @click="setRequestType(item)"
        :disabled="item.disabled"
      >
        <span>{{ item.name }}</span>
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    tabs: [
      {
        name: 'Охват',
        value: 'reach',
        disabled: false
      },
      {
        name: 'Вовлечения',
        value: 'impressions',
        disabled: false
      },
      {
        name: 'Кол-во упоминаний',
        value: 'mentions',
        disabled: false
      }
    ]
  }),
  computed: {
    ...mapGetters(['getRequestType'])
  },

  methods: {
    setRequestType(request) {
      this.$store.commit('SET_REQUEST_TYPE', request)
    }
  }
}
</script>

<style scoped lang="sass">
.toolbar
  &__btn
    &--blue
      background-color: #639FF8 !important
</style>
