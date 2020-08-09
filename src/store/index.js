import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError: (state, error) => state.error = error,
    clearError: (state) => state.error = null,
    setUser: (state, user) => state.user = user,
  },
  getters: {
    error: state => state.error,
    user: state => state.user,
  },
  actions: {
    fetchCurrency: () =>
      fetch(`http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_FIXER}&symbols=USD,EUR,RUB`)
        .then(res => res.json())
        .then(data => new Promise(resolve => resolve(data)))
  },

  modules: {
    auth, info
  }
})
