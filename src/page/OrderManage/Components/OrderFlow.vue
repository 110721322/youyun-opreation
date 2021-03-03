<template>
  <div>
    <yun-search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">{{ title }}</div>
        <div class="m-right">
          <el-button type="primary" class="left-btn">导出</el-button>
        </div>
      </div>
      <div class="basecrud-box">
        <yun-table
          ref="table"
          :grid-config="gridConfig"
          :grid-btn-config="gridBtnConfig"
          :grid-edit-width="80"
          :is-async="true"
          :is-select="false"
          :is-data-select="false"
          :is-table-expand="false"
          :row-key="'rank'"
          :default-expand-all="false"
          :hide-edit-area="false"
          :params="params"
          :api-service="api"
          @detail="onClickDetail"
        ></yun-table>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_order";
  import { SEARCH_CONFIG } from "../formConfig/flowFormConfig";
  import { TABLE_CONFIG } from "../tableConfig/flowTableConfig";

  export default {
    name: "ShopData",
    data() {
      return {
        searchConfig: SEARCH_CONFIG,
        title: '',
        params: {
          queryBeginPayTime: this.$g.utils.getToday(0) + ' 00:00:00',
          queryEndPayTime: this.$g.utils.getToday(0) + ' 23:59:59'
        },
        api: api.orderSelectByPage,
        gridConfig: TABLE_CONFIG.gridConfig,
        gridBtnConfig: TABLE_CONFIG.gridBtnConfig
      }
    },
    created() {
      this.title = '订单流水'
    },
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          orderNo: $ruleForm.orderNo,
          shopNo: $ruleForm.shopNo,
          queryBeginPayTime: $ruleForm.date?$ruleForm.date[0]:'',
          queryEndPayTime: $ruleForm.date?$ruleForm.date[1]:'',
          tradeType: $ruleForm.tradeType,
          payWay: $ruleForm.payWay,
          agentNo: $ruleForm.agentNo,
          merchantNo: $ruleForm.merchantNo,
          orderStatus: $ruleForm.orderStatus,
          deviceType: $ruleForm.deviceType
        }
        this.$emit('clickSearch', this.params)
      },
      onClickDetail(row) {
        this.$router.push({
          name: 'flowDetail',
          query: {
            merchantNo: row.merchantNo,
            shopNo: row.shopNo,
            orderNo: row.orderNo
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .m-basecrud {
    padding: 24px 24px;
    .m-basecrud-title {
      display: flex;
      justify-content: space-between;
      padding: 24px 24px;
      background: #fff;
      .m-left {
        font-size: 16px;
      }
      .m-right {
        display: flex;
        button {
          margin: 0;
          padding: 0 20px;
          height: 32px;
          line-height: 32px;
        }
        .left-btn {
          margin-right: 16px;
        }
      }
    }
    .basecrud-box {
      padding: 0 24px 24px;
      background: #fff;
    }
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
</style>
