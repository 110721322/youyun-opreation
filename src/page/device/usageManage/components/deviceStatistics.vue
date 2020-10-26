<template>
  <div class>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      :is-show-all="true"
      :begin-date="beginDate"
      :end-date="endDate"
      @search="search"
    />
    <div v-if="deviceListData.length > 0" class="device-list">
      <deviceList
        :device-list-data="deviceListData"
        :show-expand-btn="showExpandBtn"
        @province="handleProvince"
      ></deviceList>
    </div>
    <div class="title">全国主要省份设备使用数量</div>
    <div class="map-box">
      <div class="chart-box">
        <div ref="echartsMap" class="chart-panel"></div>
      </div>
      <div class="data-box">
        <div class="data-title">省份分布排行榜</div>
        <div v-for="(item,index) in mapData" :key="index" class="data-item">
          <div class="data-left">
            <span :class="['index',index<=2?'hightlight':'normal']">{{ index+1 }}</span>
            {{ item.provinceName }}
          </div>
          <div class="data-right">
            <span>{{ item.usingCount? '(' + item.usingCount + ')': '(0)' }}</span> |
            <span class="perc">{{ item.deviceProportionPecent }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="data_box">
      <dataItem :radio="radioListData[0]" :title="titleList[0]" @radioChange="handleNumRadioChange"></dataItem>

      <div class="content-box">
        <div class="left">
          <dotTip :config-data="dotTipData"></dotTip>
          <div class="chart-box">
            <div ref="echartsBar" class="chart-panel"></div>
          </div>
        </div>
        <div class="right">
          <div class="detail-box">
            <div v-for="(item,index) in detailTitle" :key="'title'+index" class="detail-item">
              <div class="title-item">
                <span v-if="item.hasDot" class="dot" :style="{backgroundColor:item.dotColor}"></span>
                {{ item.label }}
              </div>
              <div
                v-for="(item1,index1) in detailData"
                :key="index1"
                class="data-item"
              ><el-tooltip class="item" effect="dark" :content="(item1[item.prop]? (item1[item.prop].toString()): '0')" placement="top"><span>{{ item1[item.prop]? item1[item.prop]: '0' }}</span></el-tooltip></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data_box">
      <dataItem
        :radio="radioListData[1]"
        :title="titleList[1]"
        @radioChange="handleTradeRadioChange"
      ></dataItem>

      <div class="content-box">
        <div class="left">
          <dotTip :config-data="dotTipData2"></dotTip>
          <div class="chart-box">
            <div ref="echartsBar2" class="chart-panel"></div>
          </div>
        </div>
        <div class="right">
          <div class="detail-box">
            <div v-for="(item,index) in detailTitle2" :key="'title'+index" class="detail-item">
              <div class="title-item">
                <span v-if="item.hasDot" class="dot" :style="{backgroundColor:item.dotColor}"></span>
                {{ item.label }}
              </div>
              <div
                v-for="(item1,index1) in detailData2"
                :key="index1"
                class="data-item"
              ><el-tooltip class="item" effect="dark" :content="(item1[item.prop]? (item1[item.prop].toString()): '0')" placement="top"><span>{{ item1[item.prop]? item1[item.prop]: '0' }}</span></el-tooltip></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_device";
import Search from "@/components/search/search.vue";

import { SEARCH_CONFIG } from "./../../formConfig/deviceStatisticsSearch";
import echarts from "echarts";
import "./../../../../libs/kit/china";
import dataItem from "../../../dataMarket/components/dataItem.vue";
import dotTip from "./dotTip.vue";
import deviceList from "./deviceList.vue";
import provinceData from "@/assets/data/provinceData"
import areaData from "@/assets/data/areaData"

export default {
  name: "DeviceStatistics",
  components: { Search, dataItem, dotTip, deviceList },
  data() {
    return {
      showExpandBtn: true,
      deviceListData: [],
      searchMaxHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: {},
      fromConfigData: {},
      drawer: false,
      direction: "rtl",
      mapData: [],
      titleList: ["设备数量统计", "设备交易统计"],
      radioListData: [
        {
          radio: "region",
          namelist: [
            { name: "大区数据", label: "region" },
            { name: "行业数据", label: "industry" }
          ]
        },
        {
          radio: "region",
          namelist: [
            { name: "大区数据", label: "region" },
            { name: "行业数据", label: "industry" }
          ]
        }
      ],
      dotTipData: [
        {
          label: "销售量",
          className: ["dot_blue"]
        },
        {
          label: "激活量",
          className: ["dot_yellow"]
        },
        {
          label: "动销量",
          className: ["dot_green"]
        },
        {
          label: "未动销量",
          className: ["dot_pink"]
        }
      ],
      dotTipData2: [
        {
          label: "交易笔数",
          className: ["dot_blue"]
        },
        {
          label: "动销量",
          className: ["dot_green"]
        }
      ],
      barOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0",
          right: "4%",
          bottom: "3%",
          top: "40px",
          containLabel: true
        },
        dataset: {
          dimensions: [
            "regionCode",
            "saleCount",
            "activationCount",
            "usingCount",
            "noUsingCount"
          ],
          source: []
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: '#606266'
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: '#606266'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#D9D9D9'
              }
            }
          }
        ],
        series: [
          {
            name: "销售量",
            type: "bar",
            barGap: 0,
            itemStyle: {
              color: "#3BA0FF"
            }
          },
          {
            name: "激活量",
            type: "bar",
            itemStyle: {
              color: "#FAD337"
            }
          },
          {
            name: "动销量",
            type: "bar",
            itemStyle: {
              color: "#37CBCB"
            }
          },
          {
            name: "未动销量",
            type: "bar",
            itemStyle: {
              color: "#F47A8F"
            }
          }
        ]
      },
      barOption2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataset: {
          dimensions: ["regionName", "tradeCount", "tradeAmount"],
          source: []
        },
        grid: {
          left: "0",
          right: "4%",
          bottom: "3%",
          top: "40px",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: '#606266'
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: '#606266'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#D9D9D9'
              }
            }
          }
        ],
        series: [
          {
            name: "交易笔数",
            type: "bar",
            barGap: 0,
            itemStyle: {
              color: "#3BA0FF"
            }
          },
          {
            name: "交易金额",
            type: "bar",
            itemStyle: {
              color: "#37CBCB"
            }
          }
        ]
      },
      detailTitle: [
        {
          label: "大区",
          prop: "regionName",
          hasDot: false
        },
        {
          label: "销售量（台）",
          prop: "saleCount",
          hasDot: true,
          dotColor: "#1989FA"
        },
        {
          label: "激活量（台）",
          prop: "activationCount",
          hasDot: true,
          dotColor: "#FBD955"
        },
        {
          label: "动销量（台）",
          prop: "usingCount",
          hasDot: true,
          dotColor: "#37CBCB"
        },
        {
          label: "未动销量（台）",
          prop: "noUsingCount",
          hasDot: true,
          dotColor: "#F47A8F"
        }
      ],
      detailTitle2: [
        {
          label: "大区",
          prop: "regionName",
          hasDot: false
        },
        {
          label: "交易笔数（笔）",
          prop: "tradeCount",
          hasDot: true,
          dotColor: "#1989FA"
        },
        {
          label: "交易金额（元）",
          prop: "tradeAmount",
          hasDot: true,
          dotColor: "#37CBCB"
        }
      ],
      detailData: [],
      detailData2: [],
      beginDate: null,
      endDate: null,
      currentdate: '',
      deviceId: ""
    };
  },
  created() {
    this.queryEquipment()
    this.handleProvince()
  },
  mounted() {
    this.queryRegion();
    this.queryRegionTrade();
  },
  methods: {
    queryEquipment() {
      var params = {
        beginDate: this.$g.utils.getToday(0),
        endDate: this.$g.utils.getToday(0)
      }
      api.queryUsing(params).then(res => {
        this.deviceListData = res.object;
      })
        .catch(err => {
          this.$message(err);
        });
    },
    handleNumRadioChange($data) {
      $data === "region" ? this.queryRegion() : null;
      $data === "industry" ? this.queryMcc() : null;
    },
    handleTradeRadioChange($data) {
      $data === "region" ? this.queryRegionTrade() : null;
      $data === "industry" ? this.queryMccTrade() : null;
    },
    transferEchartsData($data, $option, $prop) {
      $option.dataset.source = $data;
      if ($prop) $option.dataset.dimensions[0] = $prop;
    },
    // 大区设备数量使用情况
    queryRegion($data) {
      api
        .queryRegion({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: this.deviceId
        })
        .then(res => {
          this.detailTitle[0] = {
            label: "大区",
            prop: "regionName",
            hasDot: false
          };
          res.object.forEach(v => {
            if (!v.activationCount) {
              v.activationCount = 0
            }
            if (!v.noUsingCount) {
              v.noUsingCount = 0
            }
            if (!v.saleCount) {
              v.saleCount = 0
            }
            if (!v.usingCount) {
              v.usingCount = 0
            }
          })
          this.detailData = res.object;
          this.transferEchartsData(res.object, this.barOption, "regionName");
          this.showBar();
        })
    },
    // 行业设备数量使用情况
    queryMcc() {
      api
        .queryMcc({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: this.deviceId
        })
        .then(res => {
          this.detailTitle[0] = {
            label: "行业",
            prop: "mccName",
            hasDot: false
          };
          this.detailData = res.object;
          this.transferEchartsData(res.object, this.barOption, "mccName");
          this.showBar();
        })
    },
    // 大区设备交易情况
    queryRegionTrade() {
      api
        .queryRegionTrade({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: this.deviceId
        })
        .then(res => {
          this.detailTitle2[0] = {
            label: "大区",
            prop: "regionName",
            hasDot: false
          };
          this.detailData2 = res.object;
          this.transferEchartsData(res.object, this.barOption2, "regionName");
          this.showBar2();
        })
    },
    // 行业设备交易情况
    queryMccTrade() {
      api
        .queryMccTrade({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: this.deviceId
        })
        .then(res => {
          this.detailTitle2[0] = {
            label: "行业",
            prop: "mccName",
            hasDot: false
          };
          this.detailData2 = res.object;
          this.transferEchartsData(res.object, this.barOption2, "mccName");
          this.showBar2();
        })
    },
    handleProvince($itemData) {
      if ($itemData) {
        this.deviceId = $itemData.deviceId
      } else {
        this.deviceId = ""
      }
      this.queryAllProvince();
    },
    // 查询所有省份正在使用的数量/查询省份使用排行榜
    queryAllProvince($data) {
      if (!$data) {
        this.beginDate = this.$g.utils.getToday(0)
        this.endDate = this.$g.utils.getToday(0)
      }
      api.queryAllProvince({
        beginDate: this.beginDate,
        endDate: this.endDate,
        deviceId: this.deviceId
      }).then(res => {
        var result = this.$g.utils.getNestedArr(areaData, 'children');
        res.object.forEach((v) => {
          result.forEach(m => {
            if (v.provinceCode === m.value) {
              v.provinceName = m.label
            }
          })
          provinceData.forEach(h => {
            if (v.provinceName === h.label) {
              v.name = h.name
            }
          })
          v.deviceProportionPecent = this.$g.utils.AccMul(v.deviceProportion, 100)
        })
        this.mapData = res.object;
        this.initMap();
      })
    },
    showBar() {
      // 基于准备好的dom，初始化echarts实例
      const myChartBar = this.$echarts.init(this.$refs.echartsBar);

      // 绘制图表
      myChartBar.setOption(this.barOption);
      window.addEventListener("resize", function() {
        myChartBar.resize();
      });
    },
    showBar2() {
      // 基于准备好的dom，初始化echarts实例
      const myChartBar = this.$echarts.init(this.$refs.echartsBar2);

      // 绘制图表
      myChartBar.setOption(this.barOption2);
      window.addEventListener("resize", function() {
        myChartBar.resize();
      });
    },
    search($ruleForm) {
      this.beginDate = $ruleForm.date[0]
      this.endDate = $ruleForm.date[1]
      api
        .queryUsing({
          beginDate: $ruleForm.date[0],
          endDate: $ruleForm.date[1]
        })
        .then(res => {
          this.deviceListData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
      const $data = {
        beginDate: $ruleForm.date[0],
        endDate: $ruleForm.date[1]
      }
      this.queryAllProvince($data)
    },
    initMap() {
      const myChart = echarts.init(this.$refs.echartsMap);
      const mapData = [];
      this.mapData.forEach((item, index) => {
        mapData[index] = {};
        mapData[index].name = item.name;
        mapData[index].value = item.usingCount;
      });
      window.onresize = myChart.resize;
      myChart.setOption({
        tooltip: {
          show: true,
          triggerOn: "mousemove"
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 56,
          bottom: 40,
          showLabel: !0,
          text: ["高", "低"],
          // splitNumber: 5,
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
          show: true,
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
            name: "使用数量",
            type: "map",
            geoIndex: 0,
            data: mapData
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.device-list {
  margin: 24px 24px 0;
  background-color: #ffffff;
  overflow: hidden;
}
.detail-box {
  display: flex;

  .detail-item {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .data-item {
      text-align: left;
      margin-top: 32px;
      padding-right: 30px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width: 120px;
    }
    .title-item {
      width: 120px;
      text-align: left;
    }
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
}
.dot {
  display: inline-block;
  margin-left: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  vertical-align: middle;
}
.content-box {
  display: flex;
}
.left {
  padding-top: 16px;
  padding-left: 24px;
  width: 50%;
}
.right {
  width: 50%;
  margin-top: 16px;
  overflow: auto;
}
/*滚动条样式*/
.right ::-webkit-scrollbar {
  width: 8px;
}
.right ::-webkit-scrollbar-thumb {
  background: #C3C3C3;
  border-radius: 4px;
}
.right ::-webkit-scrollbar-track {
  background: white;
  border-radius: 4px;
}
.data_box {
  position: relative;
  margin: 24px;
  overflow: hidden;
  background: #fff;
}
.title {
  margin: 0 24px;
  height: 64px;
  line-height: 64px;
  padding-left: 24px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  border-bottom: 1px solid #ebeef5;
  background-color: #ffffff;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
</style>
