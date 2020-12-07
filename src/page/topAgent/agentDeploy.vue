<template>
  <div class="main_page">
    <div class="p-head">服务器部署</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
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
        @deployStart="onClickDeployStart"
        @deployEnd="onClickDeployEnd"
        @detail="onClickDetail"
      />
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
  name: "AgentDeploy",
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
      this.params = {
        [$ruleForm.channelAgent]: $ruleForm.channelAgentVal,
        personName: $ruleForm.personNam,
        personMobile: $ruleForm.personMobile,
        beginTime: $ruleForm.date[0] ? $ruleForm.date[0] : '',
        endTime: $ruleForm.date[0] ? $ruleForm.date[1] : '',
        status: $ruleForm.status
      }
    },

    onClickDeployStart($row) {
      this.updateTopSourceCodeDeployStatus({
        channelAgentCode: $row.channelAgentCode,
        status: 2
      })
    },

    onClickDeployEnd($row) {
      this.updateTopSourceCodeDeployStatus({
        channelAgentCode: $row.channelAgentCode,
        status: 3
      })
    },

    onClickDetail($row) {
      this.$router.push({
        name: "deployDetail",
        query: {
          channelAgentCode: $row.channelAgentCode
        }
      })
    },

    updateTopSourceCodeDeployStatus($params) {
      api.updateTopSourceCodeDeployStatus($params).then(res => {
        this.$router.push({
          name: "deployDetail",
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
  .table-box {
    margin: 24px;
    padding: 24px;
    overflow: hidden;
    background: #fff;
    min-width: 1000px;
  }
</style>
