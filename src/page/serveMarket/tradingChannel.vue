<template>
  <div class="container">
    <div class="content">
      <div v-for="(item,index) in tradeList" :key="index" class="card">
        <div class="top">
          <div class="left-img">
            <img src="../../assets/img/leshua_icon.png" alt="icon" />
          </div>
          <div class="right-info">
            <div class="card-title">{{ item.productName }}</div>
            <div class="card-subtitle">{{ item.productDesc }}</div>
          </div>
        </div>
        <ul class="descript">
          <li><img src="" alt=""><span>交易更快捷，通道更稳定</span></li>
          <li><img src="" alt=""><span>通道方直接结算</span></li>
          <li><img src="" alt=""><span>万千商户选择</span></li>
        </ul>
        <button class="btn" @click="clickBuy(item)">{{ item.buyStatus===0 ? '立即购买' : '立即进入' }}</button>
      </div>
      <div class="more">
        <img src="../../assets/img/more_icon.png" alt="icon" />
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
    clickBuy($data) {
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
    padding: 24px 24px 40px 24px;
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    padding: 32px 32px 0 32px;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .card {
    margin-right: 24px;
    padding: 24px 0 24px 24px;
    width: 515px;
    height: 240px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background: #fff;
  }

  .top {
    display: flex;
    justify-content: space-between;
  }

  .left-img {
    margin-right: 16px;
    width: 64px;
    height: 64px;
    border-radius: 4px;
  }

  .left-img img {
    width: 64px;
    height: 64px;
  }

  .right-info {
    padding-top: 7px;
    width: 100%;
    box-sizing: border-box;
  }

  .card-title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }

  .card-subtitle {
    font-size: 14px;
    color: #909399;
    line-height: 20px;
  }

  .descript {
    display: flex;
    margin-top: 26px;
    width: 100%;
    height: 24px;
  }

  .descript li {
    display: flex;
    align-items: center;
    padding-left: 11px;
    margin-right: 8px;
    background: #f3f7ff;
    color: #606266;
    font-size: 12px;
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
    margin-right: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4f6cff;
  }

  .btn {
    margin-top: 32px;
    width: 114px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    background: #1989fa;
    border-radius: 4px;
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 515px;
    height: 240px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background: #fafafa;
  }

  .more img {
    display: block;
    margin-right: 8px;
    width: 22px;
    height: 22px;
  }

  .more span {
    font-size: 16px;
    color: #606266;
  }
</style>

