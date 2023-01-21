<template>
  <v-app-bar app elevation="0" flat color="white">
     <v-spacer></v-spacer>

    <div class="bar-list-item">
      <v-btn icon small class="mx-2">
        <v-icon> {{ assets.mdiHelpCircleOutline }} </v-icon>
      </v-btn>
    </div>

    <v-badge
      color="orange"
      bordered
      overlap
      dot
      size="20"
      class="mx-2 bar-list-item"
    >
      <v-btn icon small>
        <v-icon> {{ assets.mdiBellOutline }} </v-icon>
      </v-btn>
    </v-badge>

    <div class="bar-list-item">
      <v-menu
        transition="slide-y-transition"
        offset-y
        rounded="0"
        content-class="elevation-1 "
        :close-on-content-click="false"
        max-width="200px"
      >
        <template #activator="{ on: menu, attrs }">
          <v-btn
            color=""
            small
            class="mx-2"
            v-bind="attrs"
            text
            v-on="{ ...menu }"
          >
            <span class="mx-2 text-body-2 font-weight-medium text-capitalize">
              Irakli Lolashvili
            </span>
            <v-icon> {{ assets.mdiChevronDown }} </v-icon>
          </v-btn>
        </template>
        <v-list dense class="">
          <template v-for="(item, i) in userMenuItems">
            <v-list-item :key="i + 'm'" :to="item.to" @click="userMenu = false">
              <v-list-item-title> {{ item.label }} </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </div>

    <div class="bar-list-item">
      <v-avatar size="40">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="User" />
      </v-avatar>
    </div>
  </v-app-bar>
</template>

<script>
import {
  mdiMagnify,
  mdiHelpCircleOutline,
  mdiBellOutline,
  mdiChevronDown,
  mdiMenu,
} from '@mdi/js'

export default {
  name: 'AppBar',

  components: {},

  data() {
    return {
      assets: {
        mdiMagnify,
        mdiHelpCircleOutline,
        mdiBellOutline,
        mdiChevronDown,
        mdiMenu,
      },
      userMenuItems: [
        {
          label: 'Profile',
          to: { name: 'Settings' },
        },
      ],
      tl: null,
    }
  },

  mounted() {
  
  },

  methods: {
  
  },
}
</script>

<style>

</style>
