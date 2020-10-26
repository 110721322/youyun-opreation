<template>
  <div>
    <div class="tab_head">
      <span class="title">成员管理</span>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      :permission="searchConfig.permission"
      @search="search"
    />

    <div class="table_box">
      <div class="tabale_title_box">
        <el-button @click="onClick_showOrganization">组织架构</el-button>
        <el-button type="primary" @click="add_job">职位管理</el-button>
      </div>
      <BaseCrud
        ref="customerTable"
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="220"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @perfect="onClick_perfect"
        @editBasics="onClick_editBasics"
        @editPost="onClick_perfect"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <template v-if="drawer">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          ref="basicEditor"
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          :is-drawer="true"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </template>
    </el-drawer>
    <el-drawer :visible.sync="jobDrawer" :with-header="false" size="550px">
      <div class="p_head">职位管理</div>
      <div class="add_content">
        <span>添加职位:</span>
        <el-input v-model="nameJob" placeholder="请填写职位名称"></el-input>
        <el-button type="primary" @click="add_jobName">添加</el-button>
      </div>
      <div style="padding: 0 24px;">
        <BaseCrud
          ref="jobTable"
          :params="jobParams"
          :api-service="apiJob"
          :grid-config="jobconfigData.gridConfig"
          :grid-btn-config="jobconfigData.gridBtnConfig"
          :form-config="jobconfigData.formConfig"
          :form-data="jobconfigData.formModel"
          :grid-edit-width="150"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :default-expand-all="false"
          @rowEdit="edit_job"
          @deleteJob="delete_job"
          @okEdit="ok_edit"
        ></BaseCrud>
      </div>
    </el-drawer>
    <el-drawer :visible.sync="drawerPersonInfo" :with-header="false" size="500px">
      <PerfectPost v-if="drawerPersonInfo" :perfect-row="perfectRow" @confirm="confirmPerfectPost" @cancel="cancelPerfectPost" @refreshJobInfo="onClick_perfect"></PerfectPost>
    </el-drawer>
    <el-drawer :visible.sync="drawerOrganization" :with-header="false" size="500px">
      <div class="p_head">组织架构</div>
      <el-tree
        :data="dataItem"
        node-key="id"
        default-expand-all
        draggable
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
      ></el-tree>
      <div class="foot_btn_box">
        <el-button size="normal" @click="cancelForm">关闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_memberManage.js";
import api_params from "@/api/api_params.js";
import api_systemConfig from "@/api/api_systemConfig";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import PerfectPost from "./component/perfectPost.vue";
import { JOBCONFIG } from "./tableConfig/jogConfig";
import { FORM_CONFIG } from "./formConfig/userManager";
import { SEARCH_CONFIG } from "./formConfig/userManagerSearch";
import { USERLIST_CONFIG } from "./tableConfig/userManagerConfig";
import { mapState } from "vuex"

