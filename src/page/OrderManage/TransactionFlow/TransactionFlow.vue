<template>
  <div class="m-page">
    <div class="settle-data">
      <!--数据统计开始-->
      <el-row>
        <el-col :span="item.span" v-for="(item, index) in infoList" :key="index">
          <yun-card-first
            :style="item.style"
            :label="item.label"
            :icon="item.icon"
            :icon-style="item.iconStyle"
            :tooltip="item.tooltip"
            :value="item.value"
            :children="item.children"
          >
          </yun-card-first>
        </el-col>
      </el-row>
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
  import { INFO_LIST } from "../tableConfig/flowTableConfig";
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
        params: {},
        infoList: []
      }
    },
    created() {
      this.params = {
        beginTime: this.$g.utils.getToday(0) + ' 00:00:00',
        endTime: this.$g.utils.getToday(0) + ' 23:59:59'
      }
      this.infoList = this.$g.utils.deepClone(INFO_LIST)
      this.getOrderStatistics()
    },
    methods: {
      clickSearch(params) {
        this.params = params
        this.getOrderStatistics()
      },
      getOrderStatistics() {
        api_order.selectOrderStatic({
          ...this.params,
          beginTime: this.params.queryBeginPayTime || (this.$g.utils.getToday(0) + ' 00:00:00'),
          endTime: this.params.queryEndPayTime || (this.$g.utils.getToday(0) + ' 23:59:59')
        }).then(res => {
          if (res.status === 0) {
            this.statisticsData = res.data;
            // TODO review: 回调方式formatter赋值
            this.infoList.forEach((item, index) => {
              if (item.key === 'actualAmount') {
                item.label = '实收总额（'+ (res.data.actualCount||0) +'笔）'
              }
              if (item.key === 'refundAmount') {
                item.label = '退款总额（'+ (res.data.refundCount||0) +'笔）'
              }
              item.value = (res.data[item.key] || 0) + ''
            })
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
    .settle-data {
      margin: 0 24px;
      /deep/ .m-card .m-top {
        border: 0;
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
