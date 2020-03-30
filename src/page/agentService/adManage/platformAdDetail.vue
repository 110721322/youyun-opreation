<template>
  <div class="ad-detail-box">
    <div class="tab_head">
      <span class="title">编辑广告</span>
    </div>
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
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./../formConfig/platformAdDetailFrom";
import api from "@/api/api_agent.js"
export default {
  name: "Theme",
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG.deviceData,
      id: this.$route.query.id
    };
  },
  methods: {
    cancel(done) {
      this.$router.back(-1);
    },
    confirm($form) {
      console.log($form)
      if (this.id) {
        api.advertUpdate({
          "advertImg": $form.name8,
          "advertName": $form.name7,
          "advertSize": "",
          "id": this.id
        }).then(res => {
          this.$alert('修改成功', '编辑广告', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.back(-1);
            }
          });
        })
      } else {
        api.advertAdd({
          "advertImg": $form.name8,
          "advertName": $form.name7,
          "advertSize": "",
          "advertType": 813
        }).then(res => {
          this.$alert('添加成功', '编辑广告', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.back(-1);
            }
          });
        })
      }
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
