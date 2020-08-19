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
    <div style="padding: 24px 24px;">
      <el-form v-if="showSearch" class="form">
        <div></div>
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
        <el-form-item label="所属服务商：" label-width="100px" style="margin-left: 60px; width: 100%">
          <el-input
              v-model="taskOwner"
              placeholder="请输入所属商户ID"
              class="input-with-select"
          ></el-input>
          <div class="btn_list">
            <el-button type="primary" size="large" @click="onClick_search">搜索</el-button>
            <el-button plain size="large" @click="onClick_reset">重置</el-button>
            <el-button
                v-if="canCheckAll"
                v-has="GROUP_MEET"
                plain
                size="large"
                class="btn_checkall"
                @click="onClick_toCheckAll"
            >批量沟通</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <transition name="fade">
      <div style="display:flex;padding: 0 24px">
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
                @handleCheckList="handleCheckList"
                @communication="handleCommunication"
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

          <div v-if="isCheck" class="check-bottom">
            <span class="confim_text">请选择要批量沟通的任务（已选 {{ checkedListLength }} 个任务）</span>
            <el-button plain class="confim_btn" @click="onClick_multiCommunacation">确定</el-button>
            <span class="cancel_btn" @click="onClick_cancelCheckAll">取消</span>
            <span class="checkall_btn" @click="onClick_doCheckAll">全选</span>
          </div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
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
  </div>
</template>

<script>
import api from "@/api/api_workBench";
import Form from "@/components/form/index.vue";
import taskList from "./components/taskList.vue";
import store from "@/store"
import { TASKLIST_CONFIG } from "./tableConfig/taskListConfig";
import { FORM_CONFIG } from "./formConfig/workTodoConfig";
import { GROUP_MEET } from "../../libs/data/permissionBtns";

export default {
  name: "WorkToDo",
  components: { taskList, Form },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      taskValue: '',
      GROUP_MEET: GROUP_MEET,
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
      fromConfigData: FORM_CONFIG.communicationData,
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
      openType: ''
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
        this.menuConfig = res.object
        this.undoType = res.object[0].undoType
        this.taskType = res.object[0].taskType
        this.getTask()
      })
    },
    queryTaskList() {
      api.queryAllList({}).then(res => {
        this.options = res.object
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
        this.openType = this.taskType + '/' + this.undoType
        console.log(this.openType)
        this.listData = res.object.datas;
      })
    },
    cancel() {
      this.drawer = false;
    },
    confirm() {
      switch (this.formStatus) {
        case "insertTalkPlan":
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
          break;
        case "insertMultiTalkPlan":
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
          break;

        default:
          break;
      }
      this.drawer = false;
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
    onClick_multiCommunacation($data) {
      if (this.checkList.length === 0) {
        return;
      }
      this.activityRow = this.checkList;
      this.formStatus = "insertMultiTalkPlan";
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
    onClick_reset() {},
    onClick_toCheckAll() {
      this.isCheck = true;
    },
    onClick_cancelCheckAll() {
      this.isCheck = false;
    },
    // getTableData() {
    //   this.queryAllTaskMenu(
    //     {
    //       receiverId: 1,
    //       undoType: 2,
    //       // taskType: 1,
    //       status: ""
    //     },
    //     res => {
    //       this.menuConfig[0].children = res.object.datas;
    //       console.log(res);
    //     }
    //   );
    //   this.queryAllTaskMenu(
    //     {
    //       receiverId: 1,
    //       undoType: 1,
    //       // taskType: 1,
    //       status: ""
    //     },
    //     res => {
    //       this.menuConfig[1].children = res.object.datas;
    //       this.dataTotal = res.object.totalCount;
    //       console.log(res);
    //     }
    //   );
    // },
    onClick_search() {
      var type = this.taskValue.split('/')
      console.log(type)
      this.taskType = type[0]
      this.undoType = type[1]
      this.getTaskMenu()
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
          undoType: $data.undoType,
          taskType: $data.taskType,
          pageSize: 10,
          currentPage: 1,
          status: this.status
        })
        .then(res => {
          this.openType = $data.taskType + '/' + $data.undoType
          console.log(this.openType)
          this.listData = res.object.datas;
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
  position: absolute;
  top: 0;
  right: 0;
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
  height: 88px;
  background: rgba(255, 255, 255, 1);
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
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
