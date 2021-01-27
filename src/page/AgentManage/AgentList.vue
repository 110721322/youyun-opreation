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
        :form-base-data="searchConfig.formData"
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
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
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
            :form-base-data="fromConfigData"
            :show-foot-btn="fromConfigData.showFootBtn === false"
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
        fromConfigData: {},
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
            if (res.status === 0) {
              this.infoList[0].value = String(res.data.totalAgentNum)
              this.infoList[1].value = String(res.data.activeAgentNum)
              this.infoList[2].value = String(res.data.abnormalAgentNum)
            }
          }
        })
      },
      onClickSearch($ruleForm) {
        this.params = {
          agentNo: $ruleForm.agentNo ? $ruleForm.agentNo : null,
          agentName: $ruleForm.agentName ? $ruleForm.agentName : null,
          beginDate: $ruleForm.date && $ruleForm.date[1] ? $ruleForm.date[0] : null,
          endDate: $ruleForm.date && $ruleForm.date[1] ? $ruleForm.date[1] : null,
          blockStatus: $ruleForm.blockStatus ? $ruleForm.blockStatus : null,
          provinceCode: $ruleForm.area && $ruleForm.area[2] ? $ruleForm.area[0] : null,
          cityCode: $ruleForm.area && $ruleForm.area[2] ? $ruleForm.area[1] : null,
          areaCode: $ruleForm.area && $ruleForm.area[2] ? $ruleForm.area[2] : null,
          loginAccount: $ruleForm.loginAccount ? $ruleForm.loginAccount : null,
          operationId: $ruleForm.operationId ? $ruleForm.operationId : null
          // TODO parentAgentNo: $ruleForm.parentAgentNo ? $ruleForm.parentAgentNo : null,
        }
      },

      onClickDetails(row) {
        this.$router.push({
          name: 'AgentDetail',
          query: {
            agentNo: row.agentNo
          }
        }).catch(err => {})
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
        this.fromConfigData = ADD_AGENT.operationData.formData
      },

      clickToAdd() {
        this.$router.push({
          name: 'AddAgent',
        }).catch(err => {})
      },

      onClickGoAgent(row) {
        commonApi.generateLoginTicket({
          system: 'agent',
          phone: row.loginAccount,
          password: row.password
        }).then(res => {
          if (res.status === 0) {
            window.open(process.env.VUE_APP_AGENTURL + '#/login?ticket' + '=' + res.data)
          }
        })
      },

      selectionChange(val) {
        this.selectList = val
      },

      clickSubmit() {
        this.$refs['operationInfo'].$children[0].validate((valid) => {
          if (valid) {
            const select = []
            const list = this.selectList
            list.map((item) => {
              select.push(item.agentNo)
            })
            const agentNos = select.join(',')
            api.updateOperationId({
              agentNos: agentNos,
              operationId: this.$refs['operationInfo'].ruleForm.operationId
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
          } else {
            return false;
          }
        });
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
