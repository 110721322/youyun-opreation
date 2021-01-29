<template>
  <div>
    <div class="content">
      <div class="tab-box m-select-top flex-align-center">
        <el-tabs v-model="activeName" class="tab-out">
          <el-tab-pane style="font-size:16px;" label="门店信息" name="0"></el-tab-pane>
          <el-tab-pane style="font-size:16px;" label="门店详情" name="1"></el-tab-pane>
        </el-tabs>
        <div class="right-btn" v-if="ruleForm.status===1 || ruleForm.status===3">
          <el-button v-if="activeName==='1'" type="primary" @click="clickEdit">编辑</el-button>
        </div>
      </div>
      <div v-if="ruleForm.status===1 || ruleForm.status===3" class="error-box">
        <el-alert
          :title="ruleForm.rejectReason"
          type="error"
          show-icon>
        </el-alert>  
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
            <template slot="statusSlot">
              <div class="flex-align-center">
                <span>{{ ruleForm.statusTxt }}</span>
                <span v-if="ruleForm.status === 6" class="statusActTxt" @click="qrCodeDialoger=true">微信未认证</span>
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
      <div v-if="activeName==='1'" class="detail-box">
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="shopInfoDetailConfig"
            module-title="门店信息"
            >
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="verityDetailConfig"
            module-title="认证信息"
            >
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
    </div>
    <div v-if="activeName==='1'&&ruleForm.status===0" class="flex-align-center flex-justify-center foot-btn">
      <div>
        <el-button type="primary" size="normal" @click="passDialog = true">通过</el-button>
        <el-button size="normal" @click="dialogVisible = true">驳回</el-button>
      </div>
    </div>

    <div v-if="activeName==='0'" class="settle-data">
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
    <yun-dialog
        title="认证码"
        :dialoger="qrCodeDialoger"
        width="500px"
        cancel-text="取消"
        confirm-text="确定"
        @confirm="onClickClose"
        @cancel="onClickClose"
    >
      <div slot="body" class="out-box">
        <div class="imgPart">
          <img :src="ruleForm.qrCodeUrl" alt="认证码" />
        </div>
      </div>
    </yun-dialog>
  </div>
</template>

<script>
  import { FORM_CONFIG, INFO_LIST } from "../formConfig/shopDetail";
  import areaData from "youyun-vue-components/assets/data/areaData.ws"
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
        value: 0,
        qrCodeDialoger: false,
        statisticsData: {},
        infoList: []
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(INFO_LIST)
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
            this.merchantShopInfo()
            const areasNetedList = this.$g.utils.getNestedArr(areaData, 'children')
            const areas = [this.ruleForm.provinceCode, this.ruleForm.cityCode, this.ruleForm.areaCode]
              .filter(item => !!item)
              .map(item => {
                return areasNetedList.find(area => item === area.value)
              })
              .map(item => item.label)
            const areasStr = areas.join('')
            this.ruleForm.areasStr = areasStr
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
                this.ruleForm.statusTxt = '微信未认证'
                break;
              case 7:
                this.ruleForm.statusTxt = '微信认证拒绝'
                break;
              case 8:
                this.ruleForm.statusTxt = '已开通'
                break;
              default:
                this.ruleForm.statusTxt = '--'
            }
          }
        })
      },
      merchantShopInfo() {
        const params = {
          merchantNo: this.ruleForm.merchantNo,
          shopNo: this.$route.query.shopNo
        }
        api.merchantShopInfo(params).then(res => {
          if (res.status === 0) {
            this.statisticsData = res.data
            this.infoList.forEach((item, index) => {
              if (item.key === 'totalActualAmount') {
                item.label = '实收金额（'+ (res.data.totalActualCount||0) +'笔）'
                item.children[0].label = '昨日日订单金额(' + (res.data.yesterdayActualCount || 0) + '笔)'
                item.children[0].value = '¥' + (res.data.yesterdayActualAmount || 0)
              }
              if (item.key === 'totalRefundAmount') {
                item.label = '退款总额（'+ (res.data.totalRefundCount||0) +'笔）'
                item.children[0].label = '昨日退款金额(' + (res.data.yesterdayRefundCount || 0) + '笔)'
                item.children[0].value = '¥' + (res.data.yesterdayRefundAmount || 0)
              }
              if (item.key === 'totalDeviceCount') {
                item.children[0].value = (res.data.yesterdayActiveDeviceCount || 0)
              }
              item.value = (res.data[item.key] || 0) + ''
            })
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
            this.$router.replace('/shopManage/shopList');
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
      },
      onClickClose() {
        this.qrCodeDialoger = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
    background: white;
    .tab-box {
      padding-bottom: 24px;
      width: 100%;
      /deep/ .el-tabs__header{
        margin: 0px;
      }
    }
    .m-select-top {
      justify-content: space-between;
      .right-btn {
        padding-right: 24px;
        padding-top: 14px;
        height: 60px;
        background: #fff;
        border-bottom: 1px solid #DCDFE6;
        .el-button {
          padding: 0 20px;
          margin: 0;
          height: 32px;
          line-height: 32px;
          font-size: 12px;
        }
      }
      .el-tabs {
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #DCDFE6;
      }
      /deep/ .el-tabs__header {
        margin: 0;
        padding: 16px 0 0 24px;
      }
      /deep/ .el-tabs__nav-wrap::after {
        display: none !important;
      }
      /deep/ .el-tabs__item {
        height: 44px;
      }
    }
  }
  .m-trade {
    margin: 0 24px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .m-trade-box {
      padding: 16px 24px;
      background: #fff;
      margin-right: 24px;
      margin-bottom: 24px;
      .m-trade-line1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        height: 20px;
        .left-trade {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 14px;
            color: #606266;
          }
          img {
            display: block;
            width: 16px;
            height: 16px;
            margin-left: 8px;
          }
        }
        .right-trade {
          width: 16px;
          height: 16px;
          img {
            display: block;
            width: 16px;
            height: 16px;
          }
        }
      }
      .m-trade-line2 {
        margin-bottom: 16px;
        line-height: 34px;
        font-size: 24px;
        color: #333335;
      }
      .m-trade-line3 {
        padding-top: 8px;
        border-top: 1px solid #EBEEF5;
        font-size: 14px;
        line-height: 20px;
        color: #333335;
      }
    }
  }
  .settle-data {
    margin: 0 24px;
  }
  .error-box {
    padding: 0 24px;
    margin-bottom: 24px;
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
    // box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.09);
  }
  /deep/ .formTemplate {
    margin: 0;
  }
  .detail-mode-box {
    margin-bottom: 24px;
  }
  .disabledTxt {
    margin-right: 4px;
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
  .out-box {
    padding: 24px;
  }
  .out-form {
    margin: 24px 0;
  }
  .imgPart {
    width: 144px;
    height: 144px;
    padding: 10px;
    margin: 0 auto;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .statusActTxt {
    margin-left: 4px;
    color: #1989FA;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
