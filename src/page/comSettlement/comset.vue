<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/comsetDetail') !== -1" />
    <div v-else>
      <div class="top_head">
        <span>佣金结算</span>
        <span>结算时间为每月28日至下月10日，需快递发票单</span>
        <span>查看发票信息></span>
      </div>
      <div class="content">
        <ul class="content-banner">
          <li><p>间联佣金(元)</p><p style="color: #262626; line-height: 32px; font-weight: 500; font-size: 20px;">¥904.45</p></li>
          <li><p>活动奖励(元)</p><p style="color: #1989FA; font-size: 20px;font-weight: 500; line-height: 32px;">¥904.45</p></li>
          <li>
            <p>总佣金</p>
            <p style="font-size: 24px; margin-top: 4px; line-height: 24px; font-weight: 500; color: #333333">¥904.45</p>
            <div class="option-btn">
              <el-button type="primary">立即结算</el-button>
              <el-button type="primary" plain>结算记录</el-button>
            </div>
          </li>
        </ul>
        <div class="table_box">
          <BaseCrud
                  :grid-config="configData.gridConfig"
                  :grid-btn-config="configData.gridBtnConfig"
                  :grid-data="testData"
                  :form-config="configData.formConfig"
                  :form-data="configData.formModel"
                  :grid-edit-width="200"
                  :is-async="true"
                  :is-select="false"
                  :is-expand="false"
                  :row-key="'id'"
                  :default-expand-all="false"
                  :hide-edit-area="configData.hideEditArea"
                  :header-cell-style="headerCellStyle"
                  :api-service="null"
                  @detail="onClick_detail"
          ></BaseCrud>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SERVICE_CONFIG } from "./tableConfig/comsetConfig";
export default {
  components: {BaseCrud},
  data() {
    return {
      configData: SERVICE_CONFIG,
      testData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = [
        {
          time: '1',
          money: '200',
          commission: '100'
        },
        {
          time: '2',
          money: '253.21',
          commission: '120.14'
        }
      ]
    },
    onClick_detail() {
      this.$router.push({
        path: '/comSettlement/comset/comsetDetail'
      })
    }
  }
}
</script>

<style scoped>
  .top_head {
    width: 100%;
    height: 76px;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding-left: 32px;
  }
  .top_head span:nth-child(1) {
    display: block;
    font-size: 20px;
    font-weight: 500;
    margin-right: 16px;
  }
  .top_head span:nth-child(2) {
    font-size: 14px;
    color: #909399;
  }
  .top_head span:nth-child(3) {
    font-size: 14px;
    color: #1989FA;
    cursor: pointer;
  }
  .content {
    width: 100%;
    padding: 24px 24px;
  }
  .content-banner {
    width: 100%;
    height: 184px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .content-banner li {
    width: 33.3%;
    text-align: center;
  }
  .content-banner li:nth-child(1) {
    padding: 50px 0 0 0;
  }
  .content-banner li:nth-child(2) {
    padding: 50px 0 0 0;
  }
  .content-banner li:nth-child(3) {
    padding-top: 35px;
  }
  .content-banner li p {
    color: #909399;
    margin-bottom: 16px;
  }
  .content-banner li p:nth-child(1) {
    font-size: 14px;
    color: #9E9E9E;
    font-weight: 500;
  }
  .option-btn button {
    width: 110px;
    height: 32px;
  }
</style>

