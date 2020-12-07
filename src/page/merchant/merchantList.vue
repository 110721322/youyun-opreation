<template>
  <div>
    <div class="p-head">商户列表</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <!-- <data-mode></data-mode> -->
    <div class="table-box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="200"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @detail="goDetail"
        @openAgentManager="openAgentManager"
        @openMerchantManager="openMerchantManager"
      >
        <div slot="head" slot-scope="item">
          <span>{{ item.item.label }}</span>
          <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
            <div slot="content">
              <div>
                <span class="dot opened"></span>已开通
              </div>
              <div>
                <span class="dot review"></span>审核中
              </div>
              <div>
                <span class="dot reject"></span>驳回
              </div>
              <div>
                <span class="dot unused"></span>未审核
              </div>
            </div>
            <i class="el-icon-info" />
          </el-tooltip>
        </div>
      </BaseCrud>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_merchant";
import apiLog from "@/api/api_agent"
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/merchantConfig";
import { FORM_CONFIG } from "./formConfig/merchantListSearch";

export default {
  name: "MerchantList",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "380",
      searchConfig: FORM_CONFIG,
      configData: USER_CONFIG,
      testData: [],
      params: {},
      api: api.queryPageByCondition
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goDetail(row) {
      this.$router.push({
        name: "merchantDetail",
        query: {
          merchantNo: row.merchantNo
        }
      });
    },
    // openAgentManager(row) {
    //   api.generateLoginTicket({
    //     system: 'agent',
    //     phone: row.loginAccount,
    //     password: row.password
    //   }).then(res => {
    //     if (res.status === 0) {
    //       window.open(process.env.VUE_APP_AGENTURL + '#/login?ticket' + '=' + res.data)
    //     }
    //   })
    // },
    openAgentManager($row) {
      apiLog.generateLoginTicket({
        system: 'agent',
        phone: $row.agentLoginAccount,
        password: $row.agentPassword
      }).then(res => {
        if (res.status === 0) {
          window.open(process.env.VUE_APP_AGENTURL + '#/login?ticket' + '=' + res.data)
        }
      })
    },
    openMerchantManager($row) {
      apiLog.generateLoginTicket({
        system: 'merchant',
        phone: $row.merchantLoginAccount,
        password: $row.merchantPassword
      }).then(res => {
        if (res.status === 0) {
          window.open(process.env.VUE_APP_MERCHANTURL + '#/login?ticket' + '=' + res.data)
        }
      })
    },
    search($ruleForm) {
      this.params = {
        beginTime: $ruleForm.date[0] ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date[0] ? $ruleForm.date[1] : null,
        provinceCode: $ruleForm.address ? $ruleForm.address[0] : null,
        cityCode: $ruleForm.address ? $ruleForm.address[1] : null,
        useChannelCode: $ruleForm.channelCode ? $ruleForm.channelCode : null,
        channelStatus: $ruleForm.channelStatus ? $ruleForm.channelStatus : null,
        categoryCode: $ruleForm.categoryCode ? $ruleForm.categoryCode : null,
        operationId: $ruleForm.operationId ? $ruleForm.operationId : null,
        [$ruleForm.search]: $ruleForm.searchVal
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #52c41a;
  vertical-align: middle;
  margin: 0 5px;
  &.opened {
    background-color: #52c41a;
  }
  &.review {
    background-color: #ffc620;
  }
  &.reject {
    background-color: #f5222d;
  }
  &.unused {
    background-color: #9c9c9c;
  }
}
</style>
