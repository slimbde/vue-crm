import firebase from 'firebase/app'


export default {
  state: {
    categories: null
  },
  actions: {
    async createCategory(ctx, { title, limit }) {
      try {
        !ctx.getters.getUid && ctx.dispatch("fetchUid")
        const uid = ctx.getters.getUid;
        await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });
        await ctx.dispatch("fetchCategories");
      } catch (error) {
        ctx.commit("setError", error)
        throw error
      }
    },
    async fetchCategories(ctx) {
      try {
        !ctx.getters.getUid && ctx.dispatch("fetchUid")
        const uid = ctx.getters.getUid;
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once("value")).val();
        ctx.commit("setCategories", categories);
      } catch (error) { console.log("error") }
    },
    async updateCategory(ctx, category) {
      try {
        const { id, title, limit } = category;
        !ctx.getters.getUid && ctx.dispatch("fetchUid")
        const uid = ctx.getters.getUid;
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
        ctx.commit("updCategory", category);
      } catch (error) { }
    }
  },
  mutations: {
    setCategories: (state, categories) => state.categories = categories,
    updCategory: (state, category) => {
      let old = state.categories[category.id];
      old.title = category.title;
      old.limit = category.limit;
    }
  },
  getters: {
    getCategories: state => state.categories
      ? Object.keys(state.categories).map((k) => ({ id: k, ...state.categories[k], }))
      : null
  }
}