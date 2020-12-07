<template>
  <div>
    <div class="tab-head">
      <span class="title">乐刷风控</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table-box">
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="250"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @detail="onClickDetail"
        @preApprove="onClickDetail"
        @pass="onClickPass"
        @reject="onClickReject"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="onClickCancel"
        @confirm="onClickConfirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_risk";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { SEARCH_CONFIG } from "../formConfig/leRiskListSearch";
import { FORM_CONFIG } from "../formConfig/leRiskListConfig";
import { LERISKLIST_CONFIG } from "../tableConfig/leRiskListConfig";

export default {
  name: "LeRiskList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      id: '',
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: LERISKLIST_CONFIG,
      searchHeight: "260",
      drawer: false,
      params: {},
      api: api.leshuaQueryByPage
    };
  },
  mounted() {},
  created() {
  },
  methods: {
    onClickCancel() {
      this.drawer = false;
    },

    onClickDetail(row) {
      this.$router.push({
        name: "leRiskDetail",
        query: {
          id: row.id
        }
      });
    },

    onClickConfirm($data) {
      if (!$data.reason) {
        this.$message({
          message: '请填写驳回理由',
          type: 'warning'
        })
        return false
      } else {
        api.leshuaUpdateOfReject({
          id: this.id,
          reason: $data["reason"]
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'success'
            })
            this.drawer = false
            this.$refs.table.getData()
          }
        })
      }
    },

    onClickPass(data) {
      this.$confirm("确认通过吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.leshuaUpdateOfPass({
          id: data.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已通过',
              type: 'success'
            })
            this.$refs.table.getData()
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
    },

    onClickReject(row) {
      this.drawer = true;
      this.id = row.id
      this.fromConfigData = FORM_CONFIG.rejectData;
    },

    search($ruleForm) {
      this.params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        operateUserNo: $ruleForm.operateUserNo ? $ruleForm.operateUserNo : null,
        status: $ruleForm.status ? $ruleForm.status : null,
        channelMerchantNo: $ruleForm.operateUserNo ? $ruleForm.operateUserNo : null,
        [$ruleForm.search]: $ruleForm.searchVal
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
