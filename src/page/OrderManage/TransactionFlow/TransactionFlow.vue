<template>
  <div class="m-page">
    <div class="m-select-top">
      <el-tabs v-model="activeName">
        <el-tab-pane label="订单流水" name="OrderFlow"></el-tab-pane>
        <el-tab-pane label="退单流水" name="RefundFlow"></el-tab-pane>
      </el-tabs>
    </div>
    <transition name="fade-transform" mode="out-in">
      <component :is="activeName"></component>
    </transition>
  </div>
</template>

<script>
  import OrderFlow from "../Components/OrderFlow";
  import RefundFlow from "../Components/RefundFlow";
  export default {
    name: "TransactionFlow",
    components: {
      OrderFlow, RefundFlow
    },
    data() {
      return {
        activeName: 'OrderFlow'
      }
    },
    created() {
    },
    methods: {
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
      margin: 24px;
      display: flex;
      justify-content: space-between;
      .m-trade-box {
        width: 24%;
        padding: 16px 24px;
        background: #fff;
        margin-right: 24px;
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
