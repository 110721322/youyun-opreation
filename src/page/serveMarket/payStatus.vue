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
      <div class="order-pohto"><img src="../../assets/img/order_photo.png" alt="icon" /></div>
      <p class="title">提交成功，等待审核</p>
      <ul class="card">
        <li><span>服务类型：</span><span>{{ modelName }}</span></li>
        <li><span>服务时间：</span><span>{{ comboItem.comboName }}</span></li>
        <li><span>支付金额：</span><span style="color: #f5222d; font-size: 20px; font-weight: 500;">{{ amount }}</span><span>元</span></li>
        <li><span>支付方式：</span><div class="pay-way">对公转账</div></li>
        <li><span>打款账号：</span><span>3301040160001013187</span></li>
        <li><span>开户银行：</span><span>杭州银行滨江支行</span></li>
        <div class="voucher">
          <span>打款凭证：</span>
          <img :src="voucher" alt="">
        </div>
      </ul>
    </div>
    <div class="status" style="display: none;">
      <div class="order-pohto">
        <img src="../../assets/img/order_success.png" alt="icon" />
        <img src="../../assets/img/order_fail.png" alt="icon" style="display: none;" />
      </div>
      <p class="title">恭喜你，成功订购 【小马哥代理】服务</p>
      <p class="title" style="display: none;">订购失败，请重新进行订购</p>
      <button class="sure-btn">确定</button>
      <button class="sure-btn" style="display: none;">重新订购</button>
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
  beforeDestroy() {
    // localStorage.setItem('comboItem', '')
    // localStorage.setItem('productItem', '')
    // localStorage.setItem('amount', '')
    // localStorage.setItem('voucher', '')
    // localStorage.setItem('promoCodeId', '')
  },
  methods: {}
}
</script>
<style scoped>

  .container {
    padding: 24px 24px 40px 24px;
    width: 100%;
    box-sizing: border-box;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    width: 100%;
    background: #fff;
    height: 88px;
    box-sizing: border-box;
  }

  .el-steps--horizontal {
    width: 70%;
  }

  .top span {
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }

  .content {
    margin-top: 24px;
    padding: 48px 0;
    width: 100%;
    background: #fff;
  }

  .order-pohto {
    margin: 0 auto;
    width: 80px;
    height: 80px;
  }

  .order-pohto img {
    width: 80px;
    height: 80px;
  }

  .title {
    margin-bottom: 36px;
    margin-top: 16px;
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    color: #606266;
    font-weight: 500;
  }

  .card {
    margin: 0 auto;
    padding: 24px 0 40px 120px;
    width: 454px;
    border: 1px solid #dcdfe6;
    background: #fafafa;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .card li {
    display: flex;
    margin-bottom: 16px;
    align-items: center;
    font-size: 14px;
  }

  .card li span:nth-child(1) {
    color: #000;
    padding-right: 4px;
  }

  .card li span:nth-child(2) {
    color: #606266;
  }

  .pay-way {
    margin-right: 8px;
    width: 126px;
    height: 40px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ecedef;
    text-align: center;
    line-height: 40px;
    color: #606266;
    font-size: 14px;
  }

  .voucher {
    display: flex;
  }

  .voucher span {
    padding-right: 4px;
    font-size: 14px;
    color: #000;
  }

  .voucher img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    object-fit: cover;
    border: 1px dashed #dcdfe6;
  }

  .status {
    padding: 210px 0 260px 0;
    margin-top: 24px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
  }

  .sure-btn {
    display: block;
    margin: 0 auto;
    width: 114px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    background: #1989fa;
    border-radius: 4px;
  }
</style>

