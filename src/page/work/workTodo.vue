<template>
  <div>
    <div class="tab_head">
      <span class="title">待办事项</span>
      <el-menu
          :default-active="activeIndex"
          class="el-menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">待处理</el-menu-item>
          <el-menu-item index="2">已处理</el-menu-item>
        </el-menu>
      <div style="padding: 24px 24px;background:white;margin:24px;">
        <el-row style="width: 100%;display:flex;align-items:center;">
          <el-col :span="18">
            <el-form class="form">
              <el-row style="width: 100%">
                <el-col :span="11">
                  <el-form-item label="事项类型：" label-width="100px">
                    <el-select v-model="taskValue" placeholder="请选择">
                      <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.taskValue"
                        :value="item.taskType + '/' + item.undoType">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="所属服务商：" label-width="100px">
                    <el-input
                      v-model="taskOwner"
                      placeholder="请输入所属商户ID"
                      class="input-with-select"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="6">
            <div class="btn_list">
              <el-button type="primary" size="large" @click="onClick_search">搜索</el-button>
              <el-button plain size="large" @click="onClick_reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <transition name="fade">
        <div style="display:flex;padding: 0 24px;height: 1500px;">
          <el-tree
            :data="menuConfig"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[0,1]"
            :indent="0"
            class="tree"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ data }" class="custom-tree-node">
              <span>{{ data.taskValue }}</span>
              <span>{{ data.count }}</span>
            </span>
          </el-tree>
          <div class="content-box">
            <div class="form-box">
              <div>
                <taskList
                  :list-data="listData"
                  :type="type"
                  :css-config="cssConfig"
                  :is-check="isCheck"
                  :is-check-all="isCheckAll"
                  :open-type="openType"
                  :status="status"
                  @settleFail="settleFail"
                  @overTime="overTime"
                  @handleCheckList="handleCheckList"
                  @merchantExamine="merchantExamine"
                  @settleExamine="settleExamine"
                  @newAgent="newAgent"
                  @communication="handleCommunication"
                  @agentCompletion="agentCompletion"
                  @subscribe="subscribe"
                  @unitPrice="unitPrice"
                  @frozenAgent="frozenAgent"
                  @transaction="transaction"
                  @stock="stock"
                  @openAgent="openAgent"
                  @distribution="distribution"
                  @relpyWork="relpyWork"
                  @leSuhaExamine="leSuhaExamine"
                  @channelExamine="channelExamine"
                  @commission="commission"
                  @pass="handlePass"
                  @reject="handleReject"
                ></taskList>
              </div>
              <div class="crud-pagination">
                <el-pagination
                  size="medium"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="dataTotal"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>
            <!--<div v-if="isCheck" class="check-bottom">-->
            <!--<span class="confim_text">请选择要批量沟通的任务（已选 {{ checkedListLength }} 个任务）</span>-->
            <!--  <el-button plain class="confim_btn" @click="onClick_multiCommunacation">确定</el-button>-->
            <!--  <span class="cancel_btn" @click="onClick_cancelCheckAll">取消</span>-->
            <!--   <span class="checkall_btn" @click="onClick_doCheckAll">全选</span>-->
            <!--</div>-->
          </div>
          <!--            <div v-if="isCheck" class="check-bottom">-->
          <!--              <span class="confim_text">请选择要批量沟通的任务（已选 {{ checkedListLength }} 个任务）</span>-->
          <!--              <el-button plain class="confim_btn" @click="onClick_multiCommunacation">确定</el-button>-->
          <!--              <span class="cancel_btn" @click="onClick_cancelCheckAll">取消</span>-->
          <!--              <span class="checkall_btn" @click="onClick_doCheckAll">全选</span>-->
          <!--            </div>-->
        </div>
      </transition>
      <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="110px"
          :foot-btn-label="fromConfigData.footBtnLabel"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
      <el-drawer :visible.sync="otherDrawer" :with-header="false" size="500px">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="110px"
          :foot-btn-label="fromConfigData.footBtnLabel"
          @reject="reject"
          @confirm="handel_confirm"
        ></Form>
        <div style="height: 200px; padding-left: 120px;" v-if="openDataConfig.approvalDetail">
          <el-steps direction="vertical" :active="openDataConfig.approvalDetail.length">
            <el-step :description="item.nodeName" :title="item.nodeStatus === 0 ? '发起' : item.nodeStatus === 1 ? '处理中' : item.nodeStatus === 2 ? '待审批' : item.nodeStatus === 3 ? '已通过' : '已驳回'" :key="index" v-for="(item, index) in openDataConfig.approvalDetail"></el-step>
          </el-steps>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_workBench";
