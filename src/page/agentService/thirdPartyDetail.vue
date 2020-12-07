<template>
  <div class="detail-page">
    <div class="flex-between flex-align-center">
      <div class="p-head">第三方对接信息</div>
      <el-button v-if="(!isEdit)&&id" type="primary" style="margin-right:24px;" size="mini" @click="editDetail">编辑</el-button>
    </div>
    <div v-if="showPage" class="form-box">
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
import { FORM_CONFIG } from "./formConfig/thirdPartyDetail";

export default {
  name: "ThirdPartyDetail",
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG.detailData,
      id: "", // 页面路径参数
      showPage: false, // 是否展示表单编辑
      isEdit: false // 是否展示编辑按钮
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      FORM_CONFIG.detailData.formData.forEach((item, index) => {
        item.isDisabled = true
      })
      this.queryById(this.$route.query.id)
    } else {
      this.showPage = true;
      this.fromConfigData.showFootBtn = true
    }
  },
  mounted() {
  },
  methods: {
    // 点击编辑按钮
    clickEditDetail() {
      this.showPage = false
      this.isEdit = true
      this.fromConfigData = FORM_CONFIG.editData
      this.fromConfigData.showFootBtn = true
      this.queryById(this.$route.query.id)
    },
    queryById(id) {
      setTimeout(() => {
        api.getOpenOperatorDetail({
          id: id
        }).then(res => {
          // 编辑前重赋值
          this.fromConfigData.formData.forEach((item, index) => {
            item.initVal = res.data[item.key];
          });
          this.fromConfigData.formData[7].initVal = this.fromConfigData.formData[7].initVal.toString();
          this.showPage = true;
        })
      }, 300)
    },

    // 点击确认按钮
    onClickConfirm($form) {
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
        asyncCallback: $form.asyncCallback,
        syncCallback: $form.syncCallback,
        syncFailCallback: $form.syncFailCallback,
        netStatus: $form.netStatus,
        agentNo: $form.agentNo,
        id: this.id
      }
      api.addOpenAgent(params).then(res => {
        this.showPage = false
        this.isEdit = false
        this.fromConfigData = FORM_CONFIG.detailData
        this.fromConfigData.showFootBtn = false
        if (res.status === 0) {
          this.$message({
            message: this.id ? "编辑成功" : "添加成功",
            type: "success"
          });
          this.queryById(this.$route.query.id)
        } else {
          this.$message({
            message: this.id ? "编辑失败" : "添加失败",
            type: "error"
          });
        }
      })
    },

    // 点击取消
    onClickCancel(done) {
      if (this.$route.query.id) {
        this.showPage = false
        this.isEdit = false
        this.fromConfigData = FORM_CONFIG.detailData
        this.fromConfigData.showFootBtn = false
        this.queryById(this.$route.query.id)
      } else {
        this.$router.back(-1);
      }
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

.edit-button {
  margin-right: 24px;
}

.form-box {
  padding-bottom: 40px;
}
</style>
