<template>
  <div>
    <div class="tab-head">
      <span class="title">成员列表</span>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      :condition-permission="PERSON_LIST_CONDITION"
      @search="search"
    />

    <div class="table-box">
      <div class="tabale-title-box">
        <el-button v-has="PERSON_LIST_ADD" class="btn" type="primary" @click="clickAddUser">添加成员</el-button>
      </div>
      <BaseCrud
        ref="child"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="100"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :params="params"
        :api-service="api"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @edit="onClickEdit"
        @remove="onClickRemove"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <Form
        v-if="drawer"
        ref="memberEdit"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        :is-drawer="true"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
    <el-drawer :visible.sync="drawerAddPhone" :with-header="false" size="500px">
      <div class="p-head">添加成员</div>
      <div class="scroll-box">
        <div class="add-phone-box">
          <div class="phone-label">手机号：</div>
          <div class="input-box">
            <el-input
              v-for="(item,index) in addPhoneList"
              :key="index"
              v-model="addPhoneList[index]"
              class="add-phone-input"
            ></el-input>
            <div class="operation-icon-box">
              <div class="add-icon-box" @click="clickAddPhoneItem">
                <i class="el-icon-plus"></i>
              </div>
              <div v-if="isShowDel" class="del-icon-box" @click="handleDeletePhoneItem">
                <i class="el-icon-minus"></i>
              </div>
            </div>
            <!--            <div class="add-icon-box" v-if="addPhoneList.length>1" @click="onClick_reducePhoneItem" style="right:-80px">-->
            <!--              <i class="el-icon-minus"></i>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <div class="foot-btn-box">
        <el-button type="primary" size="normal" @click="handleClick">确定</el-button>
        <el-button size="normal" @click="cancelForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import api from "@/api/api_memberManage.js";
import api_params from "@/api/api_params.js";
import { validPhone } from "@/libs/kit/validate";
import { FORM_CONFIG } from "./formConfig/userListForm";
import { SEARCH_CONFIG } from "./formConfig/userListSearch";
import { USERLIST_CONFIG } from "./tableConfig/userlistConfig";
import { PERSON_LIST_CONDITION, PERSON_LIST_ADD } from "../../libs/data/permissionBtns";

export default {
  name: "UserList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      PERSON_LIST_CONDITION: PERSON_LIST_CONDITION,
      PERSON_LIST_ADD: PERSON_LIST_ADD,
      searchMaxHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: USERLIST_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      drawerAddPhone: false,
      params: {
        state: null
      },
      api: api.queryEmployeeList,
      addPhoneList: [""],
      activityRow: {},
      isShowDel: false
    };
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
            if (fieldConfig) {
              field.isShow = fieldConfig.isDisplay;
              field.rules[0].required = fieldConfig.isNeed;
            }
          }
        })
    },

    clickAddPhoneItem() {
      if (this.addPhoneList.length > 0) {
        this.isShowDel = true;
      }
      if (this.addPhoneList.length < 20) {
        this.addPhoneList.push("");
      } else {
        this.$message("一次最多添加20个");
      }
    },

    handleDeletePhoneItem() {
      this.addPhoneList.pop();
      if (this.addPhoneList.length <= 1) {
        this.isShowDel = false;
        return;
      }
    },

    search($ruleForm) {
      this.params = {
        sex: $ruleForm.sex,
        state: null,
        startTime: ($ruleForm.date && $ruleForm.date[1]) ? $ruleForm.date[0] + ' 00:00:00' : null,
        endTime: ($ruleForm.date && $ruleForm.date[1]) ? $ruleForm.date[1] + ' 23:59:59' : null,
        [$ruleForm.inputForm]: $ruleForm.inputFormVal
      };
    },

    clickAddUser() {
      this.addPhoneList = [""]
      this.drawerAddPhone = true
    },

    handleClick() {
      let addPhoneList = this.addPhoneList;
      addPhoneList = addPhoneList.filter($phone => $phone !== "")
      if (addPhoneList.length === 0) {
        this.$message({
          message: '请添加手机号',
          type: 'warning'
        });
        return false;
      }
      for (const $phone of addPhoneList) {
        if (!validPhone($phone)) {
          this.$message({
            message: '请填写正确手机号',
            type: 'warning'
          });
          return false
        }
      }
      api.addMember({
        phoneList: this.addPhoneList.filter(item => item !== "")
      }).then(res => {
        if (res.code) return res;
        this.addPhoneList = [""];
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.drawerAddPhone = false;
        this.$refs.child.getData()
      })
    },

    cancelForm() {
      this.drawerAddPhone = false;
    },

    cancel() {
      this.drawer = false;
    },

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
          birthday: $ruleForm.birthday
        })
        .then(res => {
          if (res.code === 0) return res;
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.drawer = false;
          this.$refs.child.getData();
        })
    },

    onClickEdit($row) {
      api
        .employeeDetail({
          id: $row.id
        })
        .then(res => {
          if (res.code) return res;
          FORM_CONFIG.editData.formData.forEach((item, index) => {
            item.initVal = res.data[item.key];
          });
          this.activityRow = $row;
          this.fromConfigData = FORM_CONFIG.editData;
          this.drawer = true;
          if (this.$refs.memberEdit) {
            this.$refs.memberEdit.init();
          }
        })
    },

    /**
     * 删除
     * @param {Object} $row
     */
    onClickRemove($row) {
      this.$confirm("确认删除该成员吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.delMember({
          id: $row.id
        }).then(res => {
          if (res.code) return res;
          this.$refs.child.getData();
          this.$message({
            type: "success",
            message: "已删除"
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-box {
  height: auto;
  padding-bottom: 114px;
  overflow: auto;
}

.add-phone-box {
  display: flex;
  padding: 24px;
  justify-content: flex-start;

  .phone-label {
    width: 70px;
    line-height: 30px;
  }

  .input-box {
    width: 50%;
    position: relative;

    .operation-icon-box {
      position: absolute;
      bottom: 20px;
      right: -50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 50px;
    }

    .add-icon-box,.del-icon-box {
      margin-left: 5px;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .add-phone-input {
    margin-bottom: 16px;
  }
}
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.tabale-title-box {
  height: 52px;
  width: 100%;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
    margin-left: 10px;
  }

  .btn {
    float: right;
  }
}

.foot-btn-box {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px 24px;
  align-content: center;
  width: 500px;
  background: white;
  border-top: 1px solid #ebeef5;

  .foot-btn {
    margin-top: 28px;
    margin-left: 12px;
    margin-right: 12px;
    width: 113px;
    height: 40px;
  }

  .form-box {
    margin: 0 59px;
  }
}
</style>
