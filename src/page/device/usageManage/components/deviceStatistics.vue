<template>
  <div class>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="device-list">
      <deviceList :device-list-data="deviceListData" :show-expand-btn="showExpandBtn"></deviceList>
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
            {{ item.name }}
          </div>
          <div class="data-right">
            <span>{{ item.num }}</span> |
            <span class="perc">{{ item.perc }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="data_box">
      <dataItem :radio="radioListData[0]" :title="titleList[0]"></dataItem>

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
      <dataItem :radio="radioListData[0]" :title="titleList[1]"></dataItem>

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
      deviceListData: [
        {
          label: "刷脸设备",
          deviceList: [
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            }
          ]
        },
        {
          label: "SPOS机",
          deviceList: [
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            }
          ]
        },
        {
          label: "其他设备",
          deviceList: [
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              nums: "aa",
              name: "aaa"
            }
          ]
        }
      ],
      searchMaxHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: {},
      fromConfigData: {},
      testData: [],
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
          radio: "0",
          namelist: [
            { name: "大区数据", label: "0" },
            { name: "行业数据", label: "1" }
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
        xAxis: [
          {
            type: "category",
            data: ["华东", "华中", "华北", "华南", "华西"]
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
            },
            data: [320, 332, 301, 334, 390]
          },
          {
            name: "激活量",
            type: "bar",
            itemStyle: {
              color: "#FAD337"
            },
            data: [120, 132, 101, 134, 90]
          },
          {
            name: "动销量",
            type: "bar",
            itemStyle: {
              color: "#37CBCB"
            },
            data: [220, 182, 191, 234, 290]
          },
          {
            name: "未动销量",
            type: "bar",
            itemStyle: {
              color: "#F47A8F"
            },
            data: [150, 232, 201, 154, 190]
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
            data: ["华东", "华中", "华北", "华南", "华西"]
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
            },
            data: [320, 332, 301, 334, 390]
          },
          {
            name: "交易金额",
            type: "bar",
            itemStyle: {
              color: "#FAD337"
            },
            data: [120, 132, 101, 134, 90]
          }
        ]
      },
      detailTitle: [
        {
          label: "大区",
          prop: "area",
          hasDot: false
        },
        {
          label: "销售量（台）",
          prop: "saleNum",
          hasDot: true,
          dotColor: "#1989FA"
        },
        {
          label: "激活量（台）",
          prop: "activeNum",
          hasDot: true,
          dotColor: "#FBD955"
        },
        {
          label: "动销量（台）",
          prop: "runNum",
          hasDot: true,
          dotColor: "#37CBCB"
        },
        {
          label: "未动销量（台）",
          prop: "unRunNum",
          hasDot: true,
          dotColor: "#F47A8F"
        }
      ],
      detailData: [
        {
          area: "华东",
          saleNum: "80",
          activeNum: "70",
          runNum: "60",
          unRunNum: "90"
        },
        {
          area: "华中",
          saleNum: "80",
          activeNum: "70",
          runNum: "60",
          unRunNum: "90"
        },
        {
          area: "华西",
          saleNum: "80",
          activeNum: "70",
          runNum: "60",
          unRunNum: "90"
        },
        {
          area: "华南",
          saleNum: "80",
          activeNum: "70",
          runNum: "60",
          unRunNum: "100"
        }
      ],
      detailTitle2: [
        {
          label: "大区",
          prop: "area",
          hasDot: false
        },
        {
          label: "交易笔数（笔）",
          prop: "transactionTimes",
          hasDot: true,
          dotColor: "#1989FA"
        },
        {
          label: "交易金额（元）",
          prop: "transactionAmount",
          hasDot: true,
          dotColor: "#FBD955"
        }
      ],
      detailData2: [
        {
          area: "华东",
          transactionTimes: "80",
          transactionAmount: "70"
        },
        {
          area: "华中",
          transactionTimes: "80",
          transactionAmount: "70"
        },
        {
          area: "华中",
          transactionTimes: "80",
          transactionAmount: "70"
        },
        {
          area: "华中",
          transactionTimes: "80",
          transactionAmount: "70"
        },
        {
          area: "华中",
          transactionTimes: "80",
          transactionAmount: "70"
        }
      ]
    };
  },
  mounted() {
    this.getTableData();
    this.initMap();
    this.showBar();
    this.showBar2();
  },
  methods: {
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
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData() {
      this.testData = [
        {
          service: "日常任务",
          type: "商户结算失败",
          buyNum: "4",
          buyNumPerc: "提醒",
          activeNum: "XXXX店铺",
          activeNumPerc: "20:00:23",
          amountPerc: "222.22"
        },
        {
          service: "日常任务",
          type: "商户结算失败",
          buyNum: "4",
          buyNumPerc: "提醒",
          activeNum: "XXXX店铺",
          activeNumPerc: "20:00:23",
          amountPerc: "222.22"
        }
      ];
    },
    initMap() {
      const myChart = echarts.init(this.$refs.echartsMap);
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
          value: 83
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
          value: 104
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
            data: dataList
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
  width: 55%;
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
