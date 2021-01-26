<template>
  <div>
    <div class="content">
      <div class="profit-search">
        <!--搜索开始-->
        <yun-search
          style="margin: 0 0 24px 0;"
          is-hide-btn
          show-btn-refresh
          @dataSelect="search"
          :form-base-data="searchConfig"
        ></yun-search>
        <!--搜索结束-->
      </div>
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
              <div v-if="item.slot" slot="countDown" class="flex-row" style="margin-bottom: 12px">
                <p class="f-fz-14 f-fc-333335 flex-align-center" style="margin-right: 40px">
                  <span class="f-fc-909399">同比</span>
                  <i :class="[item.slotItem.MoMDownOrUp?'el-icon-caret-top f-fc-success':'el-icon-caret-bottom f-fc-fail']"></i>
                  <span>{{ item.slotItem.MoMData }}%</span>
                </p>
                <p class="f-fz-14 f-fc-333335 flex-align-center">
                  <span class="f-fc-909399">环比</span>
                  <i :class="[item.slotItem.YoYDownOrUp?'el-icon-caret-top f-fc-success':'el-icon-caret-bottom f-fc-fail']"></i>
                  <span>{{ item.slotItem.YoYData }}%</span>
                </p>
              </div>
            </yun-card-first>
          </el-col>
        </el-row>
      </div>
      <div class="profit-echarts">
        <div class="echarts-head">
          <div class="head-title">佣金统计</div>
        </div>
        <div class="echarts-box">
          <yun-echarts :echarts-config="echartsBarConfig"></yun-echarts>
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
        tableList: [{name: '门店分润排名', api: '', params: {}, tableConfig: SHOP_PROFIT}, 
          {name: '商户分润排名', api: '', params: {}, tableConfig: MERCHANT_PROFIT}, 
          {name: '服务商分润排名', api: '', params: {}, tableConfig: AGENT_PROFIT}
        ],
        infoList: [],
        testData: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          },
          {
            id: 4
          }
        ]
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(INFO_LIST)
      this.echartsBarConfig = this.$g.utils.deepClone(ECHARTS_BAR_CONFIG)
    },
    mounted() {
    },
    methods: {
      search($ruleForm) {
        console.log($ruleForm);
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
