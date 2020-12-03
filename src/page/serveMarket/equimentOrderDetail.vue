<template>
  <div>
    <div class="p_head">订单详情</div>
    <detailMode :rule-form="ruleFormBasic" :config-data="configData">
      <div slot="operatinTopCont" class="order-state">
        <div>订单状态： {{ ruleFormBasic.statusName }}</div>
        <p v-if="ruleFormBasic.status===5">预计两个工作日内给您发货</p>
        <p v-if="ruleFormBasic.status===6">快递单号</p>
        <p v-if="ruleFormBasic.status===2">超时未付款，订单自动关闭</p>
        <div v-if="ruleFormBasic.status===1" class="topay">
          <span class="left-title">付款剩余时间:</span>
          <div class="step-time">
            <div class="times">{{ lefth }}</div>
            <span>:</span>
            <div class="times">{{ leftm }}</div>
            <span>:</span>
            <div class="times">{{ lefts }}</div>
          </div>
          <el-button v-if="ruleFormBasic.status===1 && showBuy " class="buy-btn" type="primary" @click="clickTPay">立即付款</el-button>
        </div>
      </div>
      <div slot="operatingBottom" class="orderdetails">
        <div class="header flex-between">
          <div>商品图片</div>
          <div>商品名称</div>
          <div>商品单价</div>
          <div>购买数量</div>
          <div>小计</div>
        </div>
        <div v-for="(item, index) in infoDTOList" :key="index" class="content flex-between">
          <div style="padding-top: 6px;"><img :src="item.deviceImg" alt="商品图片" style="width: 80px; height: 80px;"></div>
          <div>{{ item.deviceModel }}</div>
          <div>{{ item.salePrice }}</div>
          <div>{{ item.count }}</div>
          <div>{{ item.salePrice*item.count }}</div>
        </div>
      </div>
    </detailMode>
  </div>
</template>

<script>
import api from '@/api/api_serveMarket.js'
import detailMode from "@/components/detailMode/detailMode4.vue";
export default {
  name: "EquimentOrderDetail",
  components: { detailMode },
  data() {
    return {
      configData: {
        name: "订单状态",
        child: [
          {
            name: "收货信息",
            modelName: "goodsData",
            models: [
              {
                items: [
                  {
                    name: "联系人",
                    key: "buyerName"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "联系电话",
                    key: "buyerPhone"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "收货地址",
                    key: "buyerAddress"
                  }
                ]
              }
            ]
          },
          {
            name: "订单信息",
            modelName: "OrderSite",
            models: [
              {
                items: [
                  {
                    name: "订单号",
                    key: "outputNo"
                  },
                  {
                    name: "支付方法",
                    key: "payTypeName"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "下单时间",
                    key: "outputTime"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "订单备注",
                    key: "financeRemark"
                  }
                ]
              }
            ]
          }
        ]
      },
      ruleFormBasic: {},
      infoDTOList: {},
      id: '',
      lefth: '',
      leftm: '',
      lefts: '',
      showBuy: false,
      orderInfo: {}
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getOrderDetail(this.$route.query.id);
  },
  mounted() {
  },
  methods: {
    getOrderDetail(id) {
      api.queryOrderDetail({ id: id}).then(res => {
        this.ruleFormBasic = res.data;
        this.infoDTOList = res.data.infoDTOList;
        if (res.data.status === 1) {
          this.getTime(res.data.createTime)
        }
        this.orderInfo = {
          actualAmount: res.data.actualAmount,
          outputNo: res.data.outputNo,
          createTime: res.data.createTime
        }
      });
    },
    getTime(timeDate) {
      var date = new Date();
      var Months = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var Dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      var now = date.getFullYear() + '-' + Months + '-' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds;
      var now1 = now.replace(new RegExp("-", "gm"), "/")
      var now2 = timeDate.replace(new RegExp("-", "gm"), "/")
      var startDateM = (new Date(now1)).getTime(); // 得到倒计时的毫秒数
      var endTime = (new Date(now2)).getTime();
      var nowTime = (endTime + 1800000) - startDateM
      if (nowTime >= 0) {
        this.showBuy = true
        this.leftd = Math.floor(nowTime / (1000 * 60 * 60 * 24)) // 计算天数
        this.lefth = Math.floor(nowTime / (1000 * 60 * 60) % 24) // 计算小时数
        this.leftm = Math.floor(nowTime / (1000 * 60) % 60) // 计算分钟数
        this.lefts = Math.floor(nowTime / 1000 % 60) // 计算秒数
        if (this.leftd < 10) {
          this.leftd = "0" + this.leftd
        }
        if (this.lefth < 10) {
          this.lefth = "0" + this.lefth
        }
        if (this.leftm < 10) {
          this.leftm = "0" + this.leftm
        }
        if (this.lefts < 10) {
          this.lefts = "0" + this.lefts
        }
        setInterval(() => {
          this.getTime(timeDate)
        }, 1000)
      } else {
        this.showBuy = false
        this.getOrderDetail(this.$route.query.id)
        this.lefth = '00'
        this.lefth = '00'
        this.leftm = '00'
        this.lefts = '00'
      }
    },

    clickTPay() {
      const orderInfo = {
        outputNo: this.ruleFormBasic.outputNo,
        actualAmount: this.ruleFormBasic.actualAmount,
        theTime: this.ruleFormBasic.createTime
      }
      const address = {
        personName: this.ruleFormBasic.buyerName,
        personMobile: this.ruleFormBasic.buyerPhone,
        detailAddress: this.ruleFormBasic.buyerAddress
      }
      const deviceInfos = this.infoDTOList.map(v => ({
        deviceId: v.deviceId,
        count: v.shopCartCount,
        salePrice: v.salePrice
      }))
      this.$router.push({
        name: 'equimentPay',
        query: {
          orderInfo: orderInfo,
          deviceInfos: deviceInfos,
          address: address
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-state {
    margin: 24px;
    padding: 24px 32px;
    border-radius: 3px;
    border: 1px solid #ebeef5;
    background-color: #fafafa;
    line-height: 22px;

    div {
      color: #1989fa;
      font-size: 16px;
      font-weight: 500;
    }

    p {
      color: #606266;
    }

    .topay {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .left-title {
        margin-right: 24px;
        color: #606266;
      }

      .step-time {
        display: flex;
        align-items: center;
        margin-right: 40px;

        .times {
          margin: 0 4px;
          width: 28px;
          height: 32px;
          background: #e8f1fa;
          color: #1989fa;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          border-radius: 2px;
        }

        .span {
          display: block;
          width: 12px;
          height: 32px;
          color: #1989fa;
          text-align: center;
          line-height: 32px;
          font-weight: 500;
        }
      }

      .buy-btn {
        width: 116px;
        height: 32px;
      }
    }
  }

  .orderdetails {
    margin: 0 24px 33px;
    border: 1px solid #e9e9e9;

    .header {
      padding: 15px 43px;
      border-radius: 3px;
      color: #909399;
      border: 1px solid #ebeef5;
      background-color: #fafafa;
    }

    .content {
      padding: 0 43px;
      color: #606266;
      height: 92px;
      line-height: 92px;
    }
  }
</style>
