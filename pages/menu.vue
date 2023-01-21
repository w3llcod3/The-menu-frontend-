<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card>
        <v-card-title class="indigo white--text text-h5">
          The menu
        </v-card-title>
        <v-row class="pa-4" justify="space-between">
          <v-col cols="5">
            <v-treeview
              :active.sync="active"
              :items="items"
              :load-children="fetchNodes"
              :open.sync="open"
              activatable
              color="warning"
              open-on-click
              transition
              item-key="_id"
              item-text="name"
            >
              <template #prepend="{ item }">
                <v-icon v-if="item.type !== 'item'">
                  {{ assets.mdiRoomService }}
                </v-icon>
                <v-icon v-if="item.type === 'item'">
                  {{ assets.mdiFoodForkDrink }}
                </v-icon>
              </template>
              <template #append="{ item }">
                <v-btn
                  v-if="item.type !== 'item'"
                  color=""
                  icon
                  @click="addNode(item)"
                >
                  <v-icon>
                    {{ assets.mdiPlus }}
                  </v-icon>
                </v-btn>
              </template>
            </v-treeview>
          </v-col>

          <v-divider vertical></v-divider>

          <v-col class="d-flex text-center">
            <v-btn v-if="role === 'admin'" color="info" @click="edit">
              Edit
            </v-btn>
            <v-scroll-y-transition mode="out-in">
              <div
                v-if="!selected"
                class="text-h6 grey--text text--lighten-1 font-weight-light"
                style="align-self: center"
              >
                Select a node
              </div>
              <v-card
                v-else
                :key="selected.id"
                class="pt-6 mx-auto"
                flat
                max-width="400"
              >
                <v-card-text>
                  <v-avatar size="88">
                    <v-img :src="getImage()" class="mb-6"></v-img>
                  </v-avatar>
                  <h3 class="text-h5 mb-2">
                    {{ selected.name }}
                  </h3>
                </v-card-text>
              </v-card>
            </v-scroll-y-transition>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-dialog
      v-model="editInfo.dialog"
      :overlay="false"
      max-width="300px"
      transition="dialog-transition"
    >
      <MenuEdit
        v-if="editInfo.dialog"
        :item-id="editInfo.id"
        :item-parent="editInfo.parent"
        @close="editInfo.dialog = false"
        @reload="load"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import { mdiRoomService, mdiFoodForkDrink, mdiPlus } from '@mdi/js'

export default {
  name: 'MenuScreen',

  data() {
    return {
      assets: { mdiRoomService, mdiFoodForkDrink, mdiPlus },
      loading: false,
      items: [],
      active: [],
      open: [],
      editInfo: {
        dialog: false,
        id: null,
        parent: null,
      },
    }
  },

  computed: {
    selected() {
      if (!this.active.length) return undefined

      const _id = this.active[0]

      return this.items.find((item) => item._id === _id)
    },
    role() {
      return this.$store.state.ui.role
    },
  },

  mounted() {
    this.load()
  },

  methods: {
    load() {
      this.$axios
        .$get('/api/menu/v1', { params: { parent: 'null' } })
        .then((res) => {
          this.items = res.successResult.map((el) => {
            return {
              ...el,
              children: [],
            }
          })
        })
        .catch((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
    },
    fetchNodes(item) {
      const { _id } = item

      return this.$axios
        .$get('/api/menu/v1', { params: { parent: _id } })
        .then((res) => {
          if (res.successResult.length > 0)
            for (let i = 0; i < res.successResult.length; i++) {
              const node = res.successResult[i]
              const { type } = node

              if (type === 'subcategory')
                item.children.push({ ...node, children: [] })
              else item.children.push(node)
            }
          else if (res.successResult.length === 0) delete item.children
        })
        .catch((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
    },
    getImage() {
      return `https://picsum.photos/200`
    },
    edit() {
      if (!this.active.length) return

      this.editInfo.id = this.active[0]
      this.editInfo.dialog = true
    },
    addNode(item) {
      const { parent } = item
      if (parent && parent._id) this.editInfo.parent = parent._id
      this.editInfo.dialog = true
    },
  },
}
</script>

<style>
</style>