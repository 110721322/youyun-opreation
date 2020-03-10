<template>
  <div class="main_page">
    <Form
      :form-base-data="fromConfigData.formData"
      :show-foot-btn="fromConfigData.showFootBtn"
      label-width="130px"
      @cancel="cancel"
    ></Form>
  </div>
</template>

<script>
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./../formConfig/shopDetail";

export default {
  name: "Theme",
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG.deviceData
    };
  },
  methods: {
    cancel(done) {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.main_page {
  width: calc(100% - 48px);
  background: #fff;
  margin: 24px 24px 0;
  height: calc(100% - 24px);
}
</style>
