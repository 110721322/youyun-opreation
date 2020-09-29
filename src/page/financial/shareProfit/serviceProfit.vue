<template>
  <div>
    <div class="tab_head">
      <span class="title">服务商分润统计</span>
    </div>
    <div class="main-top">
      <el-menu
        :default-active="mainIndex"
        class="el-menu"
        mode="horizontal"
        @select="onClick_main"
      >
        <el-menu-item v-for="(item, index) in mainData" :key="index" :index="index">{{ item.value }}</el-menu-item>
      </el-menu>
    </div>
    <Search
      :open-height="searchHeight"
      :form-base-data="searchConfig.formData"
      :is-show-all="true"
      @search="search"
    />
    <div class="select">
      <el-menu
        style="margin-bottom: 8px"
        :default-active="selectIndex"
        class="el-menu"
        mode="horizontal"
        @select="onClick_select"
      >
        <el-menu-item v-for="(item, index) in selectData" :key="index" :index="index">{{ item.value }}</el-menu-item>
      </el-menu>
      <div class="table_box">
        <!-- 支付方式 -->
        <BaseCrud
          v-if="selectIndex===0"
          ref="table"
          :params="params"
          :api-service="api"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="100"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          @detail="handleDetail"
        ></BaseCrud>
        <!-- 通道 -->
        <BaseCrud
          v-if="selectIndex===1"
          ref="table"
          :params="params"
          :api-service="api"
          :grid-config="configData1.gridConfig"
          :grid-btn-config="configData1.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData1.formConfig"
          :form-data="configData1.formModel"
          :grid-edit-width="100"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          @detail="handleDetail"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/serviceSearch";
import { SERVICE_CONFIG } from "../tableConfig/serviceConfig";
import { SERVICE_CONFIG1 } from "../tableConfig/serviceJianConfig";
import { TOPVICE_CONFIG1 } from "../tableConfig/TopAgentData";
import { TOPERVICE_CONFIG } from "../tableConfig/TopConfig";
import api_statistice from "@/api/api_statistice"
export default {
  name: "ServiceProfit",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      configData1: SERVICE_CONFIG1,
      testData: [],
      searchHeight: '300',
      agendoquery: '',
      params: {
        tradeMonth: '',
        channelAgentCode: '',
        agentNo: ''
      },
      selectData: [
        {
          value: '按支付方式',
          id: 1
        },
        {
          value: '按通道',
          id: 2
        }
      ],
      mainData: [
        {
          value: '顶级服务商',
          id: 1
        },
        {
          value: '服务商',
          id: 2
        }
      ],
      selectIndex: 0,
      mainIndex: 0,
      api: api_statistice.selectTopAgentDataByPage
    }
  },
  computed: {
    // api() {
    //   if (this.mainIndex === 0) {
    //     return api_statistice.selectTopAgentDataByPage
    //   } else {
    //     return api_statistice.selectAgentDataByPage
    //   }
    // }
  },
  mounted() {},
  created() {
    var myDate = new Date()
    const m = myDate.getMonth() + 1
    if (myDate.getMonth() < 10) {
      this.tradeMonth = myDate.getFullYear() + "-" + "0" + m + "-" + "01"
    } else {
      this.tradeMonth = myDate.getFullYear() + "-" + m + "-" + "01"
    }
    if (this.mainIndex === 0) {
      this.configData = TOPERVICE_CONFIG
      this.configData1 = TOPVICE_CONFIG1
    }
    this.params = {
      tradeMonth: this.tradeMonth
    }
    // this.api = api_statistice.selectTopAgentDataByPage
    // this.search()
  },
  methods: {
    onClick_select(index) {
      this.selectIndex = index
    },
    onClick_main(index) {
      this.mainIndex = index
      this.params = {
        tradeMonth: this.tradeMonth
      }
      if (this.mainIndex === 0) {
        this.configData = TOPERVICE_CONFIG
        this.configData1 = TOPVICE_CONFIG1
        this.api = api_statistice.selectTopAgentDataByPage
      } else if (this.mainIndex === 1) {
        this.configData = SERVICE_CONFIG
        this.configData1 = SERVICE_CONFIG1
        this.api = api_statistice.selectAgentDataByPage
      }
      this.$refs.table.getData()
      console.log(this.$refs.table)
    },
    search($ruleform) {
      this.params = {
        tradeMonth: $ruleform.date ? ($ruleform.date + "-" + "01") : this.tradeMonth
      }
      this.tradeMonth = $ruleform.date ? ($ruleform.date + "-" + "01") : this.tradeMonth
    },
    handleDetail($row) {
      if (this.mainIndex === 0) {
        this.$router.push({
          name: 'serviceProfitDetail',
          query: {
            enterType: 0,
            agentNo: $row.channelAgentCode,
            tradeMonth: this.tradeMonth,
            mainIndex: this.mainIndex
          }
        })
      }
      if (this.mainIndex === 1) {
        this.$router.push({
          name: 'serviceProfitDetail',
          query: {
            enterType: 1,
            agentNo: $row.agentNo,
            tradeMonth: this.tradeMonth,
            mainIndex: this.mainIndex
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .tab_head{
    border-bottom: 0px;
  }
  .main_page {
    .el-menu {
      margin-left: 12px;
      /deep/ .is-active{
        color: #1989FA!important;
      }
    }
    .el-menu--horizontal{
      /deep/ .is-active{
        color: #1989FA!important;
      }
    }

    .el-menu-item {
      height: 40px;
      line-height: 32px;
      font-size: 16px;
    }
    .main-top {
        width: 100%;
        padding: 0 24px;
        background: #ffffff;
        border-bottom: 1px solid #e6e6e6;
        .main-item {
          height: 56px;
          line-height: 56px;
          color: #606266;
          font-size: 16px;
          // margin-right: 44px;
          padding: 0 20px;
          cursor: pointer;
        }
        .main-item.isSelect {
          color: #1989FA;
          border-bottom: 1px solid #1989FA;
          font-weight: 500;
        }
      }
    .select {
      width: 100%;
      padding: 24px;
      background: #ffffff;
      margin:24px;
      .select-top {
        width: 100%;
        display: flex;
        margin-bottom: 16px;
        border-bottom: 1px solid #e6e6e6;
        .select-item {
          // height: 56px;
          // line-height: 56px;
          color: #606266;
          font-size: 16px;
          padding: 0 20px;
          padding-bottom: 16px;
          cursor: pointer;
        }
        .select-item.isSelect {
          color: #1989FA;
          border-bottom: 1px solid #1989FA;
          font-weight: 500;
        }
      }
    }
  }

</style>
