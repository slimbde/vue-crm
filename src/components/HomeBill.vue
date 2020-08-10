<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur of currencies" :key="cur">
          <span>{{getCurrency(cur) | currencyFilter(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["rates"],
  computed: {
    base() {
      return this.$store.getters.getInfo.bill / this.rates["RUB"];
    },
  },
  data: () => ({
    currencies: ["RUB", "USD", "EUR"],
  }),
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>