<template>
  <div>
    <div class="profit-data">
      <!--数据统计开始-->
      <el-row>
        <el-col :span="item.span" v-for="(item, index) in infoList" :key="index">
          <yun-card-first
            :style="item.style"
            :label="item.label"
            :icon="item.icon"
            :icon-style="item.iconStyle"
            :tooltip="item.tooltip"
            :value="item.value"
            :children="item.children"
          >
          </yun-card-first>
        </el-col>
      </el-row>
    </div>
    <yun-search
        :form-base-data="searchConfig"
        @search="onClickSearch"
    />
    <div class="m-table">
      <div class="m-table-head">
        <div class="m-table-left-title">服务商列表</div>
        <div class="m-table-right-btn">
          <el-button @click="clickChangeOperation">批量修改管理员</el-button>
          <el-button type="primary" @click="clickToAdd">新增服务商</el-button>
        </div>
      </div>
      <div class="m-basecrud">
        <yun-table
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-select="true"
            :params="params"
            :api-service="api"
            @details="onClickDetails"
            @goAgent="onClickGoAgent"
            @selectionChange="selectionChange"
        ></yun-table>
      </div>
    </div>
    <yun-dialog
        title="修改管理员"
        :dialoger="drawer"
        width="488px"
        @confirm="clickSubmit"
        @cancel="drawer = false"
    >
      <div class="m-select-baseCrud" slot="body">
        <yun-form
            ref="operationInfo"
            :form-base-data="formConfigData"
            :show-foot-btn="formConfigData.showFootBtn === false"
            label-width="130px"
        ></yun-form>
      </div>
    </yun-dialog>
  </div>

</template>

<script>
  import api from "@/api/api_agentManage.js";
  import commonApi from "@/api/api_common.js"
  import { ADD_AGENT } from "./FormConfig/AddAgent"
  import { SEARCH_FORM_CONFIG } from "./FormConfig/SearchConfig"
  import { AGENT_LIST_CONFIG, AGENT_LIST_COUNT } from "./TableConfig/AgentListConfig"
  export default {
    name: "AgentList",
    data() {
      return {
        drawer: false,
        params: {},
        api: api.queryPageByCondition,
        selectList: [],
        agentNumData: {},
        searchConfig: SEARCH_FORM_CONFIG,
        formConfigData: {},
        gridConfig: AGENT_LIST_CONFIG.gridConfig,
        gridBtnConfig: AGENT_LIST_CONFIG.gridBtnConfig,
        infoList: []
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(AGENT_LIST_COUNT)
      this.getAgentNo()
    },
    methods: {
      getAgentNo() {
        api.totalAgentNum().then(res => {
          if (res.status === 0) {
            this.infoList.forEach((item, index) => {
              item.value = String(res.data[item.key])
            })
          }
        })
      },
      onClickSearch($ruleForm) {
        this.params = {
          agentNo: $ruleForm.agentNo,
          agentName: $ruleForm.agentName,
          beginDate: $ruleForm.date && $ruleForm.date[1] ? $ruleForm.date[0] : null,
          endDate: $ruleForm.date && $ruleForm.date[1] ? $ruleForm.date[1] : null,
          blockStatus: $ruleForm.blockStatus,
          provinceCode: $ruleForm.area && $ruleForm.area[2] ? $ruleForm.area[0] : null,
          cityCode: $ruleForm.area && $ruleForm.area[2] ? $ruleForm.area[1] : null,
          areaCode: $ruleForm.area && $ruleForm.area[2] ? $ruleForm.area[2] : null,
          loginAccount: $ruleForm.loginAccount,
          operationId: $ruleForm.operationId
          // TODO parentAgentNo: $ruleForm.parentAgentNo ? $ruleForm.parentAgentNo : null,
        }
      },

      onClickDetails(row) {
        this.$router.push({
          name: 'AgentDetail',
          query: {
            agentNo: row.agentNo
          }
        })
      },

      clickChangeOperation() {
        if (this.selectList.length === 0) {
          this.$message({
            message: '请选择服务商',
            type: 'info'
          })
          return
        }
        this.drawer = true
        this.formConfigData = this.$g.utils.deepClone(ADD_AGENT.operationData)
      },

      clickToAdd() {
        this.$router.push({
          name: 'AddAgent',
        })
      },

      onClickGoAgent(row) {
        commonApi.generateLoginTicket({
          system: 'agent',
          phone: row.loginAccount,
          password: row.password
        }).then(res => {
          if (res.status === 0) {
            window.open(process.env.VUE_APP_AGENT_URL + '#/Login?ticket' + '=' + res.data)
          }
        })
      },

      selectionChange(val) {
        this.selectList = val
      },

      clickSubmit() {
        const operationData = this.$refs['operationInfo'].clickFootBtn()
        if (!operationData) {
          this.$message('请选择服务商')
          return
        }
        const agentNos = this.selectList
          .map(item => item.agentNo)
          .join(',')
        api.updateOperationId({
          agentNos: agentNos,
          operationId: operationData.operationId
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$refs['table'].getData()
            this.$refs['table'].$children[0].clearSelection()
            this.drawer = false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profit-data {
    margin: 24px 0 0 24px;
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
          padding: 9px 15px;
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
  .m-select-baseCrud {
    padding: 24px;
  }
  /deep/ .g-search-container {
    margin: 0 24px;
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
</style>
