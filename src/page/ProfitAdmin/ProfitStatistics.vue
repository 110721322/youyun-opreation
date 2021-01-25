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
              <div v-if="item.slotName" :slot="item.slotName" class="flex-row" style="margin-bottom: 12px">
                <p class="f-fz-14 f-fc-333335 flex-align-center" style="margin-right: 40px">
                  <span class="f-fc-909399">同比</span>
                  <i class="el-icon-caret-bottom f-fc-fail"></i>
                  <span>11%</span>
                </p>
                <p class="f-fz-14 f-fc-333335 flex-align-center">
                  <span class="f-fc-909399">环比</span>
                  <i class="el-icon-caret-top f-fc-success"></i>
                  <span>11%</span>
                </p>
              </div>
            </yun-card-first>
          </el-col>
        </el-row>
      </div>
      <div class="profit-echarts">
        <div class="echarts-head flex-align-center flex-between">
          <div class="head-title">分润趋势</div>
          <div class="flex-align-center">
            <div class="head-label flex-align-center">
              <div v-for="(item, index) in dateList"
                :key="index"
                :class="[activeName===item.label?'active':'']"
                @click="clickLable(item)"
                >{{item.label}}</div>
            </div>
            <el-date-picker
              v-model="echartDate"
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="echarts-box">
          <div ref="profitEchart" style="width:100%;height:300px;"></div>
        </div>
      </div>
      <div class="profit-tables">
        <div class="table-item" v-for="(item, index) in tableList" :key="index">
          <div class="table-head">{{ item.name }}</div>
          <div class="table-box">
            <yun-table
              :is-async="true"
              :grid-config="item.tableConfig.gridConfig"
              :grid-btn-config="item.tableConfig.gridBtnConfig"
              :params="item.params"
              :hide-edit-area="true"
              :api-service="item.api"></yun-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { SHOP_PROFIT, MERCHANT_PROFIT, AGENT_PROFIT, INFO_LIST } from "./tableConfig/profitTable";
  const echarts = require('echarts');
  export default {
    name: 'ProfitStatistics',
    components: {
    },
    data() {
      return {
        echartDate: [],
        dateList: [{label: '今日', value: 1},
          {label: '本周', value: this.$g.utils.changeCNDay(new Date().getDay())},
          {label: '本月', value: new Date().getDate()},
          {label: '全年', value: new Date().getDate()}],
        activeName: '今日',
        tableList: [{name: '门店分润排名', api: '', params: {}, tableConfig: SHOP_PROFIT}, 
          {name: '商户分润排名', api: '', params: {}, tableConfig: MERCHANT_PROFIT}, 
          {name: '服务商分润排名', api: '', params: {}, tableConfig: AGENT_PROFIT}
        ],
        infoList: [],
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(INFO_LIST)
      this.echartDate=[this.getDay(0), this.getDay(0)]
    },
    mounted() {
      this.initCharts()
    },
    methods: {
      clickLable($item) {
        this.activeName = $item.label
        let start = "";
        let end = "";
        switch ($item.label) {
          case '今日':
            end = this.getDay(0);
            start = this.getDay(0);
            break;
          case '今年':
            end = this.getDay(0);
            start = "2000-01-01";
            break;
          default:
            end = this.getDay(0);
            start = this.getDay(-$item.value + 1);
        }
        this.echartDate = [start, end];
      },
      getDay(day) {
        var today = new Date();
        const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
      },
      doHandleMonth(month) {
        var m = month;
        if (month.toString().length === 1) {
          m = "0" + month;
        }
        return m;
      },
      initCharts(){
		    // 基于准备好的dom，初始化echarts实例
		    let myChart = echarts.init(this.$refs.profitEchart);
		    // 绘制图表
        myChart.setOption({
          title: { 
            text: '订单分润',
            textStyle: {
              fontSize: 14,
              color: '#333335',
              fontWeight: 400
            }
          },
          tooltip: {},
          xAxis: {
            data: ["一月","二月","三月","四月","五月","六月"]
          },
          yAxis: {},
          color : '#1890FF',
          series: [{
            name: '分润',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
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
      padding: 12px 24px;
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
      padding: 16px 24px;
    }
  }
  .profit-tables {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .table-item {
      width: 49%;
      background: white;
      margin-bottom: 24px;
      .table-head {
        padding: 16px 24px;       
        border-bottom: 1px solid #DCDFE6;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
      }
      .table-box {
        padding: 16px 24px;
      }
    }
    .table-item:nth-of-type(odd) {
      margin-right: 24px;
    }
  }
</style>
