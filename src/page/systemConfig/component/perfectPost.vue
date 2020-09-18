<template>
  <div>
    <div class="p_head">{{ formConfigData.title }}</div>
    <Form
      ref="jopsForm"
      :form-base-data="formConfigData.formData"
      :show-foot-btn="formConfigData.showFootBtn"
      label-width="130px"
      @confirm="confirm"
      @cancel="cancel"
    >
    </Form>
    <div class="u-form-item">
      <label class="s-required">权限:</label>
      <div class="g-form-content">
        <span style="margin-right: 16px;">未设置</span>
        <el-button type="text" style="font-size: 14px; padding: 0;" @click="onClick_setPower">设置</el-button>
      </div>
    </div>
    <div class="u-form-item">
      <label>审批:</label>
      <div class="g-form-content">
        <span style="margin-right: 16px;">未设置</span>
        <el-button type="text" style="font-size: 14px; padding: 0;" @click="onClick_setAudit">设置</el-button>
      </div>
    </div>
    <el-drawer :append-to-body="true" :visible.sync="innerDrawer" :with-header="false" size="40%">
      <power-set v-if="innerDrawer" :template-list="permissionTemplate" :api-service="permissionApi" @confirm="saveUserPermission"></power-set>
    </el-drawer>
    <el-drawer :append-to-body="true" :visible.sync="auditDrawer" :with-header="false" size="40%">
      <audit-set v-if="auditDrawer" :template-list="auditTemplate" :api-service="auditApi" @confirm="saveUserAudit"></audit-set>
    </el-drawer>
  </div>
</template>
<script>
import PowerSet from "./powerSet.vue";
import auditSet from "./auditSet.vue";
import Form from "@/components/form/index.vue";

import api_memberManage from "@/api/api_memberManage.js";
import api_systemConfig from "@/api/api_systemConfig.js";
import { FORM_CONFIG } from "../formConfig/perfectPost";

import { mapState } from 'vuex';

export default {
  name: "PerfectPost",
  components: { PowerSet, Form, auditSet },
  props: {
    perfectRow: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      innerDrawer: false,
      auditDrawer: false,
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      permissionTemplate: [], //  权限模板
      auditTemplate: [], //  权限模板
      permissionApi: api_systemConfig.getPermistionTemplate, //  权限模板api
      auditApi: api_systemConfig.getAuditTemplate //  审核模板API
    };
  },
  computed: {
    ...mapState({
      positionList: state => state.system.employeeList,
      employeeList: state => state.system.positionList
    }),
    formConfigData() {
      FORM_CONFIG.editData.formData.forEach((item, index) => {
        item.initVal = this.perfectRow[item.key];
        if (item.key === 'superiorId') {
          item.options = this.positionList
        } else if (item.key === 'position') {
          item.options = this.employeeList
        }
      });
      if (this.$refs.jopsForm) {
        this.$refs.jopsForm.init();
      }
      return FORM_CONFIG.editData;
    },
    employeeId() {
      return this.perfectRow.id;
    },
    roleId() {
      return this.perfectRow.roleId;
    }
  },
  mounted() {
    console.log(FORM_CONFIG);
  },
  methods: {
    onClick_setPower() {
      const params = {
        system: 'operation',
        userId: this.employeeId,
        roleId: this.roleId
      }
      api_systemConfig.getPermistionTemplate(params).then(res => {
        if (res.status === 0) {
          this.permissionTemplate = res.object;
          this.innerDrawer = true;
        }
      })
    },
    onClick_setAudit() {
      const params = {
        system: 'operation',
        userId: this.employeeId,
        roleId: this.roleId
      }
      api_systemConfig.getAuditTemplate(params).then(res => {
        if (res.status === 0) {
          this.auditTemplate = res.object;
          this.auditDrawer = true;
        }
      })
    },
    confirm($ruleForm) {
      console.log($ruleForm)
      if (!$ruleForm.position || !$ruleForm.superiorId) {
        this.$message({
          message: '请填写必填信息',
          type: 'warning'
        })
        return false;
      }
      const formData = {
        employeeId: this.employeeId,
        positionId: $ruleForm['position'],
        superiorId: $ruleForm['superiorId']
      };
      api_memberManage.saveJobInformation(formData).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '已保存'
          })
        }
        this.$emit('confirm');
      })
    },
    cancel() {
      this.$emit('cancel');
    },
    saveUserPermission($result) {
      Object.assign($result, { userId: this.employeeId })
      api_systemConfig.saveUserPermission($result).then(res => {
        if (res.status === 0) {
          this.innerDrawer = false;
          this.$message({
            type: 'success',
            message: '已保存'
          })
        }
      })
    },
    saveUserAudit($result) {
      console.log($result);
      Object.assign($result, {userId: this.employeeId})
      api_systemConfig.saveUserAudit($result).then(res => {
        if (res.status === 0) {
          this.auditDrawer = false;
          this.$message({
            type: 'success',
            message: '已保存'
          })
        }
      })
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
.u-form-item {
  display: flex;
  padding-left: 90px;
  margin-bottom: 24px;
  label {
    display: block;
    width: 50px;
    text-align: right;
    color: #606266;
    font-size: 14px;
  }
  .s-required::before {
    content: '*';
    font-size: 14px;
    color: #F5222D;
  }
  .g-form-content{
    width: 360px;
    padding-left: 15px;
    color: #333335;
  }
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
