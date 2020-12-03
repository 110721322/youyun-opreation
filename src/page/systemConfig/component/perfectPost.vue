<template>
  <div>
    <div class="p_head">{{ formConfigData.title }}</div>
    <Form
      ref="jopsForm"
      is-drawer
      :form-base-data="formConfigData.formData"
      :show-foot-btn="formConfigData.showFootBtn"
      label-width="130px"
      @confirm="confirm"
    >
      <template slot="content">
        <div class="u-form-item">
          <label class="s-required">权限:</label>
          <div class="g-form-content">
            <span class="g-form-title">{{ perfectRow.haveJurisdiction ? "已设置" : "未设置" }}</span>
            <el-button type="text" class="g-form-button" @click="clickSetPower">设置</el-button>
          </div>
        </div>
      <!-- 延期
        <div class="u-form-item">
          <label>审批:</label>
          <div class="g-form-content">
            <el-button type="text" style="font-size: 14px; padding: 0;" @click="clickSetAudit">设置</el-button>
          </div>
        </div>
        -->
      </template>
    </Form>
    <el-drawer :append-to-body="true" :visible.sync="innerDrawer" :with-header="false" size="500px">
      <power-set v-if="innerDrawer" :template-list="permissionTemplate" :api-service="permissionApi" @confirm="saveUserPermission" @cancel="cancelSave"></power-set>
    </el-drawer>
    <!--延期
    <el-drawer :append-to-body="true" :visible.sync="auditDrawer" :with-header="false" size="500px">
      <audit-set v-if="auditDrawer" :template-list="auditTemplate" :api-service="auditApi" @confirm="saveUserAudit"></audit-set>
    </el-drawer>-->
  </div>
</template>
<script>
import PowerSet from "./powerSet.vue";
import Form from "@/components/form/index.vue";
import api_memberManage from "@/api/api_memberManage.js";
import api_systemConfig from "@/api/api_systemConfig.js";
import { FORM_CONFIG } from "../formConfig/perfectPost";
import { mapState } from 'vuex';

export default {
  name: "PerfectPost",
  components: { PowerSet, Form },
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
      positionList: state => state.system.positionList,
      employeeList: state => state.system.employeeList
    }),
    formConfigData() {
      FORM_CONFIG.editData.formData.forEach((item, index) => {
        if (item.key === 'superiorId') {
          item.initVal = this.perfectRow["superiorId"];
          item.options = this.employeeList
        } else if (item.key === 'positionId') {
          item.initVal = this.perfectRow["positionId"]
          item.options = this.positionList
        }
      });
      if (this.$refs.jopsForm) {
        this.$refs.jopsForm.init();
      }
      return FORM_CONFIG.editData;
    },
    employeeId() {
      return this.perfectRow.employeeId;
    },
    roleId() {
      return this.perfectRow.roleId;
    }
  },
  mounted() {},
  methods: {
    clickSetPower() {
      const params = {
        system: 'operation',
        userId: this.employeeId,
        roleId: this.roleId
      }
      api_systemConfig.getPermistionTemplate(params).then(res => {
        if (res.status === 0) {
          this.permissionTemplate = res.data;
          this.innerDrawer = true;
        }
      })
    },

    clickSetAudit() {
      const params = {
        system: 'operation',
        userId: this.employeeId,
        roleId: this.roleId
      }
      api_systemConfig.getAuditTemplate(params).then(res => {
        if (res.status === 0) {
          this.auditTemplate = res.data;
          this.auditDrawer = true;
        }
      })
    },

    confirm($ruleForm) {
      const formData = {
        employeeId: this.employeeId,
        positionId: $ruleForm['positionId'],
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
          this.$emit("refreshJobInfo")
          this.$message({
            type: 'success',
            message: '已保存'
          })
        }
      })
    },

    cancelSave() {
      this.innerDrawer = false;
    },

    saveUserAudit($result) {
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
  padding-left: 73px;
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
    color: #f5222d;
  }

  .g-form-content {
    width: 360px;
    padding-left: 15px;
    color: #333335;
  }
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
}

.form-box {
  display: flex;
  justify-content: space-between;
}

.g-form-title {
  margin-right: 16px;
}

.g-form-button {
  font-size: 14px;
  padding: 0;
}
</style>
