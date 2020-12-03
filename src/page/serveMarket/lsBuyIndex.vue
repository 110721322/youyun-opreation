<template>
  <div class="container">
    <div class="top">
      <div class="left-img">
        <img src="../../assets/img/leshua_icon.png" alt="左边图标">
      </div>
      <div class="right-info">
        <div class="right-title">{{ productItem.productName }}</div>
        <div class="right-subtitle">{{ productItem.productDesc }}</div>
      </div>
    </div>
    <div class="buy-info">
      <div class="buy-time">
        <div class="time">
          <span class="select-name">服务时间</span>
          <div v-for="(item, index) in comboList" :key="index" class="select-btn" :class="selectIndex===index? 'select-show' : ''">
            <button @click="clickSelectDate(item,index)">{{ item.comboName }}</button>
          </div>
        </div>
        <div class="price"><span>购买价格</span><span>¥</span><span>{{ comboPrice }}</span></div>
      </div>
      <div class="buy-option">
        <button class="buy-btn" @click="clickBuyserve">购买服务</button>
      </div>

    </div>
    <div v-if="productItem.buyStatus===1" class="content">
      <div class="title">定制详情</div>
      <div class="descript">需要您先到乐刷官方申请账号，把以下所需字段获取到并填写后提交，具体的操作流程可查看<span style="color: #1989fa;">《乐刷通道接入指南》</span>如有疑问可咨询：400-887-8292</div>
      <lsBuyEdit
        v-if="!showEdit"
        :form-base-data="fromConfigData.formData"
        :label-width="'auto'"
        @commit="onClickCommit"
      ></lsBuyEdit>
      <ul v-else class="fill-info">
        <li>
          <span>乐刷代理商ID:</span>
          <span>{{ detail.channelAgentId }}</span>
        </li>
        <li>
          <span>代理商ID:</span>
          <span>{{ detail.channelAgentCode }}</span>
        </li>
        <li>
          <span>微信公众号APPID:</span>
          <span>{{ showPassword?detail.weChatOfficialAccountId:'********' }}</span>
          <img src="../../assets/img/see_password.png" alt="" @click="showPassword=!showPassword">
        </li>
        <li>
          <span>支付宝PID:</span>
          <span>{{ showPassword3?detail.sysServiceProviderId:'********' }}</span>
          <img src="../../assets/img/hide_password.png" alt="" @click="showPassword3=!showPassword3">
        </li>
        <li>
          <span>交易加密key:</span>
          <span>{{ showPassword2?detail.requestKey:'********' }}</span>
          <img src="../../assets/img/see_password.png" alt="" @click="showPassword2=!showPassword2">
        </li>
        <li>
          <span>支付宝费率:</span>
          <span>{{ detail.alipayRate }}‰</span>
        </li>
        <li>
          <span>微信费率:</span>
          <span>{{ detail.wechatPayRate }}‰</span>
        </li>
        <li>
          <span>云闪付费率:<br />(小于1000)</span>
          <span>{{ detail.cloudPayLe1000Rate }}‰</span>
        </li>
        <li>
          <span>云闪付费率:<br />(大于1000)</span>
          <span>{{ detail.cloudPayGt1000Rate }}‰</span>
        </li>
      </ul>
    </div>
    <div v-else class="operation">
      <div class="operation-title">操作流程</div>
      <div class="operation-step">
        <div class="left-step">步骤一:</div>
        <ul class="right-step">
          <li class="right-title">在乐刷侧开通业务</li>
          <li class="right-list">需要您先到乐刷官方申请账号，把所需字段获取，具体的操作流程可查看<span style="color: #1989fa;">《乐刷通道接入指南》</span></li>
        </ul>
      </div>
      <div class="operation-step">
        <div class="left-step">步骤二:</div>
        <ul class="right-step">
          <li class="right-title">购买服务</li>
          <li class="right-list">支付方式支持：线上扫码付款及对公转账</li>
          <li class="right-list">1.扫码支付：支持微信/支付宝/云闪付扫码支付，支付成功后直接进行业务拓展</li>
          <li class="right-list">2.对公转账：需对公转账到以下信息，并上传证明，审核通过后可进行业务拓展</li>
          <li class="right-bank">
            <div class="bank"><div class="bank-title">打款账户:</div>3301040160001013187</div>
            <div class="bank"><div class="bank-title">开户行:</div>杭州银行滨江支行</div>
          </li>
        </ul>
      </div>
      <div class="operation-step">
        <div class="left-step">步骤三:</div>
        <ul class="right-step">
          <li class="right-title">填写接入字段</li>
          <li class="right-list">按照信息提示填写开通通道所需字段，填写成功后提交进行一键部署</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
