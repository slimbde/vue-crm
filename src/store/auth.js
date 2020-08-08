import firebase from 'firebase/app'



export default {
  actions: {
    async login(ctx, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        ctx.commit('setError', e)
        throw e
      }
    },
    logout: async ctx => await firebase.auth().signOut(),
    register: async (ctx, { email, password, name }) => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await ctx.dispatch('getUId')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 100000,
          name
        })
      } catch (e) {
        ctx.commit("setError", e)
        throw e
      }
    },
    getUId: ctx => {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    }
  },
  state: {},
  mutations: {},
}