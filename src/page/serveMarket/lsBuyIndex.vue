<template>
  <div class="container">
    <div class="top">
      <div class="left_img">
        <img src="../../assets/img/leshua_icon.png" alt="">
      </div>
      <div class="right_info">
        <div class="right_title">{{ productItem.productName }}</div>
        <div class="right_subtitle">{{ productItem.productDesc }}</div>
      </div>
    </div>
    <div class="buy_info">
      <div class="buy_time">
        <div class="time">
          <span class="select_name">服务时间</span>
          <div v-for="(item, index) in comboList" :key="index" class="select_btn" :class="selectIndex===index? 'select_show' : ''">
            <button @click="onclick_selectDate(item,index)">{{ item.comboName }}</button>
          </div>
        </div>
        <div class="price"><span>购买价格</span><span>¥</span><span>{{ comboPrice }}</span></div>
      </div>
      <div class="buy_option">
        <button class="buy_btn" @click="onclick_buyserve">购买服务</button>
      </div>

    </div>
    <div v-if="productItem.buyStatus===1" class="content">
      <div class="title">定制详情</div>
      <div class="descript">需要您先到乐刷官方申请账号，把以下所需字段获取到并填写后提交，具体的操作流程可查看<span style="color: #1989FA;">《乐刷通道接入指南》</span>如有疑问可咨询：400-887-8292</div>
      <lsBuyEdit
        v-if="!showEdit"
        :form-base-data="fromConfigData.formData"
        :label-width="'auto'"
        @commit="handleCommit"
      ></lsBuyEdit>
      <ul v-else class="fill_info">
        <li><span>乐刷代理商ID:</span><span>{{ detail.channelAgentId }}</span></li>
        <li><span>代理商ID:</span><span>{{ detail.channelAgentCode }}</span></li>
        <li><span>微信公众号APPID:</span><span>{{ showPassword?detail.weChatOfficialAccountId:'********' }}</span><img @click="showPassword=!showPassword" src="../../assets/img/see_password.png" alt=""></li>
        <li><span>支付宝PID:</span><span>{{ showPassword3?detail.sysServiceProviderId:'********' }}</span><img @click="showPassword3=!showPassword3" src="../../assets/img/hide_password.png" alt=""></li>
        <li><span>交易加密key:</span><span>{{ showPassword2?detail.requestKey:'********' }}</span><img @click="showPassword2=!showPassword2" src="../../assets/img/see_password.png" alt=""></li>
        <li><span>支付宝费率:</span><span>{{ detail.alipayRate }}‰</span></li>
        <li><span>微信费率:</span><span>{{ detail.wechatPayRate }}‰</span></li>
        <li><span>云闪付费率:<br />(小于1000)</span><span>{{ detail.cloudPayLe1000Rate }}‰</span></li>
        <li><span>云闪付费率:<br />(大于1000)</span><span>{{ detail.cloudPayGt1000Rate }}‰</span></li>
      </ul>
    </div>
    <div v-else class="operation">
      <div class="operation_title">操作流程</div>
      <div class="operation_step">
        <div class="left_step">步骤一:</div>
        <ul class="right_step">
          <li class="right_title">在乐刷侧开通业务</li>
          <li class="right_list">需要您先到乐刷官方申请账号，把所需字段获取，具体的操作流程可查看<span style="color: #1989FA">《乐刷通道接入指南》</span></li>
        </ul>
      </div>
      <div class="operation_step">
        <div class="left_step">步骤二:</div>
        <ul class="right_step">
          <li class="right_title">购买服务</li>
          <li class="right_list">支付方式支持：线上扫码付款及对公转账</li>
          <li class="right_list">1.扫码支付：支持微信/支付宝/云闪付扫码支付，支付成功后直接进行业务拓展</li>
          <li class="right_list">2.对公转账：需对公转账到以下信息，并上传证明，审核通过后可进行业务拓展</li>
          <li class="right_bank">
            <div class="bank"><div class="bank_title">打款账户:</div>3301040160001013187</div>
            <div class="bank"><div class="bank_title">开户行:</div>杭州银行滨江支行</div>
          </li>
        </ul>
      </div>
      <div class="operation_step">
        <div class="left_step">步骤三:</div>
        <ul class="right_step">
          <li class="right_title">填写接入字段</li>
          <li class="right_list">按照信息提示填写开通通道所需字段，填写成功后提交进行一键部署</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import lsBuyEdit from "@/components/form/announcementEditForm.vue";
