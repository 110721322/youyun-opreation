<template>
  <div class="main_page">
    <div class="p_head">审批任务详情</div>
    <div class="contents">
      <div class="content">
        <div class="top_title">佣金结算申请</div>
        <div class="step"></div>
        <div class="info">
          <div class="list">
            <div class="list_title">发起人提交信息</div>
            <div class="list_content">
              <li>服务商ID：<span>{{configData.agentSettleRecord.agentNo}}</span></li>
              <li>服务商名称：<span>{{configData.agentSettleRecord.agentName}}</span></li>
              <li>建议结算金额：<span>{{configData.agentSettleRecord.adviseCommission}}</span></li>
              <li>发起备注人：<span>{{configData.approvalPrime.sponsorId}}</span></li>
            </div>
          </div>
          <div class="list">
            <div class="list_title">服务商提交信息</div>
            <div class="list_content">
              <li>发票照片：<img :src="configData.agentSettleRecord.expressImg" alt=""></li>
              <li>发票快递单号：<span>{{configData.agentSettleRecord.expressNumber}}</span></li>
              <li>结算账户：<span>{{configData.agentSettleRecord.settleAccount}}</span></li>
              <li>备用联系方式：<span>{{configData.agentSettleRecord.alternatePhone}}</span></li>
              <li>服务商备注：<span>{{configData.agentSettleRecord.settleRemark}}</span></li>
              <li>结算金额：<span>{{configData.agentSettleRecord.actualSettleCommission}}</span></li>
            </div>
          </div>
        </div>
        <div class="bottom_btn">
          <el-button type="primary" @click="confirm">同意</el-button>
          <el-button @click="reject">拒绝</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import detailMode from "@/components/detailMode/detailMode.vue";
// import transformTime from "./components/transformTime.vue";

// import {configData} from "../topAgent/dataConfig/topAgentDetailData";
import api from "@/api/api_workBench"
export default {
  name: "ApprovalDetail",
  components: {},
  data() {
    return {
      configData: {},
      taskType: ''
    };
  },
  created() {
    this.configData = this.$route.query.configData
    this.taskType = this.$route.query.taskType
    this.undoType = this.$route.query.undoType
  },
  methods: {
    confirm() {
      this.$confirm("确定通过佣金结算审核？", "通过审核", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(res => {
        api.passExamine({
          undoType: this.undoType,
          taskType: this.taskType,
          taskId: this.configData.taskId,
          taskOwner: this.configData.taskOwner
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已通过',
              type: 'success'
            })
            this.$router.replace({
              path: '/work/todo'
            })
          }
        }).catch(() => {
          this.$message({
            message: '取消操作',
            type: 'info'
          })
        })
      })
    },
    reject() {
      this.$confirm("确定拒绝佣金结算审核？", "拒绝审核", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(res => {
        api.rejectExamine({
          undoType: this.undoType,
          taskType: this.taskType,
          taskId: this.configData.taskId,
          taskOwner: this.configData.taskOwner
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已拒绝',
              type: 'success'
            })
            this.$router.replace({
              path: '/work/todo'
            })
          }
        }).catch(() => {
          this.$message({
            message: '取消操作',
            type: 'info'
          })
        })
      })
    }
  }
};
</script>
<style scoped>
.contents {
  width: 100%;
  padding: 24px 24px;
}

.content {
  width: 100%;
  background: #fff;
  padding-bottom: 32px;
}

.top_title {
  width: 100%;
  padding-left: 32px;
  border-bottom: 1px solid #EBEEF5;
  line-height: 54px;
  font-weight: 500;
  font-size: 16px;
}

.step {
  width: 100%;
  height: 220px;
}

.info {
  width: 100%;
  padding: 0 32px;
}

.list {
  width: 100%;
  border: 1px solid #EBEEF5;
  margin-bottom: 24px;
}

.list_title {
  width: 100%;
  background: #fafafa;
  border-bottom: 1px solid #EBEEF5;
  padding-left: 24px;
  font-size: 14px;
  font-weight: 500;
  line-height: 44px;
}

.list_content {
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-wrap: wrap;
}

.list_content li {
  width: 33.3%;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}

.list_content li span {
  color: #606266;
}

.bottom_btn {
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: space-around;
  padding: 0 30%;
}

.bottom_btn button{
  width: 113px;
  height: 40px;
}
</style>

