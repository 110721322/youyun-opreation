<template>
  <div class="main_page">
    <div class="goods-info">
      <div class="goods-img">
        <div class="goods-largeimg"></div>
        <div class="swiper-img">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </div>
      </div>
      <div class="goods-manage">
        <div class="goods-title">青蛙Plus</div>
        <div class="sale-num">已售2002件</div>
        <div class="goods-price">
          <span>¥1920.00</span>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" size="small"></el-input-number>
        </div>
        <div class="option-btn">
          <button>立即购买</button>
          <button>加入购物车</button>
        </div>
      </div>
    </div>
    <div class="goods-detail">
      <div class="title">商品详情</div>
      <div class="detail-img"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
  .main_page {
    width: 100%;
    padding: 24px 24px 0 24px;
  }
  .goods-info {
    width: 100%;
    background: #ffffff;
    padding: 32px 0 32px 40px;
    box-sizing: border-box;
    display: flex;
  }
  .goods-img {
    width: 188px;
    margin-right: 32px;
  }
  .goods-largeimg {
    width: 188px;
    height: 188px;
    background: blue;
    margin-bottom: 14px;
  }
  .swiper-img {
    width: 188px;
    overflow: hidden;
    height: 32px;
    display: flex;
    align-items: center;
  }
  .swiper-img li {
    display: block;
    width: 28px;
    height: 28px;
    margin-right: 10px;
    background: green;
  }
  .goods-manage {
    width: 100%;
  }
  .goods-title {
    font-size: 20px;
    font-weight: 500;
    color: #333335;
    line-height: 28px;
    margin-bottom: 8px;
  }
  .sale-num {
    color: #606266;
    font-size: 14px;
    margin-bottom: 24px;
  }
  .goods-price {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    height: 32px;
  }
  .goods-price span {
    display: block;
    margin-right: 40px;
    font-size: 20px;
    font-weight: 500;
    color: #F64D4C;
  }
  .option-btn {
    display: flex;
  }
  .option-btn button {
    width: 114px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    margin-right: 24px;
  }
  .option-btn button:nth-child(1) {
    background: #1989FA;
    color: #ffffff;
  }
  .option-btn button:nth-child(2) {
    border: 1px solid #C7C8CD;
    background: #ffffff;
    color: #606266;
  }
  .goods-detail {
    margin-top:24px;
    width: 100%;
    padding: 32px 32px;
    background: #ffffff;
  }
  .title {
    font-size: 16px;
    color: #000000;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 32px;
  }
  .detail-img {
    width: 100%;
    height: 500px;
    background: yellow;
  }
</style>
