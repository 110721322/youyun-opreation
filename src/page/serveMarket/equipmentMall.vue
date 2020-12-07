<template>
  <div class="container">
    <div class="equiment">
      <span>刷脸设备</span>
      <img src="../../assets/img/hot_logo.png" alt="刷脸设备" />
      <span class="title">离扫脸时代只差一台设备</span>
    </div>
    <div class="equiment-list">
      <div v-for="(item, index) in mallList.FACE" :key="index" class="list" @click.stop="clickTodetail(item.deviceId)">
        <div class="list-img">
          <img src="" alt="">
        </div>
        <p class="list-name">{{ item.deviceModel }}</p>
        <p class="list-subtitle">{{ item.viceTitle }}</p>
        <div class="list-bottom">
          <span>¥{{ item.salePrice }}</span>
          <div class="cart-img" @mouseenter="mouseCart(index)">
            <img src="../../assets/img/cart_icon.png" alt="icon" />
          </div>
          <div class="list-step"><el-input-number v-model="num[index]" :min="1" :max="10" size="small" @change="cilckChange(index)"></el-input-number></div>
        </div>
      </div>
    </div>
    <div class="equiment">
      <span>收银机具</span>
    </div>
    <div class="equiment-list">
      <div v-for="(item, index) in mallList.POSS" :key="index" class="list" @click.stop="clickTodetail(item.deviceId)">
        <div class="list-img">
          <img :src="item.img" alt="icon" />
        </div>
        <p class="list-name">{{ item.deviceModel }}</p>
        <p class="list-subtitle">{{ item.viceTitle }}</p>
        <div class="list-bottom">
          <span>¥{{ item.salePrice }}</span>
          <div class="cart-img" @mouseenter="mouseCart(index)">
            <img src="../../assets/img/cart_icon.png" alt="icon" />
          </div>
          <div class="list-step"><el-input-number v-model="num[index]" :min="1" :max="10" size="small" @change="cilckChange(index)"></el-input-number></div>
        </div>
      </div>
    </div>
    <div class="right-btn">
      <div class="btn1" @click="clickTocart" @mouseover="showText=true" @mouseout="showText=false">
        <div class="modle"></div>
        <el-badge :value="totalNum" :max="99" class="item">
          <img src="../../assets/img/cart_icon.png" alt="购物车图标" />
          <transition name="textDisplay">
            <p v-if="showText" class="show-text-cart">购<br>物<br>车</p>
          </transition>
        </el-badge>
      </div>
      <div class="btn2" @click="clickTorecords" @mouseover="showText2=true" @mouseout="showText2=false">
        <div class="modle"></div>
        <img src="../../assets/img/order_icon.png" alt="订单图标" />
        <transition name="textDisplay">
          <p v-if="showText2" class="show-text-order">订<br>单</p>
        </transition>
      </div>
      <!-- <div class="btn2">
        <img src="../../assets/img/order_icon.png" alt="">
      </div> -->
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket"
export default {
  name: "EquipmentMall",
  data() {
    return {
      num: {},
      mallList: [],
      totalNum: 0,
      showText: false,
      showText2: false
    }
  },
  created() {
    this.getData()
    this.getCartNum()
  },
  methods: {
    // 获取设备列表
    getData() {
      api.queryMallDeviceListPage({
        currentPage: 1,
        pageSize: 10
      }).then(res => {
        this.mallList = res.data
      })
    },

    // 获取购物车的数量
    getCartNum() {
      api.queryShopCartList({
        userId: this.$store.state.admin.userInfo.id
      }).then(res => {
        this.totalNum = res.data.FACE.length + res.data.POSS.length + res.data.OTHER.length
      })
    },

    cilckChange(index, value) {},

    mouseCart(index) {},

    clickTodetail(deviceId) {
      this.$router.push({
        name: 'equimentDetail',
        query: {
          deviceId: deviceId
        }
      })
    },

    clickTocart() {
      this.$router.push({
        name: 'shoppingCart'
      })
    },

    clickTorecords() {
      this.$router.push({
        name: 'orderRecords'
      })
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 24px 24px 40px 24px;
    width: 100%;
  }

  .equiment {
    display: flex;
    padding-left: 26px;
    height: 30px;
  }

  .equiment span:nth-child(1) {
    display: block;
    padding-top: 5px;
    color: #333335;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }

  .equiment img {
    display: block;
    width: 46px;
    height: 19px;
    margin-right: 20px;
    margin-left: 6px;
  }

  .equiment .title {
    display: block;
    padding-top: 9px;
    font-size: 14px;
    color: #909399;
    line-height: 20px;
  }

  .equiment-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    margin-top: 24px;
    cursor: pointer;
  }

  .list {
    padding: 24px 22px 20px 22px;
    margin-right: 24px;
    margin-bottom: 16px;
    width: 256px;
    box-sizing: border-box;
    background: #fff;
  }

  .list-step {
    display: none;
  }

  .list-img {
    margin: 0 auto;
    width: 180px;
    height: 180px;
  }

  .list-img img {
    width: 180px;
    height: 180px;
  }

  .list-name {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #333335;
    margin-top: 35px;
    line-height: 22px;
  }

  .list-subtitle {
    margin-top: 10px;
    margin-bottom: 24px;
    max-width: 210px;
    color: #606266;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
  }

  .list-bottom span {
    color: #1989fa;
    font-size: 16px;
    font-weight: 500;
  }

  .list-bottom .cart-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 32px;
    background: #1989fa;
    border-radius: 4px;
  }

  .cart-img img {
    width: 16px;
    height: 16px;
  }

  .right-btn {
    position: fixed;
    top: 220px;
    right: 50px;
    width: 50px;
    z-index: 100;
  }

  .btn1 {
    width: 50px;
    background: #000;
    border-radius: 25px;
    margin-bottom: 16px;
    font-size: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    position: relative;
  }

  .modle {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .btn1:hover {
    background: #1989fa;
    padding-bottom: 15px;
  }

  .btn1 img {
    margin: 15px 0;
    width: 20px;
    height: 20px;
  }

  .btn2 {
    position: relative;
    padding: 15px 0;
    background: black;
    width: 50px;
    color: #fff;
    font-size: 0;
    text-align: center;
    border-radius: 25px;
    cursor: pointer;
  }

  .btn2:hover {
    background: #1989fa;
  }

  .btn2 img {
    width: 20px;
    height: 20px;
  }

  .el-badge__content {
    background-color: #f64d4c;
  }

  .show-text-cart {
    text-align: center;
    font-size: 14px;
  }

  .show-text-order {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
  }
</style>
