<template>
  <div class="container">
    <div class="content">
      <div v-for="(item,index) in modelList" :key="index" class="card">
        <div class="top">
          <div class="left-img">
            <img src="../../assets/img/domain_photo.png" alt="左边图" />
          </div>
          <div class="right-info">
            <div class="card-title">{{ item.productName }}</div>
            <div class="card-subtitle">{{ item.productDesc }}</div>
          </div>
        </div>
        <button class="buy-btn" @click="ckickBtn(item)">{{ item.buyStatus===0 ? '立即购买' : '立即进入' }}</button>
      </div>
      <div class="more">
        <img src="../../assets/img/more_icon.png" alt="查看更多" />
        <span>更多通道接入中</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
export default {
  name: 'BrandCustomization',
  data() {
    return {
      modelList: []
    }
  },
  created() {
    this.getModel()
  },
  methods: {
    ckickBtn($data) {
      localStorage.setItem('productItem', JSON.stringify($data))
      this.$router.push({
        name: "domainCustomer"
      })
    },

    getModel() {
      api.selectModuleProduct({
        moduleCode: 'brandCustom'
      }).then(res => {
        const modelList = res.data
        this.modelList = modelList
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
    padding: 24px 0 24px 24px;
    margin-right: 24px;
    width: 515px;
    height: 194px;
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
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4f6cff;
    margin-right: 6px;
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
    height: 194px;
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