import ticketApi from "@/api/api_ticketCenter"
import Form from "@/components/form/index.vue";
import taskList from "./components/taskList.vue";
import store from "@/store";
import * as g from "@/libs/global";
import { TASKLIST_CONFIG } from "./tableConfig/taskListConfig";
import { FORM_CONFIG } from "./formConfig/workTodoConfig";
import { GROUP_MEET } from "../../libs/data/permissionBtns";

export default {
  name: "WorkTodo",
  components: { taskList, Form },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      taskValue: '',
      GROUP_MEET: GROUP_MEET,
      drawer: false,
      otherDrawer: false,
      currentStatus: "",
      checkList: [],
      checkedListLength: 0,
      activeIndex: "1",
      isChangeMode: true,
      inputForm: "",
      inputSelect: "serviceName",
      isCheck: false,
      isCheckAll: false,
      canCheckAll: false,
      showSearch: false,
      inputOptions: [
        {
          label: "服务商名称",
          value: "serviceName"
        }
      ],
      // 当前页码
      pageSize: 10,
      // 每页显示数量
      currentPage: 1,
      // 列表数据总数
      dataTotal: 0,
      fromConfigData: {},
      openDataConfig: {},
      status: "undo",
      listData: [],
      type: "",
      cssConfig: "",
      menuConfig: [],
      defaultProps: {
        children: "children",
        taskValue: "taskValue"
      },
      activityRow: {},
      formStatus: null,
      // 待办事项类型，1日常任务2审批任务
      undo_type: 1,
      undoType: '',
      taskType: '',
      taskOwner: '',
      options: [],
      openType: '',
      taskId: '',
      taskDes: ''
    };
  },
  watch: {
    currentStatus: function($val) {
      // dailyPending 日常未处理 dailyProcessed 日常已处理 approvalPending 审批未处理 approvalProcessed 审批已处理
      switch ($val) {
        case "dailyPending":
          // this.listData = TASKLIST_CONFIG.dailyListData;
          this.type = TASKLIST_CONFIG.dailyType;
          this.cssConfig = TASKLIST_CONFIG.dailyCssConfig;
          this.canCheckAll = true;
          this.showSearch = true;
          break;
        case "dailyProcessed":
          // this.listData = TASKLIST_CONFIG.handleListData;
          this.type = TASKLIST_CONFIG.handleType;
          this.cssConfig = TASKLIST_CONFIG.dailyCssConfig;
          this.canCheckAll = false;
          this.showSearch = false;
          break;
        case "approvalPending":
          // this.listData = TASKLIST_CONFIG.approvalListData;
          this.type = TASKLIST_CONFIG.approvalType;
          this.cssConfig = TASKLIST_CONFIG.approvalCssConfig;
          this.canCheckAll = false;
          this.showSearch = false;
          break;
        case "approvalProcessed":
          // this.listData = TASKLIST_CONFIG.handleListData;
          this.type = TASKLIST_CONFIG.handleType;
          this.cssConfig = TASKLIST_CONFIG.approvalCssConfig;
          this.canCheckAll = false;
          this.showSearch = false;
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.receiverId = store.state.admin.userInfo.id
    this.getTaskMenu()
    this.queryTaskList()
  },
  mounted() {
    this.currentStatus = "dailyPending";
  },
  methods: {
    getTaskMenu() {
      api.queryAllTaskMenu({
        status: this.status,
        undoType: this.undoType,
        taskType: this.taskType
      }).then(res => {
        this.menuConfig = res.datas
        this.undoType = res.datas[0].undoType
        this.taskType = res.datas[0].taskType
        this.getTask()
      })
    },
    queryTaskList() {
      api.queryAllList({}).then(res => {
        this.options = res.datas
      }).catch()
    },
    getTask() {
      api.queryTaskList({
        undoType: this.undoType,
        taskType: this.taskType,
        status: this.status,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        taskOwner: this.taskOwner
      }).then(res => {
        this.openType = this.taskType + '/' + this.undoType;
        this.listData = res.datas.datas;
      })
    },
    cancel() {
      this.drawer = false;
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
          taskId: this.openDataConfig.taskId,
          taskOwner: this.openDataConfig.taskOwner
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已拒绝',
              type: 'success'
            })
            this.otherDrawer = false
            this.getTask()
          }
        }).catch(() => {
          this.$message({
            message: '取消操作',
            type: 'info'
          })
        })
      })
    },
    handel_confirm($form) {
      this.$confirm("确定通过新增服务商审核？", "通过审核", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(res => {
        api.passExamine({
          undoType: this.undoType,
          taskType: this.taskType,
          taskId: this.openDataConfig.taskId,
          taskOwner: this.openDataConfig.taskOwner
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已通过',
              type: 'success'
            })
            this.otherDrawer = false
            this.getTask()
          }
        }).catch(() => {
          this.$message({
            message: '取消操作',
            type: 'info'
          })
        })
      })
    },
    confirm($form) {
      switch (this.taskDes) {
        case "distribu":
          if (!$form.operatorId) {
            this.$message({
              message: '请选择处理人员',
              type: 'info'
            })
          } else {
            ticketApi.designate({
              id: this.taskId,
              operatorId: $form.operatorId
            }).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: '分配成功',
                  type: 'success'
                })
                this.drawer = false
                this.getTask()
              }
            })
          }
          break;
        case "replay":
          if (!$form.solution) {
            this.$message({
              message: '请填写回复内容',
              type: 'info'
            })
          } else {
            ticketApi.reply({
              solution: $form.solution,
              id: this.taskId
            }).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: '回复成功',
                  type: 'success'
                })
                this.drawer = false
                this.getTask()
              }
            })
          }
          break;
        case "settleFail":
          if (!$form.contactPerson || !$form.mobile || !$form.way || !$form.contactContent) {
            this.$message({
              message: '请填写必填信息',
              type: 'warning'
            })
          } else {
            api.insertTalkPlan({})
          }
          break;
        default:
          break;
      }
      this.drawer = false;
    },
    // 商户结算失败，点击弹出立即沟通
    settleFail($data) {
      this.drawer = true
      this.taskId = $data.taskId
      this.taskDes = 'settleFail'
      const commonData = FORM_CONFIG.communicationData
      commonData.formData[4].initVal = $data.merchantName
      commonData.formData[3].initVal = '日常任务 商户结算失败'
      this.fromConfigData = g.utils.deepClone(commonData)
    },
    // 服务商到期，点击弹出立即沟通
    overTime($data) {
      this.drawer = true
      this.taskId = $data.taskId
      this.taskDes = 'overTime'
      const commonData = FORM_CONFIG.communicationData
      commonData.formData[4].initVal = $data.agentName
      commonData.formData[3].initVal = '日常任务 服务商到期'
      this.fromConfigData = g.utils.deepClone(commonData)
    },
    // 预约沟通，点击弹出立即沟通
    subscribe($data) {
      this.fromConfigData = {};
      this.drawer = true;
      this.taskId = $data.taskId;
      this.taskDes = 'subscribe';
      const commonData = FORM_CONFIG.communicationData;
      commonData.formData[4].initVal = $data.agentName;
      commonData.formData[3].initVal = '日常任务 预约沟通';
      this.fromConfigData = g.utils.deepClone(commonData);
    },
    // 新服务商沟通，点击弹出立即沟通
    newAgent($data) {
      this.drawer = true;
      this.taskId = $data.taskId;
      this.taskDes = 'newAgent';
      const commonData = FORM_CONFIG.communicationData;
      commonData.formData[4].initVal = $data.agentName;
      commonData.formData[3].initVal = '日常任务 新服务商沟通';
      this.fromConfigData = g.utils.deepClone(commonData);
    },
    // 客单价异常，点击弹出立即沟通
    unitPrice($data) {
      this.drawer = true
      this.taskId = $data.taskId
      this.taskDes = 'unitPrice'
      const commonData = FORM_CONFIG.communicationData
      commonData.formData[4].initVal = $data.merchantName
      commonData.formData[3].initVal = '日常任务 客单价异常'
      this.fromConfigData = g.utils.deepClone(commonData)
    },
    // 交易数据异常，点击弹出立即沟通
    transaction($data) {
      this.drawer = true
      this.taskId = $data.taskId
      this.taskDes = 'transaction'
      const commonData = FORM_CONFIG.communicationData
      commonData.formData[4].initVal = $data.merchantName
      commonData.formData[3].initVal = '日常任务 交易数据异常'
      this.fromConfigData = commonData
    },
    // 商户入件审核，点击跳转到商户审核界面
    merchantExamine($data) {
      this.$router.push({
        name: 'indirectList',
        query: {
          merchantNo: $data.merchantNo
        }
      })
    },
    // 佣金结算审核，点击进入运营结算审核，列表中筛选出对应的服务商
    settleExamine($data) {
      this.$router.push({
        name: 'operationApprove',
        query: {
          agentNo: $data.agentNo
        }
      })
    },
    // 服务商资料补全，点击进入服务商列表，筛选出对应的服务商
    agentCompletion($data) {
      this.$router.push({
        name: 'agentList',
        query: {
          agentNo: $data.agentNo
        }
      })
    },
    // 设备出库，
    stock($data) {
      this.$router.push({
        name: 'stockOut',
        query: {
          outputNo: $data.taskId
        }
      })
    },
    // 工单 - 分配
    distribution($data) {
      this.drawer = true
      this.taskId = $data.taskId
      this.taskDes = 'distribu'
      this.fromConfigData = FORM_CONFIG.distributionData
    },
    // 工单 - 回复
    relpyWork($data) {
      this.drawer = true
      this.taskId = $data.taskId
      this.taskDes = 'replay'
      this.fromConfigData = FORM_CONFIG.replyData
    },
    // 乐刷申诉审核
    leSuhaExamine($data) {
      this.$router.push({
        name: 'leRiskDetail',
        query: {
          id: $data.taskId
        }
      })
    },
    // 平台资料申诉审核
    channelExamine($data) {
      this.$router.push({
        name: 'merchantRiskDetail',
        query: {
          id: $data.taskId
        }
      })
    },
    // 冻结服务商
    frozenAgent($data) {
      this.openDataConfig = $data
      this.otherDrawer = true
      this.taskId = $data.taskId
      this.taskDes = 'frozenAgent'
      const commonData = FORM_CONFIG.frozenAgent
      commonData.formData[0].initVal = $data.agent.agentNo
      commonData.formData[1].initVal = $data.agent.agentName
      commonData.formData[2].initVal = $data.agent.reason
      this.fromConfigData = g.utils.deepClone(commonData)
    },
    // 开通服务商
    openAgent($data) {
      this.openDataConfig = $data
      this.otherDrawer = true
      this.taskId = $data.taskId
      this.taskDes = 'openAgent'
      const commonData = FORM_CONFIG.openAgentData
      commonData.formData[0].initVal = $data.agent.agentName
      commonData.formData[1].initVal = $data.agent.personName
      commonData.formData[2].initVal = $data.agent.personMobile
      commonData.formData[3].initVal = $data.agent.email
      commonData.formData[4].initVal = $data.agent.businessType
      commonData.formData[5].initVal = $data.agent.companyAddress
      this.fromConfigData = g.utils.deepClone(commonData)
    },
    // 财务佣金结算
    commission($data) {
      this.$router.push({
        name: 'approvalDetail',
        query: {
          configData: $data,
          taskType: this.taskType,
          undoType: this.undoType
        }
      })
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCommunication($data) {
      this.activityRow = $data;
      this.formStatus = "insertTalkPlan";
      this.drawer = true;
    },
    handlePass($data) {
      this.drawer = true;
    },
    handleReject($data) {
      this.drawer = true;
    },
    queryAllTaskMenu(params, fn) {
      api
        .queryAllTaskMenu({
          receiverId: 1,
          status: ""
        })
        .then(fn)
        .catch();
    },
    onClick_doCheckAll() {
      this.isCheckAll = true;
    },
    handleCheckList($data) {
      this.checkList = $data;
      this.checkedListLength = 0;
      for (var i = 0; i <= this.checkList.length; i++) {
        if (this.checkList[i] === true) {
          this.checkedListLength++;
        }
      }
      if (this.checkedListLength !== this.checkList.length) {
        this.isCheckAll = false;
      }
    },
    onClick_reset() {
      this.taskValue = ''
      this.taskOwner = ''
    },
    onClick_cancelCheckAll() {
      this.isCheck = false;
    },
    onClick_search() {
      var type = this.taskValue.split('/');
      this.taskType = type[0];
      this.undoType = type[1];
      this.getTaskMenu();
    },
    handleSelect($item) {
      this.activeIndex = $item;
      switch ($item) {
        case "1":
          this.status = "undo";
          this.currentStatus = "dailyPending";
          break;
        case "2":
          this.status = "done";
          this.currentStatus = "dailyProcessed";
          break;
        case "3":
          this.status = "initiated";
          this.currentStatus = "dailyProcessed";
          break;
        default:
          break;
      }
      this.isChangeMode = false;
      setTimeout(() => {
        this.isChangeMode = true;
      }, 500);
      // 模拟获取数据
      setTimeout(() => {
        this.getTableData();
      }, 1000);
      this.undoType = '';
      this.taskType = '';
      this.getTaskMenu();
    },
    handleNodeClick($data) {
      this.taskType = $data.taskType;
      this.undoType = $data.undoType;
      if (this.activeIndex === "1") {
        if ($data.undoType === 1) {
          this.currentStatus = "dailyPending";
        }
        if ($data.undoType === 2) {
          this.currentStatus = "approvalPending";
        }
      }
      if (this.activeIndex === "2") {
        if ($data.undoType === 1) {
          this.currentStatus = "dailyProcessed";
        }
        if ($data.undoType === 2) {
          this.currentStatus = "approvalProcessed";
        }
      }
      api
        .queryTaskList({
          undoType: $data.undoType,
          taskType: $data.taskType,
          pageSize: 10,
          currentPage: 1,
          status: this.status
        })
        .then(res => {
          this.openType = $data.taskType + '/' + $data.undoType;
          this.listData = res.datas.datas;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
#app .main-container {
  margin-left: 170px;
}

.crud-pagination {
  background: #fff;
  padding: 16px 24px;
  text-align: right;
  margin-top: 25px;
}

.btn_list {
  /* position: absolute;
  top: 0;
  right: 0; */
}

.input-with-select {
  width: 100%;
}

.tree {
  width: 240px;
  background: rgba(255, 255, 255, 1);
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 240px;
  font-size: 14px;
  padding: 0 16px;
}

.form {
  /* height: 88px; */
  background: rgba(255, 255, 255, 1);
  /* padding: 24px; */
  /* margin-bottom: 24px; */
  display: flex;
}
/deep/ .el-form-item{
  margin-bottom: 0;
}

.content-box {
  position: relative;
  width: 100%;
}

.form-box {
  padding: 0 0 0 24px;
}

.check-bottom {
  position: absolute;
  width: 100%;
  height: 60px;
  background: rgba(22, 138, 255, 1);
  bottom: 0;
  padding: 14px 0;
}

.btn_checkall {
  margin-left: 71px;
}

.confim_text {
  margin-left: 236px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  opacity: 0.8;
}

.confim_btn {
  margin-left: 33px;
  width: 85px;
  height: 32px;
}

.cancel_btn {
  margin-left: 32px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(247, 248, 250, 1);
  line-height: 22px;
  opacity: 0.8;
}

.checkall_btn {
  margin-left: 220px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(247, 248, 250, 1);
  line-height: 22px;
  opacity: 0.8;
}
</style>

<style>
.el-tree-node__content {
  height: 37px;
}
</style>
