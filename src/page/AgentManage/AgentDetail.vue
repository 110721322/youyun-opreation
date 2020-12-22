<template>
  <div class="m-page">
    <div class="m-title">
      <span>服务商详情</span>
      <div class="right" @click="clickResetPassword">密码重置</div>
    </div>
    <div class="m-detail">
        <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="shopInfoData"
            theme="border"
            module-title="门店信息"
            @editTel="editTel"
            @editTime="onClickEditTime"
        >
        <template slot="status" slot-scope="scope">
          <div
              class="flex-row flex-align-center f-fc-theme"
              :class="ruleForm[scope.item.key] ? 'f-fc-theme' : 'f-fc-fail'">
            {{ statusDesc }}
            <el-switch v-model="ruleForm[scope.item.key]" @change="changeSwitch"></el-switch>
          </div>
        </template>
      </yun-detail-mode>
      <yun-detail-mode
          :is-show-edit="showEdit"
          :rule-form="ruleForm"
          :filed-config-list="rateInfoData"
          theme="border"
          module-title="费率信息"
          @editModule="onClickEditRate"
      ></yun-detail-mode>
      <yun-detail-mode
          :is-show-edit="showEdit"
          :rule-form="ruleForm"
          :filed-config-list="bankInfoData"
          theme="border"
          module-title="开户信息"
          @editModule="onClickEditBank"
      ></yun-detail-mode>
    </div>
<!-- TODO    数据统计模块-->
<!--    <div class="m-box"></div>-->
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-basecrud-left">沟通记录</div>
        <el-button type="primary" @click="clickAddTalk">添加沟通记录</el-button>
      </div>
      <div class="m-table">
        <yun-table
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
            :params="params"
            :api-service="api"
        ></yun-table>
      </div>
    </div>
    <yun-dialog
        :title="title"
        :dialoger="drawer"
        width="488px"
        @cancel="drawer = false"
        @confirm="clickSubmit"
    >
      <div class="dialog-form" slot="body">
        <yun-form
            v-if="drawer"
            ref="formInfo"
            :form-base-data="fromConfigData"
            :show-foot-btn="fromConfigData.showFootBtn === false"
            label-width="130px"
        ></yun-form>
      </div>
<!--  TODO    <BaseCrud-->
<!--          v-if="drawerBase"-->
<!--          ref="table"-->
<!--          :grid-config="agentConfig"-->
<!--          :grid-edit-width="200"-->
<!--          :is-async="true"-->
<!--          :is-select="true"-->
<!--          :is-data-select="false"-->
<!--          :is-table-expand="false"-->
<!--          :row-key="'id'"-->
<!--          :default-expand-all="false"-->
<!--          :hide-edit-area="true"-->
<!--          :grid-data="testData"-->
<!--          :params="params"-->
<!--          :api-service="api"-->
<!--          @selectionChange="selectionChange"-->
<!--      ></BaseCrud>-->
    </yun-dialog>
  </div>
</template>

