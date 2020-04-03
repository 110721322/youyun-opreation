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
          ref="table"
          :params="params"
          :api-service="api"
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
          @delete="onClick_delete"
          @on="onClick_on"
          @off="onClick_off"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_device";
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
      direction: "rtl",
      params: {
        currentPage: 0,
        deviceId: 69528,
        deviceType: 356,
        pageSize: 20
      },
      api: api.deviceMallQueryByPage
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        deviceType: $ruleForm.deviceType,
        deviceId: $ruleForm.deviceId
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    onClick_delete($row) {
      this.$confirm("是否要删除该设备？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .deviceMallDelete({
              id: $row.id
            })
            .then(result => {
              this.$message({
                type: "info",
                message: "删除成功"
              });
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    onClick_off($row) {
      this.$confirm("是否要下架该设备？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认下架",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .off({
              id: $row.id
            })
            .then(result => {
              this.$message({
                type: "info",
                message: "下架成功"
              });
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    onClick_on($row) {
      this.$confirm("是否要上架该设备？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认上架",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .on({
              id: $row.id
            })
            .then(result => {
              this.$message({
                type: "info",
                message: "上架成功"
              });
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    onClick_edit($row) {
      this.$router.push({
        path: "/deviceManage/shopCenter/detail",
        query: { id: $row.id }
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
