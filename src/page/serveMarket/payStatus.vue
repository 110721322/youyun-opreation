<template>
  <div class="container">
    <div class="top">
      <span>下单页面</span>
      <el-steps :active="3" align-center>
        <el-step title="提交订单"></el-step>
        <el-step title="订单支付"></el-step>
        <el-step title="订购结果"></el-step>
      </el-steps>
    </div>
    <div class="content">
      <div class="order_pohto"><img src="../../assets/img/order_photo.png" alt=""></div>
      <p class="title">提交成功，等待审核</p>
      <ul class="card">
        <li><span>服务类型：</span><span>{{ modelName }}</span></li>
        <li><span>服务时间：</span><span>{{ comboItem.comboName }}</span></li>
        <li><span>支付金额：</span><span style="color: #F5222D; font-size: 20px; font-weight: 500;">{{ amount }}</span><span>元</span></li>
        <li><span>支付方式：</span><div class="pay_way">对公转账</div></li>
        <li><span>打款账号：</span><span>3301040160001013187</span></li>
        <li><span>开户银行：</span><span>杭州银行滨江支行</span></li>
        <div class="voucher">
          <span>打款凭证：</span>
          <img :src="voucher" alt="">
        </div>
      </ul>
    </div>
    <div class="status" style="display: none;">
      <div class="order_pohto">
        <img src="../../assets/img/order_success.png" alt="">
        <img src="../../assets/img/order_fail.png" alt="" style="display: none;">
      </div>
      <p class="title">恭喜你，成功订购 【小马哥代理】服务</p>
      <p class="title" style="display: none;">订购失败，请重新进行订购</p>
      <button class="sure_btn">确定</button>
      <button class="sure_btn" style="display: none;">重新订购</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayStatus",
  data() {
    return {
      modelName: '',
      comboItem: {},
      amount: 0,
      voucher: ''
    }
  },
  created() {
    this.comboItem = JSON.parse(localStorage.getItem('comboItem'))
    this.modelName = JSON.parse(localStorage.getItem('productItem')).productName
    this.amount = localStorage.getItem('amount')
    this.voucher = localStorage.getItem('voucher')
  },
  methods: {},
  beforeDestroy() {
    // localStorage.setItem('comboItem', '')
    // localStorage.setItem('productItem', '')
    // localStorage.setItem('amount', '')
    // localStorage.setItem('voucher', '')
    // localStorage.setItem('promoCodeId', '')
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
    background: #ffffff;
    height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    box-sizing: border-box;
  }
  .el-steps--horizontal {
    width: 70%;
  }
  .top span {
    color: #000000;
    font-size: 16px;
    font-weight: 500;
  }
  .content {
    width: 100%;
    background: #ffffff;
    padding: 48px 0;
    margin-top: 24px;
  }
  .order_pohto {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
  .order_pohto img {
    width: 80px;
    height: 80px;
  }
  .title {
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    color: #606266;
    font-weight: 500;
    margin-bottom: 36px;
    margin-top: 16px;
  }
  .card {
    width: 454px;
    border: 1px solid #DCDFE6;
    background: #FAFAFA;
    border-radius: 8px;
    padding: 24px 0 40px 120px;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .card li {
    display: flex;
    font-size: 14px;
    margin-bottom: 16px;
    align-items: center;
  }
  .card li span:nth-child(1) {
    color: #000000;
    padding-right: 4px;
  }
  .card li span:nth-child(2) {
    color: #606266;
  }
  .pay_way {
    width: 126px;
    height: 40px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #ECEDEF;
    text-align: center;
    line-height: 40px;
    color: #606266;
    font-size: 14px;
    margin-right: 8px;
  }
  .voucher {
    display: flex;
  }
  .voucher span {
    font-size: 14px;
    color: #000000;
    padding-right: 4px;
  }
  .voucher img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    object-fit: cover;
    border: 1px dashed #DCDFE6;
  }
  .status {
    width: 100%;
    padding: 210px 0 260px 0;
    box-sizing: border-box;
    background: #ffffff;
    margin-top: 24px;
  }
  .sure_btn {
    display: block;
    width: 114px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
    background: #1989FA;
    border-radius: 4px;
    margin: 0 auto;
  }
</style>

