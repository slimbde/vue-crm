import firebase from 'firebase/app'


export default {
  state: {
    categories: []
  },
  actions: {
    async createCategory(ctx, { title, limit }) {
      try {
        const uid = await ctx.dispatch("getUId")
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        ctx.commit("addCategory", { title, limit, id: category.key });
      } catch (error) {
        ctx.commit("setError", error)
        throw error
      }
    }
  },
  mutations: {
    addCategory: (state, category) => state.categories = [...state.categories, category]
  },
  getters: {
    getCategories: state => state.categories
  }
}