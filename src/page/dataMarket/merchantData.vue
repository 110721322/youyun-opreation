<template>
  <div class="main_page">
    <div class="p_head">商户数据</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
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
    <div class="title">商户平均交易额走势</div>
    <div class="pie-box">
      <div
        v-for="(item, index) in pieOptionList2"
        :key="index"
        class="pie-item"
      >
        <dataItem
          :radio="radioListData2[index]"
          :title="titleList2[index].name"
          :pie-option="pieOptionList2[index]"
          :piw-ref-name="`echartsPie2${index}`"
          :data-list="dataList2[index]"
          :is-show-pie="true"
        />
      </div>
    </div>
    <div class="pie-box">
      <dataItem
        class="pie-item"
        :title="'无交易商户上期排行'"
        :config-data="tableConfigData"
        :is-show-more="true"
        :is-show-table="true"
        :item-test-data="testData"
        :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
      />
      <dataItem
        :radio="radioListData2[2]"
        class="pie-item"
        :title="'交易额涨跌排行'"
        :config-data="tableConfigData2"
        :is-show-more="true"
        :is-show-table="true"
        :item-test-data="testData1"
        :item-header-cell-style="{ backgroundColor: '#FAFAFA' }"
      />
    </div>
  </div>
</template>
<script>
import dataItem from './components/dataItem.vue'
import search from '@/components/search/search.vue'
import {
  MERCHANTDATACONFIG1,
  MERCHANTDATACONFIG2
} from './tableConfig/merchantDataConfig'
import { FORM_CONFIG } from './formConfig/dataViewSearch'

