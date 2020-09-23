<template>
  <div class="detail_page">
    <div class="p_head">新增对接商</div>
    <Form
      :form-base-data="fromConfigData.formData"
      :show-foot-btn="fromConfigData.showFootBtn"
      label-width="130px"
      @cancel="cancel"
      @confirm="confirm"
    ></Form>
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
      id: this.$route.query.id
    };
  },
  mounted() {
    if (this.id) {
      // this.queryById();
    }
  },
  methods: {
    queryById() {
      api
        .xxx({
          id: this.id
        })
        .then(res => {
          // 编辑前重赋值
          FORM_CONFIG.detailData.formData.forEach((item, index) => {
            item.initVal = res.object[item.key];
          });
          this.fromConfigData = FORM_CONFIG.detailData;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    confirm($form) {
      console.log($form);
      if (!$form.name || !$form.developerId || !$form.phone || !$form.allotCount || !$form.agentNo) {
        this.$message({
          message: '请填写必填信息',
          type: 'warning'
        })
        return
      }
      api.addOpenAgent({
        name: $form.name,
        developerId: $form.developerId,
        phone: $form.phone,
        allotCount: $form.allotCount,
        asyncCallback: $form.asyncCallback ? $form.asyncCallback : undefined,
        syncCallback: $form.syncCallback ? $form.syncCallback : undefined,
        syncFailCallback: $form.syncFailCallback ? $form.syncFailCallback : undefined,
        netStatus: $form.netStatus,
        agentNo: $form.agentNo
      }).then(res => {
        console.log(res)
      })
      // if (this.id) {
      //   api
      //     .update({
      //       agentNo: $form.agentNo,
      //       agentName: $form.agentName,
      //       channelAgentCode: $form.channelAgentCode,
      //       accessMerchantName: $form.accessMerchantName,
      //       linkmanName: $form.linkmanName,
      //       linkmanPhone: $form.linkmanPhone,
      //       deviceNumLimit: $form.deviceNumLimit,
      //       asyncNotifyUrl: $form.asyncNotifyUrl,
      //       syncNotifyUrl: $form.syncNotifyUrl,
      //       syncNotifyFailUrl: $form.syncNotifyFailUrl,
      //       netState: $form.netState,
      //       remark: $form.remark,
      //       openSecret: $form.openSecret,
      //       deviceSecret: $form.deviceSecret,
      //       status: $form.status,
      //       id: this.id
      //     })
      //     .then(res => {
      //       this.$alert("修改成功", "提示", {
      //         confirmButtonText: "确定",
      //         callback: action => {
      //           this.$router.back(-1);
      //         }
      //       });
      //     });
      // } else {
      //   api
      //     .add({
      //       agentNo: $form.agentNo,
      //       agentName: $form.agentName,
      //       channelAgentCode: $form.channelAgentCode,
      //       accessMerchantName: $form.accessMerchantName,
      //       linkmanName: $form.linkmanName,
      //       linkmanPhone: $form.linkmanPhone,
      //       deviceNumLimit: $form.deviceNumLimit,
      //       asyncNotifyUrl: $form.asyncNotifyUrl,
      //       syncNotifyUrl: $form.syncNotifyUrl,
      //       syncNotifyFailUrl: $form.syncNotifyFailUrl,
      //       netState: $form.netState,
      //       remark: $form.remark,
      //       openSecret: $form.openSecret,
      //       deviceSecret: $form.deviceSecret,
      //       status: $form.status
      //     })
      //     .then(res => {
      //       this.$alert("添加成功", "提示", {
      //         confirmButtonText: "确定",
      //         callback: action => {
      //           this.$router.back(-1);
      //         }
      //       });
      //     });
      // }
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
