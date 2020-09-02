<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">对公转账审核</span>
      </div>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <BaseCrud
           ref="table"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          :header-cell-style="headerCellStyle"
          :api-service="api"
          :params="params"
          @detail="onClick_detail"
          @reject="onClick_reject"
          @adopt="onClick_adopt"
        ></BaseCrud>
      </div>

      <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          :foot-btn-label="fromConfigData.footBtnLabel"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
      <el-dialog
          title="驳回理由"
          :visible.sync="dialogVisible"
          width="30%">
        <span>{{reason}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "../formConfig/publicForm";
import { SEARCH_CONFIG } from "../formConfig/publicSearch";
import { TABLE_CONFIG } from "../tableConfig/publicConfig";
import api from "@/api/api_statistice";

export default {
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      headerCellStyle: { backgroundColor: "#FAFAFA" },
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      params: {},
      formStatus: null,
      api: api.transferListL,
      id: '',
      dialogVisible: false,
      reason: ''
    };
  },
  mounted() {},
  methods: {
    confirm($data) {
      if (!$data.reason) {
        this.$message({
          message: '请填写驳回理由',
          type: 'warning'
        })
        return false
      } else {
        api.rejectTransfer({
          reason: $data.reason,
          id: this.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'success'
            })
            this.drawer = false
            this.$refs.table.getData()
          } else {
            this.$message({
              message: res.errorMessage,
              type: 'info'
            })
          }
        })
      }
    },
    search($ruleForm) {
      this.params = {
        startDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        auditStatus: $ruleForm.auditStatus
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    onClick_detail($row) {
      this.reason = $row.reason
      this.dialogVisible = true
    },
    onClick_reject($row) {
      this.id = $row.id
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },
    onClick_adopt($row) {
      this.$confirm("确定打款成功，通过吗", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
        api.passTransfer({
          id: $row.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已通过"
            });
            this.$refs.table.getData()
          }
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'warning'
          })
        });
      }).catch(() => {
        this.$message({
          message: '取消操作',
          type: 'info'
        })
      });
    },
    cancel() {
      this.drawer = false;
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

  .el-table td div {
    width: 80px;
    height: 80px;
  }
</style>
