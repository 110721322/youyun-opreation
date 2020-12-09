<template>
  <div>
    <div class="p-head">
      <span class="left-title">商户数据</span>
      <div class="right-area" @click="clickShowRightbar">
        <img src="../../assets/img/menu_icon.png" alt="图标" />
        <span>自定义设置</span>
      </div>
    </div>
    <search
      v-if="hasPermission('merchantCount') || hasPermission('merchantRegionRatio') || hasPermission('merchantIndustryRatio')
        || hasPermission('merchantAverageTrend') || hasPermission('merchantAmountRank') || hasPermission('merchantAverageRatio')"
      :is-show-all="true"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @dataSelect="handleDataSelect"
      @search="search"
    />
    <template v-if="hasPermission('merchantCount')">
      <div class="title2">新增商户数分布</div>
      <div class="map-box">
        <div class="chart-box">
          <div ref="echartsMap" class="chart-panel"></div>
        </div>
        <div class="data-box">
          <div class="data-title">
            新增商户数省份排行榜
            <span class="all-num">共{{ mapData.length }}个</span>
          </div>
          <div v-for="(item,index) in mapData" :key="index" class="data-item">
            <div class="data-left">
              <span :class="['index',index<=2?'hightlight':'normal']">{{ index+1 }}</span>
              {{ item.name }}
            </div>
            <div class="data-right">
              <span>{{ item.count }}</span> |
              <span class="perc">{{ item.ratio }}%</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="pie-box">
      <template v-for="(item, index) in pieList">
        <div v-if="hasPermission(item.permission)" :key="index" class="pie-item">
          <dataItem
            :radio="item.radio"
            :title="item.title"
            :pie-option="pieOptionList[index]"
            :piw-ref-name="`echartsPie${index}`"
            :data-list="item.dataList"
            :is-show-pie="true"
            @radioChange="handleRegionRadioChange"
          />
        </div>
      </template>
    </div>
    <template v-if="hasPermission('merchantAverageTrend')">
      <div class="title">商户平均交易额走势</div>
      <div class="trend-box">
        <div class="chart-box">
          <div ref="echartsLine" class="chart-panel"></div>
        </div>
      </div>
    </template>
    <div class="pie-box">
      <div v-if="hasPermission('merchantAmountRank')" class="pie-item">
        <dataItem
          :radio="tradeRankRadio"
          :is-show-table="true"
          :title="'总交易额排行榜'"
          :is-show-more="true"
          :config-data="tableConfigData3"
          :permission="tableConfigData3.permission"
          :item-test-data="tradeRank"
          :is-show-line="false"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @showMore="handleShowMore('tradeAmount')"
          @radioChange="handleRegionRadioChange"
        ></dataItem>
      </div>
      <div v-if="hasPermission('merchantAverageRatio')" class="pie-item">
        <dataItem
          :radio="averagePieRadio.radio"
          :title="averagePieRadio.title"
          :pie-option="averagePieOption"
          :piw-ref-name="`echartsPie3`"
          :data-list="averagePieRadio.dataList"
          :is-show-pie="true"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @radioChange="handleRegionRadioChange"
        />
      </div>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="500px">
        <div class="draw-title">权限设置</div>
        <div class="draw-content">
          <div class="draw-wran">
            <div class="draw-wranleft">
              <span>i</span>
              <span>该功能用于配置服务商数据页面的图表</span>
            </div>
            <img src="../../assets/img/cancle.png" alt="图标" />
          </div>
          <div class="draw-checkbox">
            <el-checkbox-group v-model="checkedSelect" @change="changeChecked">
              <el-checkbox v-for="(item, index) in checkIndex" :key="index" :label="item.value">{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="bottom-btn">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="changeCheckAll">全选</el-checkbox>
            <div class="btn">
              <button @click="clickSaveUserDiagrams">确定</button>
              <button @click="clickCancleClose">取消</button>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_dataMarket";
import dataItem from "./components/dataItem.vue";
import search from "@/components/search/search.vue";
import {
  MERCHANTDATACONFIG3
} from "./tableConfig/merchantDataConfig";
import { FORM_CONFIG2 } from "./formConfig/dataViewSearch";
import { mapOption, pieOptionList, averagePieOption, lineOption } from "./echartsConfig/merchantDataEcharts";
import { pieList, tradeRankRadio, averagePieRadio } from "./radioConfig/merchantDataRadio";
import echarts from "echarts";
import "./../../libs/kit/china";
import areaData from "../../assets/data/areaData";
import provinceData from "../../assets/data/provinceData";
var colors = ['#00a1ff', '#37cbcb', '#fad337', '#f2637b', '#975fe4']

export default {
  name: "MerchantData",
  components: {
    search,
    dataItem
  },
  data() {
    return {
      pagePermission: [],
      checkedSelect: [],
      checkIndex: [
        {
          label: '新增商户数分布',
          value: "merchantCount"
        }, {
          label: '大区占比',
          value: 'merchantRegionRatio'
        }, {
          label: '行业占比',
          value: 'merchantIndustryRatio'
        }, {
          label: '商户平均交易额走势',
          value: 'merchantAverageTrend'
        }, {
          label: '总交易额排行榜',
          value: 'merchantAmountRank'
        }, {
          label: '平均交易笔数分布',
          value: 'merchantAverageRatio'
        }
      ],
      drawer: false,
      mapData: [],
      regionDataList: [], //  商户数大区占比数据
      industryDataList: [], // 商户数行业占比数据
      averageDataList: [], // 平均交易笔数数据
      searchConfig: FORM_CONFIG2,
      searchMaxHeight: "300",
      tradeRank: [],
      tableConfigData3: MERCHANTDATACONFIG3,
      pieList: pieList, //  大区交易占比,行业占比数据
      mapOption: mapOption,
      tradeRankRadio: tradeRankRadio,
      averagePieRadio: averagePieRadio,
      lineOption: lineOption,
      ruleForm: {},
      echartsMap: null,
      myChartLine: null
    };
  },
  computed: {
    isIndeterminate() {
      return (this.checkedSelect.length > 0 && this.checkedSelect.length < 6);
    },
    checkAll: {
      get() {
        return this.checkedSelect.length === 6;
      },
      set(val) {}
    },
    // 商户大区行业占比饼状图配置
    pieOptionList() {
      const that = this;
      const pieDataList = [
        {title: '大区占比', seriesData: []},
        {title: '行业占比', seriesData: []}
      ];
      this.pieList.forEach(($item, $index) => {
        mapPieData($item.radio.val, $index)
        // 更新图表标题
        const radio = $item.radio.namelist.filter($radio => $radio.label === $item.radio.val)[0];
        pieDataList[$index].title = radio.name + pieDataList[$index].title;
        // 初始化图表文字数据
        $item.dataList = pieDataList[$index].seriesData.map($data => {
          return {
            title: $data.name,
            color: $data.itemStyle.color,
            perc: that.$g.utils.AccMul($data.value) + '%'
          }
        })
      })
      // 初始化图表绘制数据
      return pieOptionList.map((item, index) => {
        item.title.text = pieDataList[index].title;
        item.series[0].name = pieDataList[index].title;
        item.series[0].data = pieDataList[index].seriesData;
        return item;
      });
      // 筛选绘图数据
      function mapPieData($key, $index) {
        if ($index === 0) {
          if (that.$g.utils.isArr(that.regionDataList) && that.regionDataList.length > 0) {
            pieDataList[$index].seriesData = that.regionDataList.map((item, idx) => {
              return {
                value: that.$g.utils.AccMul(item.ratio),
                name: item.regionName,
                itemStyle: {color: colors[idx]}
              }
            })
          } else {
            pieDataList[$index].seriesData = [];
          }
        } else {
          if (that.$g.utils.isArr(that.industryDataList) && that.industryDataList.length > 0) {
            pieDataList[$index].seriesData = that.industryDataList.map((item, idx) => {
              return {
                value: that.$g.utils.AccMul(item.ratio),
                name: item.categoryName,
                itemStyle: {color: colors[idx]}
              }
            })
          } else {
            pieDataList[$index].seriesData = [];
          }
        }
      }
    },
    averagePieOption() {
      const that = this;
      const averagePieRadio = this.averagePieRadio
      const pieData = {title: '平均交易笔数概况', seriesData: []};

      mapPieData()
      // 更新图表标题
      const radio = averagePieRadio.radio.namelist.filter($radio => $radio.label === averagePieRadio.radio.val)[0];
      pieData.title = radio.name + pieData.title;
      // 初始化图表文字数据
      averagePieRadio.dataList = pieData.seriesData.map($data => {
        return {
          title: $data.name,
          color: $data.itemStyle.color,
          perc: that.$g.utils.AccMul($data.value) + '%'
        }
      })
      // 初始化图表绘制数据
      averagePieOption.title.text = pieData.title;
      averagePieOption.series[0].name = pieData.title;
      averagePieOption.series[0].data = pieData.seriesData;
      return averagePieOption;
      // 筛选绘图数据
      function mapPieData() {
        if (that.$g.utils.isArr(that.averageDataList) && that.averageDataList.length > 0) {
          pieData.seriesData = that.averageDataList.map((item, idx) => {
            return {
              value: that.$g.utils.AccMul(item.ratio),
              name: item.name,
              itemStyle: {color: colors[idx]}
            }
          })
        } else {
          pieData.seriesData = [];
        }
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.queryUserDiagram().then(() => {
        this.search();
      })
    },
    changeCheckAll() {
      if (this.checkedSelect.length < 6) {
        this.checkedSelect = this.checkIndex.map(item => {
          return item.value;
        })
      } else {
        this.checkedSelect = [];
      }
    },
    changeChecked() {},
    queryUserDiagram() {
      return api.queryUserDiagram('merchant').then(res => {
        this.pagePermission = this.$g.utils.isArr(res.data) ? res.data : [];
      })
    },
    clickShowRightbar() {
      this.checkedSelect = this.pagePermission;
      this.drawer = true
    },
    // 是否有模块权限
    hasPermission($permission) {
      return this.pagePermission.filter(item => $permission === item).length > 0
    },
    clickSaveUserDiagrams() {
      api.saveUserDiagrams({
        diagramType: 'merchant',
        diagrams: this.checkedSelect.join(',')
      }).then(res => {
        this.init();
        this.drawer = false;
      })
    },
    clickCancleClose() {
      this.drawer = false
    },
    // 所有切换按钮事件 新增商户/交易商户/流失商户
    handleRegionRadioChange($value, $key) {
      const that = this;
      switch ($key) {
        case 'region':
          region();
          break;
        case 'industry':
          industry();
          break;
        case 'tradeRank':
          tradeRank();
          break;
        case 'averagePie':
          averagePie();
          break;
        default:
          region();
          break;
      }
      function region() {
        that.pieList[0].radio.val = $value;
        that.selectRegionMerchantCount();
      }
      function industry() {
        that.pieList[1].radio.val = $value;
        that.selectCategoryMerchantCount();
      }
      function tradeRank() {
        that.tradeRankRadio.val = $value;
        that.queryTradeTop5ByCondition();
      }
      function averagePie() {
        that.averagePieRadio.radio.val = $value;
        that.queryTradeCountRatio();
      }
    },
    // 地图数据分布与排行榜
    merchantDataQueryAllProvinceCountAndRank() {
      if (!this.hasPermission('merchantCount')) return;
      api
        .merchantDataQueryAllProvinceCountAndRank(this.ruleForm)
        .then(res => {
          if (this.$g.utils.isArr(res.data)) {
            this.mapData = res.data.map($item => {
              areaData.forEach(($province, $index) => {
                if ($item.provinceCode === $province.value) {
                  $item.name = provinceData[$index].name
                }
              })
              $item.value = $item.count;
              return $item;
            }).sort(($ele1, $ele2) => {
              return $ele2.count - $ele1.count
            })
          } else {
            this.mapData = [];
          }
          this.initMap()
        })
    },
    // 商户数据-大区占比
    selectRegionMerchantCount() {
      if (!this.hasPermission('merchantRegionRatio')) return;
      const params = {
        type: this.pieList[0].radio.val
      };
      Object.assign(params, this.ruleForm);
      api.selectRegionMerchantCount(params)
        .then(res => {
          this.regionDataList = res.data;
        })
    },
    // 商户数据-行业占比
    selectCategoryMerchantCount() {
      if (!this.hasPermission('merchantIndustryRatio')) return;
      const params = {
        type: this.pieList[1].radio.val
      };
      Object.assign(params, this.ruleForm);
      api.selectCategoryMerchantCount(params)
        .then(res => {
          this.industryDataList = res.data;
        })
    },
    // 商户平均交易额走势折线图数据获取
    queryDailyTradeAvg() {
      if (!this.hasPermission('merchantAverageTrend')) return;
      api
        .queryDailyTradeAvg(this.ruleForm)
        .then(res => {
          this.lineOption.xAxis[0].data = this.$g.utils.isArr(res.data.dateArr) ? res.data.dateArr : [];
          this.lineOption.series[0].data = this.$g.utils.isArr(res.data.tradeAmountArr) ? res.data.tradeAmountArr : [];
          this.showLine();
        })
    },
    // 交易额排行
    queryTradeTop5ByCondition() {
      if (!this.hasPermission('merchantAmountRank')) return;
      const params = {
        type: this.tradeRankRadio.val,
        top: 6
      }
      Object.assign(params, this.ruleForm);
      api
        .queryTradeTop5ByCondition(params)
        .then(res => {
          this.tradeRank = this.$g.utils.isArr(res.data) ? res.data : [];
        })
    },
    // 平均交易笔数分布
    queryTradeCountRatio() {
      if (!this.hasPermission('merchantAverageRatio')) return;
      const params = {
        type: this.averagePieRadio.radio.val
      }
      Object.assign(params, this.ruleForm);
      api
        .queryTradeCountRatio(params)
        .then(res => {
          if (this.$g.utils.isObj(res.data)) {
            this.averageDataList = [
              {
                ratio: res.data.ratio1,
                name: "1-10笔比例"
              },
              {
                ratio: res.data.ratio2,
                name: "11-100笔比例"
              },
              {
                ratio: res.data.ratio3,
                name: "101-1000笔比例"
              },
              {
                ratio: res.data.ratio4,
                name: "1001笔以上"
              }
            ]
          } else {
            this.averageDataList = [];
          }
        })
    },
    handleDataSelect($time) {
      this.$nextTick(() => {
        this.search({
          date: $time
        })
      })
    },
    handleShowMore($sortField) {
      this.$router.push({ name: "merchantDataDetail", query: {
        sortField: $sortField || "tradeAmount"
      }});
    },
    showLine() {
      // 基于准备好的dom，初始化echarts实例
      const that = this;
      const canvasId = this.$refs.echartsLine.getAttribute('_echarts_instance_') // 判断是否为同一实例画板
      if (!this.myChartLine || this.myChartLine.id !== canvasId) {
        this.myChartLine = this.$echarts.init(this.$refs.echartsLine);
      }

      // 绘制图表
      this.myChartLine.setOption(this.lineOption);
      window.addEventListener("resize", function() {
        that.myChartLine.resize();
      });
    },
    search($ruleForm) {
      if ($ruleForm) {
        this.ruleForm = {
          beginDate: $ruleForm.date[0],
          endDate: $ruleForm.date[1]
        };
      }
      if (JSON.stringify(this.ruleForm) === "{}") return;
      this.merchantDataQueryAllProvinceCountAndRank();
      this.selectRegionMerchantCount();
      this.selectCategoryMerchantCount();
      this.queryDailyTradeAvg();
      this.queryTradeTop5ByCondition();
      this.queryTradeCountRatio();
    },
    /**
     * 数量分布地图
     */
    initMap() {
      if (!this.$refs.echartsMap) return;
      const that = this;
      const canvasId = this.$refs.echartsMap.getAttribute('_echarts_instance_') // 判断是否为同一实例画板
      this.mapOption.series[0].data = this.mapData;
      if (!this.echartsMap || this.echartsMap.id !== canvasId) {
        this.echartsMap = echarts.init(this.$refs.echartsMap);
      }
      this.echartsMap.setOption(this.mapOption);
      window.addEventListener("resize", function() {
        that.echartsMap.resize();
      });
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
.title {
  margin: 24px 24px 0;
  height: 64px;
  line-height: 64px;
  padding-left: 24px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  border-bottom: 1px solid #ebeef5;
  background-color: #ffffff;
}
.trend-box {
  display: flex;
  justify-content: space-between;
  margin: 0 24px;
  overflow: hidden;
  background-color: #ffffff;
  .chart-box {
    width: 100%;
    height: 400px;
    position: relative;
    .chart-panel {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  .data-box {
    width: 30%;
  }
}
.map-box {
  margin: 0 24px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-bottom: 1px solid #ebeef5;
  .chart-box {
    width: 70%;
    height: 429px;
    position: relative;
    .chart-panel {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  .data-box {
    width: 30%;
    height: 428px;
    padding: 28px 60px 0 0;
    overflow-y: scroll;
    .data-title {
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
      padding-bottom: 7px;
    }
    .all-num {
      color: #1989fa;
    }
    .data-item {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
    }
    .data-left {
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      .index {
        display: inline-block;
        margin-right: 24px;
        text-align: center;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
      }
      .hightlight {
        background: rgba(24, 144, 255, 1);
        color: #ffffff;
      }
      .normal {
        background: #f0f2f5;
        color: rgba(0, 0, 0, 0.65);
      }
    }
    .data-right {
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      .perc {
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
.title2 {
  margin: 24px 24px 0;
  height: 64px;
  line-height: 64px;
  padding-left: 24px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  border-bottom: 1px solid #ebeef5;
  background-color: #ffffff;
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
.draw-checkbox .el-checkbox {
  margin-bottom: 30px;
}
</style>
