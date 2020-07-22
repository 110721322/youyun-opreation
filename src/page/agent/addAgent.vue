<template>
  <div class="main_page">
    <div class="content-box">
      <div class="title">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="true"
        :label-width="'auto'"
        @confirm="handleCommit"
      ></Form>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_agent.js";
import Form from "@/components/form/index";
import { FORM_CONFIG } from "./formConfig/addAgentConfig";
export default {
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG
    }
  },
  methods: {
    handleCommit($item) {
      console.log($item)
      if (!$item.account || !$item.address || !$item.agentName || !$item.businessType || !$item.personMobile || !$item.personName || !$item.companyAddress) {
        return false
      } else {
        const provinceCode = $item.companyAddress[0]
        const cityCode = $item.companyAddress[1]
        const areaCode = $item.companyAddress[2]
        api.addAgent({
          provinceCode: provinceCode,
          cityCode: cityCode,
          areaCode: areaCode,
          businessType: $item.businessType,
          agentName: $item.agentName,
          personName: $item.personName,
          personMobile: $item.personMobile,
          account: $item.account,
          address: $item.address,
          email: $item.email,
          operationId: $item.operationId,
          activeMode: $item.activeMode
        }).then(res => {
          if (res.status === 0) {
            this.$router.replace({
              path: '/agent/list'
            })
          } else {
            this.$message({
              message: res.errMessage,
              type: 'warning'
            })
          }
        }).catch(err => {
          this.$message({
            message: err.errMessage,
            type: 'warning'
          })
        })
      }
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
