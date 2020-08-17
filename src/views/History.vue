<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <HistoryTable
      v-if="this.categories"
      :records="this.records"
      :categories="this.categories"
    />
  </div>
</template>


<script>
import HistoryTable from '../components/HistoryTable'

export default {
  name: 'History',
  data: () => ({
    records: null,
    categories: null,
  }),
  components: {
    HistoryTable,
  },
  async mounted() {
    !this.$store.getters.getRecords && await this.$store.dispatch("fetchRecords");
    this.records = this.$store.getters.getRecords;
    !this.$store.getters.getCategories && await this.$store.dispatch("fetchCategories");
    this.categories = this.$store.getters.getCategories;
    //console.log(this.records);///////////////////////////////
    //console.log(this.categories);//////////////////////////////////
  }
}
</script>