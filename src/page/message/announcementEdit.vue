<template>
  <div class="main_page">
    <div class="p_head">编辑服务商公告</div>
    <div class="content-box">
      <div class="title">{{ fromConfigData.title }}</div>

      <announcementEdit
        ref="form"
        :form-base-data="fromConfigData.formData"
        :label-width="'auto'"
        @commit="handleCommit"
      ></announcementEdit>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_message";
import announcementEdit from "@/components/form/announcementEditForm.vue";
import { FORM_CONFIG } from "./formConfig/announcementConfig";

export default {
  name: "Theme",
  components: { announcementEdit },
  data() {
    return {
      fromConfigData: FORM_CONFIG.sendMessageData,
      noticeId: this.$route.query.id
    };
  },
  created() {
    // 如果是查询编辑
    api
      .queryNoticeByPrimaryId({ id: this.noticeId })
      .then(res => {
        this.fromConfigData.formData.forEach((item, index) => {
          item.key === "time"
            ? (item.initVal[0] = res.object["displayStartDate"]) &&
              (item.initVal[1] = res.object["displayEndDate"])
            : (item.initVal = res.object[item.key]);
          // this.$set(item, item.initVal, res.object[item.key]);
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    handleCommit($ruleForm) {
      // const ruleForm = this.$refs.form.handleClick();
      // if (!ruleForm) {
      //   this.$message('请完善资料');
      //   return;
      // }
      if ($ruleForm.messageType === 1) {
        if ($ruleForm.readableTime) {
          const num = parseInt($ruleForm.readableTime)
          if (num > 1000 || num < 0) {
            this.$message.error('请输入1-1000内的整数')
            return;
          }
        } else {
          this.$message.error('请输入阅读时间')
          return
        }
      }
      const dataType = this.noticeId ? 'update' : 'add'
      api[dataType]({
        title: $ruleForm.title,
        messageType: $ruleForm.messageType,
        content: $ruleForm.content,
        displayStartDate: $ruleForm.time[0],
        displayEndDate: $ruleForm.time[1],
        displayType: $ruleForm.displayType,
        isReadable: $ruleForm.isReadable,
        readableTime: $ruleForm.readableTime,
        from: "operation",
        to: "agent",
        isAlreadyRead: false,
        id: this.noticeId ? this.noticeId : ''
      })
        .then(res => {
          this.$alert("修改成功");
          this.$router.push({ path: "/message/serviceAnnouncementList" });
        })
        .catch();
    }
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
