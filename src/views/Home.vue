<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click.prevent="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.timestamp" />
    </div>
  </div>
</template>

<script>
import HomeBill from "../components/HomeBill";
import HomeCurrency from "../components/HomeCurrency";

export default {
  name: "Home",
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    await this.$store.dispatch("fetchCurrency");
    this.currency = this.$store.getters.getCurrency;
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      await this.$store.dispatch("fetchCurrency");
      this.currency = this.$store.getters.getCurrency;
      this.loading = false;
    },
  },
  components: {
    HomeCurrency,
    HomeBill,
  },
};
</script>
