<template>
  <div class>
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">维修管理</span>
      </div>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />

      <div class="table_box">
        <BaseCrud
          ref="table"
          :params="params"
          :api-service="api"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :hide-edit-area="configData.hideEditArea"
          @detail="onClick_detail"
          @done="onClick_done"
          @Receipt="onClick_Receipt"
          @reject="onClick_reject"
          @pass="onClick_pass"
          @send="onClick_send"
          @distribution="onClick_distribution"
        ></BaseCrud>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
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
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";

import { FORM_CONFIG } from "./../formConfig/repairListForm";
import { SEARCH_CONFIG } from "./../formConfig/repairListSearch";
import { REPAIRLIST_CONFIG } from "./../tableConfig/repairListConfig";

export default {
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchMaxHeight: "320",
      searchConfig: SEARCH_CONFIG,
      configData: REPAIRLIST_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      formStatus: "",
      activityRow: {},
      params: {
        agentNo: "猪豆王g豆哈试",
        currentPage: 0,
        deviceId: 13579,
        operationId: 63301,
        orderNo: "小拉哈丽哈哈小试",
        pageSize: 20,
        status: 543,
        beginTime: this.$g.utils.getToday(),
        endTime: this.$g.utils.getToday()
      },
      api: api.deviceMaintainQueryByPage
    };
  },
  mounted() {},
  methods: {
    onClick_reject($row) {
      this.formStatus = "reject";
      this.activityRow = $row;
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },
    onClick_send($row) {
      this.formStatus = "send";
      this.activityRow = $row;
      this.fromConfigData = FORM_CONFIG.sendData;
      this.drawer = true;
    },
    onClick_distribution($row) {
      this.formStatus = "distribution";
      this.activityRow = $row;
      this.fromConfigData = FORM_CONFIG.distributionData;
      this.drawer = true;
    },
    onClick_done($row) {
      this.formStatus = "done";
      this.activityRow = $row;
      this.fromConfigData = FORM_CONFIG.doneData;
      this.drawer = true;
    },
    onClick_Receipt($row) {
      this.$confirm("确定已收货吗", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .receive({
              id: $row.id
            })
            .then(result => {
              this.$message("收货成功");
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    onClick_pass($row) {
      this.$confirm("确定通过该维修单吗", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .auditPass({
              id: $row.id
            })
            .then(result => {
              this.$message("通过成功");
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    confirm($data) {
      switch (this.formStatus) {
        case "reject":
          api
            .auditReject({
              id: this.activityRow.id,
              rejectRemark: $data.rejectRemark
            })
            .then(res => {
              this.$message("已驳回");
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "send":
          api
            .send({
              id: this.activityRow.id,
              expressNumberOut: $data.expressNumberOut
            })
            .then(res => {
              this.$message("提交成功");
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "distribution":
          api
            .distribute({
              deviceOutputId: this.activityRow.deviceOutputId,
              distributionUserId: $data.distributionUserId
            })
            .then(res => {
              this.$message("分配成功");
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "done":
          api
            .saveMoney({
              id: this.activityRow.id,
              amount: $data.amount
            })
            .then(res => {
              this.$message("提交成功");
            })
            .catch(err => {
              this.$message(err);
            });
          break;

        default:
          break;
      }
    },
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        deviceId: $ruleForm.deviceId,
        operationId: $ruleForm.operationId,
        status: $ruleForm.status
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    onClick_detail() {
      this.$router.push("/deviceManage/usageManage/repairList/detail");
    },
    cancel() {
      this.drawer = false;
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
