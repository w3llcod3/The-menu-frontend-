<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container fluid style="" class="pa-0">
        <nuxt />
        <AppNotification />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data() {
    return {
      //
    }
  },

  computed: {
    //
  },

  methods: {
    //
  },
}
</script>
<style></style>
