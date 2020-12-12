<template>
  <div>
    <div class="m-page">
      <div class="m-content"></div>
    </div>
    <Search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-table">
      <div class="m-table-head">
        <div class="m-table-left-title">服务商列表</div>
        <div class="m-table-right-btn">
          <el-button>批量修改管理员</el-button>
          <el-button type="primary" @click="clickToAdd">新增服务商</el-button>
        </div>
      </div>
      <div class="m-basecrud">
        <BaseCrud
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-select="true"
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
            :grid-data="testData"
            :params="params"
            :api-service="api"
            @details="onClickDetails"
            @goAgent="onClickGoAgent"
        ></BaseCrud>
      </div>
    </div>
  </div>
 
</template>

<script>
  import api from "@/api/api_agentManage.js";
  import Search from "@/components/search/search.vue";
  import BaseCrud from "@/components/table/BaseCrud.vue";
  import { SEARCH_FORM_CONFIG } from "./FormConfig/SearchConfig"
  import { AGENT_LIST_CONFIG } from "./TableConfig/AgentListConfig"
  export default {
    name: "AgentList",
    components: { Search, BaseCrud },
    data() {
      return {
        api: '',
        params: {},
        testData: [],
        searchConfig: SEARCH_FORM_CONFIG,
        gridConfig: AGENT_LIST_CONFIG.gridConfig,
        gridBtnConfig: AGENT_LIST_CONFIG.gridBtnConfig
      }
    },
    created() {
      this.testData = [
        {
          agentId: '2222',
          agentName: '啦啦啦',
          phone: '13647854587',
          merchantNumber: 3,
          endTime: '2020-12-31',
          status: 0,
          payWayName: '元芳'
        }
      ]
    },
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          agentId: $ruleForm.agentId ? $ruleForm.agentId : null,
          agentName: $ruleForm.agentName ? $ruleForm.agentName : null,
          endTime: $ruleForm.endTime ? $ruleForm.endTime : null,
          status: $ruleForm.status ? $ruleForm.status : null,
          phone: $ruleForm.phone ? $ruleForm.phone : null,
          address: $ruleForm.address ? $ruleForm.address : null,
          onerAgentId: $ruleForm.onerAgentId ? $ruleForm.onerAgentId : null,
          manager: $ruleForm.manager ? $ruleForm.manager : null
        }
      },
      onClickDetails(row) {
        this.$router.push({
          name: 'AgentDetail',
          query: {
            agentId: row.agentId
          }
        }).catch(err => {})
      },
      clickToAdd() {
        this.$router.push({
          name: 'AddAgent'
        }).catch(err => {})
      },
      onClickGoAgent(row) {
        // api.generateLoginTicket({
        //   system: 'agent',
        //   phone: row.loginAccount,
        //   password: row.password
        // }).then(res => {
        //   if (res.status === 0) {
        //     window.open(process.env.VUE_APP_AGENTURL + '#/login?ticket' + '=' + res.data)
        //   }
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    padding: 24px 24px 0;
    .m-content {
      width: 100%;
      height: 130px;
      background: #fff;
    }
  }
  .m-table {
    padding: 24px 24px 0;
    width: 100%;
    .m-table-head {
      display: flex;
      justify-content: space-between;
      padding: 24px 24px 0;
      width: 100%;
      background: #fff;
      .m-table-left-title {
        font-size: 16px;
        font-weight: 400;
        color: #000;
      }
      .m-table-right-btn {
        display: flex;
        justify-content: space-between;
        button {
          margin: 0;
          padding: 8px 27px;
          font-size: 14px;
        }
        button:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
    .m-basecrud {
      padding: 24px 24px;
      background: #fff;
    }
  }
  .dot.disabled {
    color: #F5222D !important;
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
</style>