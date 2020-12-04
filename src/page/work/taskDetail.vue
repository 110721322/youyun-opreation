<template>
  <div class="container">
    <div class="p_head">日常任务详情</div>

    <detailMode :rule-form="ruleForm" :config-data="configData" :span-width="24">
      <template v-slot:taskDetail>
        <span class="task-time status">
          {{ status+":" }}
          <transformTime :time="new Date(new Date().getTime()-3600*24*3*1000)"></transformTime>
        </span>
      </template>
    </detailMode>
    <div class="oper-btn">
      <el-button type="primary" size="medium">立即沟通</el-button>
      <el-button type="primary" size="medium">同意</el-button>
      <el-button plain size="medium">拒绝</el-button>
    </div>
  </div>
</template>
<script>
import detailMode from "@/components/detailMode/detailMode2.vue";
import transformTime from "./components/transformTime.vue";

export default {
  name: "TaskDetail",
  components: { detailMode, transformTime },
  data() {
    return {
      status: "任务已创建",
      ruleForm: {
        name: "1",
        name1: "2",
        name2: "3",
        name3: "4",
        email: "12312312@163.com",
        pic: "123123"
      },
      configData: {
        name: "商户结算失败",
        items: [
          {
            name: "时间",
            key: "name1"
          },
          {
            name: "商户名称",
            key: "name"
          },
          {
            name: "所属服务商",
            key: "name"
          },
          {
            name: "交易通道",
            key: "name"
          },
          {
            name: "金额",
            key: "name"
          },
          {
            name: "渠道商户号",
            key: "name"
          },
          {
            name: "失败原因",
            key: "name"
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  .bg_box /deep/ {
    margin: 24px 24px 0;
  }
}

.oper-btn {
  background: #fff;
  margin: 0 24px;
  padding: 0 24px 24px;
}

.task-time {
  display: inline-block;
  position: absolute;
  right: 24px;
  top: 17px;
}

.status {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(144, 147, 153, 1);
  line-height: 22px;
}
</style>
