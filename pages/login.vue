<template>
  <div id="login-screen" class="navWhite px-2">
    <v-row style="height: 100%">
      <v-col cols="12" md="6" lg="4">
        <div class="pt-md-10"></div>
        <div
          class="text-center text-h5 font-weight-bold mb-6"
          style="margin-top: 8rem"
        >
          Restricted access
        </div>
        <div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row justify="center">
              <v-col cols="9" md="10" lg="8" class="pa-0">
                <div class="text-body-1 font-weight-medium mb-2">
                  Email address
                </div>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  :placeholder="'Email'"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="off"
                  background-color="inputBack"
                  outlined
                  class="mb-2"
                  solo
                  dense
                  @keyup.enter="login"
                  @change="validate"
                ></v-text-field>
              </v-col>
              <v-col cols="9" md="10" lg="8" class="pa-0">
                <div class="text-body-1 font-weight-medium mb-2">Password</div>
                <v-text-field
                  v-model="password"
                  type="password"
                  :rules="passwordRules"
                  :placeholder="'Password'"
                  autocorrect="off"
                  spellcheck="false"
                  class="mb-2"
                  background-color="inputBack"
                  outlined
                  solo
                  dense
                  @keyup.enter="login"
                  @change="validate"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </div>

        <div class="d-flex justify-space-around mt-4">
          <v-btn
            :loading="loggingIn"
            x-large
            color="primary"
            class="font-weight-regular rounded-0"
            width="200px"
            dark
            elevation="0"
            @click="login"
          >
            Login
          </v-btn>
        </div>

        <div class="mt-4">
          <v-row v-for="(item, i) in messages" :key="i" justify="center">
            <v-col cols="12" md="8">
              <v-alert
                :icon="assets.mdiInformation"
                color="error"
                type="error"
                dense
                class="font-weight-light"
              >
                {{ item }}
              </v-alert>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col
        v-if="$vuetify.breakpoint.mdAndUp"
        cols="12"
        md="6"
        lg="8"
        class="d-flex justify-center align-center"
      >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiInformation } from '@mdi/js'

const formData = {
  email: null,
  password: null,
}

export default {
  name: 'LoginScreen',

  data() {
    return {
      assets: {
        mdiInformation,
      },
      ...formData,
      emailRules: [
        (v) => !!v || 'Field is required',
        (v) => /.+@.+\..+/.test(v) || 'Not valid email',
      ],
      passwordRules: [(v) => !!v || 'Field is required'],
      valid: true,
      loggingIn: false,
      messages: [],
      version: '1.0',
    }
  },

  head() {
    return {
      title: 'Login',
    }
  },

  meta: {
    requireAuth: false,
  },

  computed: {},

  mounted() {
    //
  },

  methods: {
    login() {
      if (this.validate()) {
        this.loggingIn = true
        const body = {
          email: this.email,
          password: this.password,
        }
 
        this.$axios
          .$post('/api/auth/v1', body)
          .then(async (res) => {
            const { role, token } = res.successResult
            await this.$axios.setToken(token.token, 'Bearer')

            this.$store.commit('ui/SET_ROLE', role)
            this.$router.push({ name: 'menu' })
          })
          .catch((res) => {
            switch (res.response.status) {
              case 401:
                this.setMessages('Incorrect credentials')
                break
              default:
                break
            }
          })
          .finally(() => (this.loggingIn = false))
      }
    },
    validate() {
      this.$refs.form.validate()
      return this.valid
    },
    setMessages(data) {
      this.messages = []
      if (typeof data === 'string') this.messages.push(data)
      else if (typeof data === 'object') this.messages = data.slice(0)
    },
  },
}
</script>

<style scoped>
#login-screen {
  height: 90vh;
  overflow: hidden;
}
</style>
