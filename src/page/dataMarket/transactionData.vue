<template>
  <div>
    <div class="p-head">
      <span class="left-title">交易设置</span>
      <div class="right-area" @click="showRightbar">
        <img src="../../assets/img/menu_icon.png" alt="图标" />
        <span>自定义设置</span>
      </div>
    </div>
    <template v-if="hasPermission('tradeTrend')">
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        :permission="searchConfig.permission"
        @dataSelect="handleDataSelect"
        @search="search"
      />
      <div class="d-box">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">全部订单</el-menu-item>
          <el-menu-item index="2">微信</el-menu-item>
          <el-menu-item index="3">支付宝</el-menu-item>
          <el-menu-item index="4">云闪付</el-menu-item>
          <el-menu-item index="5">银联</el-menu-item>
        </el-menu>
        <div class="echarts-box">
          <div class="data-box">
            <div v-for="(item, index) in amountList" :key="index" class="data-item">
              <div class="title">{{ item.title }}</div>
              <div class="amount-all">
                <span class="amount-icon">{{ item.type === 'amount' ? '¥' : '' }}</span>
                {{ item.amountAll }}
              </div>
              <el-tooltip class="item" effect="dark" :content="item.tooltip" placement="bottom">
                <div class="progress-box">
                  <img :src="smileImg" class="data-img" alt="图标" />
                  <el-progress
                    :percentage="item.ratio"
                    color="rgba(58,189,45,1)"
                    class="progress"
                    :show-text="false"
                  />
                  <span class="amount-face">{{ item.type === 'amount' ? '¥' : '' }} {{ item.amountFace }}</span>
                </div>
              </el-tooltip>
              <div
                :class="[radio === index ? 'check-radio' : 'uncheck-radio']"
                @click="onClickChangeRadio(index)"
              />
            </div>
          </div>
          <div class="right">
            <div class="tip">
              <span class="dot-blue" />{{ lineOption.series[1].name }}
              <span class="dot-green" />{{ lineOption.series[0].name }}
              <div class="change-btn" style="cursor: pointer;" @click="onClickChangeArts">
                <img :src="toggleImg" class="change-icon" alt="图标" />
                {{ isLineShow ? '切换柱状图' : '切换折线图' }}
              </div>
            </div>
            <div class="chart-box">
              <div
                ref="echarts"
                class="chart-panel"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <search
      v-if="hasPermission('regionTradeRatio') || hasPermission('industryTradeRatio')"
      :is-show-all="true"
      :form-base-data="searchConfig2.formData"
      @search="search2"
      @dataSelect="handleDataSelect2"
    />
    <div class="pie-box">
      <template
        v-for="(item, index) in pieList"
      >
        <div
          v-if="hasPermission(item.permission)"
          :key="index"
          class="pie-item"
        >
          <dataItem
            :radio="item.radio"
            :title="item.title"
            :pie-option="pieOptionList[index]"
            :piw-ref-name="`echartsPie${index}`"
            :data-list="item.dataList"
            :is-show-pie="true"
            @radioChange="radioChange"
          />
        </div>
      </template>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="500px">
      <div class="draw-title">权限设置</div>
      <div class="draw-content">
        <div class="draw-wran">
          <div class="draw-wranleft">
            <span>i</span>
            <span>涉及各个平台，可定制为自己品牌的logo强化品牌形象</span>
          </div>
          <img src="../../assets/img/cancle.png" alt="图标" />
        </div>
        <div class="draw-checkbox">
          <el-checkbox-group v-model="checkedSelect" @change="handleChecked">
            <el-checkbox v-for="(item, index) in checkIndex" :key="index" :label="item.value">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="bottom-btn">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div class="btn">
            <button @click="saveUserDiagrams">确定</button>
            <button @click="cancleClose">取消</button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import api from "@/api/api_dataMarket";
