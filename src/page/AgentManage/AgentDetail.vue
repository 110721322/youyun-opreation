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
            @editStatus="onClickEditStatus"
        >
          <!--TODO           @editTel="editTel"-->
        <template slot="status" slot-scope="scope">
          <div
              class="flex-row flex-align-center f-fc-theme"
              :class="ruleForm[scope.item.key] === 1 ? 'f-fc-theme' : 'f-fc-fail'">
            {{ blockStatusDesc }}
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
            :form-base-data="formConfigData"
            :show-foot-btn="formConfigData.showFootBtn === false"
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
      <div class="dialog-form" slot="body" v-if="materialDrawer">
        <yun-form
            ref="nameInfo"
            :form-base-data="nameConfigData"
            :show-foot-btn="nameConfigData.showFootBtn === false"
            label-width="130px"
        >
        </yun-form>
        <div class="form-drawer-title">费率设置</div>
        <yun-form
            ref="rateInfo"
            :form-base-data="rateConfigData"
            :show-foot-btn="nameConfigData.showFootBtn === false"
            label-width="130px"
        >
        </yun-form>
        <div class="form-drawer-title">结算账号</div>
        <yun-form
            ref="settleInfo"
            :form-base-data="settleConfigData"
            :show-foot-btn="nameConfigData.showFootBtn === false"
            label-width="130px"
        >
        </yun-form>
        <div class="form-drawer-title">有效期</div>
        <yun-form
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
  import { DETAILCONFIG, AGENT_DETAIL_STATIC } from "./TableConfig/AgentDetailConfig";
  import { FORM_CONFIG } from "./FormConfig/AgentDetailConfig";
  import { AGENT_TRANSFER } from "./TableConfig/AgentTransferConfig"

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
        shopInfoData: this.$g.utils.deepClone(DETAILCONFIG.shopInfoData),
        rateInfoData: this.$g.utils.deepClone(DETAILCONFIG.rateInfoData),
        bankInfoData: this.$g.utils.deepClone(DETAILCONFIG.bankInfoData),
        gridConfig: AGENT_TALK_DATA.gridConfig,
        agentConfig: AGENT_TRANSFER,
        formConfigData: null,
        gridBtnConfig: AGENT_TALK_DATA.gridBtnConfig,
        drawer: false,
        drawerType: '',
        materialDrawer: false,
        title: '',
        switchStatus: false,
        countPsdTime: 0,
        nameConfigData: null,
        rateConfigData: null,
        settleConfigData: null,
        dateConfigData: null,
        infoList: []
      }
    },
    computed: {
      blockStatusDesc() {
        if (this.ruleForm.blockStatus === 1) {
          return '启用'
        } else if (this.ruleForm.blockStatus === 2) {
          return '禁用'
        } else if (this.ruleForm.blockStatus === 3) {
          return '封禁'
        } else if (this.ruleForm.blockStatus === 4) {
          return '冻结'
        }
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(AGENT_DETAIL_STATIC)
      this.getAgentDetail(this.agentNo)
      this.getCount(this.agentNo)
    },
    methods: {
      // 查询服务商详情
      getAgentDetail(agentNo) {
        api.getAgentDetail({
          agentNo: this.agentNo
        }).then(res => {
          if (res.status === 0) {
            const ruleForm = res.data
            ruleForm.alipayRate = this.$g.utils.AccMul(ruleForm.alipayRate, 100)
            ruleForm.wechatPayRate = this.$g.utils.AccMul(ruleForm.wechatPayRate, 100)
            ruleForm.chargeFeePercent = this.$g.utils.AccMul(ruleForm.chargeFeePercent, 100)
            this.ruleForm = ruleForm
          }
        })
      },

      // 服务商数据统计
      getCount(agentNo) {
        return api.queryAgentData({
          agentNo: agentNo
        }).then(res => {
          if (res.status === 0) {
            const agentData = res.data
            for (let key in agentData) {
              if (this.$g.utils.isNumber(agentData[key])) {
                agentData[key] = this.$g.utils.toLocaleString(agentData[key])
              }
            }
            this.infoList = this.$g.utils.eachDetailTree(this.infoList, agentData)
            return agentData;
          }
        })
      },

      // 重置登录密码
      clickResetPassword() {
        this.drawer = true
        this.title = '重置登录密码'
        this.drawerType = 'updateLogin'
        this.formConfigData = this.$g.utils.deepClone(FORM_CONFIG.resetPassword)
      },

      /* TODO 服务商状态启用禁用
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
      },*/

      // 修改手机号码
      editTel() {
        this.drawer = true
        this.title = '修改手机号'
        this.drawerType = 'updatePhone'
        this.formConfigData = this.$g.utils.deepClone(FORM_CONFIG.changeMoblie)
      },

      // 修改服务商状态
      onClickEditStatus() {
        this.drawer = true
        this.title = '服务商状态'
        this.drawerType = 'updateBlock'
        this.formConfigData = this.$g.utils.deepClone(FORM_CONFIG.agentStop)
        this.formConfigData[0].initVal = this.ruleForm.blockStatus
      },

      // 修改服务商信息
      clickModify() {
        this.title = '修改资料'
        this.materialDrawer = true
        this.nameConfigData = this.$g.utils.deepClone(FORM_CONFIG.nameSet)
        this.rateConfigData = this.$g.utils.deepClone(FORM_CONFIG.rateSet)
        this.settleConfigData = this.$g.utils.deepClone(FORM_CONFIG.bankSet)
        this.dateConfigData = this.$g.utils.deepClone(FORM_CONFIG.validitySet)
        this.nameConfigData = this.$g.utils.eachFormTree(this.nameConfigData, this.ruleForm)
        this.rateConfigData = this.$g.utils.eachFormTree(this.rateConfigData, this.ruleForm)
        this.settleConfigData = this.$g.utils.eachFormTree(this.settleConfigData, this.ruleForm)
        this.dateConfigData = this.$g.utils.eachFormTree(this.dateConfigData, this.ruleForm)
      },

      // 添加沟通计划
      clickAddTalk() {
        this.drawer = true
        this.drawerType = 'addTalk'
        this.title = '添加沟通记录'
        this.formConfigData = this.$g.utils.deepClone(FORM_CONFIG.talkData)
      },

      // TODO 发送短信验证码
      clickSendPsdCode() {},

      clickSubmit() {
        const ruleForm = this.$refs['formInfo'].clickFootBtn()
        if (!ruleForm) {
          this.$message('请完善信息')
          return
        }
        const that = this;
        const strategies = {
          addTalk() {
            ruleForm.agentNo = that.agentNo
            api.addTalk(ruleForm).then(res => {
              that.submitSuccess(res.status, 'addTalk')
            })
          },
          updateLogin() {
            api.resetPassword({
              agentNo: that.agentNo,
              pwdType: 1
            }).then(res => {
              that.submitSuccess(res.status, 'updateLogin')
            })
          },
          updateBlock() {
            api.updateAgentBlockStatus({
              agentNo: that.agentNo,
              blockStatus: ruleForm.blockStatus
            }).then(res => {
              if (res.status === 0) {
                that.$message({
                  message: '状态修改成功',
                  type: 'success'
                })
                that.getAgentDetail(that.agentNo)
                that.drawer = false
              }
            })
          }
        }

        const computedFunc = ($strategy) => {
          return strategies[$strategy]
        }

        const func = computedFunc(this.drawerType)
          func()
      },

      clickSubmitMaterial() {
        const serviceData = this.$refs['nameInfo'].clickFootBtn();
        const rateData = this.$refs['rateInfo'].clickFootBtn();
        const settleData = this.$refs['settleInfo'].clickFootBtn();
        const dateData = this.$refs['dateInfo'].clickFootBtn
        if (!serviceData) {
          this.$message('请完善服务商信息');
          return
        }
        if (!rateData) {
          this.$message('请完善费率信息');
          return
        }
        if (!settleData) {
          this.$message('请完善结算信息');
          return
        }
        if (!dateData) {
          this.$message('请完善到期信息');
          return
        }
        let infoData = {}
        Object.assign(infoData, serviceData, rateData, settleData, dateData)
        infoData.agentNo = this.agentNo
        infoData.alipayRate = this.$g.utils.AccDiv(infoData.alipayRate, 100)
        infoData.wechatPayRate = this.$g.utils.AccDiv(infoData.wechatPayRate, 100)
        infoData.chargeFeePercent = this.$g.utils.AccDiv(infoData.chargeFeePercent, 100)
        api.updateAgentRate(infoData).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.materialDrawer = false
            this.getAgentDetail(this.agentNo)
          }
        })
      },

      submitSuccess(data, type) {
        if (data === 0) {
          let message = ''
          switch(type) {
            case 'addTalk':
              message = '添加成功'
              break
            case 'updateLogin':
              message = '重置成功'
              break
            case 'updateBlock':
              message = '更新成功'
              break
          }
          this.$message({
            message: message,
            type: 'success'
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
           color: #d7d8cd;
           padding: 0 16px;
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
      padding:  0 24px;
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
  /deep/ .m-card .m-multi-item {
    display: inline-block;
  }
  .profit-data {
    margin: 24px 0 0 24px;
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
