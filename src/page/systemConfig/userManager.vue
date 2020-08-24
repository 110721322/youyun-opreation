<template>
  <div class="main_page">
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
        <el-button class="btn" type="primary" @click="onClick_showOrganization">组织架构</el-button>
      </div>
      <BaseCrud
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @perfect="onClick_perfect"
        @editBasics="onClick_editBasics"
        @editPost="onClick_editPost"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
      <template v-if="drawer">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          ref="basicEditor"
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </template>
    </el-drawer>
    <el-drawer :visible.sync="drawerPersonInfo" :with-header="false" size="40%">
      <PerfectPost v-if="drawerPersonInfo" :perfect-row="perfectRow" @confirm="confirmPerfectPost" @cancel="cancelPerfectPost"></PerfectPost>
    </el-drawer>
    <el-drawer :visible.sync="drawerOrganization" :with-header="false" size="40%">
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
        <el-button class="foot_btn" type="primary" @click="handleClick">确定</el-button>
        <el-button class="foot_btn" @click="cancelForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_memberManage.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import PerfectPost from "./component/perfectPost.vue";

import { FORM_CONFIG } from "./formConfig/userManager";
import { SEARCH_CONFIG } from "./formConfig/userManagerSearch";
import { USERLIST_CONFIG } from "./tableConfig/userManagerConfig";

export default {
  name: "Theme",
  components: { Search, BaseCrud, PerfectPost, Form },
  data() {
    return {
      searchMaxHeight: "320",
      searchConfig: SEARCH_CONFIG,
      configData: USERLIST_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      drawerPersonInfo: false,
      drawerOrganization: false,
      innerDrawer: false,
      perfectRow: null,
      direction: "rtl",
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      params: {
        state: 0,
        startTime: this.$g.utils.getToday(0) + ' 00:00:00',
        endTime: this.$g.utils.getToday(0) + ' 23:59:59'
      },
      api: api.queryEmployeeList,
      activityRow: {},
      dataItem: [
        {
          id: 1,
          label: "一级 1",
          icon: "el-icon-delete",
          type: "page",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              type: "page",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  type: "page"
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  type: "page",
                  children: [
                    {
                      id: 5,
                      label: "三级 1-1-1",
                      type: "page"
                    },
                    {
                      id: 60,
                      label: "三级 1-1-2",
                      type: "page"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  beforeCreate() {
    api.allMemberList();
    api.jobsList();
  },
  mounted() {},
  methods: {
    handleClick() {
      api
        .addMember({
          phoneList: this.addPhoneList
        })
        .then(res => {
          this.addPhoneList = [""];
          this.$message("已添加");
          this.drawerAddPhone = false;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    cancelForm() {
      this.drawerOrganization = false;
    },
    search($ruleForm) {
      this.params = {
        sex: $ruleForm.sex,
        position: $ruleForm.position,
        superiorName: $ruleForm.superiorName,
        state: 0,
        startTime: $ruleForm.date[0],
        endTime: $ruleForm.date[1]
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    confirm($ruleForm) {
      api
        .fillUserInfo({
          id: this.activityRow.id,
          system: "operation",
          name: $ruleForm.name,
          phone: $ruleForm.phone,
          email: $ruleForm.email,
          sex: $ruleForm.sex,
          jobName: $ruleForm.jobName,
          img: $ruleForm.img,
          jobNumber: $ruleForm.jobNumber,
          birthday: $ruleForm.birthday,
          position: $ruleForm.posiiton,
          superiorId: $ruleForm.superiorId
        })
        .then(res => {
          this.drawer = false;
          this.$message("已保存");
        })
        .catch(err => {
          this.$message(err);
        });
    },
    cancel() {
      this.drawer = false;
    },
    onClick_perfect($row) {
      api
        .employeeDetail({
          id: $row.id
        })
        .then(res => {
          this.perfectRow = res.object;
          this.activityRow = $row;
          this.drawerPersonInfo = true;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    handleClose(done) {
      this.$confirm("还有未保存的工作哦确定关闭吗？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
          this.dataItem = [res.object]
          this.resolveData(this.dataItem)
          this.drawerOrganization = true;
        })
        .catch(err => {
          this.$message(err);
        });
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
          FORM_CONFIG.editData.formData.forEach((item, index) => {
            item.initVal = res.object[item.key];
          });
          this.activityRow = $row;
          this.fromConfigData = FORM_CONFIG.editData;
          this.drawer = true;
          if (this.$refs.basicEditor) {
            this.$refs.basicEditor.init();
          }
        })
        .catch(err => {
          this.$message(err);
        });
    },
    confirmPerfectPost() {
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
  height: 52px;
  width: 100%;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
    margin-left: 10px;
    // line-height: 52px;
  }
  .btn {
    float: right;
  }
}
.foot_btn_box {
  width: 100%;
  height: 96px;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
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
</style>
