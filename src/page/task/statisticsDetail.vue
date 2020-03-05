<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">任务统计详情</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">未完成</el-menu-item>
        <el-menu-item index="2">已完成</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
      <div v-if="isChangeMode">
          <el-form class="table_box">
              <el-form-item
                :key="key"
                v-for="(item,key) in selects"
                :label="item.name + '：'"
                :class="['form_item', key % 2 == 0 ? 'clear_both' : '']"
                :label-width="key % 2 == 0 ? '100px' : '185px'"
                >
                <el-select
                    style="width:294px"
                    v-model="searchData[item.key]"
                    placeholder="请选择"
                    size="large"
                >
                    <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                    >
                    </el-option>
                </el-select>
        </el-form-item>
        <div class="btn_list" style="margin-bottom:0">
            <el-button
            type="primary"
            size="large"
            @click="onClick_search"
            >
            搜索</el-button
            >
            <el-button plain size="large" @click="reset">重置</el-button>
        </div>
          </el-form>
        <data-mode :configData="modeConfigData"></data-mode>
        <div class="table_box">
          <BaseCrud
            :grid-config="configData.gridConfig"
            :grid-btn-config="configData.gridBtnConfig"
            :grid-data="testData"
            :form-config="configData.formConfig"
            :form-data="configData.formModel"
            :grid-edit-width="300"
            :is-async="true"
            :isSelect="false"
            :hideEditArea='configData.hideEditArea'
            @selectionChange="selectionChange"
          >
          </BaseCrud>
        </div>
      </div>
    </transition>
  </div>
</template>

// <script>
// import search from '@/components/search/search.vue';
import dataMode from '@/components/dataMode/dataMode.vue';
import BaseCrud from '@/components/table/BaseCrud.vue';
import { FINISH_CONFIG } from './tableConfig/finishConfig';
import { UNFINISH_CONFIG } from './tableConfig/unfinishConfig';

export default {
    name: 'Theme',
    // components: { search, BaseCrud, dataMode },
    components: {  dataMode, BaseCrud },

    data () {
        return {
            modeConfigData:[
                {
                    title:"任务总数",
                    data:"555个",
                },
            ],
            searchMaxHeight: '240',
            activeIndex: '1',
            configData: UNFINISH_CONFIG,
            testData: [],
            isChangeMode: true,
            searchData:{
                type:'',
                name:'',
                member:'',
            },
            selects: [
                {
                    name: '任务类型',
                    key: 'type',
                    options: [
                        {
                            label: '全部',
                            value: 'all',
                        },
                        {
                            label: '企业',
                            value: 'qiye',
                        },
                        {
                            label: '个人',
                            value: 'geren',
                        },
                    ],
                },
                {
                    name: '任务名称',
                    key: 'name',
                    options: [
                        {
                            label: '全部',
                            value: 'all',
                        },
                        {
                            label: '企业',
                            value: 'qiye',
                        },
                        {
                            label: '个人',
                            value: 'geren',
                        },
                    ],
                },
                {
                    name: '成员',
                    key: 'member',
                    options: [
                        {
                            label: '全部',
                            value: 'all',
                        },
                        {
                            label: '企业',
                            value: 'qiye',
                        },
                        {
                            label: '个人',
                            value: 'geren',
                        },
                    ],
                },
            ],
        };
    },
    mounted () {
        this.getTableData();
    },
    methods: {
        getTableData () {
            this.testData = [
                {
                    type:'日常任务',
                    name:'商户结算失败',
                    num:'4',
                    oper:'提醒',
                    time:'20:00:23'
                },
                {
                    type:'日常任务',
                    name:'商户结算失败',
                    num:'4',
                    oper:'提醒',
                    time:'20:00:23'
                },
            ];
        },
        selectionChange ($val) {
            // eslint-disable-next-line no-console
            console.log($val);
        },
        handleSelect ($item) {
            // eslint-disable-next-line no-console
            this.activeIndex = $item;
            switch ($item) {
                case '1':
                    this.configData = UNFINISH_CONFIG;
                    break;
                case '2':
                    this.configData = FINISH_CONFIG;
                    break;
            }
            this.isChangeMode = false;
            setTimeout(() => {
                this.isChangeMode = true;
            }, 500);
            // 模拟获取数据
            setTimeout(() => {
                this.getTableData();
            }, 1000);
        },
        onClick_search () {
        },
        reset(){
            this.searchData={};
        }
    },
};
</script>

<style scoped>
.table_box {
    position:relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}
</style>
