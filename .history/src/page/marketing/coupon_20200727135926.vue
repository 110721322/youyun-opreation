<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/addCoupon') !== -1 || this.$route.path.indexOf('/couponDetail') !== -1" />
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
          @extension="extension"
          @detail="goDetail"
          @stopAcitive="stopAcitive"
        />
      </div>
      <el-dialog
        title="领取优惠码"
        :visible.sync="dialogVisible"
        width="420px"
        height="394px"
        :before-close="handleClose"
      >
        <div class="dialog_code">
          <img src="../../assets/img/qr_code.jpg" alt="">
        </div>
        <div class="option-btn">
          <div class="copy-btn">
            <img src="../../assets/img/copy_icon.png" alt="">
            <div>复制链接</div>
          </div>
          <span></span>
          <div class="down-btn">
            <img src="../../assets/img/down_icon.png" alt="">
            <div>点击下载</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
      api: api.agentExamineList,
      dialogVisible: false
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
    extension() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    goDetail() {
      this.$router.push({
        path: "/marketing/coupon/couponDetail"
      })
    },
    stopAcitive() {},
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
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding: 0 0;
  }
  .dialog_code {
    width: 100%;
    img {
      display: block;
      width: 164px;
      height: 164px;
      margin: 0 auto;
    }
  }
  .option-btn {
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
    .copy-btn,.down-btn {
      display: flex;
      img {
        width: 16px;
        height: 16px;
        display: block;
        margin-right: 2px;
      }
    }
    .copy-btn {
      margin-left: 90px;
      color: #1989FA;
    }
    .down-btn {
      margin-right: 90px;
    }
    span {
      display: block;
      width: 1px;
      height: 16px;
      background: #DCDFE6;
    }
  }
</style>
