<template>
  <div class="ad-detail-box">
    <div class="tab_head">
      <span class="title">编辑广告123</span>
    </div>
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
import { FORM_CONFIG } from "./../formConfig/platformAdDetailFrom";

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

<style lang="scss" scoped>
.ad-detail-box {
  overflow: hidden;
  /deep/ .formTemplate {
    background: #fff;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  /deep/ .foot_btn_box {
    border-top: none;
  }
}
</style>
