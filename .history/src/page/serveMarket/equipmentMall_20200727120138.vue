<template>
  <div class="main_page">
    <router-view
      v-if="this.$route.path.indexOf('/equimentDetail') !== -1 || this.$route.path.indexOf('/shoppingCart') !== -1 || this.$route.path.indexOf('/equimentOrder') !== -1 || this.$route.path.indexOf('/equimentPay') !== -1 ||
      this.$route.path.indexOf('/orderRecords') !== -1 || this.$route.path.indexOf('/equimentOrderDetail') !== -1"/>
    <div v-else>
      <div class="equiment">
        <span>刷脸设备</span>
        <img src="../../assets/img/hot_logo.png" alt="">
        <span class="title">离扫脸时代只差一台设备</span>
      </div>
      <div class="equiment_list">
        <div v-for="(item, index) in mallList.FACE" :key="index" class="list" @click.stop="onclick_todetail(item.deviceId)">
          <div class="list_img">
            <img src="" alt="">
          </div>
          <p class="list_name">{{ item.deviceModel }}</p>
          <p class="list_subtitle">{{ item.viceTitle }}</p>
          <div class="list_bottom">
            <span>¥{{ item.salePrice }}</span>
            <div class="cart_img" @mouseenter="mouse_cart(index)">
              <img src="../../assets/img/cart_icon.png" alt="">
            </div>
            <div class="list_step" style="display: none;"><el-input-number v-model="num[index]" :min="1" :max="10" size="small" @change="handleChange(index)"></el-input-number></div>
          </div>
        </div>
      </div>
      <div class="equiment">
        <span>收银机具</span>
      </div>
      <div class="equiment_list">
        <div v-for="(item, index) in mallList.POSS" :key="index" class="list" @click.stop="onclick_todetail(item.deviceId)">
          <div class="list_img">
            <img :src="item.img" alt="">
          </div>
          <p class="list_name">{{ item.deviceModel }}</p>
          <p class="list_subtitle">{{ item.viceTitle }}</p>
          <div class="list_bottom">
            <span>¥{{ item.salePrice }}</span>
            <div class="cart_img" @mouseenter="mouse_cart(index)">
              <img src="../../assets/img/cart_icon.png" alt="">
            </div>
            <div class="list_step" style="display: none;"><el-input-number v-model="num[index]" :min="1" :max="10" size="small" @change="handleChange(index)"></el-input-number></div>
          </div>
        </div>
      </div>
      <div class="right_btn">
        <div class="btn1" @click="onclick_tocart">
          <el-badge :value="totalNum" :max="99" class="item">
            <img src="../../assets/img/cart_icon.png" alt="">
          </el-badge>
        </div>
        <div class="btn1" @click="onClick_torecords">
          <img style="width: 18px; height: 18px;" src="../../assets/img/order_icon.png" alt="">
        </div>
        <div class="btn2">
          <img src="../../assets/img/order_icon.png" alt="">
          <p>订<br>单</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket"
export default {
  data() {
    return {
      num: {},
      mallList: [],
      totalNum: 0,
      equimentData: [
        {
          name: '蜻蜓plus',
          subTitle: '急速收款，安全到账，订单状态，交易明细',
          id: 1,
          price: '2388'
        },
        {
          name: '青蛙plus',
          subTitle: '订单状态，交易明细，急速收款，安全到账',
          id: 2,
          price: '1999'
        },
        {
          name: '蜻蜓plus1',
          subTitle: '急速收款，安全到账，订单状态，交易明细',
          id: 3,
          price: '1586'
        },
        {
          name: '青蛙plus22',
          subTitle: '订单状态，交易明细，急速收款，安全到账',
          id: 2,
          price: '2356'
        },
        {
          name: '蜻蜓plus1',
          subTitle: '急速收款，安全到账，订单状态，交易明细',
          id: 3,
          price: '1586'
        },
        {
          name: '青蛙plus22',
          subTitle: '订单状态，交易明细，急速收款，安全到账',
          id: 2,
          price: '2356'
        }
      ]
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
        this.mallList = res.object
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取购物车的数量
    getCartNum() {
      api.queryShopCartList({
        userId: localStorage.getItem('agentUserId')
      }).then(res => {
        this.totalNum = res.object.FACE.length + res.object.POSS.length + res.object.OTHER.length
      })
    },
    handleChange(index, value) {
      console.log(value)
      console.log(index)
    },
    mouse_cart(index) {
      console.log(index)
    },
    onclick_todetail(deviceId) {
      this.$router.push({
        path: '/serveMarket/equipmentMall/equimentDetail',
        query: {
          deviceId: deviceId
        }
      })
    },
    onclick_tocart() {
      this.$router.push({
        path: '/serveMarket/equipmentMall/shoppingCart'
      })
    },
    onClick_torecords() {
      this.$router.push({
        path: '/serveMarket/equipmentMall/orderRecords'
      })
    }
  }
}
</script>

<style scoped>
  .main_page {
    width: 100%;
    padding: 24px 24px 40px 24px;
  }
  .equiment {
    padding-left: 26px;
    display: flex;
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
  .equiment_list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    margin-top: 24px;
    cursor: pointer;
  }
  .list {
    width: 256px;
    background: #ffffff;
    padding: 24px 22px 20px 22px;
    box-sizing: border-box;
    margin-right: 24px;
    margin-bottom: 16px;
  }
  .list_img {
    width: 180px;
    height: 180px;
    margin: 0 auto;
  }
  .list_img img {
    width: 180px;
    height: 180px;
  }
  .list_name {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #333335;
    margin-top: 35px;
    line-height: 22px;
  }
  .list_subtitle {
    max-width: 210px;
    color: #606266;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 10px;
    margin-bottom: 24px;
  }
  .list_bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
  }
  .list_bottom span {
    color: #1989FA;
    font-size: 16px;
    font-weight: 500;
  }
  .list_bottom .cart_img {
    width: 50px;
    height: 32px;
    background: #1989FA;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart_img img {
    width: 16px;
    height: 16px;
  }
  .right_btn {
    position: fixed;
    top: 220px;
    right: 50px;
    width: 50px;
    z-index: 100;
  }
  .btn1 {
    width: 50px;
    height: 50px;
    background: #000000;
    border-radius: 50%;
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
  }
  .btn1 img {
    width: 20px;
    height: 20px;
    margin-top: 15px;
  }
  .btn2 {
    background: #1989FA;
    width: 50px;
    padding: 16px 0;
    color: #ffffff;
    line-height: 18px;
    font-size: 14px;
    text-align: center;
    border-radius: 25px;
  }
  .btn2 img {
    width: 17px;
    height: 17px;
    margin-bottom: 6px;
  }
  .el-badge__content {
    background-color: #F64D4C;
  }
</style>
