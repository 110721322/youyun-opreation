<template>
  <div class="main_page">
    <div class="top">
      <div class="left_img">
        <img src="../../assets/img/domain_photo.png" alt="">
      </div>
      <div class="right_info">
        <div class="right_title">域名定制</div>
        <div class="right_subtitle">涉及各个平台，对于域名进行定制</div>
      </div>
    </div>
    <div class="buy_info">
      <div class="buy_time">
        <div class="time"><span>服务时间</span><span>长期</span></div>
        <div class="price"><span>购买价格</span><span>¥</span><span>5000</span></div>
      </div>
      <div class="buy_option">
        <button class="buy_btn">购买服务</button>
      </div>

    </div>
    <div class="content">
      <div class="title">定制详情</div>
      <div class="descript">可对于二级域名进行定制，例如：主域名输入laoban，则oa办公后台地址为：www.laoban.oa.aduer.com。若需要主域名变更则需订购源码模式，<span style="color: #1989FA;">去订购></span></div>
      <domainEditor
        :form-base-data="fromConfigData.formData"
        :label-width="'auto'"
        @commit="handleCommit"
      ></domainEditor>
      <ul v-show="false" class="fill_info">
        <li><span>主域名:</span><span>www.laoban.oa.aduer.com</span></li>
        <li><span>oa办公后台:</span><span>www.laoban.oa.aduer.com</span></li>
        <li><span>服务商后台:</span><span>www.laoban.fx.aduer.com</span></li>
        <li><span>商户后台:</span><span>www.laoban.sh.aduer.com</span></li>
      </ul>
    </div>
    <div class="operation">
      <div class="operation_title">操作说明</div>
      <div class="operation_step">
        <div class="left_step">步骤一:</div>
        <ul class="right_step">
          <li class="right_title">域名选定</li>
          <li class="right_list">选定需要定制的域名名称（本次定制仅针对于定制二级域名）</li>
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
          <li class="right_title">填写域名，一键定制</li>
          <li class="right_list">输入主域名，点击生成二级域名，确认无误后一键定制成功</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import domainEditor from "@/components/form/announcementEditForm.vue";
import { FORM_CONFIG } from "./formConfig/domainConfig";
export default {
  components: {
    domainEditor
  },
  data() {
    return {
      fromConfigData: FORM_CONFIG.sendMessageData
    }
  }
}
</script>

<style scoped>
  .main_page {
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

