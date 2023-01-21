const mixin = {
  props: {
    itemData: { type: Object, default: null },
  },

  data() {
    return {
      loading: false,
      saving: false,
      formValid: false,
    }
  },

  watch: {
    itemData: {
      handler(val) {
        this.resetForm()
        if (val && !this.loading) this.load()
      },
      immediate: true,
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate()

      return this.formValid
    },
    async save() {
      const valid = await this.validate()
      if (!valid) return

      this.saving = true

      const payload = this.prepareDataForSave()

      const url = this.apiEndpoints.load

      const { _id } = this.form
      const params = {
        params: {
          ...(_id !== undefined) && { _id }
        }
      }
      const method = _id ? '$patch' : '$post'

      this.$axios[method](url, payload, params)
        .then(() => {
          this.$emit('reloadIndex')

          this.$notify({
            text: this.itemData ? 'Success update' : 'Success create',
            type: 'success',
          })
          this.close()
        })
        .catch((err) => {
          switch (err.response.status) {
            case 422:
              this.setServerErrors(err.response.data.failureResult)
              break
            case 500:
              this.$notify({ text: 'Server error', type: 'error' })
              break
            default:
              this.handleSaveError(err.response)
              break
          }
        })
        .finally(() => (this.saving = false))
    },
    setServerErrors(errors) {
      this.resetServerErrors()
      for (let i = 0; i < errors.length; i++)
        this.serverErrors[errors[i].path[0]] = errors[i].message
    },
    resetServerErrors() {
      for (const key in this.serverErrors) this.serverErrors[key] = null
    },
    resetForm() {
      this.messages = []
      for (const key in this.form) this.form[key] = this.initialForm[key]

      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    },
    close() {
      this.$emit('close')
      this.resetForm()
      this.resetServerErrors()
    },
  },
}

export default mixin
