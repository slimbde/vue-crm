import firebase from 'firebase/app'



export default {
  state: {
    uid: null
  },
  actions: {
    async login(ctx, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await ctx.dispatch("fetchUid");
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    },
    logout: async ctx => {
      await firebase.auth().signOut()
      ctx.commit("clearInfo")
    },
    register: async (ctx, { email, password, name }) => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await ctx.dispatch("fetchUid");
        const uid = ctx.getters.getUid;
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 100000,
          name
        })
      } catch (e) {
        ctx.commit("setError", e)
        throw e
      }
    },
    fetchUid: ctx => {
      const user = firebase.auth().currentUser;
      ctx.commit("setUid", user ? user.uid : null);
    }
  },
  mutations: {
    setUid: (state, uid) => state.uid = uid
  },
  getters: {
    getUid: state => state.uid
  }
}