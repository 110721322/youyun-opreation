<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">商城管理</span>
      </div>
      <Search :is-show-all="true" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <div class="tabale_title_box">
          <el-button class="btn" type="primary" @click="onClick_addDevice">添加出售设备</el-button>
        </div>
        <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="150"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @edit="onClick_edit"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./../formConfig/shopCenterSearch";
import { SHOPCENTER_CONFIG } from "./../tableConfig/shopCenterConfig";

export default {
  name: "Theme",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SHOPCENTER_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl"
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData() {
      this.testData = [
        {
          type: "日常任务",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          amount: "222.22",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          reason: "银行卡账号错误，服务商无法联系"
        },
        {
          id: 2,
          type: "日常任务",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          amount: "222.22",
          reason: "银行卡账号错误，服务商无法联系"
        }
      ];
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    onClick_edit() {
      this.$router.push({
        path: "/deviceManage/shopCenter/detail"
      });
    },
    onClick_addDevice() {
      this.$router.push({
        path: "/deviceManage/shopCenter/detail"
      });
    },
    cancel(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
}

.tabale_title_box {
  height: 52px;
  width: 100%;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
    margin-left: 10px;
    // line-height: 52px;
  }
  .btn {
    float: right;
  }
}
</style>
