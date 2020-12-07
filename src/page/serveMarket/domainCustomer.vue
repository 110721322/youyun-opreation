<template>
  <div class="container">
    <div class="top">
      <div class="left-img">
        <img src="../../assets/img/domain_photo.png" alt="图标" />
      </div>
      <div class="right-info">
        <div class="right-title">{{ productItem.productName }}</div>
        <div class="right-subtitle">{{ productItem.productDesc }}</div>
      </div>
    </div>
    <div class="buy-info">
      <div class="buy-time">
        <div class="time">
          <span>服务时间</span>
          <div v-for="(item, index) in comboList" :key="index" class="select-btn" :class="selectIndex===index? 'select_show' : ''">
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
      <div class="descript">可对于二级域名进行定制，例如：主域名输入laoban，则oa办公后台地址为：www.laoban.oa.aduer.com。若需要主域名变更则需订购源码模式，<span style="color: #1989fa;">去订购></span></div>
      <domainEditor
        v-show="!ifHaveDomain"
        :form-base-data="fromConfigData.formData"
        :label-width="'auto'"
        @commit="onClickCommit"
      ></domainEditor>
      <ul v-show="ifHaveDomain" class="fill-info">
        <li><span>主域名:</span><span>{{ detail.mainDomain }}</span></li>
        <li><span>oa办公后台:</span><span>{{ detail.oaDomain }}</span></li>
        <li><span>服务商后台:</span><span>{{ detail.agentDomain }}</span></li>
        <li><span>商户后台:</span><span>{{ detail.merchantDomain }}</span></li>
      </ul>
    </div>
    <div v-else class="operation">
      <div class="operation-title">操作说明</div>
      <div class="operation-step">
        <div class="left-step">步骤一:</div>
        <ul class="right-step">
          <li class="right-title">域名选定</li>
          <li class="right-list">选定需要定制的域名名称（本次定制仅针对于定制二级域名）</li>
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
          <li class="right-title">填写域名，一键定制</li>
          <li class="right-list">输入主域名，点击生成二级域名，确认无误后一键定制成功</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import domainEditor from "@/components/form/announcementEditForm.vue";
import { FORM_CONFIG } from "./formConfig/domainConfig";
import api from "@/api/api_serveMarket";
export default {
  name: "DomainCustomer",
  components: {
    domainEditor
  },
  data() {
    return {
      fromConfigData: FORM_CONFIG.sendMessageData,
      comboList: [],
      comboPrice: 0,
      comboItem: {},
      productItem: {},
      selectIndex: 0,
      detail: {},
      ifHaveDomain: false
    }
  },
  created() {
    this.productItem = JSON.parse(localStorage.getItem('productItem'))
    this.getModelDetail()
    if (this.productItem.buyStatus === 1) {
      this.domainGenerationDetail()
    }
  },
  methods: {
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
    onClickCommit($val) {
      api.customDomainGeneration({
        ...$val
      }).then(res => {
        if (res.data) {
          this.$message.success('成功')
          this.$router.go(-1)
        }
      })
    },
    domainGenerationDetail() {
      api.domainGenerationDetail({}).then(res => {
        if (res.data) {
          this.detail = res.data;
          if (this.detail.mainDomain || this.detail.oaDomain || this.detail.agentDomain || this.detail.merchantDomain) {
            this.ifHaveDomain = true
          } else {
            this.ifHaveDomain = false
          }
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
    background: #fff;
    width: 100%;
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
    width: 100%;
    padding: 24px 0 84px;
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
    padding: 32px 0 32px 32px;
    margin-top: 24px;
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
    margin-top: 8px;
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

