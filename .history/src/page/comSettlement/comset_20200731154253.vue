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
          <li><p>活动奖励(元)</p><p style="color: #1989FA; font-size: 20px; font-weight: 500; line-height: 32px;">¥904.45</p></li>
          <li>
            <p>总佣金</p>
            <p style="font-size: 24px; margin-top: 4px; line-height: 24px; font-weight: 500; color: #333333">¥904.45</p>
            <div class="option-btn">
              <el-button type="primary" @click="drawer=true">立即结算</el-button>
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
            :api-service="null"
            @detail="onClick_detail"
          ></BaseCrud>
        </div>
      </div>
      <el-drawer
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose"
      >
        <div slot="title" class="drawer-contenttitle">
          <span>申请结算</span>
        </div>
        <div class="content-draw">
          <div class="content-form">
            <div class="content-title">结算金额</div>
            <div class="form-select">
              <div class="select">
                <div class="left-label">结算类型：</div>
                <el-checkbox-group v-model="isChenk">
                  <el-checkbox label="复选框 A" class="select-box"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="select" style="margin: 16px 0 24px 0;">
                <div class="left-label">总佣金：</div>
                <div class="select-price">¥52.30</div>
              </div>
            </div>
          </div>
          <div class="content-form">
            <div class="content-title">结算信息</div>
            <Form
              :form-base-data="fromConfigData.formData"
              :show-foot-btn="fromConfigData.showFootBtn"
              label-width="130px"
              @cancel="cancel"
              @confirm="confirm"
            ></Form>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SERVICE_CONFIG } from "./tableConfig/comsetConfig";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./formConfig/thirdPartyDetail";
import api_statistice from "@/api/api_statistice";
export default {
  components: {
    BaseCrud,
    Form
  },
  data() {
    return {
      fromConfigData: FORM_CONFIG.detailData,
      configData: SERVICE_CONFIG,
      testData: [],
      drawer: false,
      isChenk: [],
      api: api_statistice
    }
  },
  created() {
    this.apirulefor()
  },
  mounted() {
    this.getData()
  },
  methods: {
    apirulefor() {
      api_statistice
        .querySettleSum({
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err);
        });
    },
    onClick_detail() {
      this.$router.push({
        path: '/comSettlement/comset/comsetDetail'
      })
    },
    handleClose() {
      this.drawer = false
    },
    cancel() {},
    confirm() {}
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
  .el-drawer__header {
    margin-bottom: 20px;
  }
  .option-btn button {
    width: 110px;
    height: 32px;
  }
  .drawer-contenttitle {
    font-size: 20px;
    font-weight: 500;
  }
  .content-draw {
    width: 100%;
    padding: 24px 32px 100px 32px;
  }
  .content-form {
    width: 100%;
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  .content-title {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #E9E9E9;
    background: #EBEEF5;
    line-height: 44px;
    padding-left: 24px;
    font-size: 14px;
    font-weight: 500;
  }
  .form-select {
    padding: 32px 0;
  }
  .select {
    display: flex;
  }
  .left-label {
    width: 130px;
    text-align: right;
    margin-right: 6px;
  }
  .select-price {
    font-size: 14px;
    color: #606266;
  }
</style>

