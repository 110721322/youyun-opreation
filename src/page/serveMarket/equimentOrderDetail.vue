<template>
  <div class="order_page">
    <div class="top-title">订单状态</div>
    <div class="content">
      <div class="status">
        <div class="state">
          <span v-if="orderStatus===0">订单状态：待付款</span>
          <span v-if="orderStatus===1">订单状态：待发货</span>
          <span v-if="orderStatus===2">订单状态：已发货</span>
          <span v-if="orderStatus===3">订单状态：已关闭</span>
        </div>
        <div class="topay" v-if="orderStatus===0">
          <li>
            <span class="left-title">付款剩余时间:</span>
            <div class="step-time">
              <div class="times">16</div>
              <span>:</span>
              <div class="times">20</div>
              <span>:</span>
              <div class="times">23</div>
              <button>立即付款</button>
            </div>
          </li>
        </div>
        <div class="state-des">
          <span v-if="orderStatus===1">预计两个工作日发货</span>
          <span v-if="orderStatus===2">快递单号：93838844844</span>
          <span v-if="orderStatus===3">超时未付款，订单自动关闭</span>
        </div>
      </div>
      <ul class="receive-info">
        <div class="receive-title">收货信息</div>
        <li><span>联系人：</span><span>金柒柒柒</span></li>
        <li><span>联系电话：</span><span>18506812596</span></li>
        <li><span>收货地址：</span><span>浙江省杭州市西湖区三墩镇紫金小镇</span></li>
      </ul>
      <ul class="receive-info">
        <div class="receive-title">订单信息</div>
        <li><span>订单号：</span><span>247923729342359</span></li>
        <li><span>下单时间：</span><span>2020-02-10 18:00:07</span></li>
        <li><span>订单备注：</span><span>麻烦尽快邮寄过来，辛苦了</span></li>
        <li><span>支付方式：</span><span>扫码支付（微信）</span></li>
      </ul>
      <div class="goods-info">
        <div class="goods-table">
          <li>商品图片</li>
          <li>商品名称</li>
          <li>商品单价</li>
          <li>购买数量</li>
          <li>小计</li>
          <li>总计</li>
        </div>
        <div class="goods-list">
          <div class="list">
            <div class="left-list" v-for="(item, index) in goodsData" :key="index">
              <li>商品图片</li>
              <li>{{item.goodsName}}</li>
              <li>{{item.price}}</li>
              <li>{{item.quantity}}</li>
              <li>{{item.total}}</li>
            </div>
          </div>
          <div class="right-amount" :style="{'height':goodsData.length*92+'px', 'line-height': goodsData.length*92+'px'}">¥1920.00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderStatus: 0,
      goodsData: [
        {
          goodsName: '青蛙',
          price: 10,
          quantity: 2,
          total: 20
        },
        {
          goodsName: '青蛙1',
          price: 10,
          quantity: 2,
          total: 20
        },
        {
          goodsName: '青蛙',
          price: 10,
          quantity: 2,
          total: 20
        }
      ]
    }
  }
}
</script>

<style scoped>
  .order_page {
    width: 100%;
    background: #ffffff;
  }
  .top-title {
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #EBEEF5;
    padding-left: 32px;
    line-height: 64px;
    font-weight: 500;
    font-size: 16px;
  }
  .content {
    width: 100%;
    padding: 32px 32px;
  }
  .status {
    width: 100%;
    padding: 24px 0 24px 32px;
    background: #FAFAFA;
    border: 1px solid #EBEEF5;
    border-radius: 3px;
  }
  .state {
    font-size: 16px;
    font-weight: 500;
    color: #1989FA;
    margin-bottom: 16px;
  }
  .state-des {
    color: #606266;
    font-size: 14px;
    line-height: 22px;
  }
  .topay {
    width: 100%;
  }
  .topay li {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .left-title {
    display: block;
    font-size: 14px;
    color: #606266;
    padding-right: 10px;
  }
  .step-time {
    display: flex;
    align-items: center;
  }
  .step-time .times {
    width: 28px;
    height: 32px;
    background: #E8F1FA;
    color: #1989FA;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    border-radius: 2px;
  }
  .step-time span {
    display: block;
    width: 12px;
    height: 32px;
    color: #1989FA;
    text-align: center;
    line-height: 32px;
    font-weight: 500;
  }
  .topay li button {
    width: 116px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #ffffff;
    background: #1989FA;
    border-radius: 4px;
    font-size: 14px;
    margin-left: 28px;
  }
  .receive-info {
    margin-top: 24px;
    width: 100%;
    display: flex;
    border: 1px solid #EBEEF5;
    border-radius: 3px;
    flex-wrap: wrap;
  }
  .receive-title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: #000000;
    padding-left: 24px;
    font-size: 14px;
    font-weight: 500;
    background: #FAFAFA;
  }
  .receive-info li {
    display: block;
    width: 33.3%;
    padding-left: 24px;
    font-size: 14px;
    line-height: 70px;
  }
  .receive-info li span:nth-child(1) {
    color: #000000;
  }
  .receive-info li span:nth-child(2) {
    color: #606266;
  }
  .goods-info {
    width: 100%;
    margin-top: 24px;
  }
  .goods-table {
    width: 100%;
    display: flex;
    border: 1px solid #EBEEF5;
    height: 44px;
    background: #FAFAFA;
    border-radius: 4px 4px 0 0;
    padding-left: 44px;
  }
  .goods-table li {
    display: block;
    line-height: 44px;
    color: #909399;
    font-size: 14px;
  }
  .goods-table li:nth-child(1) {
    width: 19.3%;
  }
  .goods-table li:nth-child(2) {
    width: 16.3%;
  }
  .goods-table li:nth-child(3) {
    width: 15.3%;
  }
  .goods-table li:nth-child(4) {
    width: 16.3%;
  }
  .goods-table li:nth-child(5) {
    width: 14.8%;
  }
  .goods-list {
    width: 100%;
    position: relative;
  }
  .left-list {
    display: flex;
    height: 92px;
    border-left: 1px solid #E9E9E9;
    border-right: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    padding-left: 44px;
  }
  .left-list li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #606266;
  }
  .left-list li:nth-child(1) {
    width: 19.3%;
  }
  .left-list li:nth-child(2) {
    width: 16.3%;
  }
  .left-list li:nth-child(3) {
    width: 15.3%;
  }
  .left-list li:nth-child(4) {
    width: 16.3%;
  }
  .left-list li:nth-child(5) {
    width: 14.8%;
  }
  .right-amount {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    background: #ffffff;
    text-align: center;
    color: #F64D4C;
    font-size: 20px;
    font-weight: 500;
    width: 20%;
    border-bottom: 1px solid #E9E9E9;
    border-right: 1px solid #E9E9E9;
    border-left: 1px solid #E9E9E9;
  }
</style>
