<template>
  <div class="detail_page">
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
  name: "ShopDetail",
  components: { Form },
  data() {
    return {
      fromConfigData: {},
      id: ''
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.selectById(this.$route.query.id)
    } else {
      this.fromConfigData = FORM_CONFIG.addData
    }
  },
  methods: {
    selectById(id) {
      api
        .selectById({ id: id })
        .then(res => {
          const newFromConfigData = FORM_CONFIG.editData;
          newFromConfigData.formData.forEach((item, index) => {
            item.initVal = res.object[item.key];
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
      if (!$ruleForm.desc || !$ruleForm.deviceId || !$ruleForm.img || !$ruleForm.sort) {
        this.$message({
          message: "请填写必填信息",
          type: "warning"
        })
        return
      }
      if ($ruleForm.deviceType === '') {
        this.$message({
          message: "请填写必填信息",
          type: "warning"
        })
        return
      }
      if (this.id) {
        api
          .deviceMallUpdate({
            id: this.id,
            desc: $ruleForm.desc,
            deviceId: $ruleForm.deviceId,
            deviceType: $ruleForm.deviceType,
            img: $ruleForm.img,
            sort: $ruleForm.sort,
            video: $ruleForm.video
          })
          .then(res => {
            this.$message("保存成功");
            this.$router.replace({ name: "shopCenter" });
          })
      } else {
        api
          .deviceMallAdd({
            deviceId: $ruleForm.deviceId,
            deviceType: $ruleForm.deviceType,
            desc: $ruleForm.desc,
            img: $ruleForm.img,
            sort: $ruleForm.sort,
            video: $ruleForm.video ? $ruleForm.video : ''
          })
          .then(res => {
            if (res.status === 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$router.replace({ name: "shopCenter" });
            }
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style scoped>
.detail_page {
  width: calc(100% - 48px);
  background: #fff;
  margin: 0 24px;
  padding-top: 24px;
  /* height: calc(100% - 24px); */
}
</style>
