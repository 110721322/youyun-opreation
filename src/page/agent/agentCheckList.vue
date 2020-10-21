<template>
  <div>
    <div class="p_head">服务商审核列表</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <!-- <data-mode></data-mode> -->
    <div class="table_box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="160"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @reject="reject"
        @activation="activation"
        @adopt="adopt"
      />
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">审核通过</div>
      <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          :isDrawer="true"
          @cancel="cancel"
          @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { CHECK_CONFIG } from "./formConfig/agentCheck";
import { USER_CONFIG } from "./tableConfig/agentCheckConfig";
import { FORM_CONFIG } from "./formConfig/agentCheckListSearch";
export default {
  name: "AgentCheckList",
  components: { search, BaseCrud, Form },

  data() {
    return {
      agentNo: '',
      drawer: false,
      searchMaxHeight: "320",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      fromConfigData: CHECK_CONFIG,
      testData: [],
      params: {},
      api: api.agentExamineList
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    getDay(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    },
    search($form) {
      this.params = {
        beginDate: $form.date ? $form.date[0] : '',
        endDate: $form.date ? $form.date[1] : '',
        personName: $form.personName ? $form.personName : null,
        personMobile: $form.personMobile ? $form.personMobile : null,
        businessType: $form.businessType ? $form.businessType : null,
        contractStatus: $form.contractStatus ? $form.contractStatus : null,
        operationId: $form.operationId ? $form.operationId : null
      }
    },
    reject(row) {
      this.$confirm("是否要驳回该代理商？", "驳回代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认驳回",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.reject({
            agentNo: row.agentNo
          }).then((res) => {
            if (res.status === 0) {
              this.$message({
                type: "info",
                message: "已驳回"
              });
            }
            this.$refs.table.getData();
          }).catch(() => {
          });
        })
    },
    activation(row) {
      this.$confirm("是否要激活该代理商？", "激活代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认激活",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.activate({
            agentNo: row.agentNo
          }).then((res) => {
            if (res.status === 0) {
              this.$message({
                type: "success",
                message: "已激活"
              });
              this.$refs.table.getData();
            }
          }).catch(() => {
          });
        })
    },
    cancel() {
      this.drawer = false
    },
    confirm($form) {
      if (!$form.operationId) {
        this.$message({
          message: '请选择所属服务商',
          type: 'warning'
        })
        return false
      }
      api.pass({
        agentNo: this.agentNo,
        operationId: $form.operationId
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            type: "success",
            message: "已通过"
          });
        }
        this.drawer = false
        this.$refs.table.getData()
      }).catch(() => {
      });
    },
    adopt(row) {
      this.drawer = true
      this.agentNo = row.agentNo
    }
  }
};
</script>

<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
