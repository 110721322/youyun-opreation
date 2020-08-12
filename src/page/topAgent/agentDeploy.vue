<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/deployDetail') !== -1" />
    <div v-else>
      <div class="p_head">服务器部署</div>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />
      <!-- <data-mode></data-mode> -->
      <div class="table_box">
        <BaseCrud
          ref="child"
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
          @deployStart="deployStart"
          @deployEnd="deployEnd"
          @detail="detail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/agentDeployConfig";
import { FORM_CONFIG2 } from "./formConfig/agentCheckListSearch";
export default {
  name: "Theme",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "320",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG2,
      params: {
        channelAgentCode: null,
        topAgentName: null,
        personName: null,
        personMobile: null,
        beginTime: null,
        endTime: null,
        status: null
      },
      api: api.selectPageSourceCodeDeploy
    };
  },
  created() {},
  mounted() {},
  methods: {
    search($ruleForm) {
      console.log($ruleForm);
      this.params = {
        [$ruleForm.channelAgent]: $ruleForm.channelAgentVal,
        personName: $ruleForm.personNam,
        personMobile: $ruleForm.personMobile,
        beginTime: $ruleForm.date[0],
        endTime: $ruleForm.date[1],
        status: $ruleForm.status
      }
    },
    deployStart($row) {
      console.log($row);
      this.updateTopSourceCodeDeployStatus({
        channelAgentCode: $row.channelAgentCode,
        status: 2
      })
    },
    deployEnd($row) {
      this.updateTopSourceCodeDeployStatus({
        channelAgentCode: $row.channelAgentCode,
        status: 3
      })
    },
    detail($row) {
      this.$router.push({
        path: "/topAgent/agentDeploy/deployDetail",
        query: {
          channelAgentCode: $row.channelAgentCode
        }
      })
    },
    updateTopSourceCodeDeployStatus($params) {
      api.updateTopSourceCodeDeployStatus($params).then(res => {
        this.$router.push({
          path: "/topAgent/agentDeploy/deployDetail",
          query: {
            channelAgentCode: $params.channelAgentCode
          }
        })
      })
    }
  }
}
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
