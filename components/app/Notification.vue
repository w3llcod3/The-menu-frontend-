<template>
  <notifications position="top right" :duration="10000" class="me-4 mt-4">
    <template slot="body" slot-scope="props">
      <v-alert
        :type="props.item.type"
        border="left"
        elevation="2"
        dense
      >
        <div class="text-center">
          {{ props.item.text }}
        </div>
      </v-alert>
    </template>
  </notifications>
</template>

<script>
export default {
  name: 'NotificationComponent',
}
</script>

<style></style>
