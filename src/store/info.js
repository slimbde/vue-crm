import firebase from 'firebase/app'



export default {
  state: {
    info: null
  },
  actions: {
    async fetchInfo(ctx) {
      try {
        !ctx.getters.getUid && await ctx.dispatch("fetchUid");
        const uid = ctx.getters.getUid;
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        ctx.commit('setInfo', info)
      } catch (error) {
        ctx.commit("setError", error)
        throw error
      }
    },
    async updateInfo(ctx, newInfo) {
      try {
        !ctx.getters.getUid && await ctx.dispatch("fetchUid")
        const uid = ctx.getters.getUid;
        await firebase.database().ref(`/users/${uid}/info`).update(newInfo)
        await ctx.commit("setInfo", newInfo);
      } catch (error) {
        ctx.commit("setError", error)
        throw error
      }
    }
  },
  mutations: {
    setInfo: (state, info) => state.info = info,
    clearInfo: state => state.info = null
  },
  getters: {
    getInfo: state => state.info
  }
}