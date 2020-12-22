<template>
  <yun-layout :logo="logo" title="火脸支付系统" :is-collapse="isCollapse"></yun-layout>
</template>

<script>
  import logo from "@/assets/img/icon_logo.png"
  export default {
    name: "Layout",
    data() {
      return {
        logo: logo,
        isCollapse: true
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