import dataItem from "./components/dataItem.vue";
import search from "@/components/search/search.vue";
import { FORM_CONFIG, FORM_CONFIG2 } from "./formConfig/dataViewSearch";
import { lineOption, barOption, pieOptionList } from "./echartsConfig/transactionDataEcharts";
import smileImg from "@/assets/img/smile.png";
import toggleImg from "@/assets/img/toggle.png";
import {mapActions} from "vuex";
var colors = ['#00a1ff', '#37cbcb', '#fad337', '#f2637b', '#975fe4']
export default {
  name: "TransactionData",
  components: { search, dataItem },
  data() {
    return {
      pagePermission: [],
      checkedSelect: [],
      checkIndex: [
        {
          label: '交易趋势',
          value: "tradeTrend"
        }, {
          label: '大区交易占比',
          value: 'regionTradeRatio'
        }, {
          label: '行业交易占比',
          value: 'industryTradeRatio'
        }
      ],
      drawer: false,
      smileImg: smileImg,
      toggleImg: toggleImg,
      searchConfig: FORM_CONFIG,
      searchConfig2: FORM_CONFIG2,
      searchMaxHeight: "380",
      activeIndex: "1",
      payWay: "all",
      radio: 0,
      isLineShow: true,
      pieList: [
        {
          title: '大区交易占比',
          permission: 'regionTradeRatio',
          radio: {
            radio: "0",
            key: 'region',
            val: '0',
            namelist: [
              { name: "交易额", label: "0" },
              { name: "交易笔数", label: "1" }
            ]
          },
          dataList: []
        },
        {
          title: '行业交易占比',
          permission: 'industryTradeRatio',
          radio: {
            radio: "0",
            key: 'industry',
            val: '0',
            namelist: [
              { name: "交易额", label: "0" },
              { name: "交易笔数", label: "1" }
            ]
          },
          dataList: []
        }
      ], //  大区交易占比,行业占比数据
      myChart: null,
      tradeByTypeData: {
        alipayFaceAmount: null,
        alipayFaceAmountRatio: null,
        alipayFaceCount: null,
        alipayFaceCountRatio: null,
        alipayTradeAmount: null,
        alipayTradeCount: null,
        cloudPayFaceAmount: null,
        cloudPayFaceAmountRatio: null,
        cloudPayFaceCount: null,
        cloudPayFaceCountRatio: null,
        cloudPayTradeAmount: null,
        cloudPayTradeCount: null,
        faceAmount: null,
        faceAmountRatio: null,
        faceCount: null,
        faceCountRatio: null,
        map: null,
        tradeAmount: null,
        tradeCount: null,
        unionpayTradeAmount: null,
        unionpayTradeCount: null,
        wechatFaceAmount: null,
        wechatFaceAmountRatio: null,
        wechatFaceCount: null,
        wechatFaceCountRatio: null,
        wechatTradeAmount: null,
        wechatTradeCount: null
      },
      regionDataList: [], // 大区交易占比数据
      industryDataList: [], //  行业交易占比数据
      ruleForm: {},
      ruleForm2: {}
    };
  },
  computed: {
    isIndeterminate() {
      return (this.checkedSelect.length > 0 && this.checkedSelect.length < 3);
    },
    checkAll: {
      get() {
        return this.checkedSelect.length === 3;
      },
      set(val) {}
    },
    // 计算订单交易额及订单笔数
    amountList() {
      const statisticsMaps = new Map([
        ['all', {
          amountAll: this.tradeByTypeData.tradeAmount,
          amountFace: this.tradeByTypeData.faceTradeAmount,
          faceAmountRatio: this.tradeByTypeData.faceAmountRatio,
          countAll: this.tradeByTypeData.tradeCount,
          countFace: this.tradeByTypeData.faceCount,
          faceCountRatio: this.tradeByTypeData.faceCountRatio
        }],
        ['wxpay', {
          amountAll: this.tradeByTypeData.wechatTradeAmount,
          amountFace: this.tradeByTypeData.wechatFaceTradeAmount,
          faceAmountRatio: this.tradeByTypeData.wechatFaceAmountRatio,
          countAll: this.tradeByTypeData.wechatTradeCount,
          countFace: this.tradeByTypeData.wechatFaceCount,
          faceCountRatio: this.tradeByTypeData.wechatFaceCountRatio
        }],
        ['alipay', {
          amountAll: this.tradeByTypeData.alipayTradeAmount,
          amountFace: this.tradeByTypeData.alipayFaceTradeAmount,
          faceAmountRatio: this.tradeByTypeData.alipayFaceAmountRatio,
          countAll: this.tradeByTypeData.alipayTradeCount,
          countFace: this.tradeByTypeData.alipayFaceCount,
          faceCountRatio: this.tradeByTypeData.alipayFaceCountRatio
        }],
        ['yunshan', {
          amountAll: this.tradeByTypeData.cloudPayTradeAmount,
          amountFace: this.tradeByTypeData.cloudPayFaceAmount,
          faceAmountRatio: this.tradeByTypeData.cloudPayFaceAmountRatio,
          countAll: this.tradeByTypeData.cloudPayTradeCount,
          countFace: this.tradeByTypeData.cloudPayFaceCount,
          faceCountRatio: this.tradeByTypeData.cloudPayFaceCountRatio
        }],
        ['yinlian', {
          amountAll: this.tradeByTypeData.unionpayTradeAmount,
          amountFace: null,
          faceAmountRatio: null,
          countAll: this.tradeByTypeData.unionpayTradeCount,
          countFace: null,
          faceCountRatio: null
        }],
        ['default', {
          amountAll: this.tradeByTypeData.tradeAmount,
          amountFace: this.tradeByTypeData.faceTradeAmount,
          faceAmountRatio: this.tradeByTypeData.faceAmountRatio,
          countAll: this.tradeByTypeData.tradeCount,
          countFace: this.tradeByTypeData.faceCount,
          faceCountRatio: this.tradeByTypeData.faceCountRatio
        }]
      ])
      const statistics = statisticsMaps.get(this.payWay) || statisticsMaps.get('default')
      return [
        {
          title: "订单总交易额",
          amountAll: this.$g.utils.AccMul(statistics.amountAll),
          amountFace: this.$g.utils.AccMul(statistics.amountFace),
          tooltip: `刷脸交易额占比：${this.$g.utils.AccMul(statistics.faceAmountRatio)}%`,
          ratio: this.$g.utils.AccMul(statistics.faceAmountRatio),
          type: 'amount'
        },
        {
          title: "订单总交易笔数",
          amountAll: this.$g.utils.AccMul(statistics.countAll),
          amountFace: this.$g.utils.AccMul(statistics.countFace),
          tooltip: `刷脸交易额占比：${this.$g.utils.AccMul(statistics.faceCountRatio)}%`,
          ratio: this.$g.utils.AccMul(statistics.faceCountRatio),
          type: 'count'
        }
      ]
    },
    seriesData() {
      const map = this.tradeByTypeData.map;
      const seriesDataMaps = new Map([
        ['all', {tradeAmountArr: map.tradeAmount, faceAmoutArr: map.faceAmountArr, tradeCountArr: map.tradeCount, faceCountArr: map.faceCountArr}],
        ['wxpay', {tradeAmountArr: map.wechatTradeAmount, faceAmoutArr: map.wechatFaceTradeAmountArr, tradeCountArr: map.wechatTradeCount, faceCountArr: map.wechatFaceTradeCountArr}],
        ['alipay', {tradeAmountArr: map.alipayTradeAmount, faceAmoutArr: map.alipayFaceTradeAmountArr, tradeCountArr: map.alipayTradeCount, faceCountArr: map.alipayFaceTradeCountArr}],
        ['yunshan', {tradeAmountArr: map.cloudPayTradeAmount, faceAmoutArr: map.cloudPayFaceAmountArr, tradeCountArr: map.cloudPayTradeCount, faceCountArr: map.cloudPayFaceCountArr}],
        ['yinlian', {tradeAmountArr: map.unionpayTradeAmount, faceAmoutArr: [], tradeCountArr: map.unionpayTradeCount, faceCountArr: []}],
        ['default', {tradeAmountArr: map.tradeAmount, faceAmoutArr: map.faceAmountArr, tradeCountArr: map.tradeCount, faceCountArr: map.faceCountArr}]
      ])
      return seriesDataMaps.get(this.payWay) || seriesDataMaps.get('default');
    },
    echartOption() {
      const option = {
        xAxis: [
          {
            data: []
          }
        ],
        series: [
          {
            name: "订单总交易额",
            data: []
          },
          {
            name: "刷脸总交易额",
            data: []
          }
        ]
      }
      if (!this.tradeByTypeData.map) {
        return option;
      }
      option.xAxis[0].data = this.tradeByTypeData.map;
      if (this.radio === 0) {
        option.series[1].data = this.seriesData.tradeAmountArr.map($item => {
          if (this.$g.utils.isNull($item)) return 0;
          else return $item
        })
        option.series[0].data = this.seriesData.faceAmoutArr.map($item => {
          if (this.$g.utils.isNull($item)) return 0;
          else return $item
        })
        option.series[1].name = '订单总交易额'
        option.series[0].name = '刷脸总交易额'
      } else {
        option.series[1].data = this.seriesData.tradeCountArr.map($item => {
          if (this.$g.utils.isNull($item)) return 0;
          else return $item
        })
        option.series[0].data = this.seriesData.faceCountArr.map($item => {
          if (this.$g.utils.isNull($item)) return 0;
          else return $item
        })
        option.series[1].name = '订单总交易笔数'
        option.series[0].name = '刷脸总交易笔数'
      }
      return option;
    },
    // 折线图配置
    lineOption() {
      lineOption.xAxis[0].data = this.echartOption.xAxis[0].data;
      lineOption.series[0].data = this.echartOption.series[0].data;
      lineOption.series[1].data = this.echartOption.series[1].data;
      lineOption.series[0].name = this.echartOption.series[0].name
      lineOption.series[1].name = this.echartOption.series[1].name
      return lineOption;
    },
    // 柱状图配置
    barOption() {
      barOption.xAxis[0].data = this.echartOption.xAxis[0].data;
      barOption.series[0].data = this.echartOption.series[0].data;
      barOption.series[1].data = this.echartOption.series[1].data;
      barOption.series[0].name = this.echartOption.series[0].name
      barOption.series[1].name = this.echartOption.series[1].name
      return barOption;
    },
    // 饼状图配置
    pieOptionList() {
      const that = this;
      const pieDataList = [
        {title: '大区占比', seriesData: []},
        {title: '行业占比', seriesData: []}
      ];
      this.pieList.forEach(($item, $index) => {
        mapPieData($item.radio.val, $index)
        if ($item.radio.val === '0') {
          pieDataList[$index].title = '交易额' + pieDataList[$index].title;
        } else {
          pieDataList[$index].title = '交易笔数' + pieDataList[$index].title;
        }
        $item.dataList = pieDataList[$index].seriesData.map($data => {
          return {
            title: $data.name,
            color: $data.itemStyle.color,
            perc: that.$g.utils.AccMul($data.value) + '%'
          }
        })
      })
      return pieOptionList.map((item, index) => {
        item.title.text = pieDataList[index].title;
        item.series[0].name = pieDataList[index].title;
        item.series[0].data = pieDataList[index].seriesData;
        return item;
      });
      // 筛选绘图数据
      function mapPieData($key, $index) {
        let dataList = []
        if ($index === 0) {
          dataList = that.regionDataList
        } else {
          dataList = that.industryDataList
        }
        if (that.$g.utils.isArr(dataList) && dataList.length > 0) {
          pieDataList[$index].seriesData = dataList.map((item, idx) => {
            return {
              value: $key === '0' ? that.$g.utils.AccMul(item.tradeAmountRatio) : that.$g.utils.AccMul(item.tradeCountRatio),
              name: $index === 0 ? item.regionName : item.categoryName,
              itemStyle: {color: colors[idx]}
            }
          })
        } else {
          pieDataList[$index].seriesData = [];
        }
      }
    }
  },
  mounted() {
    this.init();
    this.queryInit();
  },
  methods: {
    ...mapActions(['setLabelList', 'setRegionList', 'setUserList']),
    queryInit() {
      api.queryInit().then(res => {
        const labelList = res.data.labelList.map($ele => {
          return {
            label: $ele.name,
            value: $ele.id
          }
        })
        const regionList = res.data.regionSetList.map($ele => {
          return {
            label: $ele.regionName,
            value: $ele.regionCode
          }
        })
        const userList = res.data.userDTOList.map($ele => {
          return {
            label: $ele.jobName || $ele.name,
            value: $ele.id
          }
        })
        this.setLabelList(labelList)
        this.setRegionList(regionList)
        this.setUserList(userList)
      })
    },
    init() {
      this.queryUserDiagram();
    },
    radioChange($value, $key) {
      const that = this;
      if ($key === 'region') {
        region()
      } else if ($key === 'industry') {
        industry()
      } else {
        region();
      }
      function region() {
        that.pieList[0].radio.val = $value;
      }
      function industry() {
        that.pieList[1].radio.val = $value;
      }
    },
    handleCheckAllChange() {
      if (this.checkedSelect.length < 3) {
        this.checkedSelect = this.checkIndex.map(item => {
          return item.value;
        })
      } else {
        this.checkedSelect = [];
      }
    },
    handleChecked() {},
    queryUserDiagram() {
      api.queryUserDiagram('deal').then(res => {
        this.pagePermission = this.$g.utils.isArr(res.data) ? res.data : [];
        this.search();
        this.search2();
      })
    },
    showRightbar() {
      this.checkedSelect = this.pagePermission;
      this.drawer = true
    },
    // 是否有模块权限
    hasPermission($permission) {
      return this.pagePermission.filter(item => $permission === item).length > 0
    },
    saveUserDiagrams() {
      api.saveUserDiagrams({
        diagramType: 'deal',
        diagrams: this.checkedSelect.join(',')
      }).then(res => {
        this.queryUserDiagram();
        this.drawer = false;
      })
    },
    cancleClose() {
      this.drawer = false
    },
    // 各支付方式的总交易额/交易笔数
    queryTradeByType($ruleForm) {
      if (!this.hasPermission('tradeTrend')) return;
      api
        .queryTradeByType({
          beginDate: $ruleForm.date ? $ruleForm.date[0] : '',
          endDate: $ruleForm.date ? $ruleForm.date[1] : '',
          agentGrade: $ruleForm.agentGrade,
          provinceCode: $ruleForm.area ? $ruleForm.area[0] : '',
          cityCode: $ruleForm.area ? $ruleForm.area[1] : '',
          operationId: $ruleForm.operationId || '',
          regionCode: $ruleForm.regionCode || '',
          positionLabelId: $ruleForm.positionLabelId || ''
        })
        .then(res => {
          this.tradeByTypeData = res.data;
          this.drawEcharts();
        })
    },
    handleDataSelect($time) {
      this.$nextTick(() => {
        this.search({date: $time})
      })
    },
    // 第一行第二个饼图切换
    handleDataSelect2($time) {
      this.$nextTick(() => {
        this.search2({date: $time})
      })
    },
    onClickChangeArts() {
      this.isLineShow = !this.isLineShow;
      this.drawEcharts();
    },
    onClickChangeRadio($index) {
      this.radio = $index;
      this.drawEcharts();
    },
    // 绘制图表
    drawEcharts() {
      const that = this;
      const canvasId = this.$refs.echarts.getAttribute('_echarts_instance_') // 判断是否为同一实例画板
      if (!this.myChart || this.myChart.id !== canvasId) {
        this.myChart = this.$echarts.init(this.$refs.echarts);
      }

      // 判断折线图或柱状图
      if (this.isLineShow) {
        this.myChart.setOption(this.lineOption);
      } else {
        this.myChart.setOption(this.barOption);
      }
      window.addEventListener("resize", function() {
        that.myChart.resize();
      });
    },
    search($ruleForm) {
      if ($ruleForm) {
        this.ruleForm = $ruleForm;
      }
      if (JSON.stringify(this.ruleForm) === "{}") return;
      this.queryTradeByType(this.ruleForm);
    },
    search2($ruleForm) {
      if ($ruleForm) {
        this.ruleForm2 = {
          beginDate: $ruleForm.date[0] || '',
          endDate: $ruleForm.date[1] || ''
        }
      }
      if (JSON.stringify(this.ruleForm2) === "{}") return;
      if (this.hasPermission('regionTradeRatio')) {
        api.tradeDataQueryRegionTradeSummaryByCondition(this.ruleForm2).then(res => {
          this.regionDataList = this.$g.utils.isArr(res.data) ? res.data : [];
        })
      }
      if (this.hasPermission('industryTradeRatio')) {
        api.queryCategoryIndustryByCondition(this.ruleForm2).then(res => {
          this.industryDataList = this.$g.utils.isArr(res.data) ? res.data : [];
        })
      }
    },
    handleSelect($index) {
      switch ($index) {
        case "1":
          this.payWay = "all";
          break;
        case "2":
          this.payWay = "wxpay";
          break;
        case "3":
          this.payWay = "alipay";
          break;
        case "4":
          this.payWay = "yunshan";
          break;
        case "5":
          this.payWay = "yinlian";
          break;
        default:
          this.payWay = "all";
      }
      this.drawEcharts();
    }
  }
};
</script>

