<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/activityAwardDetail') !== -1" />
    <div v-else>
      <Search
        :is-show-all="ture"
        :open-height="searchHeight"
        :form-base-data="searchConfig.formData"
        @search="search"
      />
      <div class="form-table">
        <div class="table-content">
          <div class="form-title">
            <span>支付宝小蜻蜓</span>
            <ul>
              <!-- <li>下载导入奖励模板</li> -->
              <li @click="openDraw">导入蜻蜓奖励名单</li>
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
        <div class="content">
          <!-- <el-form ref="form" :model="form" label-width="160px">
            <el-form-item label="奖励核算时间">
              <el-date-picker
                v-model="value1"
                type="date"
                :form-base-data="aplyAwardData.formData"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="上传文件">
              <UploadFile
                :form-base-data="aplyAwardData.formData"
                :form-item="null"
                :show-word-limit="null"
                :rule-form="null"
              />
            </el-form-item>
          </el-form> -->
          <Form
            :params="params"
            :api-service="apiexci"
            :form-base-data="aplyAwardData.formData"
            label-width="130px"
            @confirm="confirm"
            @cancel="cancel"
          ></Form>
          <!-- <div class="bottom-btn">
            <el-button type="primary" @click="ruleform">确定</el-button>
            <el-button plain @click="drawer = false">取消</el-button>
          </div> -->
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import api_statistice from "@/api/api_statistice";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
// import UploadFile from "@/components/form/components/UploadFile.vue";
import {SEARCH_CONFIG} from "../formConfig/aplySearch";
import {SEARARD_CONFIG} from "../formConfig/aplyAward";
import {SERVICE_CONFIG} from "../tableConfig/aplyConfig";

export default {
  components: {
    Search,
    BaseCrud,
    Form
    // UploadFile
  },
  data() {
    return {
      searchHeight: '200',
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      aplyAwardData: SEARARD_CONFIG,
      testData: [],
      drawer: false,
      params: {},
      form: {},
      value1: '',
      api: api_statistice.queryByPage,
      apiexci: api_statistice.merchantinput
    }
  },
  mounted() {
    this.getData()
    this.ruleform()
  },
  methods: {
    // getData() {
    //   this.testData = [
    //     {
    //       time: '2020-06-18',
    //       topSrevice: '紫菜麻辣烫',
    //       active: '22555',
    //       user: '253',
    //       total: '4555'
    //     }
    //   ]
    // },
    search($ruleform) {
      this.params = {
        tradeMonth: $ruleform.date,
        agentNo: $ruleform.inputSelect === 'merchantNo' ? $ruleform.inputForm : "",
        agentName: $ruleform.inputSelect === 'merchantName' ? $ruleform.inputForm : ""
      }
      console.log(this.params)
    },
    handleDetail($row) {
      this.$router.push({
        path: '/financial/activityAward/activityAwardDetail',
        query: {
          agentNo: $row.agentNo,
          tradeMonth: this.params.tradeMonth
        }
      })
    },
    openDraw() {
      this.drawer = true
    },
    confirm($filel) {
      this.params = {
        date: $filel.date,
        file: $filel.excil.dialogImagePath + $filel.excil.dialogImageUrl
      }
      this.drawer = false
      console.log(this.form)
    },
    cancel() {
      this.drawer = false
    }
  }
}
</script>

<style scoped>
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
  }
  .form-title span {
    display: block;
    padding: 0 24px;
    border-bottom: 1px solid #1989FA;
    font-size: 16px;
    font-weight: 500;
    line-height: 56px;
    color: #1989FA;
  }
  .form-title ul {
    display: flex;
    padding-top: 20px;
  }
  .form-title ul li {
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
