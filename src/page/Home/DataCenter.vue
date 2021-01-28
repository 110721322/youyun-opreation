<template>
  <section>
    <!--搜索开始-->
    <yun-search
        style="margin-bottom: 24px;"
        is-hide-btn
        show-btn-refresh
        @dataSelect="dataSelect"
        @refresh="refresh"
        :form-base-data="searchConfig"
    ></yun-search>
    <!--搜索结束-->
    <!--数据统计开始-->
    <el-row style="margin: 0 24px;">
      <el-col :span="item.span" v-for="(item, index) in infoList" :key="index">
        <yun-card-first
            :style="item.style"
            :label="item.label"
            :icon="item.icon"
            :icon-style="item.iconStyle"
            :tooltip="item.tooltip"
            :value="item.value"
            :children="item.children"
        ></yun-card-first>
      </el-col>
    </el-row>
    <!--数据统计结束-->
    <!--支付趋势图表开始-->
    <yun-detail-box
        title="支付趋势"
        style="margin-top: 0;"
    >
      <yun-echarts class="m-trend" ref="yunEcharts" :echarts-config="echartsLineConfig"></yun-echarts>
    </yun-detail-box>
    <!--支付趋势图表结束-->
    <!--支付金额占比开始-->
    <yun-detail-box
        title="支付金额占比"
        style="margin-top: 0;"
    >
      <main class="m-rate">
        <p class="f-fz-14 f-fc-333335 font-weight" style="margin-bottom: 24px;">支付总额：{{ $g.utils.toLocaleString(totalAmount) }}</p>
        <yun-ratio :ratio-group="ratioGroup" style="margin-bottom: 16px;"></yun-ratio>
        <yun-legend :legend-group="ratioGroup"></yun-legend>
      </main>
    </yun-detail-box>
    <!--支付金额占比结束-->
    <!--表格统计开始-->
    <el-row style="margin: 0 24px;">
      <el-col :span="12">
        <table-data
            ref="agentTableTemp"
            style="margin: 0 12px 24px 0;"
            title="服务商概览"
            :radio-group="agentRadioGroup"
            :table-config="agentTableConfig"
            :api-service-strategies="apiServiceAgent"
        ></table-data>
      </el-col>
      <el-col :span="12" class="clearfix">
        <table-data
            ref="merchantTableTemp"
            style="margin: 0 0 24px 12px;"
            title="商户概览"
            :radio-group="merchantRadioGroup"
            :table-config="merchantTableConfig"
            :api-service-strategies="apiServiceMerchant"
        ></table-data>
      </el-col>
      <div class="clear-both"></div>
      <el-col :span="12">
        <table-data
            ref="shopTableTemp"
            style="margin: 0 12px 24px 0;"
            title="门店概览"
            :radio-group="shopRadioGroup"
            :table-config="shopTableConfig"
            :api-service-strategies="apiServiceShop"
        ></table-data>
      </el-col>
    </el-row>
    <!--表格统计结束-->
  </section>
</template>

