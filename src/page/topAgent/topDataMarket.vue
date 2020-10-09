<template>
  <div class="container">
    <div class="p_head">
      <span class="left-title">服务商数据</span>
    </div>
    <div class="title">顶级服务商数量分布</div>
    <div class="map-box">
      <div class="chart-box">
        <div ref="echartsMap" class="chart-panel"></div>
      </div>
      <div class="data-box">
        <div class="data-title">
          省份分布排行榜
          <span class="all-num">共{{totalNum}}个</span>
        </div>
        <div v-for="(item,index) in mapData" :key="index" class="data-item">
          <div class="data-left">
            <span :class="['index',index<=2?'hightlight':'normal']">{{ index+1 }}</span>
            {{ item.name }}
          </div>
          <div class="data-right">
            <span>{{ item.topAgentNumbers }}</span> |
            <span class="perc">{{ item.percentage }}</span>
          </div>
        </div>
      </div>
    </div>
    <search
        :is-show-all="true"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
    />
    <div class="title">顶级服务商平均交易额走势</div>
    <div class="trend-box">
      <div class="chart-box">
        <div ref="echartsLine" class="chart-panel"></div>
      </div>
      <div class="data-box">
        <dataItem
            :is-show-table="true"
            :title="'总交易额排行榜'"
            :is-show-more="true"
            :config-data="tableConfigData5"
            :item-test-data="totalAmountRank"
            :is-show-line="false"
            :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
            @showMore="handleShowMore"
        ></dataItem>
      </div>
    </div>
    <div class="pie-box">
      <dataItem
          class="pie-item"
          :title="'新增商户数量排行'"
          :config-data="tableConfigData2"
          :is-show-more="true"
          :is-show-table="true"
          :item-test-data="addMerchantCount"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @showMore="handleShowMore"
      />
    </div>
  </div>
