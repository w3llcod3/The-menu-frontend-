<template>
  <v-card>
    <v-card-title primary-title> Edit menu node </v-card-title>
    <v-card-text>
      <div class="text-body-1 mb-2">Name</div>
      <v-text-field v-model="name" dense outlined></v-text-field>
      <div class="text-body-1 mb-2">Type</div>
      <v-select
        v-model="type"
        :items="types"
        item-value="value"
        item-text="text"
        dense
        outlined
      ></v-select>
      <div class="text-body-1 mb-2">Discount</div>
      <v-text-field v-model="discount" dense outlined></v-text-field>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="info" @click="save">Save</v-btn>
      <v-btn color="" @click="$emit('close')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'MenuEdit',

  props: {
    itemId: { type: String, default: null },
    itemParent: { type: String, default: null },
  },

  data() {
    return {
      name: null,
      type: null,
      discount: null,
      parent: null,
      types: [
        { value: 'category', text: 'Category' },
        { value: 'subcategory', text: 'Subcategory' },
        { value: 'item', text: 'Item' },
      ],
    }
  },

  mounted() {
    this.load()
  },

  methods: {
    load() {
      if (this.itemParent) this.parent = this.itemParent

      if (this.itemId) {
        this.$axios
          .$get('/api/menu/v1', { params: { _id: this.itemId } })
          .then((res) => {
            const item = res.successResult[0]

            const { name, type, discount, parent } = item
            this.name = name
            this.type = type
            this.discount = discount
            this.parent = parent
          })
          .catch((res) => {
            // eslint-disable-next-line no-console
            console.log(res)
          })
      }
    },
    save() {
      const data = {
        name: this.name,
        type: this.type,
        ...(this.discount && { discount: this.discount }),
        ...(this.parent && { parent: this.parent }),
      }

      this.$axios
        .$post('/api/menu/v1', data)
        .then(() => {
          this.$emit('reload')
          this.$emit('close')
        })
        .catch((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
    },
  },
}
</script>

<style>
</style>