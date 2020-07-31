<template>
  <div class="main_page">
    <div class="p_head">
      <span class="left-title">交易设置</span>
      <div class="right-area" @click="showRightbar">
        <img src="../../assets/img/menu_icon.png" alt="">
        <span>自定义设置</span>
      </div>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
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
              <span class="amount-icon">¥</span>
              {{ item.amountAll }}
            </div>
            <el-tooltip class="item" effect="dark" :content="item.tooltip" placement="bottom">
              <div class="progress-box">
                <img :src="smileImg" class="data-img" />
                <el-progress
                  :percentage="50"
                  color="rgba(58,189,45,1)"
                  class="progress"
                  :show-text="false"
                />
                <span class="amount-face">¥ {{ item.amountFace }}</span>
              </div>
            </el-tooltip>
            <div
              :class="[radio === index ? 'check-radio' : 'uncheck-radio']"
              @click="onClick_changeRadio(index)"
            />
          </div>
        </div>
        <div class="right">
          <div class="tip">
            <span class="dot_blue" />订单总交易额
            <span class="dot_green" />刷脸总交易额
            <div class="change-btn" @click="onClick_changeArts">
              <img :src="toggleImg" class="change-icon" />
              {{ isLineShow ? '切换柱状图' : '切换折线图' }}
            </div>
          </div>
          <div class="chart-box">
            <div
              ref="echartsLine"
              class="chart-panel"
              :class="[isLineShow ? 'chart-show' : 'chart-hide']"
            />
            <div
              ref="echartsBar"
              class="chart-panel"
              :class="[!isLineShow ? 'chart-show' : 'chart-hide']"
            />
          </div>
        </div>
      </div>
    </div>
    <search
      :is-show-all="true"
      :form-base-data="searchConfig2.formData"
      @search="search2"
      @dataSelect="handleDataSelect2"
    />
    <div class="pie-box">
      <div v-for="(item, index) in pieOptionList" :key="index" class="pie-item">
        <dataItem
          :radio="radioListData[index]"
          :title="titleList[index].name"
          :pie-option="pieOptionList[index]"
          :piw-ref-name="`echartsPie${index}`"
          :data-list="dataList[index]"
          :is-show-pie="true"
        />
      </div>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="40%">
      <div class="draw-title">权限设置</div>
      <div class="draw-content">
        <div class="draw-wran">
          <div class="draw-wranleft">
            <span>i</span>
            <span>涉及各个平台，可定制为自己品牌的logo强化品牌形象</span>
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
</template>

