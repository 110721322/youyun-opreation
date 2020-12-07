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
      @cancel="onClickCancel"
      @confirm="onClickConfirm"
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
      fromConfigData: FORM_CONFIG.addData, // 表单数据
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
    // 查询详情页面数据
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

    // 点击取消按钮返回上一页
    onClickCancel(done) {
      this.$router.back(-1);
    },

    // 点击确定按钮提交数据
    onClickConfirm($form) {
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
}
</style>
