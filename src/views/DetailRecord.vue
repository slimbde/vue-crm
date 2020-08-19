<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">{{
          this.record && this.record.type === "outcome" ? "Расход" : "Доход"
        }}</a>
      </div>

      <div class="row" v-if="this.record">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: this.record.type === 'outcome',
              green: this.record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ this.record.description }}</p>
              <p>Сумма: {{ this.record.summ | currencyFilter() }}</p>
              <p>Категория: {{ this.record.category }}</p>

              <small>{{
                new Date(this.record.date).toLocaleString().slice(0, 10)
              }}</small>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Такой записи нет</div>
    </div>
  </div>
</template>


<script>

export default {
  name: "Detail-category",
  data: () => ({
    record: null,
    loading: true,
  }),
  metaInfo: {
    title: "Запись подробно"
  },
  async created() {
    const id = this.$route.params.id;
    const record = this.$store.getters.getRecordById(id);
    const category = this.$store.getters.getCategoryById(record.categoryId);

    this.record = {
      description: record.description,
      summ: record.amount,
      category: category.title,
      date: record.date,
      type: record.type
    }
  }
}
</script>