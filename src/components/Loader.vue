<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    color() {
      const colors = [
        "spinner-red-only",
        "spinner-green-only",
        "spinner-blue-only",
      ];

      const idx = Math.round(Math.random() * 2);
      return colors[idx];
    },
  },
};
</script>