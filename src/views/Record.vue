<template>
  <div>
    <Loader v-if="this.loading" />

    <div class="page-title" v-else>
      <h3>Новая запись</h3>
    </div>

    <p class="center" v-if="!this.categories && !this.loading">
      Категорий пока нет
      <br />
      <router-link to="/categories">Завести новую категорию</router-link>
    </p>

    <form class="form" :class="{hide: this.loading}">
      <div class="input-field">
        <!--<div style="height: 43px" v-if="this.loading"></div>-->
        <select ref="select" v-model="current">
          <option v-for="c of this.categories" :key="c.id" :value="c.id">{{c.title}}</option>
        </select>
        <label :class="{hide: this.loading}">Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input id="description" type="text" />
        <label for="description">Описание</label>
        <span class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
export default {
  name: "record",
  data: () => ({
    loading: true,
    select: null,
    categories: null,
    current: null,
  }),
  watch: {
    current(value) {
      this.current = value;
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchCategories");
    this.categories = this.$store.getters.getCategories;

    this.current = this.categories[0].id;

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
      this.loading = false;
    }, 1);
  },
  beforeDestroy() {
    this.select.destroy();
  },
};
</script>