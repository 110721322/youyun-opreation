<template>
  <div class="main_page">
    <div class="p_head">编辑服务商公告</div>
    <div class="content-box">
      <div class="title">{{ fromConfigData.title }}</div>

      <announcementEdit :form-base-data="fromConfigData.formData" :label-width="'auto'"></announcementEdit>
    </div>
  </div>
</template>

<script>
import announcementEdit from "@/components/form/announcementEdit.vue";
import { FORM_CONFIG } from "./formConfig/announcementConfig";

export default {
  name: "Theme",
  components: { announcementEdit },
  data() {
    return {
      fromConfigData: FORM_CONFIG.sendMessageData
    };
  }
};
</script>

<style scoped>
.content-box {
  margin: 24px;
  background-color: #fff;
  padding-bottom: 90px;
}
.title {
  height: 54px;
  line-height: 54px;
  padding-left: 32px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  border-bottom: 1px solid #ebeef5;
}
</style>
