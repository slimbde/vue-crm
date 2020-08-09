import firebase from 'firebase/app'



export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo: (state, info) => state.info = info,
    clearInfo: state => state.info = null
  },
  actions: {
    fetchInfo: async (ctx) => {
      try {
        const uid = await ctx.dispatch('getUId');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        ctx.commit('setInfo', info)
      } catch (e) { }
    }
  },
  getters: {
    getInfo: state => state.info
  }
}