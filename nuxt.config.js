const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/'
    : 'https://sho-akhbar-staging.herokuapp.com'

export default {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - Admin',
    title: 'The menu',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap',
      },
    ],
  },

  css: ['~/assets/app.scss'],

  plugins: [
    '~/plugins/vue-notifications.client.js',
    '~/plugins/formatDateTime.js',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios', 
    '@nuxtjs/dayjs'
  ],

  axios: {
    baseURL: BASE_URL,
    // proxy: true
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          navBack: '#fbfbfa',
          success: '#458777',
          success1: '#ebf2ef',

        },
      },
    },
    treeShake: true,
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
    },
    breakpoint: {
      mobileBreakpoint: 'sm',
    },
  },

  dayjs: {
    plugins: ['relativeTime', 'customParseFormat', 'utc'],
  },

  build: {},

  server: {
    port: 3001
  },
  
  render: {
    csp: true
  },
}
