<template>
  <div class="container">
    <div class="content-box">
      <div class="title">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="true"
        :label-width="'auto'"
        @confirm="clickCommit"
        @cancel="clickCancel"
      >
      </Form>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_agent.js";
import Form from "@/components/form/index";
import { FORM_CONFIG } from "./formConfig/addAgentConfig";
export default {
  name: "AddAgent",
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG // form表单数据
    }
  },
  methods: {
    // 点击保存按钮进行提交
    clickCommit($item) {
      if (!$item.account ||
        !$item.address ||
        !$item.agentName ||
        !$item.businessType ||
        !$item.personMobile ||
        !$item.personName ||
        !$item.companyAddress ||
        !$item.email) {
        this.$message('请完善信息')
        return
      }
      if (!this.$g.utils.checkPhone($item.personMobile)) {
        this.$message('请输入正确的手机号')
        return
      }
      if (!this.$g.utils.checkEmail($item.email)) {
        this.$message('请输入正确的邮箱')
        return
      }
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
        activeMode: $item.activeMode
      }).then(res => {
        if (res.status === 0) {
          this.$router.replace({
            name: 'agentCheckList'
          })
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
    },

    // 点击取消，返回服务商列表页面
    clickCancel() {
      this.$router.replace({
        name: 'agentList'
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 32px 24px 0 24px;
}

.content-box {
  width: 100%;
  background: #fff;
  padding: 10px 0 40px 0;
  box-sizing: border-box;
}
</style>
