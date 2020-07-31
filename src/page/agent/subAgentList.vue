<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
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
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
// import dataMode from '@/components/dataMode/dataMode.vue'
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/subAgentConfig";
import { FORM_CONFIG } from "./formConfig/subAgentListSearch";

export default {
  name: "Theme",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

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
    this.params = {
    }
  },
  mounted() {
  },
  methods: {
    search($form, $obj) {
      this.params = {
        regionCode: $form.regionCode,
        provinceCode: $form.area[0],
        cityCode: $form.area[1]
      }
      this.params[$form.inputSelect] = $form.inputForm
    },
    openDetail(row) {
      this.$router.push({
        path: "/agent/subList/detail",
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
              type: "info",
              message: "已解冻"
            })
            this.$refs.table.getData()
          })
        })
        .catch(() => {});
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
        .catch(() => {});
    },
    openAgentManager() {},
    goMerchantList() {
      this.$router.push({
        path: "/merchant/list"
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
