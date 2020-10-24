<template>
  <div class="container">
    <div class="top">
      <span>下单页面</span>
      <el-steps :active="1" align-center>
        <el-step title="提交订单"></el-step>
        <el-step title="订单支付"></el-step>
        <el-step title="订购结果"></el-step>
      </el-steps>
    </div>
    <div class="order_detail">
      <div class="title">订单信息</div>
      <ul class="tab_list">
        <li>
          <span>服务类型</span>
          <span>服务时间</span>
          <span>价格（元）</span>
        </li>
        <li>
          <span>{{ modelName }}</span>
          <span>{{ comboItem.comboName }}</span>
          <span>{{ comboItem.comboAmount }}</span>
        </li>
        <!-- <li>
          <div class="coupon">
            <div class="coupon_title">优惠码</div>
            <el-select v-model="promoCodeId" placeholder="请选择" @change="promoSelect" :disabled="comboItem.comboAmount<=0">
              <el-option v-for="(item,index) in promoCodeList" :key="index" :label="item.promoCodeNo" :value="item.id"></el-option>
            </el-select>
          </div>
        </li> -->
      </ul>
    </div>
    <div class="bottom">
      <div class="bottom_content">
        <div class="amount">实际付款:<span>{{ amount }}</span></div>
        <button class="sub_btn" @click="onClick_submit">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
export default {
  name: "SubOrder",
  data() {
    return {
      promoCodeId: '',
      comboItem: {},
      modelName: '',
      promoCodeList: [],
      amount: 0
    }
  },
  created() {
    this.comboItem = JSON.parse(localStorage.getItem('comboItem'))
    this.modelName = JSON.parse(localStorage.getItem('productItem')).productName
    if (localStorage.getItem('amount')) {
      this.amount = parseInt(localStorage.getItem('amount'))
    } else {
      this.amount = this.comboItem.comboAmount
    }
    this.getPromoCode()
  },
  methods: {
    onClick_submit() {
      if (this.promoCodeId) {
        localStorage.setItem('promoCodeId', this.promoCodeId)
      }
      localStorage.setItem('amount', this.amount)
      this.$router.push({
        name: "payAmount"
      })
    },
    getPromoCode() {
      api.getPromoCodeListByChannelAgentCode({}).then(res => {
        if (res.datas) {
          this.promoCodeList = res.datas || []
          if (localStorage.getItem('promoCodeId')) {
            this.promoCodeId = parseInt(localStorage.getItem('promoCodeId'))
          }
        }
      })
    },
    promoSelect($val) {
      if (this.promoCodeId) {
        let codeAmount = 0
        this.promoCodeList.forEach((item, index) => {
          if (item.id === this.promoCodeId) {
            codeAmount = item.promoCodeAmount
          }
        })
        const amount = (this.comboItem.comboAmount ? this.comboItem.comboAmount : 0) - codeAmount
        this.amount = ((!amount) || amount <= 0) ? 0 : amount
      }
    }
  },
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
    padding: 24px 24px 80px 24px;
    box-sizing: border-box;
    position: relative;
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
  .order_detail {
    width: 100%;
    height: 600px;
    background: #ffffff;
    margin-top: 24px;
    padding: 32px 32px 0 32px;
    box-sizing: border-box;
  }
  .title {
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: #000000;
  }
  .tab_list {
    width: 100%;
    margin-top: 32px;
  }
  .tab_list li {
    display: flex;
    box-sizing: border-box;
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #EBEEF5;
  }
  .tab_list li span {
    display: block;
    width: 33.3%;
    padding-left: 50px;
    font-size: 14px;
  }
  .tab_list li:nth-child(1) {
    background: #FAFAFA;
    color: #909399;
  }
  .tab_list li:nth-child(2) {
    color: #606266;
  }
  .coupon {
    display: flex;
    flex-wrap: nowrap;
    padding-left: 50px;
    align-items: center;
    height: 56px;
  }
  .coupon_title {
    margin-right: 10px;
    white-space: nowrap;
    color: #606266;
    font-size: 14px;
  }
  .coupon_input {
    width: 284px;
    height: 40px;
    border-radius: 4px;
    padding-left: 15px;
    line-height: 40px;
    color: #606266;
    border:1px solid #DCDFE6;
  }
  .coupon_btn {
    width: 114px;
    height: 40px;
    display: block;
    background: #F5F7FA;
    color: #909399;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    border:1px solid #DCDFE6;
    margin-left: 16px;
    border-radius: 4px;
  }
  .bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 56px;
    padding: 0 24px;
  }
  .bottom_content {
    width: 100%;
    height: 56px;
    background: #ffffff;
    display: flex;
    justify-content: flex-end;
  }
  .amount {
    color: #606266;
    font-size: 16px;
    line-height: 56px;
  }
  .amount span {
    color: #F64D4C;
    font-size: 20px;
    padding-left: 4px;
  }
  .sub_btn{
    width: 130px;
    height: 56px;
    background: #1989FA;
    color: #ffffff;
    line-height: 56px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    margin-left: 57px;
  }
</style>

