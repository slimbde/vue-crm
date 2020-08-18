<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('togglesidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ this.date.toLocaleString("ru") }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="Logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    date: new Date(),
    timerId: null,
  }),
  methods: {
    ...mapActions(["logout"]),
    async Logout() {
      this.$router.push("/login?message=logout");
      await this.logout();
    },
  },
  computed: {
    userName() {
      let info = this.$store.getters.getInfo;
      return info ? info.name : "";
    },
  },
  async mounted() {
    (!this.$store.getters.getInfo ||
      !("info" in this.$store.getters.getInfo)) &&
      (await this.$store.dispatch("fetchInfo"));

    M.Dropdown.init(this.$refs.dropdown, {
      coverTrigger: false,
    });

    this.timerId = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timerId);
  },
};
</script>


<style scoped>
.dropdown-content {
  width: auto !important;
}
</style>