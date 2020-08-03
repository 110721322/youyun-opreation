<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="p_head">
        <span class="left-title">商户数据</span>
        <div class="right-area" @click="showRightbar">
          <img src="../../assets/img/menu_icon.png" alt="">
          <span>自定义设置</span>
        </div>
      </div>
      <search
        :is-show-all="true"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @dataSelect="handleDataSelect"
        @search="search"
      />
      <div class="title2">新增商户数分布</div>
      <div class="map-box">
        <div class="chart-box">
          <div ref="echartsMap" class="chart-panel"></div>
        </div>
        <div class="data-box">
          <div class="data-title">
            新增商户数省份排行榜
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
      <div class="pie-box">
        <div class="pie-item">
          <dataItem
            :radio="radioListData[0]"
            :title="titleList[0].name"
            :pie-option="pieOptionList[0]"
            :piw-ref-name="`echartsPie${0}`"
            :data-list="dataList[0]"
            :is-show-pie="true"
            @radioChange="handleRegionRadioChange"
          />
        </div>
        <div class="pie-item">
          <dataItem
            :radio="radioListData[1]"
            :title="titleList[1].name"
            :pie-option="pieOptionList[1]"
            :piw-ref-name="`echartsPie${1}`"
            :data-list="dataList[1]"
            :is-show-pie="true"
            @radioChange="handleCategoryRadioChange"
          />
        </div>
      </div>
      <div class="title">商户平均交易额走势</div>
      <div class="trend-box">
        <div class="chart-box">
          <div ref="echartsLine" class="chart-panel"></div>
        </div>
        <div class="data-box">
          <dataItem
            :radio="radioListData2[3]"
            :is-show-table="true"
            :title="'总交易额排行榜'"
            :is-show-more="true"
            :config-data="tableConfigData3"
            :permission="tableConfigData3.permission"
            :item-test-data="testData3"
            :is-show-line="false"
            :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
            @showMore="handleShowMore"
            @radioChange="handleTradeTopChange"
          ></dataItem>
        </div>
      </div>
      <div class="pie-box">
        <div class="pie-item">
          <dataItem
            :radio="radioListData2[0]"
            :title="titleList2[0].name"
            :pie-option="pieOptionList2[0]"
            :piw-ref-name="`echartsPie2${0}`"
            :data-list="dataList2[0]"
            :is-show-pie="true"
            :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
            @radioChange="handleTradeCountRatioChange"
          />
        </div>
        <div class="pie-item">
          <dataItem
            :radio="radioListData2[1]"
            :title="titleList2[1].name"
            :pie-option="pieOptionList2[1]"
            :piw-ref-name="`echartsPie2${1}`"
            :data-list="dataList2[1]"
            :is-show-pie="true"
            :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
            @radioChange="handleTradeRiseRatioChange"
          />
        </div>
      </div>
      <div class="pie-box">
        <dataItem
          class="pie-item"
          :title="'无交易商户上期排行'"
          :config-data="tableConfigData"
          :permission="tableConfigData.permission"
          :is-show-more="true"
          :is-show-table="true"
          :item-test-data="testData"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @showMore="handleShowMore"
        />
        <dataItem
          :radio="radioListData2[2]"
          class="pie-item"
          :title="'交易额涨跌排行'"
          :config-data="tableConfigData2"
          :permission="tableConfigData2.permission"
          :is-show-more="true"
          :is-show-table="true"
          :item-test-data="testData2"
          :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
          @showMore="handleShowMore"
          @radioChange="handleTradeCountRatioChange2"
        />
      </div>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="40%">
        <div class="draw-title">权限设置</div>
        <div class="draw-content">
          <div class="draw-wran">
            <div class="draw-wranleft">
              <span>i</span>
              <span>该功能用于配置服务商数据页面的图表</span>
            </div>
            <img src="../../assets/img/cancle.png" alt="">
          </div>
          <div class="draw-checkbox">
            <el-checkbox-group v-model="checkedSelect" @change="handleChecked">
              <el-checkbox v-for="(item, index) in checkIndex" :key="index" :label="item">{{ item }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="bottom-btn">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
            <div class="btn">
              <button>确定</button>
              <button @click="cancleClose">取消</button>
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
  MERCHANTDATACONFIG1,
  MERCHANTDATACONFIG2,
  MERCHANTDATACONFIG3
} from "./tableConfig/merchantDataConfig";
import { FORM_CONFIG2 } from "./formConfig/dataViewSearch";
import echarts from "echarts";
import "./../../libs/kit/china";

