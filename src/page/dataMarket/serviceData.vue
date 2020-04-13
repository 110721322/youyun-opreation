<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="p_head">服务商数据</div>
      <div class="title">服务器数量分布</div>
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
              {{ item.provinceName }}
            </div>
            <div class="data-right">
              <span>{{ item.count }}</span> |
              <span class="perc">{{ item.ratio }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="service-box">
        <pie
          :pie-option="pieOptionList[0]"
          :data-list="dataList[0]"
          :ref-name="'echartPie0'"
          :pie-style="pieStyle"
        ></pie>
        <pie
          :pie-option="pieOptionList[0]"
          :data-list="dataList[0]"
          :ref-name="'echartPie1'"
          :pie-style="pieStyle"
        ></pie>
        <pie
          :pie-option="pieOptionList[0]"
          :data-list="dataList[0]"
          :ref-name="'echartPie2'"
          :pie-style="pieStyle"
        ></pie>
      </div>
      <search
        :is-show-all="true"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @dataSelect="handleDataSelect"
        @search="search"
      />
      <div class="title">商户平均交易额走势</div>
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
            :item-test-data="testData5"
            :is-show-line="false"
            :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
            @showMore="handleShowMore"
          ></dataItem>
        </div>
      </div>
      <div class="pie-box">
        <data-item
          class="pie-item"
          :radio="radioListData[0]"
          :title="'交易额涨跌排行'"
          :config-data="tableConfigData"
          :is-show-more="true"
          :is-show-table="true"
          :item-test-data="testData"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @radioChange="handleTradeAmountChange"
        />
        <dataItem
          class="pie-item"
          :title="'新增商户数量排行'"
          :config-data="tableConfigData2"
          :is-show-more="true"
          :is-show-table="true"
          :item-test-data="testData2"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @showMore="handleShowMore"
        />
      </div>
      <div class="pie-box">
        <dataItem
          class="pie-item"
          :radio="radioListData[1]"
          :title="'会员商户排行'"
          :config-data="tableConfigData3"
          :is-show-more="true"
          :is-show-table="true"
          :item-test-data="testData3"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @showMore="handleShowMore"
          @radioChange="handleTradeAmountChange"
        />
        <dataItem
          class="pie-item"
          :radio="radioListData[2]"
          :title="'刷脸订单排行'"
          :config-data="tableConfigData4"
          :is-show-more="true"
          :is-show-table="true"
          :item-test-data="testData4"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @showMore="handleShowMore"
          @radioChange="handleTradeAmountChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_dataMarket";
import pie from "./components/pie.vue";
import dataItem from "./components/dataItem.vue";
import search from "@/components/search/search.vue";
import {
  MERCHANTDATACONFIG1,
  MERCHANTDATACONFIG2,
  MERCHANTDATACONFIG3,
  MERCHANTDATACONFIG4,
  MERCHANTDATACONFIG5
} from "./tableConfig/serviceDataConfig";
import { FORM_CONFIG2 } from "./formConfig/dataViewSearch";
import echarts from "echarts";
import "./../../libs/kit/china";
export default {
  name: "ServiceData",
  components: {
    search,
    dataItem,
    pie
  },
  data() {
    return {
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
      searchConfig: FORM_CONFIG2,
      searchMaxHeight: "300",
      testData: [],
      testData2: [],
      testData3: [],
      testData4: [],
      testData5: [],
      tableConfigData: MERCHANTDATACONFIG1,
      tableConfigData2: MERCHANTDATACONFIG2,
      tableConfigData3: MERCHANTDATACONFIG3,
      tableConfigData4: MERCHANTDATACONFIG4,
      tableConfigData5: MERCHANTDATACONFIG5,
      pieStyle: {
        width: "200px",
        height: "250px"
      },
      radioListData: [
        {
          radio: "1",
          namelist: [
            { name: "涨幅排行", label: "1" },
            { name: "跌幅排行", label: "2" }
          ]
        },
        {
          radio: "1",
          namelist: [
            { name: "新增数量", label: "1" },
            { name: "会员交易", label: "2" }
          ]
        },
        {
          radio: "1",
          namelist: [
            { name: "金额", label: "1" },
            { name: "笔数", label: "2" }
          ]
        }
      ],
      dataList: [
        [
          {
            title: "华东",
            className: ["dot", "dot_d"],
            perc: "36%"
          },
          {
            title: "华中",
            className: ["dot", "dot_z"],
            perc: "20%"
          },
          {
            title: "华北",
            className: ["dot", "dot_b"],
            perc: "10%"
          },
          {
            title: "华南",
            className: ["dot", "dot_n"],
            perc: "36%"
          },
          {
            title: "华西",
            className: ["dot", "dot_x"],
            perc: "36%"
          }
        ],
        [
          {
            title: "房产汽车类",
            className: ["dot", "dot_d"],
            perc: "36%"
          },
          {
            title: "民生类",
            className: ["dot", "dot_z"],
            perc: "20%"
          },
          {
            title: "一般类",
            className: ["dot", "dot_b"],
            perc: "10%"
          },
          {
            title: "批发类",
            className: ["dot", "dot_n"],
            perc: "36%"
          },
          {
            title: "餐娱类",
            className: ["dot", "dot_x"],
            perc: "36%"
          }
        ]
      ],
      pieOptionList: [
        {
          title: {
            text: "新增商户数大区占比",
            left: "center",
            textStyle: {
              color: "rgba(0,0,0,0.85)",
              fontSize: 14
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}: {c} ({d}%)"
          },
          series: [
            {
              name: "新增商户数行业占比",
              type: "pie",
              avoidLabelOverlap: false,
              radius: ["40%", "80%"],
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 0.36, name: "华东", itemStyle: { color: "#00A1FF" } },
                { value: 0.2, name: "华中", itemStyle: { color: "#37CBCB" } },
                { value: 0.1, name: "华北", itemStyle: { color: "#FAD337" } },
                { value: 0.09, name: "华南", itemStyle: { color: "#F2637B" } },
                { value: 0.09, name: "华西", itemStyle: { color: "#975FE4" } }
              ]
            }
          ]
        },
        {
          title: {
            text: "交易额行业占比",
            left: "center",
            textStyle: {
              color: "rgba(0,0,0,0.85)",
              fontSize: 14
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}: {c} ({d}%)"
          },
          series: [
            {
              name: "交易额大区占比",
              type: "pie",
              avoidLabelOverlap: false,
              radius: ["40%", "80%"],
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 0.36, name: "华东", itemStyle: { color: "#00A1FF" } },
                { value: 0.2, name: "华中", itemStyle: { color: "#37CBCB" } },
                { value: 0.1, name: "华北", itemStyle: { color: "#FAD337" } },
                { value: 0.09, name: "华南", itemStyle: { color: "#F2637B" } },
                { value: 0.09, name: "华西", itemStyle: { color: "#975FE4" } }
              ]
            }
          ]
        }
      ],
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
            data: [
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23",
              "12-23"
            ]
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
            // emphasis: {
            //   itemStyle: {
            //     // 高亮时点的颜色。
            //     color: "blue"
            //   },
            //   label: {
            //     show: true,
            //     // 高亮时标签的文字。
            //     formatter: "This is a emphasis label."
            //   }
            // },
            itemStyle: {
              normal: {
                color: "#1890FF",
                lineStyle: {
                  color: "#1890FF"
                }
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 330]
          }
        ]
      },
      beginDate: null,
      endDate: null,
      agentType: 1,
      agentType2: 1,
      agentType3: 1
    };
  },
  created() {},
  mounted() {
    this.init();
    this.getData();
    this.initMap();
    // 获取数据
    this.queryProvinceRank();
    this.queryRegionRatio();
    this.queryGradeRatio();
    this.queryTypeRatio();
  },
  methods: {
    // 交易额涨跌排行切换
    handleTradeAmountChange($data) {
      this.agentType = $data;
      this.queryAgentTradeAmountPerRank();
    },
    queryAgentTradeAmountPerRank() {
      api
        .queryAgentTradeAmountPerRank({
          beginDate: this.beginDate,
          endDate: this.endDate,
          top: 216,
          type: this.agentType
        })
        .then(res => {
          this.testData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 新增商户数量排行
    queryNewMerchantRank() {
      api
        .queryNewMerchantRank({
          beginDate: this.beginDate,
          endDate: this.endDate,
          top: 216,
          type: this.agentType2
        })
        .then(res => {
          this.testData2 = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 会员商户排行切换
    // handleAgentFaceChange($data) {
    //   this.agentType = $data;
    //   this.queryAgentFaceTradeAmountRank();
    // },
    // queryAgentFaceTradeAmountRank() {
    //   api
    //     .queryAgentFaceTradeAmountRank({
    //       beginDate: this.beginDate,
    //       endDate: this.endDate,
    //       top: 216,
    //       type: this.agentType
    //     })
    //     .then(res => {
    //       // this.mapData = res.object;
    //     })
    //     .catch(err => {
    //       this.$message(err);
    //     });
    // },
    // 刷脸订单排行
    handleAgentFaceChange($data) {
      this.agentType = $data;
      this.queryAgentFaceTradeAmountRank();
    },
    queryAgentFaceTradeAmountRank() {
      api
        .queryAgentFaceTradeAmountRank({
          beginDate: this.beginDate,
          endDate: this.endDate,
          top: 216,
          type: this.agentType
        })
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 服务商平均交易额走势
    queryAgentDailyAverageTrade() {
      api
        .queryAgentDailyAverageTrade({
          beginDate: this.beginDate,
          endDate: this.endDate
          // top: 216,
          // type: 528
        })
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 总交易排行榜
    queryAgentTradeAmountRank() {
      api
        .queryAgentTradeAmountRank({
          beginDate: this.beginDate,
          endDate: this.endDate,
          top: 216,
          type: 528
        })
        .then(res => {
          this.testData5 = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 地图服务商数据
    queryAllProvinceCount($ruleForm) {
      api
        .queryAllProvinceCount({})
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 大区占比
    queryRegionRatio($ruleForm) {
      api
        .queryRegionRatio({})
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 等级占比
    queryGradeRatio($ruleForm) {
      api
        .queryGradeRatio({})
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 类型占比
    queryTypeRatio($ruleForm) {
      api
        .queryTypeRatio({})
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 省份分布排行榜
    queryProvinceRank($ruleForm) {
      api
        .queryProvinceRank({})
        .then(res => {
          this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    handleDataSelect($time) {
      this.beginDate = $time[0];
      this.endDate = $time[1];
      this.queryAgentDailyAverageTrade();
      this.queryAgentTradeAmountRank();
      this.queryAgentTradeAmountPerRank();
      this.queryNewMerchantRank();
    },
    init() {
      this.showLine();
    },
    handleShowMore() {
      this.$router.push({ path: "/dataMarket/serviceData/detail" });
    },
    showLine() {
      // 基于准备好的dom，初始化echarts实例
      if (!this.$refs.echartsLine) return;
      const myChartLine = this.$echarts.init(this.$refs.echartsLine);

      // 绘制图表
      myChartLine.setOption(this.lineOption);
      window.addEventListener("resize", function() {
        myChartLine.resize();
      });
    },
    search() {
      this.getData();
    },
    getData() {
      this.testData3 = [
        {
          rank: "1",
          name: "利郎男装有限公司",
          new: "128%",
          perc: "128%"
        },
        {
          rank: "2",
          name: "利郎男装有限公司",
          new: "128%",
          perc: "128%"
        }
      ];
    },
    initMap() {
      if (!this.$refs.echartsMap) return;
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
  padding-left: 32px;
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
    height: 350px;
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
</style>
