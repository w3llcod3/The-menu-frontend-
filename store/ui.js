export const state = () => ({
    navigationDrawer: true,
    role: null
  })
  
  export const getters = {
  }
  
  export const mutations = {
    SET_NAVIGATION_DRAWER(state, val) {
      state.navigationDrawer = val
    },
    TOGGLE_DRAWER(state, val) {
      state.navigationDrawer = !state.navigationDrawer
    },
    SET_ROLE(state, value) {
      state.role = value
    }
  }
  
  export const actions = {
  }
  