</template>
<script>
import api from "@/api/api_dataMarket";
import dataItem from "./components/dataItem.vue";
import search from "@/components/search/search.vue";
import areaData from "../../assets/data/areaData";
import provinceData from "../../assets/data/provinceData";
import {
  MERCHANTDATACONFIG1,
  MERCHANTDATACONFIG2,
  MERCHANTDATACONFIG3,
  MERCHANTDATACONFIG4,
  MERCHANTDATACONFIG5
} from "./../dataMarket/tableConfig/serviceDataConfig";
import { FORM_CONFIG2 } from "./../dataMarket/formConfig/dataViewSearch";
import echarts from "echarts";
import "./../../libs/kit/china";
export default {
  name: "TopDataMarket",
  components: {
    search,
    dataItem
  },
  data() {
    return {
      totalNum: 0,
      drawer: false,
      queryParams: {
        beginDate: null,
        endDate: null
      },
      mapData: [],
      searchConfig: FORM_CONFIG2,
      searchMaxHeight: "300",
      testData: [],
      addMerchantCount: [],
      testData3: [],
      testData4: [],
      totalAmountRank: [],
      tableConfigData: MERCHANTDATACONFIG1,
      tableConfigData2: MERCHANTDATACONFIG2,
      tableConfigData3: MERCHANTDATACONFIG3,
      tableConfigData4: MERCHANTDATACONFIG4,
      tableConfigData5: MERCHANTDATACONFIG5,
      pieStyle: {
        width: "200px",
        height: "250px"
      },
      averageList: [],
      lineOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          formatter: "{b0}<br />{a0}: ¥ {c0}"
        },
        grid: {
          top: "50",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "商户平均交易额",
            type: "line",
            lineStyle: {
              color: "#1890FF"
            },
            // symbol: "none",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4EA6FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffffff" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            itemStyle: {
              normal: {
                color: "#1890FF",
                lineStyle: {
                  color: "#1890FF"
                }
              }
            },
            data: []
          }
        ],
        beforeRouterPromise: null
      }
    };
  },
  mounted() {
    // 获取数据
    this.queryTopAgentNumber();
    this.search();
  },
  beforeRouteUpdate(to, from, next) {
    if (from.meta.refreshDom) {
      this.beforeRouterPromise = Promise.resolve(1);
    }
    next()
  },
  updated() {
    if (this.$g.utils.isPromise(this.beforeRouterPromise)) {
      this.beforeRouterPromise.then(() => {
        this.initMap();
        this.drawLine();
        this.beforeRouterPromise = null;
      })
    }
  },
  methods: {
    handleCheckAllChange() {},
    handleChecked() {},
    showRightbar() {
      this.drawer = true
    },
    cancleClose() {
      this.drawer = false
    },
    // 新增商户数量排行
    queryListByNewMerchantCount() {
      api.queryListByNewMerchantCount(this.queryParams).then(res => {
        this.addMerchantCount = res.object;
      }).catch(err => {
        this.$message(err);
      });
    },
    // 服务商平均交易额走势
    queryTradeAverageList() {
      api.queryTradeAverageList(this.queryParams).then(res => {
        this.averageList = res.object;
        this.drawLine()
      }).catch(err => {
        this.$message(err);
      });
    },
    // 总交易排行榜
    queryListByTurnover() {
      api.queryListByTurnover(this.queryParams).then(res => {
        this.totalAmountRank = res.object;
      }).catch(err => {
        this.$message(err);
      });
    },
    handleShowMore() {
      this.$router.push({ name: "topAgentData" });
    },
    search($ruleForm = {date: [this.$g.utils.getToday(), this.$g.utils.getToday(0)]}) {
      Object.assign(this.queryParams, {beginDate: $ruleForm.date[0], endDate: $ruleForm.date[1]});
      this.queryListByTurnover();
      this.queryTradeAverageList();
      this.queryListByNewMerchantCount();
    },
    queryTopAgentNumber() {
      api.queryTopAgentNumber().then(res => {
        if (res.object.length > 0) {
          var total = 0
          for (let i = 0; i < res.object.length; i++) {
            total += res.object[i].topAgentNumbers
          }
          this.totalNum = total
        }
        this.mapData = res.object.map($item => {
          areaData.forEach(($province, $index) => {
            if ($item.provinceCode === $province.value) {
              $item.name = provinceData[$index].name
            }
          })
          $item.value = $item.topAgentNumbers;
          return $item;
        }).sort(($ele1, $ele2) => {
          return $ele2.topAgentNumbers - $ele1.topAgentNumbers
        })
        this.initMap()
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      if (!this.$refs.echartsLine) return;
      const myChartLine = this.$echarts.init(this.$refs.echartsLine);
      // // 绘制图表
      this.lineOption.xAxis[0].data = this.averageList.map($item => { return $item.tradeDate; })
      this.lineOption.series[0].data = this.averageList.map($item => { return $item.tradeAverage; })
      myChartLine.setOption(this.lineOption);
      window.addEventListener("resize", function() {
        myChartLine.resize();
      });
    },
    /**
     * 顶级服务商数量分布地图
     */
    initMap() {
      if (!this.$refs.echartsMap) return;
      const myChart = echarts.init(this.$refs.echartsMap);
      window.onresize = myChart.resize;
      myChart.setOption({
        tooltip: {
          triggerOn: "mousemove"
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 56,
          bottom: 40,
          showLabel: !0,
          text: ["高", "低"],
          pieces: [
            {
              gt: 100,
              label: "> 100 人",
              color: "#0050B3"
            },
            {
              gte: 10,
              lte: 100,
              label: "10 - 100 人",
              color: "#1890FF"
            },
            {
              gte: 1,
              lt: 10,
              label: "1 - 9 人",
              color: "#69C0FF"
            },
            {
              gt: 0,
              lt: 1,
              label: "1",
              color: "#BAE7FF"
            },
            {
              value: 0,
              color: "#E1E9F0"
            }
          ],
          show: !0
        },
        geo: {
          map: "china",
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.2,
          top: 45,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: "#fff",
              textStyle: {
                show: false
              }
            },

            emphasis: {
              areaColor: "#FAD337",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: "商户数量",
            type: "map",
            geoIndex: 0,
            data: this.mapData
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .p_head {
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
  .service-box {
    margin: 0 24px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    overflow: hidden;
    .pie-item2 {
      width: 33%;
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
      width: 70%;
      height: 470px;
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
      padding: 28px 60px 0 0;
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
