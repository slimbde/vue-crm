import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    currency: null,
  },
  actions: {
    fetchCurrency: (ctx) =>
      fetch(`https://api.exchangerate.host/latest`)
        .then(res => res.json())
        .then(data => ctx.commit("setCurrency", data))
  },
  mutations: {
    setError: (state, error) => state.error = error,
    clearError: (state) => state.error = null,
    setCurrency: (state, currency) => state.currency = currency,
  },
  getters: {
    error: state => state.error,
    getCurrency: state => state.currency,
  },

  modules: {
    auth, info, category, record
  }
})
