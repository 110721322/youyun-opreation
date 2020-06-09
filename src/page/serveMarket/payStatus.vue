<template>
  <div class="main_page">
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
        <li><span>服务类型：</span><span>小马哥代理</span></li>
        <li><span>服务时间：</span><span>1年</span></li>
        <li><span>支付金额：</span><span style="color: #F5222D; font-size: 20px; font-weight: 500;">10000</span><span>元</span></li>
        <li><span>支付方式：</span><div class="pay_way">对公转账</div></li>
        <li><span>打款账号：</span><span>3301040160001013187</span></li>
        <li><span>开户银行：</span><span>杭州银行滨江支行</span></li>
        <div class="voucher">
          <span>打款凭证：</span>
          <img src="../../assets/img/qr_code.jpg" alt="">
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .main_page {
      width: 100%;
      padding: 24px 24px 0 24px;
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
    margin-top: 16px;
    font-size: 20px;
    line-height: 32px;
    color: #606266;
    font-weight: 500;
    margin-bottom: 36px;
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
    border: 1px dashed #DCDFE6;
  }
</style>

