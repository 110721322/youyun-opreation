<template>
  <div class="m-page">
    <div class="profit-data">
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
    <yun-search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">商户列表</div>
        <el-button type="primary">导出</el-button>
      </div>
      <div class="basecrud-box">
        <yun-table
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-select="false"
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
            :params="params"
            :api-service="api"
            @details="onClickDetails"
            @goMerchant="onClickGoMerchant"
        ></yun-table>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_merchantManage.js";
  import commonApi from "@/api/api_common.js"
  import { SEARCH_FORM_CONFIG } from "./FormConfig/MerchantListSearch"
  import { MERCHANT_LIST_CONFIG } from "./TableConfig/ListConfig"
  import { STATISTICS_LIST } from "./TableConfig/MerchantListConfig"

  export default {
    name: "MerchantList",
    data() {
      return {
        params: {},
        api: api.merchantList,
        searchConfig: SEARCH_FORM_CONFIG,
        gridConfig: MERCHANT_LIST_CONFIG.gridConfig,
        gridBtnConfig: MERCHANT_LIST_CONFIG.gridBtnConfig,
        infoList: []
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(STATISTICS_LIST)
      this.getMerchantNum()
    },
    methods: {
      getMerchantNum() {
        api.merchantCount().then(res => {
          if (res.status === 0) {
            this.infoList.forEach((item, index) => {
              item.value = String(res.data[item.key])
            })
          }
        })
      },
      onClickSearch($ruleForm) {
        this.params = {
          merchantNo: $ruleForm.merchantNo ? $ruleForm.merchantNo : null,
          merchantName: $ruleForm.merchantName ? $ruleForm.merchantName : null,
          agentNo: $ruleForm.agentNo ? $ruleForm.agentNo : null,
          isDisabled: $ruleForm.isDisabled === 1 ? 1 : $ruleForm.isDisabled === 0 ? 0 : null
        }
      },
      onClickDetails(row) {
        this.$router.push({
          name: 'MerchantDetail',
          query: {
            merchantNo: row.merchantNo,
            id: row.id
          }
        })
      },
      onClickGoMerchant(row) {
        commonApi.generateLoginTicket({
          system: 'merchant',
          phone: row.loginAccount,
          password: row.password
        }).then(res => {
          if (res.status === 0) {
            window.open(process.env.VUE_APP_MERCHANT_URL + '#/Login?ticket' + '=' + res.data)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .profit-data {
      margin: 24px 0 0 24px;
    }
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
      }
      .basecrud-box {
        padding: 0 24px 24px;
        background: #fff;
      }
    }
  }
  /deep/ .m-card {
    margin-bottom: 0;
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
</style>
