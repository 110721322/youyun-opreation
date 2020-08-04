<template>
  <div class="main_page">
    <Search open-height="200" :form-base-data="searchConfig.formData" @search="search" />
    <div class="form-table">
      <div class="table-content">
        <div class="form-title">
          <span>微信直连分润列表</span>
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
      <!-- <div class="content">
        <el-form ref="form" :model="form" label-width="160px">
          <el-form-item label="奖励核算时间:">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择月"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上传文件:">
            <div class="flex-align-center">
              <el-upload style="margin-right: 20px;">
                <el-button size="small" type="primary" plain>选择文件</el-button>
              </el-upload>
              <p class="g-underline">模版下载</p>
            </div>
          </el-form-item>
        </el-form>
        <div class="bottom-btn">
          <el-button type="primary">确定</el-button>
          <el-button plain>取消</el-button>
        </div>
      </div> -->
    </el-drawer>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import {SEARCH_CONFIG} from "../formConfig/aliProfitsSearch";
import {SERVICE_CONFIG} from "../tableConfig/aliProfitsConfig";
import {SEARARD_CONFIG} from "../formConfig/aplyAward";
import api_statistice from "@/api/api_statistice";

export default {
  name: "WxProfits",
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
      aplyAwardData: SEARARD_CONFIG,
      api: api_statistice.wxAgents,
      drawer: false,
      params: {},
      tradeMonth: '',
      testData: []
    }
  },
  mounted() {
    // this.getData()
    var myDate = new Date()
    if (myDate.getMonth() < 10) {
      this.tradeMonth = myDate.getFullYear() + "-" + "0" + myDate.getMonth() + "-" + "01"
      this.params = {
        tradeMonth: this.tradeMonth
      }
    } else {
      this.tradeMonth = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + "01"
      this.params = {
        tradeMonth: this.tradeMonth
      }
    }
    // this.ruleform()
  },
  methods: {
    search($ruleform) {
      // console.log('adefe0', $ruleform.date)
      this.params = {
        tradeMonth: $ruleform.date ? $ruleform.date : this.tradeMonth,
        agentNo: $ruleform.inputSelect === 'merchantNo' ? $ruleform.inputForm : "",
        agentName: $ruleform.inputSelect === 'merchantName' ? $ruleform.inputForm : ""
      }
      // console.log(this.params)
    },
    openDraw() {
      this.drawer = true
    },
    confirm($filel) {
      console.log($filel)
      api_statistice.excelTemplate({
        param: $filel.date,
        type: "wxRewardInput",
        url: $filel.excil.dialogImagePath + $filel.excil.dialogImageUrl
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
    handleDetail() {
      this.$router.push({
        path: '/financial/directProfits/wxProfits/profitsDetail'
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
