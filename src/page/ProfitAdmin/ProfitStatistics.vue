<template>
  <div>
    <div class="content">
      <div class="profit-data">
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
      <div class="profit-search">
        <!--搜索开始-->
        <yun-search
          style="margin: 0 0 24px 0;"
          is-hide-btn
          show-btn-refresh
          @dataSelect="dataSelect"
          @refresh="refresh"
          :form-base-data="searchConfig"
        ></yun-search>
        <!--搜索结束-->
      </div>
      <div class="profit-echarts">
        <div class="echarts-head">
          <div class="head-title">佣金统计</div>
        </div>
        <div class="echarts-box">
          <yun-echarts ref="yunEcharts" :echarts-config="echartsBarConfig"></yun-echarts>
        </div>
      </div>
      <div class="profit-tables">
        <el-row>
          <el-col v-for="(item, index) in tableList" :key="index" :span="12" class="table-item">
            <div class="table-head">{{ item.name }}</div>
            <div class="table-box">
              <yun-table
                class="m-table"
                :is-async="true"
                :grid-config="item.tableConfig.gridConfig"
                :grid-btn-config="item.tableConfig.gridBtnConfig"
                :params="item.params"
                :hide-edit-area="true"
                :grid-data="testData"
                :api-service="item.api"></yun-table>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_profit";
  import { SEARCH_CONFIG } from "./formConfig/profitStatisticsForm";
  import { SHOP_PROFIT, MERCHANT_PROFIT, AGENT_PROFIT, INFO_LIST, ECHARTS_BAR_CONFIG } from "./tableConfig/profitTable";
  const echarts = require('echarts');
  export default {
    name: 'ProfitStatistics',
    components: {
    },
    data() {
      return {
        searchConfig: SEARCH_CONFIG,
        tableList: [{name: '门店分润排名', api: api.queryShopDataList, params: {sortFiled: 'currMonthTopAgentCommission', sortRule: 'desc'}, tableConfig: SHOP_PROFIT}, 
          {name: '商户分润排名', api: api.queryMerchantDataList, params: {sortFiled: 'currMonthTopAgentCommission', sortRule: 'desc'}, tableConfig: MERCHANT_PROFIT}, 
          {name: '服务商分润排名', api: api.queryAgentDataList, params: {sortFiled: 'currMonthTopAgentCommission', sortRule: 'desc'}, tableConfig: AGENT_PROFIT}
        ],
        infoList: [],
        testData: [],
        params: {
          beginDate: this.$g.utils.getToday(-1),
          endDate: this.$g.utils.getToday(-1),
          type: 0
        }
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(INFO_LIST)
      this.echartsBarConfig = this.$g.utils.deepClone(ECHARTS_BAR_CONFIG)
      this.queryTotalData()
      this.queryTrendDataList()
    },
    mounted() {
    },
    methods: {
      queryTotalData() {
        const params = {}
        api.queryTotalData(params).then(res => {
          if (res.status === 0) {
            this.infoList.forEach((item, index) => {
              if (item.key === 'currMonthCommission') {
                item.children[0].value = '¥' + (res.data.lastMonthCommission||0)
              }
              item.value = (res.data[item.key] || 0) + ''
            })
          }
        })
      },
      queryTrendDataList() {
        const params = {
          ...this.params
        }
        api.queryTrendDataList(params).then(res => {
          if (res.status === 0) {
            // if (res.data.length > 0) {
            //   const xArr = []
            //   const yArr = []
            //   res.data.forEach((item,index) => {
            //     const xValue = this.params.type === 0 ? item.tradeDate : item.tradeMonth
            //     const yValue = item.topAgentCommission || 0
            //     xArr.push(xValue)
            //     yArr.push(yValue)
            //   })
            //   this.echartsBarConfig.xAxis[0].data = xArr
            //   this.echartsBarConfig.series[0].data = yArr
            // }
            if (this.$g.utils.isArr(res.data)) {
              this.echartsBarConfig.xAxis[0].data = res.data.map(item => item.tradeDate);
              this.echartsBarConfig.series.forEach(config => {
                config.data = res.data.map(item => item[config.id])
              })
              this.$refs.yunEcharts.setOption()
            }
          }
        })
      },
      dataSelect($date, $key) {
        this.params = {
          beginDate: $date?$date[0] : '',
          endDate: $date?$date[1] : '',
        }
        if ($key === 'currentYear') {
          this.params.type = 1
        } else {
          this.params.type = 0
        }
        this.queryTrendDataList()
      },
      refresh() {
        this.queryTrendDataList();
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
  }
  .profit-echarts {
    background: white;
    margin-bottom: 24px;
    .echarts-head {
      padding: 16px 24px;
      border-bottom: 1px solid #DCDFE6;
      .head-title { 
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
      }
      .head-label {
        div {
          margin-right: 24px;
          font-size: 14px;
          font-weight: 400;
          color: #333335;
          line-height: 20px;
          cursor: pointer;
        }
        .active {
          color: #1989FA;
        }
      }
    }
    .echarts-box {
      width: 100%;
      height: 408px;
      padding: 16px 24px;
      .m-echarts-container {
        width: 100%;
        height: 100%;
      }
    }
  }
  .profit-tables {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .table-item {
      // background: white;
      margin-bottom: 24px;
      .table-head {
        padding: 16px 24px;
        background: white;     
        border-bottom: 1px solid #DCDFE6;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
      }
      .table-box {
        background: white;
        .m-table {
          padding: 16px 24px;
          /deep/ .m-rank {
            display: block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            text-align: center;
            &.m-top {
              background: #314659;
              border-radius: 50%;
              color: #FFFFFF;
            }
          }
        }
      }
    }
    .table-item:nth-of-type(odd) {
      padding-right: 24px;
    }
  }
</style>
