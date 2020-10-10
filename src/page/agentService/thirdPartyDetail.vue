<template>
  <div class="detail_page">
    <div class="p_head">新增对接商</div>
    <div v-if="showPage">
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
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
      id: "",
      showPage: false
    };
  },
  created() {
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.queryById(this.$route.query.id)
    } else {
      this.showPage = true;
    }
  },
  methods: {
    queryById(id) {
      setTimeout(() => {
        api.getOpenOperatorDetail({
          id: id
        }).then(res => {
          // 编辑前重赋值
          // res.object.netStatus = res.object.netStatus.Number()
          FORM_CONFIG.editData.formData.forEach((item, index) => {
            item.initVal = res.object[item.key];
          });
          this.fromConfigData = FORM_CONFIG.editData;
          this.fromConfigData.formData[7].initVal = this.fromConfigData.formData[7].initVal.toString();
          this.showPage = true;
        }).catch(err => {
          this.$message(err);
        });
      }, 300)
    },
    confirm($form) {
      if (!$form.name || !$form.developerId || !$form.phone || !$form.allotCount || !$form.agentNo) {
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
      if (this.id) {
        params.id = this.id
      }
      api.addOpenAgent(params).then(res => {
        if (res.status === 0 && res.object) {
          this.$message({
            message: this.id ? "编辑成功" : "添加成功",
            type: "success"
          });
          this.$router.replace({
            name: '/agentService/thirdParty'
          });
        } else {
          this.$message({
            message: this.id ? "编辑失败" : "添加失败",
            type: "error"
          });
        }
      })
    },
    cancel(done) {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.detail_page {
  width: calc(100% - 48px);
  background: #fff;
  margin: 24px 24px 0;
  /* height: calc(100% - 24px); */
}
</style>
