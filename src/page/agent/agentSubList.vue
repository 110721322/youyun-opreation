<template>
  <div>
    <div class="p_head">下级服务商列表</div>
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
          @detail="openDetail"
          @thaw="thaw"
          @frozen="frozen"
          @openAgentManager="openAgentManager"
          @goMerchantList="goMerchantList"
      />
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/subAgentConfig";
import { FORM_CONFIG } from "./formConfig/subAgentListSearch";

export default {
  name: "AgentSubList",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "380",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      params: {},
      api: api.queryPageByCondition
    };
  },
  created() {
  },
  mounted() {
  },
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
        // labelId: $form.labelId || null,
        activeScopeType: $form.activeScopeType || null,
        operationId: $form.operationId || null,
        personName: $form.personName || null,
        personMobile: $form.personMobile || null,
        status: $form.status || null,
        regionCode: $form.regionCode || null,
        beginDate: $form.date[0] ? $form.date[0] : null,
        endDate: $form.date[0] ? $form.date[1] : null,
        [$form.search]: $form.searchVal
      }
      if ($form.area) {
        this.params.activeScopeProvinceCode = $form.area[0]
        this.activeScopeCityCode = $form.area[1]
      }
    },
    openDetail(row) {
      this.$router.push({
        name: "agentSubListDetail",
        query: {
          agentNo: row.agentNo
        }
      });
    },
    thaw(row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.unfrozen({
            agentNo: row.agentNo
          }).then(res => {
            this.$message({
              type: "success",
              message: "已解冻"
            })
            this.$refs.table.getData()
          })
        })
    },
    frozen(row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.frozen({
            agentNo: row.agentNo
          }).then(res => {
            this.$message({
              type: "success",
              message: "已冻结"
            });
            this.$refs.table.getData()
          })
        })
    },
    openAgentManager(row) {
      api.generateLoginTicket({
        system: 'agent',
        phone: row.loginAccount,
        password: row.password
      }).then(res => {
        if (res.status === 0) {
          window.open(process.env.VUE_APP_AGENTURL + '#/login?ticket' + '=' + res.data)
        }
      })
    },
    goMerchantList() {
      this.$router.push({
        name: "merchantList"
      });
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
