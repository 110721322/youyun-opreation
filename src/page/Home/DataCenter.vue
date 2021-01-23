<template>
  <section>
    <!--搜索开始-->
    <yun-search
        style="margin-bottom: 24px;"
        is-hide-btn
        show-btn-refresh
        @dataSelect="search"
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
      <main class="m-trend">
        <yun-echarts :echarts-config="echartsLineConfig"></yun-echarts>
      </main>
    </yun-detail-box>
    <!--支付趋势图表结束-->
    <!--支付金额占比开始-->
    <yun-detail-box
        title="支付金额占比"
        style="margin-top: 0;"
    >
      <main class="m-rate">
        <p class="f-fz-14 f-fc-333335 font-weight" style="margin-bottom: 24px;">支付总额：8200.00</p>
        <yun-ratio :ratio-group="ratioGroup" style="margin-bottom: 16px;"></yun-ratio>
        <yun-legend :legend-group="ratioGroup"></yun-legend>
      </main>
    </yun-detail-box>
    <!--支付金额占比结束-->
    <!--表格统计开始-->
    <el-row style="margin: 0 24px;">
      <el-col :span="12">
        <table-data
            style="margin: 0 24px 24px 0;"
            title="服务商概览"
            :radio-group="agentRadioGroup"
            :table-config="agentTableConfig"
        ></table-data>
      </el-col>
      <el-col :span="12">
        <table-data
            style="margin: 0 0 24px 0;"
            title="商户概览"
            :radio-group="merchantRadioGroup"
            :table-config="merchantTableConfig"
        ></table-data>
      </el-col>
      <el-col :span="12">
        <table-data
            style="margin: 0 24px 24px 0;"
            title="门店概览"
            :radio-group="shopRadioGroup"
            :table-config="shopTableConfig"
        ></table-data>
      </el-col>
    </el-row>
    <!--表格统计结束-->
  </section>
</template>

<script>
  import { SEARCH_CONFIG } from "./formConfig/dataCenterForm";
  import { INFO_LIST, RATIO_GROUP_CONFIG } from "./detailConfig/dataCenterDetail";
  import { ECHARTS_LINE_CONFIG } from "./echartsConfig/dataCenterEcharts";
  import { AGENT_TABLE_CONFIG, MERCHANT_TABLE_CONFIG, SHOP_TABLE_CONFIG,
    AGENT_RADIO_GROUP, MERCHANT_RADIO_GROUP, SHOP_RADIO_GROUP } from "../AccountManage/TableConfig/DataCenterTable";
  import TableData from "./components/TableData";

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
      search($ruleForm) {
        console.log($ruleForm);
      },
      changeRadio($val) {
        console.log($val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-trend {
    width: 100%;
    height: 408px;
    .m-echarts-container {
      width: 100%;
      height: 100%;
    }
  }
  .m-rate {
    width: 100%;
    height: 190px;
    padding: 39px 48px;
  }
</style>
