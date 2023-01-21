<template>
 <div></div>
</template>

<script>
export default {
  name: 'IndexPage',

  mounted() {
    this.$router.push({ name: 'login' })
  }
}
</script>
