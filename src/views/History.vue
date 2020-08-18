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
      :records="this.items"
      :categories="this.categories"
    />

    <Paginate
      v-model="page"
      :pageCount="pageCount"
      :clickHandler="pageChangeHandler"
      :prevText="'Пред'"
      :nextText="'След'"
      :containerClass="'pagination'"
      :page-class="'waves-effect'"
    />
  </div>
</template>


<script>
import HistoryTable from '../components/HistoryTable'
import paginationMixin from '../mixins/pagination.mixin'

export default {
  name: 'History',
  mixins: [paginationMixin], // here we got all the fields within mixin
  data: () => ({
    records: null,
    categories: null,
  }),
  components: {
    HistoryTable,
  },
  async mounted() {
    !this.$store.getters.getRecords && await this.$store.dispatch("fetchRecords");
    !this.$store.getters.getCategories && await this.$store.dispatch("fetchCategories");
    this.records = this.$store.getters.getRecords;
    this.categories = this.$store.getters.getCategories;

    this.setupPagination(this.records);
  },
  methods: {

  }
}
</script>