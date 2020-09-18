<template>
  <div>
    <div class="p_head">业务模式</div>
    <div class="card">
      <div class="card_content">
        <div v-for="(item,index) in modelList" :key="index" class="card_list">
          <!--                        <img class="back_img" src="" alt="">-->
          <div class="card_title">
            <span>{{ item.productName }}</span>
            <img src="../../assets/img/xmg.png" alt="" class="card_img">
          </div>
          <div class="card_subtitle">{{ item.productDesc }}</div>
          <div class="card_btn">
            <button class="buy_btn" @click="onclick_btn(item)">{{ item.buyStatus===0 ? '立即购买' : '立即进入' }}</button>
            <div v-if="item.buyStatus===1" class="buy_title">已购买该服务，到期时间：{{ item.expireDate }}</div>
          </div>
        </div>
        <!-- <div class="card_list"> -->
        <!--                        <img class="back_img" src="" alt="">-->
        <!-- <div class="card_title">
            <span>oem贴牌代理</span>
            <img src="../../assets/img/ome_logo.png" alt="" class="card_img">
          </div>
          <div class="card_subtitle">可自定义添加品牌logo及名称，强化品牌形象。并且支持接入自己的交易通道，灵活稳定</div>
          <div class="card_btn">
            <button class="btn" @click="onclick_buybtn">立即购买</button>
            <div class="buy_title" style="display: none;">已购买该服务，到期时间：2020-10-10</div>
          </div>
        </div>
        <div class="card_list"> -->
        <!--                        <img class="back_img" src="" alt="">-->
        <!-- <div class="card_title">
            <span>新源码</span>
            <img src="../../assets/img/new_logo.png" alt="" class="card_img">
          </div>
          <div class="card_subtitle">支持接入自己的交易通道，且提供服务器独立部署</div>
          <div class="card_btn">
            <button class="btn" @click="onclick_buybtn1">立即购买</button>
            <div class="buy_title" style="display: none;">已购买该服务，到期时间：2020-10-10</div>
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
    onclick_btn($data) {
      localStorage.setItem('productItem', JSON.stringify($data))
      if ($data.productCode === 'platformAgent') {
        this.$router.push({ name: "xmgAgentDetail" });
      }
      if ($data.productCode === 'oemAgent') {
        this.$router.push({ name: "omedetail" });
      }
      if ($data.productCode === 'soundCode') {
        this.$router.push({ name: "newdetail" });
      }
    },
    getModel() {
      api.selectModuleProduct({
        moduleCode: 'businessMode'
      }).then(res => {
        this.modelList = res.object
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
.card_content {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 32px 0 0 32px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.card_list {
  width: 400px;
  height: 192px;
  border: 1px solid #EBEEF5;
  border-radius: 8px;
  padding: 24px 0 24px 24px;
  box-sizing: border-box;
  margin: 0 24px 24px 0;
  position: relative;
  top: 0;
  left: 0;
}
.back_img {
  width: 200px;
  height: 144px;
  position: absolute;
  top: 0;
  right: 0;
}
.card_title {
  width: 100%;
  line-height: 20px;
  font-size: 16px;
  display: flex;
  font-weight: 500;
  height: 20px;
}
.card_img {
  display: block;
  width: 20px;
  height: 20px;
  margin-left: 6px;
}
.card_subtitle {
  width: 100%;
  padding-right: 20px;
  color: #909399;
  font-size: 14px;
  line-height: 20px;
  margin-top: 18px;
  box-sizing: border-box;
  height: 40px;
}
.card_btn {
  width: 100%;
  display: flex;
  margin-top: 25px;
  align-items: center;
  justify-content: space-between;
}
.buy_btn {
  width: 112px;
  height: 40px;
  background: #1989FA;
  border: 1px solid #1989FA;
  line-height: 40px;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}
.btn {
  width: 112px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #C7C8CD;
  line-height: 40px;
  color: #606266;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
}
.buy_title {
  width: 240px;
  height: 32px;
  line-height: 32px;
  padding-left: 20px;
  color: #1989FA;
  font-size: 12px;
  background: #ECF6FF;
  border-radius:100px 0 0 100px;
}
</style>

