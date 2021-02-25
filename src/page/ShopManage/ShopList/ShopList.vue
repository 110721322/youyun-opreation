<template>
  <div>
    <div class="settle-data">
      <!--数据统计开始-->
      <el-row>
        <el-col :span="item.span" v-for="(item, index) in infoList" :key="index">
          <yun-card-first
            :style="item.style"
            :label="item.label"
            :icon="item.icon"
            :icon-style="item.iconStyle"
            :tooltip="item.tooltip"
            :value="item.value"
            :children="item.children"
          >
          </yun-card-first>
        </el-col>
      </el-row>
    </div>
    <div class="search-box">
      <yun-search :form-base-data="searchConfig.formData" @search="onClickSearch"></yun-search>
    </div>
    <div class="table-box">
      <div class="tab-title">
        <span>门店列表</span>
        <el-button type="primary" size="small">导出</el-button>
      </div>
      <yun-table
        ref="table"
        :is-async="true"
        :grid-config="tableConfig.gridConfig"
        :grid-btn-config="tableConfig.gridBtnConfig"
        :params="params"
        :api-service="api"
        @detail="onClickDetail"></yun-table>
    </div>
  </div>
</template>

<script>
import { SEARCH_CONFIG } from "../formConfig/shopListSearch";
import { TABLE_CONFIG, INFO_LIST } from "../tableConfig/shopListTable";
import api from "@/api/api_shop";
export default {
  name: "ShopList",
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      tableConfig: TABLE_CONFIG,
      api: api.shopQueryByPage,
      params: {},
      testData: [],
      infoList: []
    };
  },
  computed: {
  },
  created() {
    this.infoList = this.$g.utils.deepClone(INFO_LIST)
    this.getListStatistic()
  },
  mounted() {
    this.$EventBus.$on('handleAgentChange', this.handleAgentChange)
  },
  destroyed() { // 销毁EventBus事件
    this.$EventBus.$off('handleAgentChange', this.handleAgentChange)
  },
  methods: {
    getListStatistic() {
      const params = {}
      api.getListStatistic(params).then(res => {
        if (res.status === 0) {
          const statisticData = res.data;
          for (let key in statisticData) {
            if (this.$g.utils.isNumber(statisticData[key])) {
              statisticData[key] = this.$g.utils.toLocaleString(statisticData[key])
            }
          }
          this.infoList = this.$g.utils.eachDetailTree(this.infoList, statisticData)
        }
      })
    },
    handleAgentChange($val) {
      this.searchConfig.formData[5].urlOptions.params["agentNo"] = $val.agentNo;
    },
    onClickSearch($ruleForm) {
      this.params = {
        shopNo: $ruleForm.shopNo,
        shopName: $ruleForm.shopName,
        phone: $ruleForm.phone,
        merchantNo: $ruleForm.merchantNo,
        status: $ruleForm.status,
        agentNo: $ruleForm.agentNo,
        isDisabled: $ruleForm.isDisabled
      }
    },
    onClickDetail(row) {
      this.$router.push({
        name: 'shopDetail',
        query: {
          shopNo: row.shopNo
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  /deep/ .el-image {
    width: 72px;
    height: 72px;
    /deep/ img {
      object-fit: contain;
    }
  }
}
  .settle-data {
    margin: 24px 24px 0;
    /deep/ .m-card .m-top {
      border: 0;
    }
    /deep/ .el-col-4 {
      width: 20%;
    }
  }
.tab-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.tab-title span {
  font-size: 16px;
  font-weight: 500;
}
</style>
