<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/addCoupon') !== -1" />
    <div v-else>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />
      <!-- <data-mode></data-mode> -->
      <div class="table_box">
        <div class="add-btn">
          <button @click="onClick_add">创建优惠码</button>
        </div>
        <BaseCrud
          ref="child"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="false"
          :params="params"
          :api-service="null"
          @reject="reject"
          @activation="activation"
          @adopt="adopt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/couponConfig";
import { FORM_CONFIG } from "./formConfig/couponSearch";
export default {
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "320",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      params: {},
      api: api.agentExamineList
    }
  },
  created() {
    this.params = {}
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = [
        {
          sort: "1",
          couponName: "10元优惠券",
          couponPrice: "10",
          timeData: "2020-06-15 至 2020-06-30",
          status: "1",
          sale: "1000",
          achieve: 1000,
          writeOff: '30'
        },
        {
          sort: "2",
          couponName: "20元优惠券",
          couponPrice: "20",
          timeData: "2020-06-15 至 2020-06-30",
          status: "0",
          sale: "2000",
          achieve: 2000,
          writeOff: '40'
        }
      ]
    },
    search() {},
    reject() {},
    activation() {},
    adopt() {},
    onClick_add() {
      this.$router.push({
        path: "/marketing/coupon/addCoupon"
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .table_box {
    margin: 24px;
    padding: 24px;
    overflow: hidden;
    background: #fff;
    min-width: 1000px;
    .add-btn{
      width: 100%;
      padding: 0 0 17px 0;
      button {
        width: 102px;
        height: 32px;
        background: #1989FA;
        color: #ffffff;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
</style>