import lsBuyEdit from "@/components/form/announcementEditForm.vue";
import { FORM_CONFIG } from "./formConfig/lsBuyConfig";
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
        if (res.data) {
          this.comboList = res.data || []
          this.comboItem = this.comboList[this.selectIndex] || {}
          this.comboPrice = this.comboList[this.selectIndex].comboAmount || 0
        }
      })
    },

    getLeShuaDetail() {
      api.getLeShuaDetail({}).then(res => {
        if (res.data) {
          this.detail = res.data
          if (this.detail.channelAgentId || this.detail.channelAgentCode || this.detail.alipayRate || this.detail.wechatPayRate || this.detail.cloudPayLe1000Rate || this.detail.cloudPayGt1000Rate || this.detail.requestKey) {
            this.showEdit = true
          } else {
            this.showEdit = false
          }
        }
      })
    },

    clickSelectDate(data, index) {
      this.comboItem = data
      this.comboPrice = data.comboAmount
      this.selectIndex = index
    },

    clickBuyserve() {
      localStorage.setItem('comboItem', JSON.stringify(this.comboItem))
      if (this.comboItem.id) {
        this.$router.push({
          name: "subOrder"
        });
      }
    },

    onClickCommit($val) {
      api.saveLeShuaConfig({
        ...$val,
        notifyKey: 'notifyKey'
      }).then(res => {
        if (res.data) {
          this.$message.success('成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 24px 24px 40px 24px;
  width: 100%;
  box-sizing: border-box;
}

.top {
  display: flex;
  justify-content: space-between;
  padding: 32px 67px 32px 32px;
  width: 100%;
  height: 128px;
  box-sizing: border-box;
  background: #fff;
}

.left-img {
  margin-right: 24px;
  width: 64px;
  height: 64px;
}

.left-img img {
  width: 64px;
  height: 64px;
}

.right-info {
  padding-top: 7px;
  width: 100%;
}

.right-title {
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: #333335;
}

.right-subtitle {
  font-size: 14px;
  color: #909399;
  line-height: 20px;
}

.buy-info {
  padding-left: 123px;
  padding-right: 67px;
  width: 100%;
  background: #fff;
}

.buy-time {
  padding: 32px 0;
  width: 100%;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

.time {
  display: flex;
  margin-bottom: 22px;
  align-items: center;
}

.select-name {
  color: #909399;
  font-size: 16px;
}

.select-btn.select-show {
  margin-right: 16px;
  width: 90px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  border-radius: 3px;
  border: 1px solid #1989fa;
  color: #1989fa;
  font-size: 12px;
}

.select-btn.select-show button {
  color: #1989fa;
}

.select-btn {
  margin-right: 16px;
  width: 90px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  border-radius: 3px;
  border: 1px solid #c7c8cd;
  color: #606266;
  font-size: 12px;
}

.select-btn button {
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
  margin-right: 24px;
  color: #909399;
  font-size: 16px;
}

.price span:nth-child(1) {
  margin-right: 24px;
  color: #909399;
  font-size: 16px;
}

.price span:nth-child(2) {
  color: #f5222d;
  font-size: 14px;
  font-weight: bold;
}

.price span:nth-child(3) {
  color: #f5222d;
  font-size: 24px;
  font-weight: bold;
}

.time span:nth-child(2) {
  width: 90px;
  height: 28px;
  color: #1989fa;
  border: 1px solid #1989fa;
  text-align: center;
  line-height: 28px;
  border-radius: 3px;
}

.buy-option {
  padding: 24px 0 84px;
  width: 100%;
  box-sizing: border-box;
}

.buy-btn {
  display: block;
  width: 114px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #1989fa;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
}

.content {
  padding: 32px 32px 158px 32px;
  margin-top: 24px;
  width: 100%;
  background: #fff;
}

.title {
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  line-height: 22px;
}

.descript {
  padding-left: 24px;
  width: 100%;
  height: 68px;
  line-height: 68px;
  background: #fafafa;
  color: #909399;
  font-size: 14px;
}

.fill-info {
  margin-top: 45px;
}

.fill-info li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.fill-info li span:nth-child(1) {
  display: block;
  margin-right: 12px;
  width: 138px;
  text-align: right;
  color: #333335;
}

.fill-info li span:nth-child(2) {
  color: #606266;
}

.fill-info li img {
  display: block;
  margin-left: 5px;
  width: 16px;
  height: 16px;
}

.operation {
  margin-top: 24px;
  padding: 32px 0 32px 32px;
  width: 100%;
  background: #fff;
}

.operation-title {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 32px;
}

.operation-step {
  display: flex;
  margin-bottom: 32px;
  width: 100%;
}

.left-step {
  color: #1989fa;
  font-size: 14px;
  width: 56px;
  line-height: 20px;
}

.right-step {
  width: 100%;
  font-size: 14px;
}

.right-title {
  color: #333335;
  line-height: 20px;
}

.right-list {
  margin-top: 8px;
  color: #909399;
}

.right-bank {
  margin-top:8px;
  padding: 16px 0 16px 16px;
  width: 256px;
  background: #fafafa;
  border-radius: 4px;
  color: #606266;
}

.bank {
  display: flex;
}

.bank-title {
  margin-bottom: 8px;
  width: 70px;
  line-height: 18px;
}
</style>
