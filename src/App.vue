<template>
  <v-app>
    <v-app-bar v-if="$route.path !== '/auth'" app color="#3A4149" dark>
      <v-layout class="justify-end align-center">
        <div class="d-flex align-center">
          <span>{{ getUserData.username }}</span>
          <v-btn @click="logout()" icon>
            <v-icon>mdi-run</v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-app-bar>

    <v-navigation-drawer
      v-if="$route.path !== '/auth'"
      class="drawer"
      v-model="drawer"
      app
      style="background: #3A4149"
      width="200"
    >
      <div class="d-flex align-center justify-center drawer__title">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-1"
          contain
          src="@/assets/logo.svg"
          transition="scale-transition"
          width="70"
          height="70"
        />
        <h3 class="white--text mr-5">Capturica</h3>
      </div>

      <div>
        <v-list>
          <template v-for="(item, index) in items">
            <template v-if="item.to">
              <v-list-item
                :key="index"
                :to="item.to"
                class="transparent pa-0"
                active-class="main_color--text"
                dark
              >
                <v-list-item-avatar>
                  <v-icon small>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <template v-else>
              <v-list-group
                :key="index"
                active-class="main_color--text"
                color="main_color"
                class="pa-0"
                append-icon=""
                v-model="item.value"
              >
                <template v-slot:activator>
                  <v-list-item-avatar>
                    <v-icon small :color="item.value ? 'main_color' : 'white'"
                      >mdi-chat</v-icon
                    >
                  </v-list-item-avatar>
                  <v-list-item-content
                    :class="item.value ? 'main_color--text' : 'white--text'"
                  >
                    <v-list-item-title>Тональность</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="(item, i) in item.group"
                  :key="i"
                  :to="item.to"
                  dark
                  class="pl-6"
                  :disabled="item.disabled"
                >
                  <v-list-item-icon>
                    <v-icon small>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </template>
          </template>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main
      style="background: #EBEDEF; height: calc(100% + 48px); margin-bottom: -48px"
    >
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HTTP from '@/api/http'
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    drawer: true,
    items: [
      {
        title: 'Главная',
        icon: 'mdi-chart-bar-stacked',
        to: '/general'
      },
      {
        title: 'Конкуренты',
        icon: 'mdi-bell-ring-outline',
        to: '/compets'
      },
      {
        title: 'Тональность',
        icon: 'mdi-chat',
        value: false,
        group: [
          {
            title: 'Позитивные',
            icon: 'mdi-thumb-up-outline',
            to: '/positive',
            disabled: false
          },
          {
            title: 'Негативные',
            icon: 'mdi-thumb-down-outline',
            to: '/negative',
            disabled: false
          }
        ]
      }
    ]
  }),
  computed: {
    ...mapGetters(['getUserData'])
  },

  mounted() {
    if (this.$route.path === '/') {
      this.$router.push('/general')
    }
  },

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    async logout() {
      const {data} = await HTTP.post('megafon/logout')
      if (data) {
        this.$router.push('/auth')
      }
    }
  }
}
</script>

<style lang="sass">
@font-face
  font-family: 'century-gothic'
  src: url('~@/assets/fonts/century-gothic.woff2')
  font-style: normal
  font-display: fallback

*
  font-family: century-gothic, Roboto, sans-serif

.drawer
  &__title
    height: 56px,
    background: #3A4149

  .v-list-item__title
    font-size: 12px

.date-picker
  font-family: 'century-gothic, Roboto, sans-serif'

.v-list-item
  padding: 0
</style>
