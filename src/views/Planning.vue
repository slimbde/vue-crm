<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4 v-if="this.info">{{ this.info.bill | currencyFilter() }}</h4>
    </div>

    <Loader v-if="this.loading" />

    <p class="center" v-else-if="!this.categories && !this.loading">
      Категорий пока нет
      <br />
      <router-link to="/categories">Завести новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="c in this.categories" :key="c.id">
        <p
          class="tooltipped"
          data-position="left"
          data-delay="550"
          :data-tooltip="c.progress + ' %'"
        >
          <strong>{{ c.title }}:</strong> {{ c.spent }} из
          {{ c.limit | currencyFilter() }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="c.color"
            :style="{ width: `${c.progress}%` }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

////////////////////////// DYNAMIC STYLE

<script>
export default {
  name: "planning",
  data: () => ({
    loading: true,
    categories: null,
    records: null,
    info: null,
    tooltip: null,
  }),
  mounted() {
    this.$store.dispatch("fetchRecords")
      .then(() => this.$store.getters.getRecords)
      .then(data => (this.records = data))
      .then(() => this.$store.dispatch("fetchCategories"))
      .then(() => this.$store.getters.getCategories)
      .then(data => this.categories = data.map(cat => {
        const spent = this.records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === "outcome")
          .reduce((sum, current) => sum += +current.amount, 0)

        const percent = 100 * spent / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        const color = percent < 60
          ? "green"
          : percent < 100
            ? "yellow"
            : "red"

        cat.spent = spent
        cat.progress = progressPercent
        cat.color = color

        return cat
      }))
      .then(() => this.$store.getters.getInfo)
      .then(data => this.info = data)
      .then(() => this.loading = false)
      .then(() => this.tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped')))
    //.then(() => console.log(this.records))
  },
  beforeDestroy() {
    this.tooltip.forEach(t => t.destroy())
  }
};
</script>