<template>
  <div class="main_page">
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
        <el-menu-item index="3">已发起</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
      <div style="display:flex;">
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
            <el-form class="form">
              <el-form-item label="精准筛选：" label-width="100px">
                <el-input
                  v-model="inputForm"
                  placeholder="请输入内容"
                  class="input-with-select"
                  size="large"
                >
                  <el-select
                    slot="prepend"
                    v-model="inputSelect"
                    style="width:184px"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, key) in inputOptions"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-input>
                <div class="btn_list" style="margin-bottom:0">
                  <el-button type="primary" size="large" @click="onClick_search">搜索</el-button>
                  <el-button plain size="large" @click="onClick_reset">重置</el-button>
                  <el-button
                    v-if="canCheckAll"
                    plain
                    size="large"
                    class="btn_checkall"
                    @click="onClick_toCheckAll"
                  >批量沟通</el-button>
                </div>
              </el-form-item>
            </el-form>
            <div>
              <taskList
                :list-data="listData"
                :type="type"
                :css-config="cssConfig"
                :is-check="isCheck"
                :is-check-all="isCheckAll"
                @handleCheckList="handleCheckList"
                @communication="handleCommunication"
              ></taskList>
            </div>
          </div>

          <div v-if="isCheck" class="check-bottom">
            <span class="confim_text">请选择要批量沟通的任务（已选 {{ checkedListLength }} 个任务）</span>
            <el-button plain class="confim_btn">确定</el-button>
            <span class="cancel_btn" @click="onClick_cancelCheckAll">取消</span>
            <span class="checkall_btn" @click="onClick_doCheckAll">全选</span>
          </div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import api from "@/api/api_workBench";
import Form from "@/components/form/index.vue";
import taskList from "./components/taskList.vue";
import { TASKLIST_CONFIG } from "./tableConfig/taskListConfig";
import { FORM_CONFIG } from "./formConfig/workTodoConfig";

