<template>
  <div>
    <div class="app-main-layout">
      <Navbar @togglesidebar="sideBarVisible = !sideBarVisible" />
      <Sidebar v-model="sideBarVisible" />

      <main class="app-content" :class="{full: !sideBarVisible}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default {
  name: "main-layout",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      sideBarVisible: true,
    };
  },
};
</script>