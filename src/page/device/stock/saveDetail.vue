<template>
  <div>
    <div class="tab_head">
      <span class="title">入库明细</span>
    </div>
    <Search :is-show-all="true" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <div class="tabale_title_box">
        <div class="title">库存列表</div>
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
        @remove="onClick_remove"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :isDrawer='true'
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_device";
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { FORM_CONFIG } from "./../formConfig/saveDtlDetail";
import { SEARCH_CONFIG } from "./../formConfig/saveDetailSearch";
import { SAVEDETAIL_CONFIG } from "./../tableConfig/saveDetailConfig";

export default {
  name: "SaveDetail",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SAVEDETAIL_CONFIG,
      fromConfigData: FORM_CONFIG.formData,
      testData: [],
      drawer: false,
      direction: "rtl",
      params: {
        currentPage: 1,
        deviceIdentifier: '',
        deviceInputId: this.$route.query.id,
        pageSize: 1
      },
      rowId: '',
      api: api.queryInputPage
    };
  },
  mounted() {
  },
  methods: {
    search($ruleForm) {
      const params = {
        deviceIdentifier: $ruleForm.deviceIdentifier,
        deviceInputId: this.$route.query.id
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    selectionChange($val) {},
    onClick_addDevice() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },
    confirm($data) {
      api
        .deviceDetailUpdate({
          id: this.rowId,
          deadline: $data.deadline,
          deviceIdentifier: $data.deviceIdentifier
        })
        .then(res => {
          this.drawer = false;
          this.$refs.table.getData();
          this.$message("保存成功");
        })
        .catch(err => {
          this.$message(err);
        });
    },
    cancel() {
      this.drawer = false;
    },
    onClick_edit($row) {
      this.rowId = $row.id;
      // 对配置文件进行动态修改
      const newFromConfigData = FORM_CONFIG.formData;
      // 编辑前重赋值
      newFromConfigData.formData.forEach((item, index) => {
        item.initVal = $row[item.key];
      });
      this.fromConfigData = newFromConfigData;
      this.drawer = true;
    },
    onClick_remove($row) {
      this.$confirm("确定删除？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .deviceDetailDelete({
              id: $row.id
            })
            .then(result => {
              this.$refs.table.getData();
              this.$message("已删除");
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
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
