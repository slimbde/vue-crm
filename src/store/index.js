import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    currency: null
  },
  mutations: {
    setError: (state, error) => state.error = error,
    clearError: (state) => state.error = null,
    setUser: (state, user) => state.user = user,
    setCurrency: (state, currency) => state.currency = currency,
  },
  getters: {
    error: state => state.error,
    user: state => state.user,
    getCurrency: state => state.currency,
  },
  actions: {
    fetchCurrency: (ctx) =>
      fetch(`https://api.exchangerate.host/latest`)
        .then(res => res.json())
        .then(data => ctx.commit("setCurrency", data))
  },

  modules: {
    auth, info, category
  }
})
