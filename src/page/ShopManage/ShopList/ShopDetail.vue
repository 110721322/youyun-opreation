<template>
  <div>
    <div class="content">
      <div class="tab-box flex-align-center">
        <el-tabs v-model="activeName" class="tab-out">
          <el-tab-pane style="font-size:16px;" label="门店信息" name="0"></el-tab-pane>
          <el-tab-pane style="font-size:16px;" label="门店详情" name="1"></el-tab-pane>
        </el-tabs>
        <el-button v-if="ruleForm.status===1" type="primary" class="edit-btn" @click="clickEdit">编辑</el-button>
      </div>
      <div v-if="activeName==='0'" class="info-box">
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="basicInfoConfig"
            module-title="基础信息"
            theme="border"
          >
            <template slot="switch">
              <div class="flex-align-center">
                <span :class="['disabledTxt', ruleForm.isDisabled?'inactive':'active']">{{ruleForm.isDisabled ? '禁用' : '启用'}}</span>
                <el-switch v-model="ruleForm.isDisabled" :active-value="0" :inactive-value="1" @change="changeSwitch"></el-switch>
              </div>
            </template>
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="payInfoConfig"
            module-title="支付信息"
            theme="border"
          >
          </yun-detail-mode>  
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="openInfoConfig"
            module-title="开户信息"
            theme="border"
          >
          </yun-detail-mode>  
        </div>
      </div>
      <div v-show="activeName==='1'" class="detail-box">
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="shopInfoDetailConfig"
            module-title="门店信息"
            >
              <template slot="area">
                <div class="areaTxt">{{( ruleForm.provinceName||'--') + '省' + (ruleForm.cityName||'--') + '市' + (ruleForm.areaName||'--') + '区' }}</div>
              </template>
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="verityDetailConfig"
            module-title="认证信息"
            >
              <template slot="shopLicenseDate">
                <div class="typeTxt">{{ ruleForm.shopLicenseBegDate + '至' + ruleForm.shopLicenseEndDate }}</div>
              </template>
              <template slot="idCardDate">
                <div class="typeTxt">{{ ruleForm.idCardBeginDate + '至' + ruleForm.idCardExpireDate }}</div>
              </template>
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="settleDetailConfig"
            module-title="结算信息"
            >
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="rateDetailConfig"
            module-title="费率信息"
            >  
          </yun-detail-mode>
        </div>
      </div>
      <div v-if="activeName==='1'&&ruleForm.status===0" class="flex-align-center flex-justify-center foot-btn">
        <div>
          <el-button type="primary" size="normal" @click="passDialog = true">通过</el-button>
          <el-button size="normal" @click="dialogVisible = true">驳回</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="驳回"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <yun-form
        ref="rejectForm"
        :form-base-data="rejectDataConfig"
        :label-width="'150px'"
        :show-foot-btn="false"
      ></yun-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickRejectIndirectAudit">确 定</el-button>
      </span>
    </el-dialog>
    <yun-dialog
        title="通过"
        :dialoger="passDialog"
        width="500px"
        cancel-text="取消"
        confirm-text="确定"
        @confirm="clickPass"
        @cancel="cancel"
    >
      <div slot="body" class="passDialogTxt">确认通过该门店信息吗？通过后信息将不能修改</div>
    </yun-dialog>
  </div>
</template>

