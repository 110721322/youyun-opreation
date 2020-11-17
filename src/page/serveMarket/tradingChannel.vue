<template>
  <div class="container">
    <div class="content">
      <div v-for="(item,index) in tradeList" :key="index" class="card">
        <div class="top">
          <div class="left_img">
            <img src="../../assets/img/leshua_icon.png" alt="">
          </div>
          <div class="right_info">
            <div class="card_title">{{ item.productName }}</div>
            <div class="card_subtitle">{{ item.productDesc }}</div>
          </div>
        </div>
        <ul class="descript">
          <li><img src="" alt=""><span>交易更快捷，通道更稳定</span></li>
          <li><img src="" alt=""><span>通道方直接结算</span></li>
          <li><img src="" alt=""><span>万千商户选择</span></li>
        </ul>
        <button class="btn" @click="onclick_buy(item)">{{ item.buyStatus===0 ? '立即购买' : '立即进入' }}</button>
      </div>
      <div class="more">
        <img src="../../assets/img/more_icon.png" alt="">
        <span>更多通道接入中</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
export default {
  name: "TradingChannel",
  data() {
    return {
      tradeList: []
    }
  },
  created() {
    this.getModel()
  },
  methods: {
    onclick_buy($data) {
      localStorage.setItem('productItem', JSON.stringify($data))
      this.$router.push({name: "lsBuyIndex"})
    },
    getModel() {
      api.selectModuleProduct({
        moduleCode: 'payChannel'
      }).then(res => {
        this.tradeList = res.data
      })
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    padding: 24px 24px 40px 24px;
  }
  .content {
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 32px 32px 0 32px;
    display: flex;
  }
  .card {
    width: 515px;
    height: 240px;
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    background: #ffffff;
    padding: 24px 0 24px 24px;
    margin-right: 24px;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
  .left_img {
    width: 64px;
    height: 64px;
    border-radius: 4px;
    margin-right: 16px;
  }
  .left_img img {
    width: 64px;
    height: 64px;
  }
  .right_info {
    width: 100%;
    padding-top: 7px;
    box-sizing: border-box;
  }
  .card_title {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 8px;
  }
  .card_subtitle {
    font-size: 14px;
    color: #909399;
    line-height: 20px;
  }
  .descript {
    width: 100%;
    display: flex;
    height: 24px;
    margin-top: 26px;
  }
  .descript li {
    display: flex;
    align-items: center;
    padding-left: 11px;
    background: #F3F7FF;
    color: #606266;
    font-size: 12px;
    margin-right: 8px;
    height: 24px;
    border-radius: 12px;
  }
  .descript li:nth-child(1) {
    width: 176px;
  }
  .descript li:nth-child(2) {
    width: 129px;
  }
  .descript li:nth-child(3) {
    width: 129px;
  }
  .descript li img {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4F6CFF;
    margin-right: 6px;
  }
  .btn {
    width: 114px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
    background: #1989FA;
    border-radius: 4px;
    margin-top: 32px;
  }
  .more {
    width: 515px;
    height: 240px;
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    background: #FAFAFA;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .more img {
    display: block;
    width: 22px;
    height: 22px;
    margin-right: 8px;
  }
  .more span {
    font-size: 16px;
    color: #606266;
  }
</style>

