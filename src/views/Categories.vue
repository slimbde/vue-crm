<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @update="upd" />
        <CategoryEdit v-if="cats!==null" :cats="cats" @updated="upd" :key="this.counter" />
      </div>
    </section>
  </div>
</template>


<script>
import CategoryCreate from "../components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";

const transformCategories = (objCategories) =>
  Object.keys(objCategories).map((k) => ({
    id: k,
    ...objCategories[k],
  }));

export default {
  data: () => ({
    cats: null,
    counter: 0,
  }),
  async created() {
    await this.$store.dispatch("fetchCategories");

    const cts = this.$store.getters.getCategories;
    this.cats = transformCategories(cts);
  },
  methods: {
    upd() {
      const ctss = this.$store.getters.getCategories;
      this.cats = transformCategories(ctss);
      ++this.counter;
    },
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
};
</script>