export default {
  name: "UserManager",
  components: { Search, BaseCrud, PerfectPost, Form },
  data() {
    return {
      searchMaxHeight: "320",
      searchConfig: SEARCH_CONFIG,
      configData: USERLIST_CONFIG,
      jobconfigData: JOBCONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      drawerPersonInfo: false,
      drawerOrganization: false,
      innerDrawer: false,
      jobDrawer: false,
      perfectRow: null,
      direction: "rtl",
      nameJob: "",
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      params: {
        state: 0
      },
      jobParams: {},
      api: api.queryEmployeeList,
      apiJob: api_systemConfig.selectAllJob,
      activityRow: {},
      dataItem: [],
      fieldsList: []
    };
  },
  computed: {
    ...mapState({
      employeeList: (state) => state.system.employeeList,
      positionList: (state) => state.system.positionList
    })
  },
  watch: {
    employeeList: {
      handler() {
        this.searchConfig.formData[4].options = this.employeeList
        FORM_CONFIG.editData.formData[6].options = this.employeeList
      },
      deep: true
    },
    positionList: {
      handler() {
        this.searchConfig.formData[3].options = this.positionList
        FORM_CONFIG.editData.formData[5].options = this.positionList
      },
      deep: true
    }
  },
  beforeCreate() {
    api.allMemberList();
    api.jobsList();
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      api_params
        .queryAllFormFieldsByType({
          type: "employee_edit"
        })
        .then(res => {
          if (!this.$g.utils.isArr(res.data) || res.code) return res;
          const fieldsList = res.data;
          for (const field of FORM_CONFIG.editData.formData) {
            const fieldConfig = fieldsList.filter(item => item.id === field.id)[0]
            console.log(fieldConfig)
            if (fieldConfig) {
              field.isShow = fieldConfig.isDisplay;
              field.rules[0].required = fieldConfig.isNeed;
            }
          }
        })
    },
    cancelForm() {
      this.drawerOrganization = false;
    },
    search($ruleForm) {
      this.params = {
        sex: $ruleForm.inputFormVal ? "" : $ruleForm.sex,
        position: $ruleForm.inputFormVal ? "" : $ruleForm.position,
        superiorName: $ruleForm.inputFormVal ? "" : $ruleForm.superiorName,
        state: 0,
        startTime: ($ruleForm.inputFormVal || $ruleForm.date.length === 0) ? "" : $ruleForm.date[0] + ' 00:00:00',
        endTime: ($ruleForm.inputFormVal || $ruleForm.date.length === 0) ? "" : $ruleForm.date[1] + ' 23:59:59',
        [$ruleForm.inputForm]: $ruleForm.inputFormVal
      };
    },
    selectionChange($val) {},
    confirm($ruleForm) {
      api
        .fillUserInfo({
          id: this.activityRow.id,
          system: "operation",
          name: $ruleForm.name,
          email: $ruleForm.email,
          sex: $ruleForm.sex,
          jobName: $ruleForm.jobName,
          img: $ruleForm.img,
          jobNumber: $ruleForm.jobNumber,
          birthday: $ruleForm.birthday,
          position: $ruleForm.position,
          superiorId: $ruleForm.superiorId,
          password: $ruleForm.password,
          status: $ruleForm.status
        })
        .then(res => {
          if (res.code) return res;
          this.drawer = false;
          this.$refs.customerTable.getData();
          this.$message({
            type: "success",
            message: "已保存"
          });
        })
    },
    cancel() {
      this.drawer = false;
    },
    onClick_perfect($row) {
      if (!$row) {
        $row = this.activityRow
      }
      api
        .jobInformation({
          id: $row.id
        })
        .then(res => {
          if (res.code) return res
          this.perfectRow = res.data;
          this.perfectRow.roleId = $row.roleId;
          this.activityRow = $row;
          this.drawerPersonInfo = true;
        })
    },
    handleClose(done) {
      this.$confirm("还有未保存的工作哦确定关闭吗？")
        .then(_ => {
          done();
        })
    },
    onClick_setPower() {
      this.innerDrawer = true;
    },
    onClick_editPost() {
      this.drawerPersonInfo = true;
    },
    onClick_showOrganization($row) {
      // this.drawerOrganization = true;
      api
        .employeeOrganization({
          id: $row.id
        })
        .then(res => {
          if (res.code) return res;
          this.dataItem = [res.data]
          this.resolveData(this.dataItem)
          this.drawerOrganization = true;
        })
    },
    resolveData(arr) {
      arr.forEach((item, index) => {
        item.label = item.name
        item.children = item.lowerUserList
        if (item.lowerUserList) {
          this.resolveData(item.lowerUserList)
        }
      })
    },
    onClick_editBasics($row) {
      api
        .employeeDetail({
          id: $row.id
        })
        .then(res => {
          if (res.code) return res
          FORM_CONFIG.editData.formData.forEach((item, index) => {
            if (item.key === "password") {
              item.initVal = ""
            } else {
              item.initVal = res.data[item.key];
            }
          });
          this.activityRow = $row;
          this.fromConfigData = FORM_CONFIG.editData;
          this.drawer = true;
          if (this.$refs.basicEditor) {
            this.$refs.basicEditor.init();
          }
        })
    },
    add_job() {
      this.nameJob = ""
      this.jobDrawer = true
    },
    add_jobName() {
      if (!this.nameJob) {
        this.$message({
          message: "请填写职位名称",
          type: "warning"
        })
        return
      }
      api_systemConfig.addInsert({
        name: this.nameJob
      }).then(res => {
        if (res.code) return res;
        this.$message({
          message: "添加成功",
          type: "success"
        })
        this.nameJob = ""
        this.$refs.jobTable.getData()
      })
    },
    edit_job($item) {
      $item.edit = true;
    },
    ok_edit($item) {
      if (!$item.name) {
        this.$message({
          message: "请填写职位名称",
          type: "warning"
        })
        return
      }
      api_systemConfig.updateJob({
        name: $item.name,
        id: $item.id
      }).then(res => {
        if (res.code) return res;
        this.$message({
          message: "编辑成功",
          type: "success"
        })
        this.$refs.jobTable.getData()
        $item.edit = false;
      })
    },
    delete_job(row) {
      this.$confirm("确认删除该职位吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api_systemConfig.deleteJob({
          id: row.id
        }).then(res => {
          if (res.code) return res
          this.$message({
            message: "删除成功",
            type: "success"
          })
          this.$refs.jobTable.getData()
        })
      })
    },
    confirmPerfectPost() {
      this.$refs.customerTable.getData()
      this.drawerPersonInfo = false;
    },
    cancelPerfectPost() {
      this.drawerPersonInfo = false;
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    }
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
}

.tabale_title_box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
  .btn {
    margin-left: 0;
    height: 32px;
    margin-right: 12px;
    padding: 6px 24px;
  }
  .btn:last-child {
    margin-right: 0;
  }
}
.foot_btn_box {
  width: 500px;
  // height: 96px;
  border-top: 1px solid #ebeef5;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  .foot_btn {
    width: 113px;
    height: 40px;
    margin-top: 28px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .form_box {
    margin: 0 59px;
  }
}
// /deep/.content_drawer {
//     height: calc(100vh - 172px);
//     overflow: hidden;
// }
/deep/.formTemplate {
  margin: 0;
  padding: 40px 20px 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
  flex: 1;
  box-sizing: border-box;
}
.add_content {
  width: 550px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  padding-top: 24px;
  margin-bottom: 32px;
  span {
    white-space: nowrap;
    font-size: 16px;
    font-weight: 400;
    padding-right: 20px;
  }
  .el-input {
    width: 300px;
    margin-right: 16px;
  }
}
</style>
