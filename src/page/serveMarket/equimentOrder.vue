<template>
  <div class="page">
    <div class="top-area">
      <span>确认收货信息</span>
      <span>管理收货地址</span>
    </div>
    <div class="address">
      <li class="noselect" :class="selectIndex===index? 'isselect' :''" v-for="(item, index) in addressList" :key="index">
        <div class="left">
          <div class="desc" :style="{'visibility':item.isMoren === true? 'visibility':'hidden'}">默认</div>
          <input type="radio" class="radio" v-model="addressSelect" @change="getRadioVal" :value="index"/>
          <div class="address-info">{{item.address}}</div>
        </div>
        <div class="right" v-if="selectIndex===index">修改本地址</div>
      </li>
    </div>
    <div class="remark">
      <span>备注:</span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="150"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="goods-info">
      <div class="goods-title">商品信息</div>
      <div class="goods-table">
        <li>商品图片</li>
        <li>商品名称</li>
        <li>商品单价</li>
        <li>购买数量</li>
        <li>小计</li>
        <li>总计</li>
      </div>
      <div class="goods-list">
        <div class="list">
          <div class="left-list" v-for="(item, index) in goodsData" :key="index">
            <li>商品图片</li>
            <li>{{item.goodsName}}</li>
            <li>{{item.price}}</li>
            <li>{{item.quantity}}</li>
            <li>{{item.total}}</li>
          </div>
        </div>
        <div class="right-amount" :style="{'height':goodsData.length*92+'px', 'line-height': goodsData.length*92+'px'}">¥1920.00</div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="bottom-area">
        <div class="area">
          <button>提交订单</button>
          <button>取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
      addressSelect: '',
      textarea: '',
      addressList: [
        {
          id: 1,
          address: '金柒柒（18506812507） 浙江省 杭州市 西湖区 紫金众创小镇E1-18，小马哥',
          isMoren: true
        },
        {
          id: 2,
          address: '金柒柒（18506812507） 浙江省 杭州市 西湖区 紫金众创小镇E1-19，小马哥',
          isMoren: false
        }
      ],
      goodsData: [
        {
          goodsName: '青蛙',
          price: 10,
          quantity: 2,
          total: 20
        },
        {
          goodsName: '青蛙1',
          price: 10,
          quantity: 2,
          total: 20
        },
        {
          goodsName: '青蛙',
          price: 10,
          quantity: 2,
          total: 20
        }
      ]
    }
  },
  methods: {
    getRadioVal() {
      this.selectIndex = this.addressSelect
    }
  }
}
</script>

<style scoped>
  .page {
    padding: 24px 32px 40px 24px;
    background: #ffffff;
  }
  .top-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 24px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
  }
  .top-area span:nth-child(1) {
    color: #000000;
    font-weight: 500;
  }
  .top-area span:nth-child(2) {
    color: #1989FA;
  }
  .address .noselect {
    width: 100%;
    height: 40px;
    padding: 0 24px 0 24px;
    background: #FAFAFA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    margin-bottom: 16px;
    color: #606266;
    font-size: 14px;
    border: 1px solid #FAFAFA;
  }
  .address .noselect.isselect {
    background: #E8F3FE;
    border: 1px solid #1989FA;
  }
  .noselect .left {
    display: flex;
    align-items: center;
  }
  .noselect .left .desc {
    width: 32px;
    height: 16px;
    border-radius: 16px;
    text-align: center;
    line-height: 16px;
    font-size: 10px;
    color: #ffffff;
    background: #F64D4C;
    margin-right: 56px;
  }
  .radio {
    margin-right: 18px;
  }
  .right {
    color: #1989FA;
  }
  .remark {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
  }
  .remark span {
    display: block;
    padding-top: 13px;
    color: #333335;
    font-size: 14px;
    white-space: nowrap;
    margin-right: 16px;
  }
  .goods-info {
    width: 100%;
    margin-top: 40px;
  }
  .goods-title {
    font-size: 14px;
    line-height: 22px;
    color: #000000;
    margin-bottom: 24px;
  }
  .goods-table {
    width: 100%;
    display: flex;
    border: 1px solid #EBEEF5;
    height: 44px;
    background: #FAFAFA;
    border-radius: 4px 4px 0 0;
    padding-left: 44px;
  }
  .goods-table li {
    display: block;
    line-height: 44px;
    color: #909399;
    font-size: 14px;
  }
  .goods-table li:nth-child(1) {
    width: 19.3%;
  }
  .goods-table li:nth-child(2) {
      width: 16.3%;
  }
  .goods-table li:nth-child(3) {
      width: 15.3%;
  }
  .goods-table li:nth-child(4) {
      width: 16.3%;
  }
  .goods-table li:nth-child(5) {
      width: 14.8%;
  }
  .goods-list {
    width: 100%;
    position: relative;
  }
  .left-list {
    display: flex;
    height: 92px;
    border-left: 1px solid #F5F7FA;
    border-right: 1px solid #F5F7FA;
    border-bottom: 1px solid #F5F7FA;
    padding-left: 44px;
  }
  .left-list li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #606266;
  }
  .left-list li:nth-child(1) {
    width: 19.3%;
  }
  .left-list li:nth-child(2) {
    width: 16.3%;
  }
  .left-list li:nth-child(3) {
    width: 15.3%;
  }
  .left-list li:nth-child(4) {
    width: 16.3%;
  }
  .left-list li:nth-child(5) {
    width: 14.8%;
  }
  .right-amount {
    position: absolute;
    width: 20%;
    border-left: 1px solid #F5F7FA;
    right: 0;
    top: 0;
    z-index: 100;
    background: #ffffff;
    border-bottom: 1px solid #F5F7FA;
    border-right: 1px solid #F5F7FA;
    text-align: center;
    color: #F64D4C;
    font-size: 20px;
    font-weight: 500;
  }
  .bottom-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 0 24px 0 324px;
      width: 100%;
      height: 120px;
  }
  .bottom-area {
      height: 120px;
      padding-top: 40px;
      background: #ffffff;
  }
  .area {
    width: 260px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  .area button {
    width: 114px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    border-radius: 4px;
  }
  .area button:nth-child(1) {
    background: #1989FA;
    color: #ffffff;
  }
  .area button:nth-child(2) {
    border: 1px solid #C7C8CD;
    color: #606266;
  }
</style>