<script>
  import { FORM_CONFIG } from "../formConfig/shopDetail";
  import api from "@/api/api_shop";
  export default {
    data() {
      return {
        basicInfoConfig: FORM_CONFIG.basicInfoData,
        payInfoConfig: FORM_CONFIG.payInfoData,
        openInfoConfig: FORM_CONFIG.openInfoData,
        shopInfoDetailConfig: FORM_CONFIG.shopInfoDetail,
        verityDetailConfig: FORM_CONFIG.verityDetail,
        settleDetailConfig: FORM_CONFIG.settleDetail,
        rateDetailConfig: FORM_CONFIG.rateDetail,
        rejectDataConfig: FORM_CONFIG.rejectConfig,
        activeName: '0',
        ruleForm: {},
        radio: 1,
        passDialog: false,
        dialogVisible: false,
        value: 0
      }
    },
    created() {
      this.shopQueryDetail()
    },
    mounted() {
    },
    methods: {
      shopQueryDetail() {
        const params = {
          shopNo: this.$route.query.shopNo
        }
        api.shopQueryDetail(params).then(res => {
          if(res.status === 0) {
            this.ruleForm = res.data
            switch(this.ruleForm.status) {
              case 0:
                this.ruleForm.statusTxt = '预审核中'
                break;
              case 1:
                this.ruleForm.statusTxt = '平台驳回'
                break;
              case 2:
                this.ruleForm.statusTxt = '通道审核中'
                break;
              case 3:
                this.ruleForm.statusTxt = '通道驳回'
                break;
              case 4:
                this.ruleForm.statusTxt = '通过'
                break;
              case 5:
                this.ruleForm.statusTxt = '微信认证中'
                break;
              case 6:
                this.ruleForm.statusTxt = '微信认证拒绝'
                break;
              case 7:
                this.ruleForm.statusTxt = '微信认证成功'
                break;
              default:
                this.ruleForm.statusTxt = '--'
            }
            if (this.ruleForm.shopType === 'enterprise') {
              this.ruleForm.shopTypeTxt = '企业'
            } else if (this.ruleForm.shopType === 'individual') {
              this.ruleForm.shopTypeTxt = '个体工商'
            } else if (this.ruleForm.shopType === 'personal') {
              this.ruleForm.shopTypeTxt = '个人'
            }
            if (this.ruleForm.settleType === "0") {
              this.ruleForm.settleTypeTxt = '对公法人'
            } else if (this.ruleForm.settleType === "1") {
              this.ruleForm.settleTypeTxt = '对私法人'
            } else if (this.ruleForm.settleType === "2") {
              this.ruleForm.settleTypeTxt = '对私非法人'
            }
          }
        })
      },
      clickPass() {
        const params = {
          merchantNo: this.ruleForm.merchantNo,
          shopNo: this.$route.query.shopNo
        }
        api.passIndirectAudit(params).then(res => {
          if (res.status === 0) {
            this.passDialog = false
            this.$router.back()
            this.$message.success('已通过！')
          }
        })
      },
      cancel() {
        this.passDialog = false
      },
      clickRejectIndirectAudit() {
        const ruleForm = this.$refs.rejectForm.clickFootBtn();
        if (!ruleForm) {
          this.$message('请填写驳回原因');
          return
        }
        const params = {
          merchantNo: this.ruleForm.merchantNo,
          shopNo: this.$route.query.shopNo,
          reason: this.$refs.rejectForm.ruleForm.reason
        }
        api.rejectIndirectAudit(params).then(res => {
          if (res.status === 0) {
            this.dialogVisible = false
            this.$router.back();
            this.$message.success('已驳回！')
          }
        })
      },
      changeSwitch() {
        const params = {
          id: this.ruleForm.id,
          isDisabled: this.ruleForm.isDisabled,
          shopNo: this.ruleForm.shopNo
        }
        api.shopUpdate(params).then(res => {
          if (res.status === 0) {
            this.$message.success('门店状态已改变！')
          }
        })
      },
      clickEdit() {
        this.$router.push('/shopManage/shopList/shopDetail/editShop?id=' + this.ruleForm.id + '&shopNo=' + this.ruleForm.shopNo).catch(() => {})
      },
      handleClose() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
    background: white;
    .tab-box {
      padding: 24px;
      width: 100%;
      /deep/ .el-tabs__header{
        margin: 0px;
      }
    }
  }
  .tab-out {
    flex-shrink: 1;
    width: 100%;
  }
  .edit-btn {
    flex-shrink: 0;
  }
  .info-box {
    margin: 0 24px;
    padding-bottom: 24px;
  }
  .detail-box {
    margin: 0 24px;
    padding-bottom: 24px;
    .detail-mode-box {
      border-bottom: 1px solid #EBEEF5;
    }
  }
  .pay-box, .open-box {
    margin-top: 24px;
  }
  /deep/ .el-radio-group {
    display: flex;
    align-items: center;
  }
  .foot-btn {
    padding: 16px 0;
    box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.09);
  }
  /deep/ .formTemplate {
    margin: 0;
  }
  .detail-mode-box {
    margin-bottom: 24px;
  }
  .disabledTxt {
    margin-right: 10px;
  }
  .inactive {
    color: #F5222D;
  }
  .active {
    color: #1989FA;
  }
  .rateImg {
    width: 16px;
    height: 16px;
  }
  .rateTxt {    
    font-size: 14px;
    font-weight: 400;
    color: #333335;
    line-height: 20px;
  }
  .passDialogTxt {
    text-align: center;
    margin-top: 60px;
    margin-bottom: 90px;  
    font-size: 16px;
    font-weight: 400;
    color: #333335;
    line-height: 22px;
  }
</style>
