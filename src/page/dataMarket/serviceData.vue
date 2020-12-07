<template>
  <div>
    <div class="p-head">
      <span class="left-title">服务商数据</span>
      <div class="right-area" @click="showRightbar">
        <img src="../../assets/img/menu_icon.png" alt="图标" />
        <span>自定义设置</span>
      </div>
    </div>
    <template v-if="hasPermission('agentCount')">
      <div class="title">服务器数量分布</div>
      <div class="map-box">
        <div class="chart-box">
          <div ref="echartsMap" class="chart-panel"></div>
        </div>
        <div class="data-box">
          <div class="data-title">
            省份分布排行榜
            <span class="all-num">共{{ totalNum }}个</span>
          </div>
          <div v-for="(item,index) in mapData" :key="index" class="data-item">
            <div class="data-left">
              <span :class="['index',index<=2?'hightlight':'normal']">{{ index+1 }}</span>
              {{ item.name }}
            </div>
            <div class="data-right">
              <span>{{ item.count }}</span> |
              <span class="perc">{{ item.ratio + '%' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="service-box">
        <pie
          v-for="(item, index) in pieOptionList"
          :key="index"
          :pie-option="item"
          :data-list="item.dataList"
          :ref-name="'echartPie' + index"
          :pie-style="pieStyle"
        ></pie>
      </div>
    </template>
    <search
      v-if="hasPermission('agentAverageTrend') || hasPermission('amountRank') || hasPermission('addMerchantRank') || hasPermission('faceOrderRank')"
      :is-show-all="true"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @dataSelect="handleDataSelect"
      @search="search"
    />
    <template v-if="hasPermission('agentAverageTrend')">
      <div class="title">商户平均交易额走势</div>
      <div class="trend-box">
        <div class="chart-box">
          <div ref="echartsLine" class="chart-panel"></div>
        </div>
      </div>
    </template>
    <div class="pie-box">
      <dataItem
        v-if="hasPermission('amountRank')"
        class="pie-item"
        :is-show-table="true"
        :title="'总交易额排行榜'"
        :is-show-more="true"
        :config-data="tableConfigData5"
        :permission="tableConfigData5.permission"
        :item-test-data="testData5"
        :is-show-line="false"
        :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
        @showMore="handleShowMore('tradeAmount')"
      ></dataItem>
      <dataItem
        v-if="hasPermission('addMerchantRank')"
        class="pie-item"
        :title="'新增商户数量排行'"
        :config-data="tableConfigData2"
        :permission="tableConfigData2.permission"
        :is-show-more="true"
        :is-show-table="true"
        :item-test-data="testData2"
        :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
        @showMore="handleShowMore('newMerchantCount')"
      />
    </div>
    <div class="pie-box">
      <!--1.1期不做会员
      <dataItem
        class="pie-item"
        :radio="radioListData[1]"
        :title="'会员商户排行'"
        :config-data="tableConfigData3"
        :permission="tableConfigData3.permission"
        :is-show-more="true"
        :is-show-table="true"
        :item-test-data="testData3"
        :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
        @showMore="handleShowMore"
        @radioChange="handleTradeAmountChange"
      />-->
      <dataItem
        v-if="hasPermission('faceOrderRank')"
        class="pie-item"
        :radio="radioListData[2]"
        :title="'刷脸订单排行'"
        :config-data="tableConfigData4"
        :permission="tableConfigData4.permission"
        :is-show-more="true"
        :is-show-table="true"
        :item-test-data="testData4"
        :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
        @showMore="handleShowMore"
        @radioChange="handleTradeAmountChange"
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
          <img src="../../assets/img/cancle.png" alt="取消" />
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
import pie from "./components/pie.vue";
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
} from "./tableConfig/serviceDataConfig";
import { mapOption, pieOptionList, lineOption } from "./echartsConfig/serviceDataEcharts";
import { FORM_CONFIG2 } from "./formConfig/dataViewSearch";
import echarts from "echarts";
import axios from "axios";
import "./../../libs/kit/china";
var colors = ['#00a1ff', '#37cbcb', '#fad337', '#f2637b', '#975fe4']
export default {
  name: "ServiceData",
  components: {
    search,
    dataItem,
    pie
  },
  data() {
    return {
      pagePermission: [],
      checkedSelect: [],
      checkIndex: [
        {
          label: '服务商数量分布',
          value: "agentCount"
        }, {
          label: '服务商平均交易走势',
          value: 'agentAverageTrend'
        }, {
          label: '总交易排行榜',
          value: 'amountRank'
        }, {
          label: '新增商户数量排行',
          value: 'addMerchantRank'
        }, {
          label: '刷脸订单排行',
          value: 'faceOrderRank'
        }
      ],
      drawer: false,
      mapData: [],
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
      agentRegionRatio: [], // 服务商大区分布数据
      agentLevelRatio: [], // 服务商等级分布数据
      agentTypeRatio: [], // 服务商类型分布数据
      mapOption: mapOption,
      lineOption: lineOption,
      echartsMap: null,
      myChartLine: null,
      ruleForm: {},
      agentType: '1',
      totalNum: 0
    };
  },
  computed: {
    isIndeterminate() {
      return (this.checkedSelect.length > 0 && this.checkedSelect.length < 5);
    },
    checkAll: {
      get() {
        return this.checkedSelect.length === 5;
      },
      set(val) {}
    },
    // 服务商大区分布饼状图配置
    pieOptionList() {
      const that = this;
      const optionList = this.$g.utils.deepClone(pieOptionList); // 注 若不深拷贝，watch中监听的是内存地址，内存地址始终没有发生改变，所以不会触发监听事件
      if (this.agentRegionRatio.length || this.agentLevelRatio.length || this.agentTypeRatio.length) {
        const agentRegion = {
          dataList: this.agentRegionRatio.map((item, index) => { return mapDataList(item, index, 'regionName') }),
          seriesData: this.agentRegionRatio.map((item, index) => { return mapSeriesData(item, index, 'regionName') })
        };
        const agentLevel = {
          dataList: this.agentLevelRatio.map((item, index) => { return mapDataList(item, index, 'gradeName') }),
          seriesData: this.agentLevelRatio.map((item, index) => { return mapSeriesData(item, index, 'gradeName') })
        };
        const agentType = {
          dataList: this.agentTypeRatio.map((item, index) => { return mapDataList(item, index, 'typeName') }),
          seriesData: this.agentTypeRatio.map((item, index) => { return mapSeriesData(item, index, 'typeName') })
        };
        optionList[0].dataList = agentRegion.dataList;
        optionList[0].series[0].data = agentRegion.seriesData;
        optionList[1].dataList = agentLevel.dataList;
        optionList[1].series[0].data = agentLevel.seriesData;
        optionList[2].dataList = agentType.dataList;
        optionList[2].series[0].data = agentType.seriesData;
      }
      return optionList;

      function mapDataList($item, $index, $key) {
        return {
          title: $item[$key],
          perc: that.$g.utils.AccMul($item.countRatio) + '%',
          color: colors[$index]
        }
      }

      function mapSeriesData($item, $index, $key) {
        return {
          value: that.$g.utils.AccMul($item.countRatio),
          name: $item[$key],
          itemStyle: {color: colors[$index]}
        }
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.queryUserDiagram().then(() => {
        this.$nextTick(() => {
          this.queryAllProvinceCount();
          // 获取数据
          this.queryAgentRatio();
        })
        this.search();
      })
    },
    handleCheckAllChange() {
      if (this.checkedSelect.length < 5) {
        this.checkedSelect = this.checkIndex.map(item => {
          return item.value;
        })
      } else {
        this.checkedSelect = [];
      }
    },
    handleChecked() {},
    queryUserDiagram() {
      return api.queryUserDiagram('agent').then(res => {
        this.pagePermission = this.$g.utils.isArr(res.data) ? res.data : [];
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
        diagramType: 'agent',
        diagrams: this.checkedSelect.join(',')
      }).then(res => {
        this.init();
        this.drawer = false;
      })
    },
    cancleClose() {
      this.drawer = false
    },
    // 交易额涨跌排行切换
    handleTradeAmountChange($data) {
      this.agentType = $data;
      this.queryAgentFaceTradeRank();
    },
    // 服务商平均交易额走势
    queryAgentDailyAverageTrade() {
      if (!this.hasPermission('agentAverageTrend')) return;
      api
        .queryAgentDailyAverageTrade(this.ruleForm)
        .then(res => {
          this.lineOption.xAxis[0].data = this.$g.utils.isArr(res.data.date) ? res.data.date : [];
          this.lineOption.series[0].data = this.$g.utils.isArr(res.data.avgAmount) ? res.data.avgAmount : [];
          this.showLine();
        })
    },
    // 总交易排行榜
    queryAgentTradeAmountRank() {
      if (!this.hasPermission('amountRank')) return;
      const params = this.ruleForm;
      params.top = 6;
      api
        .queryAgentTradeAmountRank(params)
        .then(res => {
          this.testData5 = res.data;
        })
    },
    // 新增商户数量排行
    queryNewMerchantRank() {
      if (!this.hasPermission('addMerchantRank')) return;
      const params = this.ruleForm;
      params.top = 6;
      api
        .queryNewMerchantRank(params)
        .then(res => {
          this.testData2 = res.data;
        })
    },
    // 服务商交易统计-服务商刷脸订单排行
    queryAgentFaceTradeRank() {
      if (!this.hasPermission('faceOrderRank')) return;
      const params = this.ruleForm;
      params.top = 3;
      if (this.agentType === '1') {
        api
          .queryAgentFaceTradeAmountRank(params)
          .then(res => {
            this.tableConfigData4.gridConfig[2] = {
              label: "刷脸交易额",
              prop: "actualAmount",
              width: "176px",
              formatter($row) {
                return '¥' + $row['actualAmount'];
              }
            }
            this.testData4 = res.data
          })
      } else {
        api
          .queryAgentFaceTradeCountRank(params)
          .then(res => {
            this.tableConfigData4.gridConfig[2] = {
              label: "刷脸交易笔数",
              prop: "tradeCount",
              width: "176px"
            }
            this.testData4 = res.data;
          })
      }
    },
    // 地图服务商数据
    queryAllProvinceCount() {
      if (!this.hasPermission('agentCount')) return;
      api
        .queryAllProvinceCount({})
        .then(res => {
          if (res.data.length > 0) {
            var total = 0
            for (let i = 0; i < res.data.length; i++) {
              total += res.data[i].count
            }
            this.totalNum = total
          }
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
          this.initMap()
        })
    },
    // 大区占比
    queryAgentRatio() {
      if (!this.hasPermission('agentCount')) return;
      axios.all([api.queryRegionRatio(), api.queryGradeRatio(), api.queryTypeRatio()]).then(
        axios.spread((res1, res2, res3) => {
          this.agentRegionRatio = this.$g.utils.isArr(res1.object) ? res1.object : [];
          this.agentLevelRatio = this.$g.utils.isArr(res2.object) ? res2.object : [];
          this.agentTypeRatio = this.$g.utils.isArr(res3.object) ? res3.object : [];
        })
      )
    },
    handleDataSelect($time) {
      this.$nextTick(() => {
        this.search({
          date: $time
        })
      })
    },
    search($ruleForm) {
      if ($ruleForm) {
        this.ruleForm = {
          beginDate: $ruleForm.date[0],
          endDate: $ruleForm.date[1]
        };
      }
      if (JSON.stringify(this.ruleForm) === "{}") return;
      this.queryAgentDailyAverageTrade();
      this.queryAgentTradeAmountRank();
      this.queryNewMerchantRank();
      this.queryAgentFaceTradeRank();
    },
    handleShowMore($sortField) {
      this.$router.push({ name: "serviceDataDetail", query: {
        sortField: $sortField || "tradeAmount"
      } });
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
    width: 100%;
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
