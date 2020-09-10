<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/profitsDetail') !== -1" />
    <Search open-height="200" :form-base-data="searchConfig.formData" @search="search" />
    <div class="form-table">
      <div class="table-content">
        <div class="form-title">
          <span>支付宝直连分润列表</span>
          <ul>
            <li @click="openDraw">直连分润导入</li>
          </ul>
        </div>
        <BaseCrud
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
      </div>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
    >
      <div class="top-area">
        <span>导入奖励名单</span>
        <img src="../../../assets/img/cancle.png" alt="" @click="drawer = false">
      </div>
      <Form
        :show-foot-btn="aplyAwardData.showFootBtn"
        label-width="130px"
        :form-base-data="aplyAwardData.formData"
        @confirm="confirm"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { SEARCH_CONFIG } from "../formConfig/aliProfitsSearch";
import { SERVICE_CONFIG } from "../tableConfig/aliProfitsConfig";
import { APISRARD_CONFIG } from "../formConfig/apiAward";
import api_statistice from "@/api/api_statistice";

export default {
  name: "AliProfits",
  components: {
    Search,
    BaseCrud,
    Form
  },
  data() {
    return {
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      aplyAwardData: APISRARD_CONFIG,
      drawer: false,
      api: api_statistice.aliAgents,
      params: {},
      tradeMonth: '',
      testData: [],
      apiserver: api_statistice.aliMerchants
    }
  },
  mounted() {},
  methods: {
    search($ruleform) {
      console.log($ruleform)
      this.params = {
        rewardDate: $ruleform.date ? $ruleform.date : "",
        agentNo: $ruleform.inputSelect === 'agentNo' ? $ruleform.inputForm : "",
        agentName: $ruleform.inputSelect === 'agentName' ? $ruleform.inputForm : ""
      }
    },
    openDraw() {
      this.drawer = true
    },
    confirm($filel) {
      console.log($filel)
      api_statistice.excelTemplate({
        param: $filel.date,
        type: "alipayRewardInput",
        url: $filel.excil.dialogImageUrl
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.drawer = false
    },
    cancel() {
      this.drawer = false
    },
    handleDetail($row) {
      this.$router.push({
        path: '/financial/directProfits/aliProfits/profitsDetail',
        query: {
          agentNo: $row.agentNo,
          rewardDate: this.params.tradeMonth,
          merchantName: $row.merchantName,
          apiserver: this.apiserver
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-table {
    width: 100%;
    margin-top: 24px;
    padding: 0 24px 24px 24px;
  }
  .table-content {
    width: 100%;
    background: #ffffff;
    padding: 0 24px;
  }
  .form-title {
    width: 100%;
    padding-bottom: 26px;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      padding: 0 24px;
      border-bottom: 1px solid #1989FA;
      font-size: 16px;
      font-weight: 500;
      line-height: 56px;
      color: #1989FA;
    }
    ul {
      display: flex;
      padding-top: 20px;
      li {
        width: 164px;
        height: 40px;
        background: #1989FA;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        border-radius: 4px;
        margin-left: 16px;
        cursor: pointer;
      }
    }
  }
  .top-area {
    width: 100%;
    height: 76px;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    font-size: 20px;
    font-weight: 500;
    color: #333335;
    margin-bottom: 40px;
  }
  .top-area img {
    width: 16px;
    height: 16px;
  }
  .content {
    width: 100%;
    height: calc(100% - 116px);
    position: relative;
    .g-underline{
      color: #1989FA;
      text-decoration: underline;
    }
  }
  .bottom-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 92px;
    border-top: 1px solid #EBEEF5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bottom-btn button {
    width: 114px;
    margin-right: 24px;
  }
</style>
