import firebase from 'firebase/app'



export default {
  state: {
    info: null
  },
  mutations: {
    setInfo: (state, info) => state.info = info,
    clearInfo: state => state.info = null
  },
  actions: {
    fetchInfo: async (ctx) => {
      try {
        !ctx.state.uid && await ctx.dispatch("fetchUid");
        const uid = ctx.getters.getUid;
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        ctx.commit('setInfo', info)
      } catch (e) { }
    }
  },
  getters: {
    getInfo: state => state.info
  }
}