<script>
  import api_account from "@/api/api_account";
  import { SEARCH_CONFIG } from "./formConfig/dataCenterForm";
  import { INFO_LIST, RATIO_GROUP_CONFIG } from "./detailConfig/dataCenterDetail";
  import { ECHARTS_LINE_CONFIG } from "./echartsConfig/dataCenterEcharts";
  import { AGENT_TABLE_CONFIG, MERCHANT_TABLE_CONFIG, SHOP_TABLE_CONFIG,
    AGENT_RADIO_GROUP, MERCHANT_RADIO_GROUP, SHOP_RADIO_GROUP } from "./tableConfig/DataCenterTable";
  import TableData from "./components/TableData";
  import { DataCenter } from "@/libs/config/constant.config";

  export default {
    name: "DataCenter",
    components: {
      TableData
    },
    data() {
      return {
        searchConfig: SEARCH_CONFIG,
        agentTableConfig: AGENT_TABLE_CONFIG,
        merchantTableConfig: MERCHANT_TABLE_CONFIG,
        shopTableConfig: SHOP_TABLE_CONFIG,
        infoList: [],
        echartsLineConfig: null,
        echartsLine: null,
        ratioGroup: [],
        agentRadioGroup: AGENT_RADIO_GROUP,
        merchantRadioGroup: MERCHANT_RADIO_GROUP,
        shopRadioGroup: SHOP_RADIO_GROUP,
        params: {},
        totalAmount: 0,
        apiServiceAgent: {
          active: api_account.getActiveAgent,
          new: api_account.getNewAgent,
          warn: api_account.getAbnormalAgent
        },
        apiServiceMerchant: {
          active: api_account.getActiveMerchant,
          new: api_account.getNewMerchant,
          warn: api_account.getAbnormalMerchant
        },
        apiServiceShop: {
          active: api_account.getActiveShop,
          new: api_account.getNewShop,
          warn: api_account.getAbnormalShop
        }
      }
    },
    created() {
      this.initImport()
    },
    methods: {
      initImport() {
        this.infoList = this.$g.utils.deepClone(INFO_LIST)
        this.ratioGroup = this.$g.utils.deepClone(RATIO_GROUP_CONFIG)
        this.echartsLineConfig = this.$g.utils.deepClone(ECHARTS_LINE_CONFIG)
      },
      dataSelect($date, $key) {
        this.params = {
          beginDate: $date[0],
          endDate: $date[1],
          type: $key === 'currentYear' ? DataCenter.ALL_YEAR : null
        }
        this.getData();
      },
      getData() {
        this.getStatisticData();
        this.getTendency();
        this.getPayTypePercent();
      },
      refresh() {
        this.$refs.agentTableTemp.refresh();
        this.$refs.merchantTableTemp.refresh();
        this.$refs.shopTableTemp.refresh();
        this.getData();
      },
      getStatisticData() {
        return api_account.getStatisticData(this.params).then(res => {
          const statisticsData = res.data;
          for (let key in statisticsData) {
            statisticsData[key] = this.$g.utils.toLocaleString(statisticsData[key])
          }
          const forBinaryTree = ($data) => {
            $data.forEach(item => {
              if (this.$g.utils.isFunction(item.formatter)) {
                item.value = item.formatter(statisticsData)
              } else {
                item.value = statisticsData[item.prop]
              }
              if (this.$g.utils.isArr(item.children)) {
                forBinaryTree(item.children)
              }
            })
          }
          forBinaryTree(this.infoList)
          return statisticsData;
        })
      },
      getTendency() {
        const actions = new Map([
          [DataCenter.ALL_YEAR, api_account.getMonthTendency],
          ['default', api_account.getDayTendency]
        ])
        const func = actions.get(this.params.type) || actions.get('default')
        return func(this.params).then(res => {
          const data = res.data;
          if (this.$g.utils.isArr(data)) {
            this.echartsLineConfig.xAxis.data = data.map(item => item.tradeDate);
            this.echartsLineConfig.series.forEach(config => {
              config.data = data.map(item => item[config.id])
            })
            this.$refs.yunEcharts.setOption()
          }
          return data;
        })
      },
      getPayTypePercent() {
        return api_account.getPayTypePercent(this.params).then(res => {
          const data = res.data;
          this.totalAmount = this.$g.utils.AccAdd(data[DataCenter.WX_PAY_AMOUNT], data[DataCenter.ALI_PAY_AMOUNT]);
          this.ratioGroup.forEach(item => {
            const fieldValue = data[item.prop]
            item.value = this.$g.utils.toLocaleString(fieldValue)
            item.ratio = this.$g.utils.AccDiv(item.value, this.totalAmount || 1) * 100
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-trend {
    width: 100%;
    height: 408px;
  }
  .m-rate {
    width: 100%;
    height: 190px;
    padding: 39px 48px;
  }
</style>
