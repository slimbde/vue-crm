<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @update="upd" />
        <CategoryEdit
          v-if="cats !== null"
          :cats="cats"
          @updated="upd"
          :key="this.counter"
        />
      </div>
    </section>
  </div>
</template>


<script>
import CategoryCreate from "../components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";

export default {
  data: () => ({
    cats: null,
    counter: 0,
  }),
  metaInfo: {
    title: "Категории"
  },
  async created() {
    await this.$store.dispatch("fetchCategories");
    this.cats = this.$store.getters.getCategories;
  },
  methods: {
    upd() {
      this.cats = this.$store.getters.getCategories;
      ++this.counter;
    },
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
};
</script>