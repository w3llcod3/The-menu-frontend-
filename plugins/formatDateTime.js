import Vue from 'vue'

if (!Vue.formatDate) {
  Vue.formatDate = true
  Vue.mixin({
    methods: {
      formatDateToElapsedReadable(value) {
        return this.$dayjs(value).isValid()
          ? this.$dayjs(value).fromNow()
          : ''
      },
      formatDateToIncomingReadable(value) {
        return this.$dayjs(value).isValid()
          ? this.$dayjs(value).toNow()
          : ''
      },
      formatDate(val) {
        if (val)
          return this.$dayjs(val).isValid()
            ? this.$dayjs(val).format('DD MMM, YYYY')
            : ''
      },
      formatDateTime(val) {
        if (val)
          return this.$dayjs(val).isValid()
            ? this.$dayjs(val).format('MMM DD, hh:mm A')
            : ''
      },
      formatMonth(val) {
        if (val)
          return this.$dayjs(val).isValid()
            ? this.$dayjs(val).format('MMM, YYYY')
            : ''
      },
      age(value) {
        return this.$dayjs(value).isValid()
          ? this.$dayjs().diff(this.$dayjs(value), 'year')
          : ''
      },
      yearOfBirth(value) {
        return this.$dayjs(value).isValid()
          ? this.$dayjs(value).format('YYYY')
          : ''
      },
    },
  })
}
