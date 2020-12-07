<template>
  <div style="padding: 0 15px;" @click="clickToggle">
    <img src="@/assets/img/log.png" alt="logo" />
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickToggle() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