export default {
  name: 'MerchantData',
  components: {
    search,
    dataItem
  },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      searchMaxHeight: '300',
      testData: [],
      testData1: [],
      tableConfigData: [],
      tableConfigData2: [],
      titleList: [{ name: '商户数大区占比' }, { name: '商户数行业占比' }],
      radioListData: [
        {
          radio: '0',
          namelist: [
            { name: '新增商户', label: '0' },
            { name: '交易商户', label: '1' },
            { name: '流失商户', label: '2' }
          ]
        },
        {
          radio: '0',
          namelist: [
            { name: '新增商户', label: '0' },
            { name: '交易商户', label: '1' },
            { name: '流失商户', label: '2' }
          ]
        }
      ],
      dataList: [
        [
          {
            title: '华东',
            className: ['dot', 'dot_d'],
            perc: '36%'
          },
          {
            title: '华中',
            className: ['dot', 'dot_z'],
            perc: '20%'
          },
          {
            title: '华北',
            className: ['dot', 'dot_b'],
            perc: '10%'
          },
          {
            title: '华南',
            className: ['dot', 'dot_n'],
            perc: '36%'
          },
          {
            title: '华西',
            className: ['dot', 'dot_x'],
            perc: '36%'
          }
        ],
        [
          {
            title: '房产汽车类',
            className: ['dot', 'dot_d'],
            perc: '36%'
          },
          {
            title: '民生类',
            className: ['dot', 'dot_z'],
            perc: '20%'
          },
          {
            title: '一般类',
            className: ['dot', 'dot_b'],
            perc: '10%'
          },
          {
            title: '批发类',
            className: ['dot', 'dot_n'],
            perc: '36%'
          },
          {
            title: '餐娱类',
            className: ['dot', 'dot_x'],
            perc: '36%'
          }
        ]
      ],
      pieOptionList: [
        {
          title: {
            text: '新增商户数大区占比',
            left: 'center',
            textStyle: {
              color: 'rgba(0,0,0,0.85)',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '新增商户数行业占比',
              type: 'pie',
              avoidLabelOverlap: false,
              radius: ['40%', '80%'],
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
                { value: 0.36, name: '华东', itemStyle: { color: '#00A1FF' }},
                { value: 0.2, name: '华中', itemStyle: { color: '#37CBCB' }},
                { value: 0.1, name: '华北', itemStyle: { color: '#FAD337' }},
                { value: 0.09, name: '华南', itemStyle: { color: '#F2637B' }},
                { value: 0.09, name: '华西', itemStyle: { color: '#975FE4' }}
              ]
            }
          ]
        },
        {
          title: {
            text: '交易额行业占比',
            left: 'center',
            textStyle: {
              color: 'rgba(0,0,0,0.85)',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '交易额大区占比',
              type: 'pie',
              avoidLabelOverlap: false,
              radius: ['40%', '80%'],
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
                { value: 0.36, name: '华东', itemStyle: { color: '#00A1FF' }},
                { value: 0.2, name: '华中', itemStyle: { color: '#37CBCB' }},
                { value: 0.1, name: '华北', itemStyle: { color: '#FAD337' }},
                { value: 0.09, name: '华南', itemStyle: { color: '#F2637B' }},
                { value: 0.09, name: '华西', itemStyle: { color: '#975FE4' }}
              ]
            }
          ]
        }
      ],
      titleList2: [
        { name: '平均交易笔数分布' },
        { name: '商户交易涨跌概况占比' }
      ],
      radioListData2: [
        {
          radio: '0',
          namelist: [
            { name: '新增商户', label: '0' },
            { name: '交易商户', label: '1' }
          ]
        },
        {
          radio: '0',
          namelist: [
            { name: '新增商户', label: '0' },
            { name: '交易商户', label: '1' }
          ]
        },
        {
          radio: '0',
          namelist: [
            { name: '涨幅排行', label: '0' },
            { name: '跌幅排行', label: '1' }
          ]
        }
      ],
      dataList2: [
        [
          {
            title: '1000笔以上',
            className: ['dot', 'dot_d'],
            perc: '36%'
          },
          {
            title: '101-1000笔',
            className: ['dot', 'dot_z'],
            perc: '20%'
          },
          {
            title: '11-100笔',
            className: ['dot', 'dot_b'],
            perc: '10%'
          },
          {
            title: '1-10笔',
            className: ['dot', 'dot_n'],
            perc: '36%'
          }
        ],
        [
          {
            title: '大幅上涨',
            className: ['dot', 'dot_d'],
            perc: '36%'
          },
          {
            title: '小幅上涨',
            className: ['dot', 'dot_z'],
            perc: '20%'
          },
          {
            title: '小幅下跌',
            className: ['dot', 'dot_b'],
            perc: '10%'
          },
          {
            title: '异常下跌',
            className: ['dot', 'dot_n'],
            perc: '36%'
          }
        ]
      ],
      pieOptionList2: [
        {
          title: {
            text: '新增商户平均交易笔数概况',
            left: 'center',
            textStyle: {
              color: 'rgba(0,0,0,0.85)',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '新增商户平均交易笔数概况',
              type: 'pie',
              avoidLabelOverlap: false,
              radius: ['40%', '80%'],
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
                { value: 0.36, name: '华东', itemStyle: { color: '#00A1FF' }},
                { value: 0.2, name: '华中', itemStyle: { color: '#37CBCB' }},
                { value: 0.1, name: '华北', itemStyle: { color: '#FAD337' }},
                { value: 0.09, name: '华南', itemStyle: { color: '#F2637B' }},
                { value: 0.09, name: '华西', itemStyle: { color: '#975FE4' }}
              ]
            }
          ]
        },
        {
          title: {
            text: '新增商户交易涨跌概况',
            left: 'center',
            textStyle: {
              color: 'rgba(0,0,0,0.85)',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '新增商户交易涨跌概况',
              type: 'pie',
              avoidLabelOverlap: false,
              radius: ['40%', '80%'],
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
                { value: 0.36, name: '华东', itemStyle: { color: '#00A1FF' }},
                { value: 0.2, name: '华中', itemStyle: { color: '#37CBCB' }},
                { value: 0.1, name: '华北', itemStyle: { color: '#FAD337' }},
                { value: 0.09, name: '华南', itemStyle: { color: '#F2637B' }},
                { value: 0.09, name: '华西', itemStyle: { color: '#975FE4' }}
              ]
            }
          ]
        }
      ]
    }
  },
  created() {
    this.tableConfigData = MERCHANTDATACONFIG1
    this.tableConfigData2 = MERCHANTDATACONFIG2
  },
  mounted() {
    this.getData()
  },
  methods: {
    search() {},
    getData() {
      this.testData = [
        {
          rank: '1',
          name: '利郎男装有限公司',
          times: '707',
          amount: '¥ 206'
        },
        {
          rank: '2',
          name: '利郎男装有限公司',
          times: '707',
          amount: '¥ 206'
        }
      ]
      this.testData1 = [
        {
          rank: '1',
          name: '利郎男装有限公司',
          increase: '128%',
          amount: '¥ 206'
        },
        {
          rank: '2',
          name: '利郎男装有限公司',
          increase: '128%',
          amount: '¥ 206'
        }
      ]
    }
  }
}
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
.title {
  margin: 24px;
  height: 64px;
  line-height: 64px;
  padding-left: 32px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  border-bottom: 1px solid #ebeef5;
  background-color: #ffffff;
}
</style>
