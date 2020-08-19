<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
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
import { Pie } from 'vue-chartjs'

export default {
  name: 'History',
  extends: Pie,
  mixins: [paginationMixin], // here we got all the fields within mixin
  data: () => ({
    records: null,
    categories: null,
  }),
  metaInfo: {
    title: "История записей"
  },
  components: {
    HistoryTable,
  },
  async mounted() {
    !this.$store.getters.getRecords && await this.$store.dispatch("fetchRecords");
    !this.$store.getters.getCategories && await this.$store.dispatch("fetchCategories");
    this.records = this.$store.getters.getRecords;
    this.categories = this.$store.getters.getCategories;

    this.setupPagination(this.records);
    setTimeout(() => this.setupChart(), 100);
  },
  methods: {
    getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];

      return color;
    },
    setupChart() {
      const colors = this.categories.map(c => this.getRandomColor());

      const chartData = {
        labels: this.categories.map(c => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: this.categories.map(c => this.records
            .filter(r => r.categoryId === c.id)
            .reduce((sum, cur) => sum += cur.amount, 0)),
          backgroundColor: colors,
          borderColor: 'black',
          borderWidth: 0.5
        }]
      };

      this.renderChart(chartData);
    }
  }
}
</script>