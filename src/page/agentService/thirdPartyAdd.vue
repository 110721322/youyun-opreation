<template>
  <div class="detail-page">
    <div class="flex-between flex-align-center">
      <div class="p-head">第三方对接信息</div>
    </div>
    <div class="table-box">
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="onClickCancel"
        @confirm="onClickConfirm"
      ></Form>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_agent.js";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./formConfig/thirdPartyAdd";

export default {
  name: "ThirdPartyAdd",
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG.detailData // 表单参数项
    };
  },
  created() {
  },
  mounted() {
    this.fromConfigData.showFootBtn = true
  },
  methods: {
    // 点击确认保存添加信息
    confirm($form) {
      if (!$form.name ||
        !$form.developerId ||
        !$form.phone ||
        !$form.allotCount ||
        !$form.agentNo) {
        this.$message({
          message: '请填写必填信息',
          type: 'warning'
        })
        return
      }
      if (!this.$g.utils.checkPhone($form.phone)) {
        this.$message({
          message: '请填写正确格式的手机号',
          type: 'warning'
        })
        return
      }
      const params = {
        name: $form.name,
        developerId: $form.developerId,
        phone: $form.phone,
        allotCount: $form.allotCount,
        asyncCallback: $form.asyncCallback ? $form.asyncCallback : undefined,
        syncCallback: $form.syncCallback ? $form.syncCallback : undefined,
        syncFailCallback: $form.syncFailCallback ? $form.syncFailCallback : undefined,
        netStatus: $form.netStatus,
        agentNo: $form.agentNo
      }
      api.addOpenAgent(params).then(res => {
        this.fromConfigData = FORM_CONFIG.detailData
        if (res.status === 0 && res.data) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$router.back(-1);
        } else {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      })
    },

    // 点击取消返回上一页
    onClickCancel(done) {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.detail-page {
  margin: 24px 24px 0;
  width: calc(100% - 48px);
  background: #fff;
}

.table-box {
  padding-bottom: 40px;
}
</style>