export default {
  name: "MerchantData",
  components: {
    search,
    dataItem
  },
  data() {
    return {
      isIndeterminate: true,
      checkAll: false,
      checkedSelect: [],
      checkIndex: ['商户数大区占比', '商户交易涨跌概况占比', '商户数行业占比', '无交易商户上期排行', '商户平均交易额走势', '交易额涨跌排行'],
      drawer: false,
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
      tableConfigData: MERCHANTDATACONFIG1,
      tableConfigData2: MERCHANTDATACONFIG2,
      tableConfigData3: MERCHANTDATACONFIG3,
      titleList: [{ name: "商户数大区占比" }, { name: "商户数行业占比" }],
      radioListData: [
        {
          radio: "1",
          namelist: [
            { name: "新增商户", label: "1" },
            { name: "交易商户", label: "2" },
            { name: "流失商户", label: "3" }
          ]
        },
        {
          radio: "1",
          namelist: [
            { name: "新增商户", label: "1" },
            { name: "交易商户", label: "2" },
            { name: "流失商户", label: "3" }
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
      titleList2: [
        { name: "平均交易笔数分布" },
        { name: "商户交易涨跌概况占比" }
      ],
      radioListData2: [
        {
          radio: "1",
          namelist: [
            { name: "新增商户", label: "1" },
            { name: "交易商户", label: "2" }
          ]
        },
        {
          radio: "1",
          namelist: [
            { name: "新增商户", label: "1" },
            { name: "交易商户", label: "2" }
          ]
        },
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
            { name: "新增商户", label: "1" },
            { name: "交易商户", label: "2" }
          ]
        }
      ],
      dataList2: [
        [
          {
            title: "1000笔以上",
            className: ["dot", "dot_d"],
            perc: "36%"
          },
          {
            title: "101-1000笔",
            className: ["dot", "dot_z"],
            perc: "20%"
          },
          {
            title: "11-100笔",
            className: ["dot", "dot_b"],
            perc: "10%"
          },
          {
            title: "1-10笔",
            className: ["dot", "dot_n"],
            perc: "36%"
          }
        ],
        [
          {
            title: "大幅上涨",
            className: ["dot", "dot_d"],
            perc: "36%"
          },
          {
            title: "小幅上涨",
            className: ["dot", "dot_z"],
            perc: "20%"
          },
          {
            title: "小幅下跌",
            className: ["dot", "dot_b"],
            perc: "10%"
          },
          {
            title: "异常下跌",
            className: ["dot", "dot_n"],
            perc: "36%"
          }
        ]
      ],
      pieOptionList2: [
        {
          title: {
            text: "新增商户平均交易笔数概况",
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
              name: "新增商户平均交易笔数概况",
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
            text: "新增商户交易涨跌概况",
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
              name: "新增商户交易涨跌概况",
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
          }
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
      merchantType: 1,
      merchantType2: 1,
      merchantType3: 1,
      merchantType4: 1,
      merchantType5: 1,
      merchantType6: null,
      tradeType: 1
    };
  },
  created() {},
  mounted() {
    this.init();
    this.initMap();
    // 获取数据
    this.queryRegionTradeSummaryByCondition();
    this.queryCategoryTradeSummaryByCondition();
    this.queryTradeTop5ByCondition();
    this.selectNonTradeTop5ByCondition();
    this.queryTradeRiseRatioTop5ByCondition();
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
    // 交易额涨跌排行
    handleTradeCountRatioChange2($data) {
      this.tradeType = $data;
      this.queryTradeRiseRatioTop5ByCondition();
    },
    queryTradeRiseRatioTop5ByCondition() {
      api
        .queryTradeRiseRatioTop5ByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate,
          merchantType: this.merchantType6 || 1,
          tradeType: this.tradeType
        })
        .then(res => {
          this.testData2 = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 无交易商户上期排行
    selectNonTradeTop5ByCondition() {
      api
        .selectNonTradeTop5ByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate
        })
        .then(res => {
          this.testData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 第二行第一个饼图切换
    handleTradeCountRatioChange($data) {
      this.merchantType4 = $data;
      this.queryTradeCountRatioByCondition();
    },
    queryTradeCountRatioByCondition() {
      api
        .queryTradeCountRatioByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate,
          merchantType: this.merchantType4
        })
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 第二行第二个饼图切换
    handleTradeRiseRatioChange($data) {
      this.merchantType5 = $data;
      this.selectTradeRiseRatioRoughByCondition();
    },
    selectTradeRiseRatioRoughByCondition() {
      api
        .selectTradeRiseRatioRoughByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate,
          merchantType: this.merchantType5
        })
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 交易额排行
    handleTradeTopChange($data) {
      this.merchantType3 = $data;
      this.queryTradeTop5ByCondition();
    },
    queryTradeTop5ByCondition() {
      api
        .queryTradeTop5ByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate,
          merchantType: this.merchantType3
        })
        .then(res => {
          this.testData3 = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 商户平均交易额走势折线图数据获取
    queryDailyTradeAvgByCondition() {
      api
        .queryDailyTradeAvgByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate
        })
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 第一行第一个饼图切换
    handleRegionRadioChange($data) {
      this.merchantType = $data;
      this.queryRegionTradeSummaryByCondition();
    },
    queryRegionTradeSummaryByCondition() {
      api
        .queryRegionTradeSummaryByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate,
          merchantType: this.merchantType
        })
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 第一行第二个饼图切换
    handleCategoryRadioChange($data) {
      this.merchantType2 = $data;
      this.queryCategoryTradeSummaryByCondition();
    },
    queryCategoryTradeSummaryByCondition() {
      api
        .queryRegionTradeSummaryByCondition({
          beginDate: this.beginDate,
          endDate: this.endDate,
          merchantType: this.merchantType2
        })
        .then(res => {
          // this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 地图数据分布与排行榜
    merchantDataQueryAllProvinceCountAndRank() {
      api
        .merchantDataQueryAllProvinceCountAndRank({
          beginDate: this.beginDate,
          endDate: this.endDate
        })
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
      api
        .merchantDataQueryAllProvinceCountAndRank({
          beginDate: this.beginDate,
          endDate: this.endDate
        })
        .then(res => {
          this.mapData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    init() {
      this.showLine();
    },
    handleShowMore() {
      this.$router.push({ path: "/dataMarket/merchantData/detail" });
    },
    showLine() {
      // 基于准备好的dom，初始化echarts实例
      if (this.$refs.echartsLine) {
        const myChartLine = this.$echarts.init(this.$refs.echartsLine);

        // 绘制图表
        myChartLine.setOption(this.lineOption);
        window.addEventListener("resize", function() {
          myChartLine.resize();
        });
      }
    },
    search($ruleForm) {
      this.beginDate = $ruleForm.date ? $ruleForm.date[0] : null;
      this.endDate = $ruleForm.date ? $ruleForm.date[1] : null;
      this.merchantDataQueryAllProvinceCountAndRank();
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
.title2 {
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
.draw-title {
  width: 100%;
  height: 76px;
  border-bottom: 1px solid #EBEEF5;
  padding-left: 32px;
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
