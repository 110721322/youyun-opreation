<template>
  <div class="ad-detail-box">
    <div class="tab-head">
      <span class="title">{{ id?'编辑广告':'新增广告' }}</span>
    </div>
    <Form
      v-if="show || !this.$route.query.id "
      :form-base-data="fromConfigData.formData"
      :show-foot-btn="fromConfigData.showFootBtn"
      label-width="130px"
      @cancel="cancel"
      @confirm="confirm"
    ></Form>
  </div>
</template>

<script>
import apiAgent from "@/api/api_agent.js";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "../formConfig/platformAdDetailFrom";
export default {
  name: "PlatformAdDetail",
  components: { Form },
  data() {
    return {
      fromConfigData: FORM_CONFIG.addData,
      id: this.$route.query.id,
      show: false
    };
  },
  mounted() {
    if (this.id) {
      this.queryById();
    }
  },
  methods: {
    queryById() {
      apiAgent.advertQueryById({ id: this.id }).then(res => {
        // 编辑前重赋值
        FORM_CONFIG.editData.formData.forEach((item, index) => {
          item.initVal = res.data[item.key];
        });
        this.fromConfigData = FORM_CONFIG.editData;
        this.show = true;
      })
    },
    cancel(done) {
      this.$router.back(-1);
    },
    confirm($form) {
      if (this.id) {
        apiAgent.advertUpdate({
          advertImg: $form.advertImg.dialogImageUrl,
          advertName: $form.advertName,
          advertSize: "",
          id: this.id
        }).then(res => {
          this.$router.back(-1);
        });
      } else {
        apiAgent.advertAdd({
          advertImg: $form.advertImg.dialogImageUrl,
          advertName: $form.advertName,
          advertSize: "",
          advertType: $form.advertType
        }).then(res => {
          this.$router.back(-1);
        });
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
