<template>
  <yun-layout :logo="logo" title="火脸支付系统" :is-collapse="isCollapse"></yun-layout>
</template>

<script>
  import api from "@/api/api_login";
  import { mapActions } from 'vuex';
  import logo from "@/assets/img/icon_logo.png"
  export default {
    name: "Layout",
    data() {
      return {
        logo: logo,
        isCollapse: true
      }
    },
    mounted() {
      this.$EventBus.$on('logout', this.logout)
    },
    destroyed() {
      this.$EventBus.$off('logout', this.logout)
    },
    methods: {
      ...mapActions(['resetState']),
      logout() {
        api
          .out()
          .then(() => {
            this.resetState();
            this.$router.replace(`/Login`);
          })
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