<script>
import api from "@/api/api_dataMarket";
import dataItem from "./components/dataItem.vue";
import search from "@/components/search/search.vue";
// import BaseCrud from '@/components/table/BaseCrud.vue';
import { FORM_CONFIG, FORM_CONFIG2 } from "./formConfig/dataViewSearch";
import smileImg from "@/assets/img/smile.png";
import toggleImg from "@/assets/img/toggle.png";
export default {
  name: "Theme",
  components: { search, dataItem },
  data() {
    return {
      isIndeterminate: true,
      checkAll: false,
      checkedSelect: [],
      checkIndex: ['交易趋势', '大区交易占比', '行业交易占比'],
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
      titleList: [{ name: "大区交易占比" }, { name: "行业交易占比" }],
      radioListData: [
        {
          radio: "0",
          namelist: [
            { name: "交易额", label: "0" },
            { name: "交易笔数", label: "1" }
          ]
        },
        {
          radio: "0",
          namelist: [
            { name: "交易额", label: "0" },
            { name: "交易笔数", label: "1" }
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
      amountList: [
        {
          title: "订单总交易额",
          amountAll: "126,560",
          amountFace: "12,423",
          tooltip: "刷脸交易额占比：22.33%"
        },
        {
          title: "订单总交易笔数",
          amountAll: "126,560",
          amountFace: "12,423",
          tooltip: "刷脸交易额占比：22.33%"
        }
      ],
      inputOptions: [
        {
          label: "商户ID",
          value: "ID"
        },
        {
          label: "商户名称",
          value: "name"
        },
        {
          label: "所属服务商名称",
          value: "agentName"
        },
        {
          label: "开通通道情况",
          value: "openType"
        },
        {
          label: "乐刷商户号",
          value: "leshuaNo"
        },
        {
          label: "新大陆商户号",
          value: "xindaluNo"
        }
      ],
      setects: [
        {
          name: "使用通道",
          key: "channel",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "企业",
              value: "qiye"
            },
            {
              labee: "个人",
              value: "geren"
            }
          ]
        },
        {
          name: "行业类目",
          key: "class",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "已驳回",
              value: "1"
            },
            {
              labee: "待审核",
              value: "2"
            }
          ]
        },
        {
          name: "地区",
          key: "address",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "已驳回",
              value: "1"
            },
            {
              labee: "待审核",
              value: "2"
            }
          ]
        },
        {
          name: "所属运营",
          key: "yunying",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "已驳回",
              value: "1"
            },
            {
              labee: "待审核",
              value: "2"
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
          top: "30px",
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
              "10月",
              "11月",
              "12月",
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "订单总交易额",
            type: "line",
            stack: "总量",
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
                color: "#4EA6FF",
                lineStyle: {
                  color: "#4EA6FF"
                }
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 330]
          },
          {
            name: "刷脸总交易额",
            type: "line",
            stack: "总量",
            lineStyle: {
              color: "#3ABD2D"
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
                    color: "#6CDE61" // 0% 处的颜色
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
                color: "#6CDE61",
                lineStyle: {
                  color: "#6CDE61"
                }
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 330]
          }
        ]
      },
      barOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "10月",
              "11月",
              "12月",
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "订单总交易额",
            type: "bar",
            stack: "总量",
            itemStyle: {
              color: "#1890FF"
            },
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 330]
          },
          {
            name: "刷脸总交易额",
            type: "bar",
            stack: "总量",
            itemStyle: {
              color: "#34B64C"
            },
            data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 330]
          }
        ]
      },
      pieOptionList: [
        {
          title: {
            text: "交易额大区占比",
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
      beginDate: null,
      endDate: null,
      beginDate2: null,
      endDate2: null,
      tradeByTypeData: {},
      tradeByBrokenLineData: {}
    };
  },
  mounted() {
    this.init();
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
    // 每日订单交易额/交易笔数折线图
    queryDailyTradeBrokenLine($ruleForm) {
      api
        .queryDailyTradeBrokenLine({
          beginDate: $ruleForm.date[0],
          endDate: $ruleForm.date[0]
        })
        .then(res => {
          this.tradeByBrokenLineData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 各支付方式的总交易额/交易笔数
    queryTradeByType($ruleForm) {
      api
        .queryTradeByType({
          beginDate: $ruleForm.date[0],
          endDate: $ruleForm.date[0]
        })
        .then(res => {
          this.tradeByTypeData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 第一行第一个饼图切换
    handleDataSelect($time) {
      this.beginDate = $time[0];
      this.endDate = $time[1];
      api
        .queryTradeByType({
          beginDate: $time[0],
          endDate: $time[1]
        })
        .then(res => {
          this.tradeByTypeData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
      api
        .queryDailyTradeBrokenLine({
          beginDate: $time[0],
          endDate: $time[1]
        })
        .then(res => {
          this.tradeByBrokenLineData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    // 第一行第二个饼图切换
    handleDataSelect2($time) {
      this.beginDate2 = $time[0];
      this.endDate2 = $time[1];
      api
        .tradeDataQueryRegionTradeSummaryByCondition({
          beginDate: $time[0],
          endDate: $time[1]
        })
        .then(res => {
          // this.tradeByTypeData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
      api
        .tradeData({
          beginDate: $time[0],
          endDate: $time[1]
        })
        .then(res => {
          // this.tradeByTypeData = res.object;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    init() {
      this.showLine();
      //   this.showBar();
    },
    onClick_changeArts() {
      this.isLineShow = !this.isLineShow;
      this.isLineShow ? this.showLine() : this.showBar();
    },
    onClick_changeRadio($index) {
      this.radio = $index;
    },
    showLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChartLine = this.$echarts.init(this.$refs.echartsLine);

      // 绘制图表
      myChartLine.setOption(this.lineOption);
      window.addEventListener("resize", function() {
        myChartLine.resize();
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
    search($ruleForm) {
      this.queryTradeByType($ruleForm);
    },
    search2() {
      this.getData();
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
    .dot_blue {
      display: inline-block;
      margin-right: 8px;
      width: 6px;
      height: 6px;
      background: #1989fa;
      border-radius: 50%;
      vertical-align: middle;
    }
    .dot_green {
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
</style>