<script>
  import api from "@/api/api_agentManage.js";
  import { AGENT_TALK_DATA } from "./TableConfig/AgentTalkConfig";
  import { DETAILCONFIG } from "./TableConfig/AgentDetailConfig";
  import { FORM_CONFIG } from "./FormConfig/AgentDetailConfig";
  import { AGENT_TRANSFER } from "./TableConfig/AgebtTransferConfig"

  export default {
    name: "AgentDetail",
    data() {
      return {
        params: {
          agentNo: this.$route.query.agentNo
        },
        agentNo: this.$route.query.agentNo,
        api: api.queryByPage,
        ruleForm: {},
        showEdit: true,
        shopInfoData: DETAILCONFIG.shopInfoData,
        rateInfoData: DETAILCONFIG.rateInfoData,
        bankInfoData: DETAILCONFIG.bankInfoData,
        gridConfig: AGENT_TALK_DATA.gridConfig,
        agentConfig: AGENT_TRANSFER,
        fromConfigData: FORM_CONFIG,
        gridBtnConfig: false,
        drawer: false,
        drawerBase: false,
        drawerType: '',
        title: '',
        testData: [],
        switchStatus: false
      }
    },
    computed: {
      statusDesc() {
        if (this.ruleForm.accountStatus) {
          return '启用'
        } else {
          return '禁用'
        }
      }
    },
    created() {
      this.getAgentDetail(this.agentNo)
    },
    methods: {
      getAgentDetail(agentNo) {
        api.getAgentDetail({
          agentNo: 'haha'
        }).then(res => {
          console.log(res.data)
          if (res.status === 0) {
            this.ruleForm = res.data
          }
        })
      },

      // 重置登录密码
      clickResetPassword() {
        this.drawer = true
        this.title = '重置登录密码'
        this.drawerType = 'updataLogin'
        this.fromConfigData = FORM_CONFIG.resetPassword.formData
      },
      
      // 服务商状态启用禁用
      changeSwitch(val) {
        if (val) {
          api.updateStatusUnfrozen({
            agentNo: this.$route.query.agentNo
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '启用成功',
                type: 'success'
              })
            }
          })
        } else if (!this.switchStatus) {
          api.updateStatusFrozen({
            agentNo: this.$route.query.agentNo
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                message: '禁用',
                type: 'success'
              })
            }
          })
        }
      },
      
      // 修改手机号码
      editTel() {
        this.drawer = true
        this.title = '修改手机号'
        this.drawerType = 'updatePhone'
        // this.fromConfigData = FORM_CONFIG.rateSet.formData
      },

      // 修改到期时间
      onClickEditTime() {
        this.title = '修改到期时间'
        this.drawer = true
        this.drawerType = 'updateTime'
        this.fromConfigData = FORM_CONFIG.validitySet.formData
      },
      
      // 修改费率信息
      onClickEditRate() {
        this.title = '修改费率信息'
        this.drawer = true
        this.drawerType = 'updateRate'
        this.fromConfigData = FORM_CONFIG.rateSet.formData
      },
      
      // 修改开户信息
      onClickEditBank() {
        this.title = '修改银行信息'
        this.drawer = true
        this.drawerType = 'updateBankInfo'
        this.fromConfigData = FORM_CONFIG.bankSet.formData
      },

      clickAddTalk() {
        this.drawer = true
        this.drawerType = 'addTalk'
        this.title = '添加沟通计划'
        this.fromConfigData = FORM_CONFIG.talkData.formData
      },

      clickSubmit() {
        this.$refs['formInfo'].$children[0].validate((valid) => {
          if (valid) {
            const type = this.drawerType
            const ruleForm = this.$refs['formInfo'].ruleForm
            switch(type) {
              case "addTalk":
                api.addTalk(ruleForm).then(res => {
                  this.submitSuccess(res.status, type)
                })
                break;
              case "updateTime":
                // console.log('更新到期时间')
                api.addTalk(ruleForm).then(res => {
                  this.submitSuccess(res.status, type)
                })
                break;
              case "changeOperationUser":
                // console.log('更换管理人员')
                api.addTalk(ruleForm).then(res => {
                  this.submitSuccess(res.status, type)
                })
                break;
              case "updateRate":
                console.log('修改费率信息')
                api.addTalk(ruleForm).then(res => {
                  this.submitSuccess(res.status, type)
                })
                break;
              case "updateBankInfo":
                console.log('修改银行信息')
                api.addTalk(ruleForm).then(res => {
                  this.submitSuccess(res.status, type)
                })
                break;
              case "updataLogin":
                console.log('重置登录密码')
                api.resetPassword({
                  agentNo: this.$route.query.agentNo,
                  pwdType: 1
                }).then(res => {
                  this.submitSuccess(res.status, type)
                })
                break;
              default:
                break;
            }
          } else {
            return false;
          }
        });
      },

      submitSuccess(data, type) {
        if (data === 0) {
          this.$message({
            message: type === 'addTalk' ? '添加成功' : type === 'updataLogin' ? '重置成功' : '更新成功',
            type: 'message'
          })
          this.drawer = false
          if (type === 'addTalk') {
            this.$refs.table.getData()
          }
        }
      }
      // TODO selectionChange() {},
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .m-detail-mode.s-detail-border {
    margin-bottom: 24px;
  }
  .m-page {
    .m-title {
       display: flex;
       justify-content: space-between;
       margin: 24px 24px 0 24px;
       padding: 0 24px;
       background: #fff;
       line-height: 54px;
       border-bottom: 1px solid #DCDFE6;
       span {
         font-size: 16px;
         color: #000;
       }
       .right {
         color: #1989FA;
         font-size: 14px;
         cursor: pointer;
       }
     }
    .m-detail {
      margin: 0 24px;
      padding: 24px 24px;
      background: #fff;
    }
    .m-box {
      width: 100%;
      height: 100px;
      background: #fff;
    }
    .m-basecrud {
      margin-top: 24px;
      padding: 24px;
      .m-basecrud-title {
        display: flex;
        justify-content: space-between;
        padding: 24px;
        background: #fff;
        .m-basecrud-left {
          font-size: 16px;
          font-weight: 400;
          color: #000;
        }
        button {
          padding: 8px 20px;
        }
      }
      .m-table {
        padding: 0 24px 24px;
        background: #fff;
      }
    }
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
  .dialog-form {
    padding-top: 24px;
  }
</style>
