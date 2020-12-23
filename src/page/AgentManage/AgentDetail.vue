<template>
  <div class="m-page">
    <div class="m-title">
      <span class="m-left">服务商详情</span>
      <div class="m-right">
        <span @click="clickModify">修改</span>
        <span>|</span>
        <span @click="clickResetPassword">密码重置</span>
      </div>
    </div>
    <div class="m-detail">
        <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="shopInfoData"
            theme="border"
            module-title="门店信息"
            @editTel="editTel"
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
          :rule-form="ruleForm"
          :filed-config-list="rateInfoData"
          theme="border"
          module-title="费率信息"
      ></yun-detail-mode>
      <yun-detail-mode
          :rule-form="ruleForm"
          :filed-config-list="bankInfoData"
          theme="border"
          module-title="开户信息"
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
            :hide-edit-area="true"
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
        >
          <template slot="code">
            <el-button
                type="primary"
                class="f-fz-14"
                style="margin-left: 8px"
                v-show="countPsdTime <= 0"
                @click="clickSendPsdCode">获取验证码</el-button>
            <el-button
                type="primary"
                class="f-fz-14"
                style="margin-left: 8px"
                v-show="countPsdTime > 0">{{ countPsdTime + " s" }}</el-button>
          </template>
        </yun-form>
      </div>
    </yun-dialog>
  
    <yun-dialog
        title="修改资料"
        :dialoger="materialDrawer"
        width="488px"
        @cancel="materialDrawer = false"
        @confirm="clickSubmitMaterial"
    >
      <div class="dialog-form" slot="body">
        <yun-form
            v-if="materialDrawer"
            ref="nameInfo"
            :form-base-data="nameConfigData"
            :show-foot-btn="nameConfigData.showFootBtn === false"
            label-width="130px"
        >
        </yun-form>
        <div class="form-drawer-title">费率设置</div>
        <yun-form
            v-if="materialDrawer"
            ref="rateInfo"
            :form-base-data="rateConfigData"
            :show-foot-btn="nameConfigData.showFootBtn === false"
            label-width="130px"
        >
        </yun-form>
        <div class="form-drawer-title">结算账号</div>
        <yun-form
            v-if="materialDrawer"
            ref="settleInfo"
            :form-base-data="settleConfigData"
            :show-foot-btn="nameConfigData.showFootBtn === false"
            label-width="130px"
        >
        </yun-form>
        <div class="form-drawer-title">有效期</div>
        <yun-form
            v-if="materialDrawer"
            ref="dateInfo"
            :form-base-data="dateConfigData"
            :show-foot-btn="nameConfigData.showFootBtn === false"
            label-width="130px"
        >
        </yun-form>
      </div>
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
        gridBtnConfig: AGENT_TALK_DATA.gridBtnConfig,
        drawer: false,
        drawerBase: false,
        drawerType: '',
        materialDrawer: false,
        title: '',
        testData: [],
        switchStatus: false,
        countPsdTime: 0,
        nameConfigData: FORM_CONFIG.nameSet.formData,
        rateConfigData: FORM_CONFIG.rateSet.formData,
        settleConfigData: FORM_CONFIG.bankSet.formData,
        dateConfigData: FORM_CONFIG.validitySet.formData,
        nameVal: false,
        rateVal: false,
        settleVal: false,
        dateVal: false
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
          agentNo: this.agentNo
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
                message: '禁用成功',
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
        this.fromConfigData = FORM_CONFIG.changeMoblie.formData
      },
      
      // 修改服务商信息
      clickModify() {
        this.title = '修改资料'
        this.materialDrawer = true
        this.nameConfigData[0].initVal = this.ruleForm.agentName
        this.rateConfigData[0].initVal = this.ruleForm.alipayRate
        this.rateConfigData[1].initVal = this.ruleForm.wechatPayRate
        this.rateConfigData[2].initVal = this.ruleForm.chargeFeePercent
        this.settleConfigData[0].initVal = this.ruleForm.bankBranchName
        this.settleConfigData[1].initVal = this.ruleForm.bankCardNo
        this.settleConfigData[2].initVal = this.ruleForm.bankAccountHolder
        this.dateConfigData[0].initVal = this.ruleForm.expireDate
      },
      
      // 添加沟通计划
      clickAddTalk() {
        this.drawer = true
        this.drawerType = 'addTalk'
        this.title = '添加沟通计划'
        this.fromConfigData = FORM_CONFIG.talkData.formData
      },
      
      // 发送短信验证码
      clickSendPsdCode() {},

      clickSubmit() {
        this.$refs['formInfo'].$children[0].validate((valid) => {
          if (valid) {
            const type = this.drawerType
            const ruleForm = this.$refs['formInfo'].ruleForm
            console.log(ruleForm)
            switch(type) {
              case "addTalk":
                api.addTalk(ruleForm).then(res => {
                  this.submitSuccess(res.status, type)
                })
                break;
              case "updataLogin":
                api.resetPassword({
                  agentNo: this.agentNo,
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

      clickSubmitMaterial() {
        this.$refs['nameInfo'].$children[0].validate((valid) => {
          if (valid) {
            this.nameVal = true
          } else {
            this.nameVal = false
            return false;
          }
        })
        this.$refs['rateInfo'].$children[0].validate((valid) => {
          if (valid) {
            this.rateVal = true
          } else {
            this.nameVal = false
            return false;
          }
        })
        this.$refs['settleInfo'].$children[0].validate((valid) => {
          if (valid) {
            this.settleVal = true
          } else {
            this.nameVal = false
            return false;
          }
        })
        this.$refs['dateInfo'].$children[0].validate((valid) => {
          if (valid) {
            this.dateVal = true
          } else {
            this.nameVal = false
            return false;
          }
        })
        if (!this.rateVal || !this.nameVal || !this.settleVal || !this.dateVal) {
          return
        }
        const serviceData = this.$refs['nameInfo'].ruleForm
        const rateData = this.$refs['rateInfo'].ruleForm
        const settleData = this.$refs['settleInfo'].ruleForm
        const dateData = this.$refs['dateInfo'].ruleForm
        let infoData = {}
        Object.assign(infoData, serviceData, rateData, settleData, dateData)
        infoData.agentNo = this.agentNo
        api.updateAgentRate(infoData).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.materialDrawer = false
            this.getAgentDetail(this.agentNo)
            this.rateVal = false
            this.nameVal = false
            this.settleVal = false
            this.dateVal = false
          }
        })
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
       .m-left {
         font-size: 16px;
         color: #000;
       }
       .m-right {
         color: #1989FA;
         font-size: 14px;
         cursor: pointer;
         span:nth-child(2) {
           width: 1px;
           height: 16px;
           color: #333;
           padding: 0 24px;
         }
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
  /deep/ .m-formTemplate .m-form-template-item {
    margin-right: 0;
  }
  .dialog-form {
    padding-top: 24px;
  }
  .form-drawer-title {
    margin: 0 24px 0 24px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px solid #E9E9E9;
    font-size: 14px;
    color: #000;
  }
</style>
