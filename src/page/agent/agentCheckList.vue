<template>
  <div class="main_page">
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
        :grid-edit-width="300"
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
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/agentCheckConfig";
import { FORM_CONFIG } from "./formConfig/agentCheckListSearch";
export default {
  name: "Theme",
  components: { search, BaseCrud },

  data() {
    return {
      searchMaxHeight: "320",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      params: {},
      api: api.agentExamineList
    };
  },
  created() {
    this.params = {}
  },
  mounted() {},
  methods: {
    search($form) {
      this.params = {
        beginDate: $form.date[0],
        endDate: $form.date[1],
        personName: $form.personName,
        personMobile: $form.personMobile,
        businessType: $form.businessType,
        contractStatus: $form.contractStatus
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
          }).catch(err => {
            console.error(err);
          });
        })
        .catch(() => {});
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
                type: "info",
                message: "已激活"
              });
            }
            this.$refs.table.getData();
          }).catch(err => {
            console.error(err);
          });
        })
        .catch(() => {});
    },
    adopt(row) {
      console.log(row)
      this.$confirm("是否要通过该代理商？", "通过代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认通过",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.pass({
            agentNo: row.agentNo
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                type: "success",
                message: "已通过"
              });
            }
            this.$refs.table.getData()
          }).catch(err => {
            console.error(err);
          });
        })
        .catch(() => {});
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
  min-width: 1000px;
}
</style>