<style lang="scss" scoped>
.p-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #ffffff;
  height: 76px;
  .right-area {
    display: flex;
    align-items: center;
    height: 76px;
    line-height: 24px;
    color: #1989FA;
    font-size: 14px;
    img {
      display: block;
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }
}
.d-box {
  margin: 24px;
  padding: 0 24px;
  overflow: hidden;
  background: #fff;
  .echarts-box {
    display: flex;
    border-radius: 2px;
    margin-top: 22px;
    justify-content: space-around;
    .right {
      width: 75%;
      .tip {
        margin-left: 35px;
      }
      .change-btn {
        float: right;
        color: #1989fa;
        line-height: 22px;
        position: relative;
        top: -3px;
        right: 32px;
      }
      .change-icon {
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
    }
    .chart-box {
      width: 100%;
      height: 301px;
      position: relative;
      .chart-panel {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      .chart-show {
        z-index: 1;
      }
      .chart-hide {
        z-index: -1;
      }
    }
    .data-box {
      width: 20%;
    }
    .data-item {
      position: relative;
      min-width: 205px;
      height: 146px;
      border-radius: 4px;
      border: 1px solid rgba(235, 238, 245, 1);
      padding: 12px 10px;
      &:last-child {
        margin-top: 25px;
        margin-bottom: 28px;
      }
      .data-img {
        width: 20px;
        height: 20px;
      }
      .title {
        padding-left: 6px;
        color: rgba(144, 147, 153, 1);
        line-height: 22px;
      }
      .progress-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 16px;
        .progress {
          margin-left: 8px;
          flex-basis: 58px;
        }
        .amount-face {
          margin-left: 8px;
        }
      }
      .amount-all {
        padding-left: 6px;
        margin-top: 8px;
        font-size: 30px;
        font-family: HelveticaNeue;
        color: rgba(51, 51, 53, 1);
        line-height: 24px;
        padding-bottom: 24px;
        border-bottom: 1px #ebeef5 solid;
        .amount-icon {
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
    .dot-blue {
      display: inline-block;
      margin-right: 8px;
      width: 6px;
      height: 6px;
      background: #1989fa;
      border-radius: 50%;
      vertical-align: middle;
    }
    .dot-green {
      display: inline-block;
      margin-left: 30px;
      margin-right: 8px;
      width: 6px;
      height: 6px;
      background: #3abd2d;
      border-radius: 50%;
      vertical-align: middle;
    }
    .check-radio {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 14px;
      height: 14px;
      background: #ffffff;
      border: 5px solid #1989fa;
      border-radius: 50%;
    }
    .uncheck-radio {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 14px;
      height: 14px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #d5d8de;
      border-radius: 50%;
    }
  }
}
.pie-box {
  overflow: hidden;
  margin: 24px;
  display: flex;
  justify-content: space-between;
  .pie-item {
    width: 50%;
    background: #fff;
    &:nth-child(even) {
      margin-left: 24px;
    }
  }
}
.draw-title {
  width: 100%;
  height: 76px;
  border-bottom: 1px solid #EBEEF5;
  padding-left: 24px;
  line-height: 76px;
  font-size: 20px;
  font-weight: 500;
  color: #333335;
}
.draw-content {
  width: 100%;
  height: 100%;
  padding: 118px 32px 0 32px;
  position: relative;
  top: -76px;
  left: 0;
  .draw-wran {
    width: 100%;
    background: #E6F7FF;
    border: 1px solid #91D5FF;
    border-radius: 2px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 9px 0 16px;
    margin-bottom: 45px;
    .draw-wranleft {
      display: flex;
      height: 40px;
      align-items: center;
      span:nth-child(1) {
        display: block;
        width: 14px;
        height: 14px;
        color: #ffffff;
        background: #1890FF;
        border-radius: 50%;
        font-size: 12px;
        text-align: center;
        line-height: 14px;
        margin-right: 8px;
      }
      span:nth-child(2) {
        color: #000000;
        font-size: 14px;
      }
    }
    img {
      display: block;
      width: 10px;
      height: 10px;
    }
  }
  .bottom-btn {
    display: flex;
    align-items: center;
    padding-left: 36px;
    width: 100%;
    height: 92px;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid #EBEEF5;
    .btn {
      width: 300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      button:nth-child(1) {
        width: 114px;
        height: 40px;
        color: #ffffff;
        background: #1989FA;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
      }
      button:nth-child(2) {
        width: 114px;
        height: 40px;
        color: #606266;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #C7C8CD;
      }
    }
  }
}
</style>
