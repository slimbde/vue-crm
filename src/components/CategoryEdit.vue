<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in this.cats" :key="c.id" :value="c.id">{{c.title}}</option>
          </select>
          <!--<span class="helper-text valid">Выберите категорию</span>-->
        </div>

        <div class="input-field">
          <input
            id="editTitle"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="editTitle">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="editLimit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue || !$v.limit.required}"
          />
          <label for="editLimit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue || !$v.limit.required"
            class="helper-text invalid"
          >Минимальное значение</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  props: ["cats"],
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100), required },
  },
  created() {
    const { id, title, limit } = this.cats[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  watch: {
    current(value) {
      const cat = this.cats.find((c) => c.id === value);
      this.title = cat.title;
      this.limit = cat.limit;
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$emit("updated");
        this.$message("Категория была изменена");
      } catch (e) {}
    },
  },
  beforeDestroy() {
    this.select.destroy();
  },
};
</script>