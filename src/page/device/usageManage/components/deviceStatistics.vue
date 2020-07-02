<template>
  <div class>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      :is-show-all="true"
      :begin-date="beginDate"
      :end-date="endDate"
      @dataSelect="handleDataSelect"
      @search="search"
    />
    <div class="device-list">
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
        <div class="data-title">
          省份分布排行榜
          <span class="all-num">共33940个</span>
        </div>
        <div v-for="(item,index) in mapData" :key="index" class="data-item">
          <div class="data-left">
            <span :class="['index',index<=2?'hightlight':'normal']">{{ index+1 }}</span>
            {{ item.provinceCode }}
          </div>
          <div class="data-right">
            <span>{{ item.usingCount }}</span> |
            <span class="perc">{{ item.perc }}</span>
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
              >{{ item1[item.prop] }}</div>
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
              >{{ item1[item.prop] }}</div>
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

export default {
  name: "Theme",
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
      mapData: [
        { name: "安徽省", num: "323,209", perc: "36%" },
        { name: "甘肃省", num: "323,209", perc: "36%" },
        { name: "安徽省", num: "323,209", perc: "36%" },
        { name: "香港特别行政区", num: "323,209", perc: "36%" },
        { name: "安徽省", num: "323,209", perc: "36%" },
        { name: "山西省", num: "234", perc: "36%" },
        { name: "山西省", num: "234", perc: "36%" },
        { name: "山西省", num: "234", perc: "36%" }
      ],
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
            type: "category"
          }
        ],
        yAxis: [
          {
            type: "value"
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
            type: "category"
          }
        ],
        yAxis: [
          {
            type: "value"
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
          prop: "regionCode",
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
      currentdate: ''
    };
  },
  created() {
    this.getNowFormatDate()
    this.handleProvince()
  },
  mounted() {
    this.queryRegion();
    this.queryRegionTrade();
  },
  methods: {
    getNowFormatDate() {
      const date = new Date();
      const seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.currentdate = currentdate
      return currentdate;
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
      console.log($data);
      $option.dataset.source = $data;
      if ($prop) $option.dataset.dimensions[0] = $prop;
    },
    // 大区设备数量使用情况
    queryRegion($data) {
      api
        .queryRegion({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: ""
        })
        .then(res => {
          this.detailTitle[0] = {
            label: "大区",
            prop: "regionCode",
            hasDot: false
          };
          this.detailData = res.object;
          this.transferEchartsData(res.object, this.barOption, "regionCode");
          this.showBar();
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 行业设备数量使用情况
    queryMcc() {
      api
        .queryMcc({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: ""
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
        .catch(err => {
          this.$message(err);
        });
    },
    // 大区设备交易情况
    queryRegionTrade() {
      api
        .queryRegionTrade({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: ""
        })
        .then(res => {
          this.detailTitle2[0] = {
            label: "大区",
            prop: "regionCode",
            hasDot: false
          };
          this.detailData2 = res.object;
          this.transferEchartsData(res.object, this.barOption2, "regionCode");
          this.showBar2();
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 行业设备交易情况
    queryMccTrade() {
      api
        .queryMccTrade({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: ""
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
        .catch(err => {
          this.$message(err);
        });
    },
    handleProvince($itemData) {
      this.queryAllProvince($itemData);
    },
    // 获取设备省份数据
    queryAllProvince($data) {
      if (!this.beginDate) {
        this.beginDate = this.currentdate
        this.endDate = this.currentdate
      }
      api
        .queryAllProvince({
          beginDate: this.beginDate,
          endDate: this.endDate,
          deviceId: $data && $data.deviceId
        })
        .then(res => {
          this.mapData = res.object;
          this.initMap();
        })
        .catch(err => {
          this.$message(err);
        });
    },
    handleDataSelect($time) {
      api
        .queryUsing({
          beginDate: $time[0],
          endDate: $time[1],
          deviceId: ""
        })
        .then(res => {
          this.deviceListData = res.object;
          this.beginDate = $time[0];
          this.endDate = $time[1];
        })
        .catch(err => {
          this.$message(err);
        });
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
          endDate: $ruleForm.date[1],
          deviceId: ""
        })
        .then(res => {
          this.deviceListData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    initMap() {
      const myChart = echarts.init(this.$refs.echartsMap);
      // eslint-disable-next-line no-unused-vars
      const dataList = [
        {
          name: "南海诸岛",
          value: 0
        },
        {
          name: "北京",
          value: 54
        },
        {
          name: "天津",
          value: 13
        },
        {
          name: "上海",
          value: 40
        },
        {
          name: "重庆",
          value: 75
        },
        {
          name: "河北",
          value: 13
        },
        {
          name: "河南",
          value: 1183
        },
        {
          name: "云南",
          value: 11
        },
        {
          name: "辽宁",
          value: 19
        },
        {
          name: "黑龙江",
          value: 15
        },
        {
          name: "湖南",
          value: 69
        },
        {
          name: "安徽",
          value: 60
        },
        {
          name: "山东",
          value: 39
        },
        {
          name: "新疆",
          value: 4
        },
        {
          name: "江苏",
          value: 31
        },
        {
          name: "浙江",
          value: 0
        },
        {
          name: "江西",
          value: 36
        },
        {
          name: "湖北",
          value: 1052
        },
        {
          name: "广西",
          value: 33
        },
        {
          name: "甘肃",
          value: 7
        },
        {
          name: "山西",
          value: 9
        },
        {
          name: "内蒙古",
          value: 7
        },
        {
          name: "陕西",
          value: 22
        },
        {
          name: "吉林",
          value: 4
        },
        {
          name: "福建",
          value: 18
        },
        {
          name: "贵州",
          value: 5
        },
        {
          name: "广东",
          value: 98
        },
        {
          name: "青海",
          value: 1
        },
        {
          name: "西藏",
          value: 0
        },
        {
          name: "四川",
          value: 44
        },
        {
          name: "宁夏",
          value: 4
        },
        {
          name: "海南",
          value: 22
        },
        {
          name: "台湾",
          value: 3
        },
        {
          name: "香港",
          value: 5
        },
        {
          name: "澳门",
          value: 5
        }
      ];
      const mapData = [];
      this.mapData.forEach((item, index) => {
        mapData[index] = {};
        mapData[index].name = item.provinceCode;
        mapData[index].value = item.usingCount;
      });
      console.log(mapData);
      console.log(this.mapData);
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
      text-align: center;
      margin-top: 32px;
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
  padding-left: 32px;
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
