<template>
  <div class="page">
    <div class="top-area">
      <span>确认收货信息</span>
      <!--      <span>管理收货地址</span>-->
    </div>
    <div class="address">
      <li v-for="(item, index) in addressList" :key="index" class="noselect" :class="selectIndex===index? 'isselect' :''">
        <div class="left">
          <div class="desc">默认</div>
          <input v-model="addressSelect" type="radio" class="radio" :value="index" />
          <div class="address-info">{{ item.personName+ ' ' + '(' + item.personMobile + ')'+ ' ' + item.detailAddress }}</div>
        </div>
        <div class="right" @click="modifyAddress">修改本地址</div>
      </li>
    </div>
    <div class="remark">
      <span>备注:</span>
      <el-input
        v-model="textarea"
        type="textarea"
        placeholder="请输入内容"
        maxlength="150"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="goods-info">
      <div class="goods-title">商品信息</div>
      <ul class="goods-table">
        <li>商品图片</li>
        <li>商品名称</li>
        <li>商品单价</li>
        <li>购买数量</li>
        <li>小计</li>
        <li>总计</li>
      </ul>
      <div class="goods-list">
        <div class="list">
          <ul v-for="(item, index) in goodsData" :key="index" class="left-list">
            <li><img :src="item.img" alt="商品图片" /></li>
            <li>{{ item.deviceModel }}</li>
            <li>{{ item.salePrice }}</li>
            <li>{{ enterInfo.count || item.shopCartCount }}</li>
            <li>{{ item.salePrice*enterInfo.count || item.shopSubtotal }}</li>
          </ul>
        </div>
        <div class="right-amount" :style="{'height':goodsData.length*92+'px', 'line-height': goodsData.length*92+'px'}">{{ enterType === 1?goodsData[0].salePrice*enterInfo.count : totalAmount }}</div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="bottom-area">
        <div class="area">
          <button @click="clickTopay">提交订单</button>
          <button>取消</button>
        </div>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="onClickcancel"
        @confirm="conClickConfirm"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket"
import { ADVERTISING_MATERIAL_CONFIG } from "./formConfig/modifyAdress";
import Form from "@/components/form/index.vue";
export default {
  name: "EquimentOrder",
  components: { Form },
  data() {
    return {
      enterInfo: {},
      fromConfigData: {},
      drawer: false,
      selectIndex: 0,
      addressSelect: 0,
      textarea: '',
      addressList: [],
      goodsData: [],
      totalAmount: '',
      settleInfo: {}
    }
  },
  created() {
    this.enterType = this.$route.query.enterType
    if (this.enterType === 1) {
      this.enterInfo = this.$route.query
      this.getGoodsDetail()
    } else {
      this.totalAmount = ''
      this.goodsData = this.$route.query.cartList.datas.goods
      this.totalAmount = this.$route.query.cartList.datas.sumPrice
      this.addressList = this.$route.query.cartList.datas.address
    }
  },
  methods: {
    getGoodsDetail() {
      api.queryMallDeviceDetail({
        deviceId: this.enterInfo.deviceId
      }).then(res => {
        this.goodsData.push(res.data)
      })
    },

    clickTopay() {
      const deviceInfos = this.goodsData.map(v => ({
        deviceId: v.deviceId,
        count: v.shopCartCount,
        salePrice: v.salePrice
      }))
      api.orderSettle({
        deviceInfos: deviceInfos,
        amount: this.totalAmount,
        actualAmount: this.totalAmount,
        agentNo: localStorage.getItem('agentUserId'),
        buyerName: this.addressList[0].personName,
        buyerPhone: this.addressList[0].personMobile,
        buyerAddress: this.addressList[0].detailAddress,
        buyerRemark: this.textarea,
        outputType: 1
      }).then(res => {
        if (!res.data) {
          this.$message({
            message: res.errorMessage + ',请修改购买数量',
            type: 'warning'
          })
        } else {
          this.$router.push({
            name: 'equimentPay',
            query: {
              orderInfo: res.data,
              deviceInfos: deviceInfos,
              address: this.addressList[0]
            }
          })
        }
      })
    },

    modifyAddress() {
      this.fromConfigData = ADVERTISING_MATERIAL_CONFIG.deviceData;
      this.drawer = true
    },
    onClickcancel() {},
    conClickConfirm() {}
  }
}
</script>

<style scoped>
  .page {
    padding: 24px 32px 40px 24px;
    background: #fff;
  }

  .top-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 24px;
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .top-area span:nth-child(1) {
    color: #000;
    font-weight: 500;
  }

  .top-area span:nth-child(2) {
    color: #1989fa;
  }

  .address .noselect {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 0 24px;
    margin-bottom: 16px;
    width: 100%;
    height: 40px;
    background: #fafafa;
    border-radius: 3px;
    color: #606266;
    font-size: 14px;
    border: 1px solid #fafafa;
  }

  .address .noselect.isselect {
    background: #e8f3fe;
    border: 1px solid #1989fa;
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
    color: #fff;
    background: #f64d4c;
    margin-right: 56px;
  }

  .radio {
    margin-right: 18px;
  }

  .right {
    color: #1989fa;
  }

  .remark {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }

  .remark span {
    display: block;
    padding-top: 13px;
    margin-right: 16px;
    color: #333335;
    font-size: 14px;
    white-space: nowrap;
  }

  .goods-info {
    margin-top: 40px;
    width: 100%;
  }

  .goods-title {
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 22px;
    color: #000;
  }

  .goods-table {
    display: flex;
    padding-left: 44px;
    border: 1px solid #ebeef5;
    height: 44px;
    background: #fafafa;
    width: 100%;
    border-radius: 4px 4px 0 0;
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
    position: relative;
    width: 100%;
  }

  .left-list {
    display: flex;
    padding-left: 44px;
    height: 92px;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
  }

  .left-list li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #606266;
  }

  .left-list li img {
    display: block;
    width: 80px;
    height: 80px;
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
    right: 0;
    top: 0;
    z-index: 100;
    background: #fff;
    text-align: center;
    color: #f64d4c;
    font-size: 20px;
    font-weight: 500;
    width: 20%;
    border-bottom: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    border-left: 1px solid #e9e9e9;
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
    background: #fff;
  }

  .area {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 260px;
    height: 40px;
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
    background: #1989fa;
    color: #fff;
  }

  .area button:nth-child(2) {
    border: 1px solid #c7c8cd;
    color: #606266;
  }
</style>
