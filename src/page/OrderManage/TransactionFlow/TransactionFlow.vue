<template>
  <div class="m-page">
    <div class="m-trade">
      <div class="m-trade-box">
        <div class="m-trade-line1">
          <div class="left-trade">
            <span>订单总额(元)</span>
            <img src="@/assets/img/orderAllMoney.svg" alt="订单图标" />
          </div>
          <div class="right-trade">
            <img src="@/assets/img/warn.svg" alt="提示图标" />
          </div>
        </div>
        <div class="m-trade-line2">{{ statisticsData.totalAmount || 0 }}</div>
<!--        <div class="m-trade-line3">今日订单金额(12笔) ¥23669.00</div>-->
      </div>
      <div class="m-trade-box">
        <div class="m-trade-line1">
          <div class="left-trade">
            <span>实收总额({{ statisticsData.actualCount || 0 }}笔)</span>
            <img src="@/assets/img/actionMoney.svg" alt="总额图标" />
          </div>
          <div class="right-trade">
            <img src="@/assets/img/warn.svg" alt="提示图标" />
          </div>
        </div>
        <div class="m-trade-line2">{{ statisticsData.actualAmount || 0 }}</div>
<!--        <div class="m-trade-line3">今日实际金额(12笔) ¥23669.00</div>-->
      </div>
      <div class="m-trade-box">
        <div class="m-trade-line1">
          <div class="left-trade">
            <span>退款总额({{ statisticsData.refundCount || 0 }}笔)</span>
            <img src="@/assets/img/refundMoney.svg" alt="退款图标" />
          </div>
          <div class="right-trade">
            <img src="@/assets/img/warn.svg" alt="提示图标" />
          </div>
        </div>
        <div class="m-trade-line2">{{ statisticsData.refundAmount || 0 }}</div>
<!--        <div class="m-trade-line3">今日退款金额(12笔) ¥23669.00</div>-->
      </div>
      <div class="m-trade-box">
        <div class="m-trade-line1">
          <div class="left-trade">
            <span>手续费总额（元）</span>
            <img src="@/assets/img/fee.svg" alt="手续费图标" />
          </div>
          <div class="right-trade">
            <img src="@/assets/img/warn.svg" alt="提示图标" />
          </div>
        </div>
        <div class="m-trade-line2">{{ statisticsData.serviceFee || 0 }}</div>
<!--        <div class="m-trade-line3">今日退款金额(12笔) ¥23669.00</div>-->
      </div>
      <div class="m-trade-box">
        <div class="m-trade-line1">
          <div class="left-trade">
            <span>服务商佣金总额（元）</span>
            <img src="@/assets/img/commsion.svg" alt="服务商佣金图标" />
          </div>
          <div class="right-trade">
            <img src="@/assets/img/warn.svg" alt="提示图标" />
          </div>
        </div>
        <div class="m-trade-line2">{{ statisticsData.agentCommission || 0 }}</div>
<!--        <div class="m-trade-line3">今日退款金额(12笔) ¥23669.00</div>-->
      </div>
      <div class="m-trade-box">
        <div class="m-trade-line1">
          <div class="left-trade">
            <span>平台佣金总额（元）</span>
            <img src="@/assets/img/commsion.svg" alt="平台佣金图标" />
          </div>
          <div class="right-trade">
            <img src="@/assets/img/warn.svg" alt="提示图标" />
          </div>
        </div>
        <div class="m-trade-line2">{{ statisticsData.platformCommission || 0 }}</div>
<!--        <div class="m-trade-line3">今日退款金额(12笔) ¥23669.00</div>-->
      </div>
    </div>
    <div class="m-select-top">
      <el-tabs v-model="activeName">
        <el-tab-pane label="订单流水" name="OrderFlow"></el-tab-pane>
        <el-tab-pane label="退单流水" name="RefundFlow"></el-tab-pane>
      </el-tabs>
    </div>
    <transition name="fade-transform" mode="out-in">
      <component :is="activeName" @clickSearch="clickSearch"></component>
    </transition>
  </div>
</template>

<script>
  import OrderFlow from "../Components/OrderFlow";
  import RefundFlow from "../Components/RefundFlow";
  import api_order from '@/api/api_order'
  export default {
    name: "TransactionFlow",
    components: {
      OrderFlow, RefundFlow
    },
    data() {
      return {
        activeName: 'OrderFlow',
        statisticsData: {}, // 统计数据信息
        params: {}
      }
    },
    created() {
      this.params = {
        beginTime: this.$g.utils.getToday(0) + ' 00:00:00',
        endTime: this.$g.utils.getToday(0) + ' 23:59:59'
      }
      this.getOrderStatistics()
    },
    methods: {
      clickSearch(params) {
        this.params = params
        this.getOrderStatistics()
      },
      getOrderStatistics() {
        api_order.selectOrderStatic({
          ...this.params
        }).then(res => {
          if (res.status === 0) {
            this.statisticsData = res.data;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
/deep/ .g-search-container {
    margin: 0 24px;
  }
  .m-page {
    padding-top: 24px;
    .m-trade {
      margin: 0 24px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .m-trade-box {
        width: 30%;
        padding: 16px 24px;
        background: #fff;
        margin-right: 24px;
        margin-bottom: 24px;
        .m-trade-line1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          height: 20px;
          .left-trade {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 14px;
              color: #606266;
            }
            img {
              display: block;
              width: 16px;
              height: 16px;
              margin-left: 8px;
            }
          }
          .right-trade {
            width: 16px;
            height: 16px;
            img {
              display: block;
              width: 16px;
              height: 16px;
            }
          }
        }
        .m-trade-line2 {
          margin-bottom: 16px;
          line-height: 34px;
          font-size: 24px;
          color: #333335;
        }
        .m-trade-line3 {
          padding-top: 8px;
          border-top: 1px solid #EBEEF5;
          font-size: 14px;
          line-height: 20px;
          color: #333335;
        }
      }
    }
    .m-select-top {
      padding: 0 24px;
      .el-tabs {
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #DCDFE6;
      }
      /deep/ .el-tabs__header {
        margin: 0;
        padding: 16px 0 0 24px;
      }
      /deep/ .el-tabs__nav-wrap::after {
        display: none !important;
      }
      /deep/ .el-tabs__item {
        height: 44px;
      }
    }
    .m-basecrud {
      padding: 24px 24px;
      .m-basecrud-title {
        display: flex;
        justify-content: space-between;
        padding: 24px 24px;
        background: #fff;
        .m-left {
          font-size: 16px;
        }
        .m-right {
          display: flex;
          button {
            margin: 0;
            padding: 0 20px;
            height: 32px;
            line-height: 32px;
          }
          .left-btn {
            margin-right: 16px;
          }
        }
      }
      .basecrud-box {
        padding: 0 24px 24px;
        background: #fff;
      }
    }
  }
</style>
