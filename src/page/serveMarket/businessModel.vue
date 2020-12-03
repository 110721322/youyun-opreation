<template>
  <div>
    <div class="p_head">业务模式</div>
    <div class="card">
      <div class="card-content">
        <div v-for="(item,index) in modelList" :key="index" class="card-list">
          <!--                        <img class="back-img" src="" alt="">-->
          <div class="card-title">
            <span>{{ item.productName }}</span>
            <img src="../../assets/img/xmg.png" alt="小马哥图标" class="card-img">
          </div>
          <div class="card-subtitle">{{ item.productDesc }}</div>
          <div class="card-btn">
            <button class="buy-btn" @click="clickBtn(item)">{{ item.buyStatus===0 ? '立即购买' : '立即进入' }}</button>
            <div v-if="item.buyStatus===1" class="buy-title">已购买该服务，到期时间：{{ item.expireDate }}</div>
          </div>
        </div>
        <!-- <div class="card-list"> -->
        <!--                        <img class="back-img" src="" alt="">-->
        <!-- <div class="card-title">
            <span>oem贴牌代理</span>
            <img src="../../assets/img/ome_logo.png" alt="" class="card-img">
          </div>
          <div class="card-subtitle">可自定义添加品牌logo及名称，强化品牌形象。并且支持接入自己的交易通道，灵活稳定</div>
          <div class="card-btn">
            <button class="btn" @click="onclick_buybtn">立即购买</button>
            <div class="buy-title" style="display: none;">已购买该服务，到期时间：2020-10-10</div>
          </div>
        </div>
        <div class="card-list"> -->
        <!--                        <img class="bac-img" src="" alt="">-->
        <!-- <div class="card-title">
            <span>新源码</span>
            <img src="../../assets/img/new_logo.png" alt="" class="card-img">
          </div>
          <div class="card-subtitle">支持接入自己的交易通道，且提供服务器独立部署</div>
          <div class="card-btn">
            <button class="btn" @click="onclick_buybtn1">立即购买</button>
            <div class="buy-title" style="display: none;">已购买该服务，到期时间：2020-10-10</div>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
export default {
  name: "BusinessModel",
  data() {
    return {
      modelList: []
    }
  },
  created() {
    this.getModel()
  },
  methods: {
    clickBtn($data) {
      localStorage.setItem('productItem', JSON.stringify($data))
      if ($data.productCode === 'platformAgent') {
        this.$router.push({ name: "xmgAgentDetail" });
      } else if ($data.productCode === 'oemAgent') {
        this.$router.push({ name: "omedetail" });
      } else if ($data.productCode === 'soundCode') {
        this.$router.push({ name: "newdetail" });
      }
    },

    getModel() {
      api.selectModuleProduct({
        moduleCode: 'businessMode'
      }).then(res => {
        this.modelList = res.data
      })
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 80vh;
  padding: 24px 24px 0 24px;
  box-sizing: border-box;
}

.card-content {
  display: flex;
  flex-wrap: wrap;
  padding: 32px 0 0 32px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
}

.card-list {
  position: relative;
  top: 0;
  left: 0;
  padding: 24px 0 24px 24px;
  margin: 0 24px 24px 0;
  width: 400px;
  height: 192px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-sizing: border-box;
}

.back-img {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 144px;
}

.card-title {
  display: flex;
  width: 100%;
  line-height: 20px;
  font-size: 16px;
  font-weight: 500;
  height: 20px;
}

.card-img {
  display: block;
  margin-left: 6px;
  width: 20px;
  height: 20px;
}

.card-subtitle {
  padding-right: 20px;
  margin-top: 18px;
  width: 100%;
  color: #909399;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  height: 40px;
}

.card-btn {
  display: flex;
  margin-top: 25px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.buy-btn {
  width: 112px;
  height: 40px;
  background: #1989fa;
  border: 1px solid #1989fa;
  line-height: 40px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}

.btn {
  width: 112px;
  height: 40px;
  background: #fff;
  border: 1px solid #c7c8cd;
  line-height: 40px;
  color: #606266;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}

.buy-title {
  padding-left: 20px;
  width: 240px;
  height: 32px;
  line-height: 32px;
  color: #1989fa;
  font-size: 12px;
  background: #ecf6ff;
  border-radius: 100px 0 0 100px;
}
</style>

