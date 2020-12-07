<template>
  <div>
    <div class="tab-head">
      <span class="title">商城管理</span>
    </div>
    <Search :is-show-all="true" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table-box">
      <div class="tabale-title-box">
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
        :is-show="false"
        @edit="clickEdit"
        @delete="clickDelete"
        @on="clickOn"
        @off="clickOff"
      ></BaseCrud>
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
  name: "ShopCenter",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SHOPCENTER_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      params: {
        deviceId: "",
        deviceType: ""
      },
      api: api.deviceMallQueryByPage
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      const params = {
        deviceType: $ruleForm.deviceType,
        deviceId: $ruleForm.deviceId
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    clickDelete($row) {
      this.$confirm("是否要删除该设备？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      }).then(() => {
        api.deviceMallDelete({
          id: $row.id
        }).then(result => {
          if (result.status === 0) {
            this.$refs.table.getData();
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
    },
    clickOff($row, $item) {
      this.$confirm("是否要下架该设备？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认下架",
        cancelButtonText: "取消"
      }).then(() => {
        api.off({
          id: $row.id
        }).then(result => {
          if (result.status === 0) {
            this.$refs.table.getData();
            this.$message({
              type: "success",
              message: "下架成功"
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
    },
    clickOn($row) {
      this.$confirm("是否要上架该设备？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认上架",
        cancelButtonText: "取消"
      }).then(() => {
        api.on({
          id: $row.id
        }).then(result => {
          if (result.status === 0) {
            this.$refs.table.getData();
            this.$message({
              type: "success",
              message: "上架成功"
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消操作"
        });
      });
    },
    clickEdit($row) {
      this.$router.push({
        name: "shopCenterDetail",
        query: { id: $row.id }
      });
    },
    onClick_addDevice() {
      this.$router.push({
        name: "shopCenterDetail"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
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
}

.form-box {
  display: flex;
  justify-content: space-between;
}

.tabale-title-box {
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