import { FORM_CONFIG } from "./formConfig/lsBuyConfig";
import api from "@/api/api_serveMarket";
export default {
  name: "IsBuyIndex",
  components: { lsBuyEdit },
  data() {
    return {
      fromConfigData: FORM_CONFIG.sendMessageData,
      selectIndex: 0,
      comboList: [],
      comboPrice: 0,
      showTip: false,
      comboItem: {},
      productItem: {},
      showPassword: false,
      showPassword2: false,
      showPassword3: false,
      showEdit: false,
      detail: {}
    }
  },
  created() {
    this.productItem = JSON.parse(localStorage.getItem('productItem'))
    this.getModelDetail()
    if (this.productItem.buyStatus === 1) {
      this.getLeShuaDetail()
    }
  },
  methods: {
    getModelDetail() {
      api.selectProductCombo({
        productCode: this.productItem.productCode
      }).then(res => {
        if (res.datas) {
          this.comboList = res.datas || []
          this.comboItem = this.comboList[this.selectIndex] || {}
          this.comboPrice = this.comboList[this.selectIndex].comboAmount || 0
        }
      })
    },
    getLeShuaDetail() {
      api.getLeShuaDetail({}).then(res => {
        if (res.datas) {
          this.detail = res.datas
          if (this.detail.channelAgentId || this.detail.channelAgentCode || this.detail.alipayRate || this.detail.wechatPayRate || this.detail.cloudPayLe1000Rate || this.detail.cloudPayGt1000Rate || this.detail.requestKey) {
            this.showEdit = true
          } else {
            this.showEdit = false
          }
        }
      })
    },
    onclick_selectDate(data, index) {
      this.comboItem = data
      this.comboPrice = data.comboAmount
      this.selectIndex = index
    },
    onclick_buyserve() {
      localStorage.setItem('comboItem', JSON.stringify(this.comboItem))
      if (this.comboItem.id) {
        this.$router.push({
          name: "subOrder"
        });
      }
    },
    handleCommit($val) {
      api.saveLeShuaConfig({
        ...$val,
        notifyKey: 'notifyKey'
      }).then(res => {
        if (res.datas) {
          this.$message.success('成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    padding: 24px 24px 40px 24px;
    box-sizing: border-box;
  }
  .top {
    width: 100%;
    height: 128px;
    padding: 32px 67px 32px 32px;
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
  }
  .left_img {
    width: 64px;
    height: 64px;
    margin-right: 24px;
  }
  .left_img img {
    width: 64px;
    height: 64px;
  }
  .right_info {
    width: 100%;
    padding-top: 7px;
  }
  .right_title {
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: #333335;
    margin-bottom: 8px;
  }
  .right_subtitle {
    font-size: 14px;
    color: #909399;
    line-height: 20px;
  }
  .buy_info {
    width: 100%;
    padding-left: 123px;
    padding-right: 67px;
    background: #ffffff;
  }
  .buy_time {
    width: 100%;
    padding: 32px 0;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }
  .time {
    display: flex;
    margin-bottom: 22px;
    align-items: center;
  }
  .select_name {
  color: #909399;
  font-size: 16px;
}
.select_btn.select_show{
  width: 90px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  border-radius: 3px;
  border:1px solid #1989FA;
  color: #1989FA;
  font-size: 12px;
  margin-right: 16px;
}
.select_btn.select_show button {
  color: #1989FA;
}
.select_btn {
  width: 90px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  border-radius: 3px;
  border:1px solid #C7C8CD;
  color: #606266;
  font-size: 12px;
  margin-right: 16px;
}
.select_btn button {
  color: #606266;
}
  .price {
    display: flex;
    align-items: baseline;
  }
  .price span {
    display: block;
  }
  .time span {
    display: block;
  }
  .time span:nth-child(1) {
    color: #909399;
    font-size: 16px;
    margin-right: 24px;
  }
  .price span:nth-child(1) {
    color: #909399;
    font-size: 16px;
    margin-right: 24px;
  }
  .price span:nth-child(2) {
    color: #F5222D;
    font-size: 14px;
    font-weight: bold;
  }
  .price span:nth-child(3) {
    color: #F5222D;
    font-size: 24px;
    font-weight: bold;
  }
  .time span:nth-child(2) {
    width: 90px;
    height: 28px;
    color: #1989FA;
    border: 1px solid #1989FA;
    text-align: center;
    line-height: 28px;
    border-radius: 3px;
  }
  .buy_option {
    width: 100%;
    padding: 24px 0 84px;
    box-sizing: border-box;
  }
  .buy_btn {
    display: block;
    width: 114px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #1989FA;
    font-size: 14px;
    border-radius: 4px;
    color: #ffffff;
  }
  .content {
    width: 100%;
    padding: 32px 32px 158px 32px;
    background: #ffffff;
    margin-top: 24px;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
    margin-bottom: 24px;
  }
  .descript {
    width: 100%;
    height: 68px;
    line-height: 68px;
    background: #FAFAFA;
    padding-left: 24px;
    color: #909399;
    font-size: 14px;
  }
  .fill_info {
    margin-top: 45px;
  }
  .fill_info li {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .fill_info li span:nth-child(1) {
    display: block;
    width: 138px;
    text-align: right;
    margin-right: 12px;
    color: #333335;
  }
  .fill_info li span:nth-child(2) {
    color: #606266;
  }
  .fill_info li img {
    display: block;
    width: 16px;
    height: 16px;
    margin-left: 5px;
  }
  .operation {
    width: 100%;
    margin-top: 24px;
    background: #ffffff;
    padding: 32px 0 32px 32px;
  }
  .operation_title {
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 32px;
  }
  .operation_step {
    width: 100%;
    display: flex;
    margin-bottom: 32px;
  }
  .left_step{
    color: #1989FA;
    font-size: 14px;
    width: 56px;
    line-height: 20px;
  }
  .right_step {
    width: 100%;
    font-size: 14px;
  }
  .right_title {
    color: #333335;
    line-height: 20px;
  }
  .right_list {
    color: #909399;
    margin-top: 8px;
  }
  .right_bank {
    margin-top:8px;
    width: 256px;
    padding: 16px 0 16px 16px;
    background: #FAFAFA;
    border-radius: 4px;
    color: #606266;
  }
  .bank {
    display: flex;
  }
  .bank_title {
    width: 70px;
    line-height: 18px;
    margin-bottom: 8px;
  }
</style>
