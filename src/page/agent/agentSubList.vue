<template>
  <div>
    <div class="p-head">下级服务商列表</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @detail="onClickOpenDetail"
        @thaw="onClickThaw"
        @frozen="onClickFrozen"
        @openAgentManager="onClickOpenAgentManager"
        @goMerchantList="onClickGoMerchantList"
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
      searchMaxHeight: "380", // 搜索展开项的高度
      configData: USER_CONFIG, // 列表展示的数据
      searchConfig: FORM_CONFIG, // 搜索项的数据
      params: {}, // 搜索项传参
      api: api.queryPageByCondition // 获取下级服务商列表
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
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

    // 点击查看服务商详情页面
    onClickOpenDetail(row) {
      this.$router.push({
        name: "agentSubListDetail",
        query: {
          agentNo: row.agentNo
        }
      });
    },

    // 点击解冻代理商
    onClickThaw(row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      }).then(() => {
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

    // 点击解冻代理商
    onClickFrozen(row) {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      }).then(() => {
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

    // 点击打开代理商后台
    onClickOpenAgentManager(row) {
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

    // 点击进入商户列表页面
    onClickGoMerchantList() {
      this.$router.push({
        name: "merchantList"
      });
    }
  }
};
</script>

<style scoped>
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
