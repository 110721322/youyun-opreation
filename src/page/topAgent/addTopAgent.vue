<template>
  <div class="main_page">
    <div class="content-box">
      <div class="title">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :label-width="'auto'"
        @commit="handleCommit"
      ></Form>
    </div>
  </div>
</template>

<script>
import Form from "@/components/form/index";
import { FORM_CONFIG } from "./../agent/formConfig/addAgentConfig";
export default {
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG
    }
  }
}
</script>

<style scoped>
  .main_page {
    padding: 32px 24px 0 24px;
  }
  .content-box {
    width: 100%;
    background: #ffffff;
    padding: 10px 0 40px 0;
    box-sizing: border-box;
  }
</style>
