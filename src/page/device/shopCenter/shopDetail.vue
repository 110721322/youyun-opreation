<template>
  <div class="main_page">
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
import api from "@/api/api_device";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./../formConfig/shopDetail";

export default {
  name: "Theme",
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG.addData,
      id: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.id && this.selectById();
  },
  methods: {
    selectById() {
      api
        .selectById({ id: this.id })
        .then(res => {
          const newFromConfigData = FORM_CONFIG.editData;
          newFromConfigData.formData.forEach((item, index) => {
            item.initVal = res[item.key];
          });
          this.fromConfigData = newFromConfigData;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    cancel(done) {
      this.$router.back();
    },
    confirm($ruleForm) {
      if (this.id) {
        api
          .deviceMallUpdate({
            desc: $ruleForm.desc,
            deviceId: $ruleForm.deviceId,
            deviceType: $ruleForm.deviceType,
            img: $ruleForm.img,
            sort: $ruleForm.sort,
            video: $ruleForm.video
          })
          .then(res => {
            this.$message("保存成功");
            this.$router.push({ path: "/deviceManage/shopCenter" });
          })
          .catch(err => {
            this.$message(err);
          });
      } else {
        api
          .deviceMallAdd({
            desc: $ruleForm.desc,
            img: $ruleForm.img,
            sort: $ruleForm.sort,
            video: $ruleForm.video
          })
          .then(res => {
            this.$message("添加成功");
            this.$router.push({ path: "/deviceManage/shopCenter" });
          })
          .catch(err => {
            this.$message(err);
          });
      }
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
