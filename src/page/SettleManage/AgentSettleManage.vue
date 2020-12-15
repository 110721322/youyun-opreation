<template>
  <div class="m-page">
    <Search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">结算记录列表</div>
        <el-button type="primary">导出</el-button>
      </div>
      <div class="basecrud-box">
        <BaseCrud
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-select="false"
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
            :grid-data="testData"
            :params="params"
            :api-service="api"
            @pass="onClickPass"
            @reject="onClickReject"
        ></BaseCrud>
      </div>
    </div>
    <el-dialog
        title="结算申请"
        :visible.sync="drawer"
        width="488px"
    >
      <Form
          v-if="drawer"
          ref="formInfo"
          :form-base-data="fromConfigData"
          :show-foot-btn="fromConfigData.showFootBtn === false"
          label-width="130px"
      ></Form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drawer = false">取 消</el-button>
        <el-button type="primary" @click="clickSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Form from "@/components/form/index.vue";
  import Search from "@/components/search/search.vue";
  import BaseCrud from "@/components/table/BaseCrud.vue";
  import { REJECT_CONFIG } from "./FormConfig/AgentRejectConfig"
  import { SEARCH_FORM_CONFIG } from "./FormConfig/AgentSettleSearch"
  import { AGENT_SETTLE_CONFIG } from "./TableConfig/AgentSettleConfig"
  export default {
    name: "AgentSettleManage",
    components: { Search, BaseCrud, Form },
    data() {
      return {
        params: {},
        api: '',
        testData: [],
        drawer: false,
        searchConfig: SEARCH_FORM_CONFIG,
        fromConfigData: REJECT_CONFIG.formData,
        gridConfig: AGENT_SETTLE_CONFIG.gridConfig,
        gridBtnConfig: AGENT_SETTLE_CONFIG.gridBtnConfig
      }
    },
    created() {
      this.testData = [
        {
          settleNo: 225555,
          createTime: '2020-12-12',
          agentNo: '2587755',
          settleMoney: '135',
          agentName: 'haha',
          merchantName: '水果店',
          shopName: '先锋水果店',
          settleChannel: '乐刷',
          settleAmount: '100',
          name: '张三',
          bankName: '杭州银行',
          bankNo: '22545872595841548',
          settleTime: '2020-12-12',
          remark: '图片模糊',
          status: 0
        },
        {
          settleNo: 225555,
          createTime: '2020-12-12',
          agentNo: '2587755',
          settleMoney: '135',
          agentName: 'haha',
          merchantName: '水果店',
          shopName: '先锋水果店',
          settleChannel: '乐刷',
          settleAmount: '100',
          name: '张三',
          bankName: '杭州银行',
          bankNo: '22545872595841548',
          settleTime: '2020-12-12',
          remark: '图片模糊',
          status: 1
        }
      ]
    },
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          settleNo: $ruleForm.settleNo ? $ruleForm.settleNo : null,
          agentNo: $ruleForm.agentNo ? $ruleForm.agentNo : null,
          shopName: $ruleForm.shopName ? $ruleForm.shopName : null,
          agentName: $ruleForm.agentName ? $ruleForm.agentName : null,
          name: $ruleForm.name ? $ruleForm.name : null,
          bankName: $ruleForm.bankName ? $ruleForm.bankName : null,
          bankNo: $ruleForm.bankNo ? $ruleForm.bankNo : null,
          createTime: $ruleForm.createTime ? $ruleForm.createTime : null,
          settleTime: $ruleForm.settleTime ? $ruleForm.settleTime : null
        }
      },
      onClickPass(row) {
        this.$confirm("确定通过该代理商结算申请？", "结算申请", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          this.$message({
            message: '已通过',
            type: 'success'
          })
        }).catch(() => {
          this.$message('取消操作')
        })
      },
      onClickReject(row) {
        this.drawer = true
      },
      clickSubmit() {
        this.$refs['formInfo'].$children[0].validate((valid) => {
          if (valid) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.drawer = false
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .m-data {
      width: 100%;
      height: 100px;
      background: #fff;
    }
    .m-basecrud {
      padding: 24px 24px;
      .m-basecrud-title {
        display: flex;
        justify-content: space-between;
        padding: 24px 24px;
        background: #fff;
      }
      .basecrud-box {
        padding: 0 24px 24px;
        background: #fff;
      }
    }
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
  /deep/ .tab-disabled {
    color: #F5222D;
  }
  /deep/ .el-dialog__body {
    padding: 0 0 24px 0;
  }

  /deep/ .el-dialog__header {
    padding: 16px 24px;
    background: #FAFAFA;
    font-size: 16px;
    color: #606266;
    border-bottom: 1px solid #EBEEF5;
  }

  /deep/ .el-dialog__footer {
    padding-top: 20px;
    border-top: 1px solid #EBEEF5;
  }
</style>