export default {
  name: "WorkToDo",
  components: { taskList, Form },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      drawer: false,
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
      inputOptions: [
        {
          label: "服务商名称",
          value: "serviceName"
        }
      ],
      fromConfigData: FORM_CONFIG.formData,
      status: "undo",
      listData: [],
      type: "",
      cssConfig: "",
      menuConfig: [
        {
          id: 0,
          taskValue: "日常任务",
          count: 50,
          children: [
            { taskValue: "商户结算失败", count: 5, type: "daily" },
            { taskValue: "商户入件审核", count: 5, type: "daily" },
            { taskValue: "服务商到期", count: 5, type: "daily" },
            { taskValue: "佣金结算", count: 5, type: "daily" },
            { taskValue: "预约沟通", count: 5, type: "daily" },
            { taskValue: "新服务商沟通", count: 5, type: "daily" },
            { taskValue: "客单价异常", count: 5, type: "daily" },
            { taskValue: "交易数据异常", count: 5, type: "daily" },
            { taskValue: "服务商资料补全", count: 5, type: "daily" },
            { taskValue: "设备订购出库", count: 5, type: "daily" },
            { taskValue: "工单", count: 5, type: "daily" },
            { taskValue: "乐刷申诉审核", count: 5, type: "daily" },
            { taskValue: "平台商户资料申诉审核", count: 5, type: "daily" }
          ]
        },
        {
          id: 1,
          taskValue: "审批任务",
          count: 50,
          children: [
            { taskValue: "运营佣金结算", count: 5, type: "approval" },
            { taskValue: "财务佣金结算", count: 5, type: "approval" },
            { taskValue: "开通服务商", count: 5, type: "approval" },
            { taskValue: "冻结服务商", count: 5, type: "approval" },
            { taskValue: "群发短信", count: 5, type: "approval" }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        taskValue: "taskValue"
      }
    };
  },
  watch: {
    currentStatus: function($val) {
      // dailyPending 日常未处理 dailyProcessed 日常已处理 approvalPending 审批未处理 approvalProcessed 审批已处理
      switch ($val) {
        case "dailyPending":
          this.listData = TASKLIST_CONFIG.dailyListData;
          this.type = TASKLIST_CONFIG.dailyType;
          this.cssConfig = TASKLIST_CONFIG.dailyCssConfig;
          this.canCheckAll = true;
          break;
        case "dailyProcessed":
          this.listData = TASKLIST_CONFIG.handleListData;
          this.type = TASKLIST_CONFIG.handleType;
          this.cssConfig = TASKLIST_CONFIG.dailyCssConfig;
          this.canCheckAll = false;
          break;
        case "approvalPending":
          this.listData = TASKLIST_CONFIG.approvalListData;
          this.type = TASKLIST_CONFIG.approvalType;
          this.cssConfig = TASKLIST_CONFIG.approvalCssConfig;
          this.canCheckAll = false;
          break;
        case "approvalProcessed":
          this.listData = TASKLIST_CONFIG.handleListData;
          this.type = TASKLIST_CONFIG.handleType;
          this.cssConfig = TASKLIST_CONFIG.approvalCssConfig;
          this.canCheckAll = false;
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.currentStatus = "dailyPending";
    this.getTableData();
  },
  methods: {
    handleCommunication() {
      this.drawer = true;
    },
    queryAllTaskMenu(params, fn) {
      api
        .queryAllTaskMenu({
          receiverId: 1,
          undoType: 2,
          // taskType: 1,
          status: ""
        })
        .then(fn)
        .catch();
    },
    queryAllTaskTypeList() {
      api
        .queryAllTaskTypeList({})
        .then(res => {
          console.log(res);
        })
        .catch();
    },
    insertTalkPlan() {
      api
        .insertTalkPlan({
          addressBookId: 1,
          type: "",
          taskIds: [
            {
              taskId: "",
              taskOwner: ""
            }
          ],
          remark: "",
          nextContactTime: "",
          remindTime: "",
          remindType: "",
          operationId: 1,
          undoType: 1,
          taskType: 1
        })
        .then(res => {
          console.log(res);
        })
        .catch();
    },
    queryAllProblemMerchantOrAgent() {
      api
        .queryAllProblemMerchantOrAgent({
          status: "",
          undoType: 1,
          taskType: 1,
          receiverId: 1
        })
        .then(res => {
          console.log(res);
        })
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
    onClick_reset() {},
    onClick_toCheckAll() {
      this.isCheck = true;
    },
    onClick_cancelCheckAll() {
      this.isCheck = false;
    },
    getTableData() {
      this.queryAllTaskMenu(
        {
          receiverId: 1,
          undoType: 2,
          // taskType: 1,
          status: ""
        },
        res => {
          this.menuConfig[0].children = res.object.datas;
          console.log(res);
        }
      );
      this.queryAllTaskMenu(
        {
          receiverId: 1,
          undoType: 1,
          // taskType: 1,
          status: ""
        },
        res => {
          this.menuConfig[1].children = res.object.datas;
          console.log(res);
        }
      );
    },
    go_detail() {
      // eslint-disable-next-line no-console
      this.$router.push("/agent/list/detail");
    },
    onClick_search() {},
    handleSelect($item) {
      this.activeIndex = $item;
      switch ($item) {
        case "1":
          this.status = "undo";
          this.currentStatus = "dailyPending";
          break;
        case "2":
          this.status = "undo";
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
    },
    handleNodeClick($data) {
      console.log($data);
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
          receiverId: $data.receiverId,
          undoType: $data.undoType,
          taskType: $data.taskType,
          pageSize: 1,
          currentPage: 1,
          status: ""
        })
        .then(res => {
          debugger;
          this.listData = res.datas;
        })
        .catch(err => {
          console.error(err);
        });
    },
    search($form, $obj) {}
  }
};
</script>

<style scoped>
.btn_list {
  margin-left: 24px;
  display: inline-block;
}
.input-with-select {
  width: 490px;
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
  width: calc(100% + 50px);
  min-width: 992px;
  height: 88px;
  background: rgba(255, 255, 255, 1);
  padding: 24px;
}
.content-box {
  position: relative;
}
.form-box {
  padding: 24px;
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
