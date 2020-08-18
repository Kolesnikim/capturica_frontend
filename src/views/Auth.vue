<template>
  <v-flex class="login">
    <v-layout justify-center align-center fill-height>
      <v-flex md3 class="login__form pa-4" style="color: #3A4149">
        <v-text-field
          label="Логин"
          v-model="form.username"
          color="#639FF8"
          @keydown.enter="logIn()"
        >
        </v-text-field>
        <v-text-field
          label="Пароль"
          v-model="form.password"
          color="#639FF8"
          @keydown.enter="logIn()"
          type="password"
        >
        </v-text-field>
        <v-layout justify-center>
          <v-btn
            class="white--text"
            style="background: #639FF8"
            @click="logIn()"
            >Войти</v-btn
          >
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import HTTP from '@/api/http'

export default {
  data: () => ({
    form: {}
  }),

  methods: {
    async logIn() {
      const {data: authData} = await HTTP.post('login', this.form)
      if (authData) {
        this.$router.push('/')
        this.$store.commit('SET_USER_DATA', {
          username: this.form.username
        })
      }
      // const {username, password} = this.form
      // if (username === 'test' && password === 'test') {
      //   this.$router.push('/')
      // }
    }
  }
}
</script>

<style lang="sass" scoped>
.login
  height: 100vh
  &__form
    border: 2px solid
    border-radius: 4px
</style>
