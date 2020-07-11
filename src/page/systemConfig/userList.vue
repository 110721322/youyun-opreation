<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">成员列表</span>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      :condition-permission="PERSON_LIST_CONDITION"
      @search="search"
    />

    <div class="table_box">
      <div class="tabale_title_box">
        <el-button v-has="PERSON_LIST_ADD" class="btn" type="primary" @click="onClick_addUser">添加成员</el-button>
      </div>
      <BaseCrud
        ref="child"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :params="params"
        :api-service="api"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @edit="onClick_edit"
        @remove="onClick_remove"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        ref="memberEdit"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
    <el-drawer :visible.sync="drawerAddPhone" :with-header="false" size="40%">
      <div class="p_head">添加成员</div>
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
            <div class="add-icon-box" @click="onClick_addPhoneItem">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="foot_btn_box">
        <el-button class="foot_btn" type="primary" @click="handleClick">确定</el-button>
        <el-button class="foot_btn" @click="cancelForm">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import api from "@/api/api_memberManage.js";

import { validPhone } from "@/libs/kit/validate";
import { FORM_CONFIG } from "./formConfig/userListForm";
import { SEARCH_CONFIG } from "./formConfig/userListSearch";
import { USERLIST_CONFIG } from "./tableConfig/userlistConfig";
import { PERSON_LIST_CONDITION, PERSON_LIST_ADD } from "../../libs/data/permissionBtns";

export default {
  name: "Theme",
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
      direction: "rtl",
      params: {
        state: null,
        startTime: this.$g.utils.getToday(0) + ' 00:00:00',
        endTime: this.$g.utils.getToday(0) + ' 23:59:59'
      },
      api: api.queryEmployeeList,
      addPhoneList: [""],
      activityRow: {}
    };
  },
  mounted() {
    // this.getTableData();
  },
  methods: {
    onClick_addPhoneItem() {
      if (this.addPhoneList.length < 20) {
        this.addPhoneList.push("");
      } else {
        this.$message("一次最多添加20个");
      }
    },
    search($ruleForm) {
      this.params = {
        sex: $ruleForm.sex,
        state: null,
        startTime: $ruleForm.date[0],
        endTime: $ruleForm.date[1]
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    getTableData() {
      this.testData = [
        {
          id: 1,
          nickName: "日常任务",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          amount: "222.22",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          reason: "银行卡账号错误，服务商无法联系"
        },
        {
          id: 2,
          nickName: "日常任务",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          amount: "222.22",
          reason: "银行卡账号错误，服务商无法联系"
        }
      ];
    },
    onClick_addUser() {
      this.drawerAddPhone = true;
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
        phoneList: this.addPhoneList
      }).then(res => {
        this.addPhoneList = [""];
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.drawerAddPhone = false;
      })
    },
    cancelForm() {
      this.drawerAddPhone = false;
    },
    cancel() {
      this.drawer = false;
    },
    confirm($ruleForm) {
      const img = this.$g.utils.isString($ruleForm.img) ? $ruleForm.img : ($ruleForm.img.dialogImagePath + $ruleForm.img.dialogImageUrl); // 兼容未修改图片情况
      api
        .fillUserInfo({
          id: this.activityRow.id,
          system: "operation",
          name: $ruleForm.name,
          phone: $ruleForm.phone,
          password: $ruleForm.password,
          email: $ruleForm.email,
          sex: $ruleForm.sex,
          jobName: $ruleForm.jobName,
          img: img,
          jobNumber: $ruleForm.jobNumber,
          birthday: $ruleForm.birthday,
          nickName: $ruleForm.nickName
        })
        .then(res => {
          this.drawer = false;
          this.$message("已保存");
        })
        .catch(err => {
          this.$message(err);
        });
    },
    onClick_edit($row) {
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
          if (this.$refs.memberEdit) {
            this.$refs.memberEdit.init();
          }
        })
        .catch(err => {
          this.$message(err);
        });
    },
    /**
     * 删除
     * @param {Object} $row
     */
    onClick_remove($row) {
      this.$confirm("确认删除该成员吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.delMember({
          id: $row.id
        }).then(res => {
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
  height: 730px;
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
    .add-icon-box {
      position: absolute;
      bottom: 20px;
      right: -40px;
      font-size: 20px;
    }
  }
  .add-phone-input {
    margin-bottom: 16px;
  }
}
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
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
