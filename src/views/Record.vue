<template>
  <div>
    <Loader v-if="this.loading" />

    <p class="center" v-else-if="!this.categories && !this.loading">
      Категорий пока нет
      <br />
      <router-link to="/categories">Завести новую категорию</router-link>
    </p>

    <div class="page-title" v-else>
      <h3>Новая запись</h3>
    </div>

    <form class="form" :class="{hide: !this.current}" @submit.prevent="submitHandler">
      <div class="input-field">
        <!--<div style="height: 43px" v-if="this.loading"></div>-->
        <select ref="select" v-model="current">
          <option v-for="c of this.categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label :class="{hide: this.loading}">Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && (!$v.amount.required || !$v.amount.minValue)}"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && (!$v.amount.required || !$v.amount.minValue)"
        >Введите не нулевую сумму</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "record",
  data: () => ({
    loading: true,
    counter: 0,
    select: null,
    categories: null,
    current: null,
    type: "outcome",
    amount: 1,
    description: "",
  }),
  watch: {
    current(value) {
      this.current = value;
    },
  },
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    await this.$store.dispatch("fetchCategories");
    this.categories = this.$store.getters.getCategories;

    this.current = this.categories ? this.categories[0].id : null;

    setTimeout(() => {
      this.loading = false;
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  beforeDestroy() {
    this.select.destroy();
  },
  computed: {
    async canCreateRecord() {
      if (this.type === "income") return true;

      !this.$store.getters.getInfo && (await this.$store.dispatch("fetchInfo"));
      return this.$store.getters.getInfo.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (await this.canCreateRecord) {
        const record = {
          categoryId: this.current,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        };
        await this.$store.dispatch("createRecord", record);
        this.$message("Запись успешно создана");
        this.$v.reset;
        this.amount = 1;
        this.description = "";
      } else
        this.$message(
          `Недостаточно средств на счете (${
          this.amount - this.$store.getters.getInfo.bill
          })`
        );
    },
  },
};
</script>