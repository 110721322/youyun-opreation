<template>
  <div class="container">
    <div class="p-head">审批任务详情</div>
    <div class="contents">
      <div class="content">
        <div class="top-title">佣金结算申请</div>
        <div class="step">
          <div v-if="configData.approvalDetail.length>0" class="step-box">
            <el-steps :active="configData.approvalDetail.length" align-center>
              <el-step v-for="(item,index) in configData.approvalDetail" :key="index">
                <template slot="icon">
                  <div class="step-border">
                    <img :src="item.img" class="step-img" :class="[item.isApproval?'step-imgborder':'']" alt="icon" />
                    <i v-if="item.isCheck" class="el-icon-check step-check"></i>
                  </div>
                </template>
                <template slot="title">
                  <div
                    v-if="item.title"
                    class="step-title"
                    :class="[item.isApproval?'step-title-blue':item.isUndo?'step-title-gray':'step-title-normal']"
                  >{{ item.title }}</div>
                </template>
                <template slot="description">
                  <div v-if="item.nodeStatus" class="step-description">{{ item.nodeStatus === 0 ? '发起' : item.nodeStatus === 1 ? '处理中' : item.nodeStatus === 2 ? '待审批' : item.nodeStatus === 3 ? '已通过' : '已驳回' }}</div>
                  <div v-if="item.nodeName" class="step-time">{{ item.nodeName }}</div>
                  <div v-if="item.createTime" class="step-note">{{ item.createTime }}</div>
                </template>
              </el-step>
            </el-steps>
          </div>
        </div>
        <div class="info">
          <div class="list">
            <div class="list-title">发起人提交信息</div>
            <div class="list-content">
              <li>服务商ID：<span>{{ configData.agentSettleRecord.agentNo }}</span></li>
              <li>服务商名称：<span>{{ configData.agentSettleRecord.agentName }}</span></li>
              <li>建议结算金额：<span>{{ configData.agentSettleRecord.adviseCommission }}</span></li>
              <li>发起备注人：<span>{{ configData.approvalPrime.sponsorId }}</span></li>
            </div>
          </div>
          <div class="list">
            <div class="list-title">服务商提交信息</div>
            <div class="list-content">
              <li>发票照片：<img :src="configData.agentSettleRecord.expressImg" alt="icon" /></li>
              <li>发票快递单号：<span>{{ configData.agentSettleRecord.expressNumber }}</span></li>
              <li>结算账户：<span>{{ configData.agentSettleRecord.settleAccount }}</span></li>
              <li>备用联系方式：<span>{{ configData.agentSettleRecord.alternatePhone }}</span></li>
              <li>服务商备注：<span>{{ configData.agentSettleRecord.settleRemark }}</span></li>
              <li>结算金额：<span>{{ configData.agentSettleRecord.actualSettleCommission }}</span></li>
            </div>
          </div>
        </div>
        <div class="bottom-btn">
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
      }).then(() => {
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
              name: 'workTodo'
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
              name: 'workTodo'
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
<style scoped lang="scss">
.contents {
  width: 100%;
  padding: 24px 24px;
}

.content {
  width: 100%;
  background: #fff;
  padding-bottom: 32px;
}

.top-title {
  width: 100%;
  padding-left: 24px;
  border-bottom: 1px solid #ebeef5;
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
  border: 1px solid #ebeef5;
  margin-bottom: 24px;
}

.list-title {
  width: 100%;
  background: #fafafa;
  border-bottom: 1px solid #ebeef5;
  padding-left: 24px;
  font-size: 14px;
  font-weight: 500;
  line-height: 44px;
}

.list-content {
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-wrap: wrap;
}

.list-content li {
  width: 33.3%;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}

.list-content li span {
  color: #606266;
}

.bottom-btn {
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: space-around;
  padding: 0 30%;
}

.bottom-btn button {
  width: 113px;
  height: 40px;
}

.step-box {
  padding: 56px 24px 24px;

  .step-title {
    height: 22px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 53, 1);
    line-height: 22px;
  }

  .step-title-normal {
    color: rgba(51, 51, 53, 1);
  }

  .step-title-blue {
    color: rgba(25, 137, 250, 1);
  }

  .step-title-gray {
    color: rgba(144, 147, 153, 1);
  }

  .step-description {
    height: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
  }

  .step-time {
    margin-top: 4px;
    height: 12px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 12px;
  }

  .step-note {
    margin: 10px auto 0;
    height: 26px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 26px;
  }

  .step-border {
    position: relative;
    flex-shrink: 0;
    background-color: #fff;
    width: 82px;
    height: 44px;
    text-align: center;
  }

  .step-check {
    position: absolute;
    right: 17px;
    bottom: 0;
    color: #fff;
    width: 18px;
    height: 18px;
    background: rgba(25, 137, 250, 1);
    border-radius: 50%;
    line-height: 18px;
  }

  .step-img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }

  .step-imgborder {
    padding: 5px;
    border: 2px solid rgba(25, 137, 250, 1);
    box-sizing: content-box;
    margin-top: -14px;
  }

  .foot-btn-box {
    width: 100%;
    height: 96px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;

    .foot-btn {
      width: 113px;
      height: 40px;
      margin-top: 28px;
      margin-left: 12px;
      margin-right: 12px;
    }

    .form-box {
      margin: 0 59px;
    }
  }
}
</style>

