import firebase from 'firebase/app'


export default {
  state: {
    records: null
  },
  actions: {
    async createRecord(ctx, record) {
      try {
        !ctx.getters.getUid && await ctx.dispatch("fetchUid");
        const uid = ctx.getters.getUid;
        await firebase.database().ref(`/users/${uid}/records`).push(record);
        await ctx.dispatch("fetchRecords");

        !ctx.getters.getInfo && await ctx.dispatch("fetchInfo");
        const info = ctx.getters.getInfo;
        info.bill = record.type === "income"
          ? info.bill + record.amount
          : info.bill - record.amount
        await ctx.dispatch("updateInfo", info)
      } catch (e) {
        ctx.commit("setError", e);
        throw e;
      }
    },
    async fetchRecords(ctx) {
      try {
        !ctx.getters.getUid && await ctx.dispatch("fetchUid")
        const uid = ctx.getters.getUid;
        const records = (await firebase.database().ref(`/users/${uid}/records`).once("value")).val();
        ctx.commit("setRecords", records);
      } catch (error) {
        ctx.commit("setError", error)
        throw error
      }
    }
  },
  mutations: {
    setRecords: (state, records) => state.records = records
      ? Object.keys(records).map((k) => ({ id: k, ...records[k], }))
      : null
  },
  getters: {
    getRecords: state => state.records,
    getRecordById: (state) => (id) => state.records
      ? (Object.assign({}, state.records.find(r => r.id === id)))
      : null
  }
}