<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <div class="app-main-layout">
        <Navbar @togglesidebar="sideBarVisible = !sideBarVisible" />
        <Sidebar v-model="sideBarVisible" />

        <main class="app-content" :class="{ full: !sideBarVisible }">
          <div class="app-page">
            <router-view />
          </div>
        </main>

        <div class="fixed-action-btn" v-tooltip="'Добавить запись'">
          <router-link class="btn-floating btn-large blue" to="/record">
            <i class="large material-icons">add</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import messages from "../utils/messages";

export default {
  name: "main-layout",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      sideBarVisible: true,
      loading: true,
    };
  },
  async mounted() {
    (!this.$store.getters.getInfo ||
      !("info" in this.$store.getters.getInfo)) &&
      (await this.$store.dispatch("fetchInfo"));

    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      const msg = messages[fbError.code] || "Что-то пошло не так";
      this.$error(msg);
    },
  },
};
</script>