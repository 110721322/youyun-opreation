<template>
  <div class="container">
    <div class="top_content">
      <div v-if="showTip" class="warn">
        <div class="left_icon">i</div>
        <span>已购买该服务，有效期到：{{ productItem.expireDate }} 。再次购买后服务到期时间将累加</span>
        <img src="../../assets/img/cancle.png" alt="" @click="closeWarn">
      </div>
      <div class="buy_info">
        <img class="buy_img" src="../../assets/img/new_image.png" alt="">
        <div class="buy_all">
          <div class="first_body">
            <div class="buy_title">{{ productItem.productName }}</div>
            <div class="buy_subtitle">{{ productItem.productDesc }}</div>
            <img class="buy_photo" src="" alt="">
          </div>
          <div class="second_body">
            <div class="select_date">
              <span class="select_name">服务时间</span>
              <div v-for="(item, index) in comboList" :key="index" class="select_btn" :class="selectIndex===index? 'select_show' : ''">
                <button @click="onclick_selectDate(item,index)">{{ item.comboName }}</button>
              </div>
            </div>
            <div class="price">
              <span class="select_name">购买价格</span>
              <span class="data_price"><span>¥</span>{{ comboPrice }}</span>
            </div>
          </div>
          <button class="buy_serve" @click="onclick_buyserve">购买服务</button>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="operation_title">操作流程</div>
      <div class="operation_step">
        <div class="left_step">步骤一:</div>
        <ul class="right_step">
          <li class="right_title">选择服务时间</li>
          <li class="right_list">目前服务时间可购买：1年，2年和3年。服务到期后若不进行续费购买将无法展开该服务</li>
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
          <li class="right_title">业务拓宽</li>
          <li class="right_list">可添加服务商，为服务商配置该类型，进行业务</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
export default {
  name: "XmgAgent",
  data () {
    return {
      selectIndex: 0,
      comboList: [],
      comboPrice: 0,
      showTip: false,
      comboItem: {},
      productItem: {}
    }
  },
  created() {
  },
  mounted() {
    this.productItem = JSON.parse(localStorage.getItem('productItem'))
    this.getModelDetail()
    if (this.productItem.buyStatus) {
      this.showTip = true
    }
  },
  methods: {
    onclick_selectDate(data, index) {
      this.comboItem = data
      this.comboPrice = data.comboAmount
      this.selectIndex = index
    },
    onclick_buyserve() {
      localStorage.setItem('comboItem', JSON.stringify(this.comboItem))
      if (this.comboItem) {
        this.$router.push({
          name: "subOrder"
        });
      }
    },
    getModelDetail() {
      api.selectProductCombo({
        productCode: this.productItem.productCode
      }).then(res => {
        if (res.object) {
          this.comboList = res.object || []
          this.comboItem = this.comboList[this.selectIndex] || {}
          this.comboPrice = this.comboList[this.selectIndex].comboAmount || 0
        }
      })
    },
    closeWarn() {
      this.showTip = false
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  padding: 24px 24px;
  box-sizing: border-box;
}
.top_content {
  width: 100%;
  padding: 24px 24px 31px 32px;
  box-sizing: border-box;
  background: #ffffff;
}
.warn {
  width: 100%;
  height: 40px;
  background: #E6F7FF;
  border: 1px solid #91D5FF;
  border-radius: 4px;
  padding: 0 16px;
  box-sizing: border-box;
  margin-bottom: 42px;
}
.left_icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 12px;
  margin-top: 13px;
  text-align: center;
  line-height: 14px;
  float: left;
  margin-right: 8px;
  background: #1890FF;
}
.warn span {
  float: left;
  line-height: 40px;
  font-size: 14px;
  color: #000000;
}
.warn img{
  display: block;
  width: 10px;
  height: 10px;
  margin-top: 15px;
  float: right;
}
.buy_info{
  width: 100%;
  display: flex;
}
.buy_img {
  width: 103px;
  height: 103px;
  display: block;
  margin-right: 24px;
}
.buy_all {
  width: 100%;
}
.first_body {
  width: 100%;
  border-bottom: 1px solid #EBEEF5;
  padding-bottom: 32px;
  box-sizing: border-box;
}
.buy_title {
  font-size: 16px;
  font-weight: 500;
  color: #333335;
  line-height: 22px;
  margin-bottom: 8px;
}
.buy_subtitle {
  font-size: 14px;
  color: #909399;
  line-height: 20px;
  margin-bottom: 24px;
}
.buy_photo {
  display: block;
  width: 121px;
  height: 27px;
  background: #FF9150;
}
.second_body {
  width: 100%;
  padding: 28px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #EBEEF5;
}
.select_date{
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.select_name {
  color: #909399;
  font-size: 16px;
  padding-right: 24px;
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
.data_price {
  color: #F5222D;
  font-size: 24px;
  font-weight: bold;
}
.data_price span {
  font-size: 14px;
  padding-top:4px;
  box-sizing: border-box;
}
.buy_serve {
  display: block;
  width: 114px;
  height: 40px;
  background: #1989FA;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  font-size: 14px;
  margin-top: 24px;
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

