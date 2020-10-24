<template>
  <div>
    <div class="p_head">新增服务商公告</div>
    <div class="content-box">
      <div class="title">{{ fromConfigData.title }}</div>

      <announcementEdit
        v-if="detailGet"
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
  name: "AnnouncementEdit",
  components: { announcementEdit },
  data() {
    return {
      fromConfigData: FORM_CONFIG.sendMessageData,
      noticeId: this.$route.query.id,
      detailGet: true
    };
  },
  created() {
    // 如果是查询编辑
    if (this.noticeId) {
      this.detailGet = false
      api
        .queryNoticeByPrimaryId({ id: this.noticeId })
        .then(res => {
          this.detailGet = true
          this.fromConfigData.formData.forEach((item, index) => {
            if (item.key === "time") {
              item.initVal = [res.datas.displayStartDate, res.datas.displayEndDate]
            } else if (item.key === 'isReadable') {
              item.initVal = res.datas[item.key]
            } else {
              item.initVal = res.datas[item.key]
            }
            // this.$set(item, item.initVal, res.datas[item.key]);
          });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.fromConfigData.formData.forEach((item, index) => {
        if (item.key === "time") {
          item.initVal = []
        } else if (item.key === "displayType") {
          item.initVal = 1
        } else {
          item.initVal = ''
        }
      });
    }
  },
  methods: {
    handleCommit($ruleForm) {
      if (!$ruleForm.title) {
        this.$message.error('请输入公告标题')
        return
      }
      if (!$ruleForm.content) {
        this.$message.error('请输入公告内容')
        return
      }
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
          if (res.status === 0) {
            this.$message({
              message: this.noticeId ? '编辑成功' : '添加成功',
              type: 'success'
            })
          }
          this.$router.replace({ name: 'serviceAnnouncementList' });
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
  padding-bottom: 24px;
}
.title {
  height: 54px;
  line-height: 54px;
  padding-left: 24px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  border-bottom: 1px solid #ebeef5;
}
</style>
