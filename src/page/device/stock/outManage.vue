<template>
  <div class="">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">出库管理</span>
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
          :is-select="false"
          :is-expand="true"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @reject="onClick_reject"
          @check="onClick_check"
          @detail="onClick_detail"
          @send="onClick_send"
          @distribution="onClick_distribution"
        >
          <template v-slot="{ row }">
            <el-form label-position="left" inline class="demo-table-expand">
              <div v-for="(item,index) in row.infoVOList" :key="index">
                <el-form-item :label="item.deviceModel + ':'">
                  <span>{{ item.count+'台' }}</span>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </BaseCrud>
      </div>
      <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          v-if="drawer"
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          :foot-btn-label="fromConfigData.footBtnLabel"
          label-width="130px"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_device";
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import apiComm from "@/api/api_common";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { FORM_CONFIG } from "./../formConfig/outForm";
import { SEARCH_CONFIG } from "./../formConfig/outSearch";
import { OUTLIST_CONFIG } from "./../tableConfig/outListConfig";

export default {
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchMaxHeight: "340",
      searchConfig: SEARCH_CONFIG,
      configData: OUTLIST_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      formStatus: "",
      activityRow: {},
      tableId: "",
      tableDeviceId: "",
      params: {
        beginTime: this.$g.utils.getToday(),
        endTime: this.$g.utils.getToday(),
        agentNo: "",
        deviceId: "",
        distributionUserId: 1,
        outputNo: "",
        outputUserId: "",
        saleUserId: "",
        status: ""
      },
      device: {},
      api: api.deviceOutputQueryByPage
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      const params = {
        beginTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        deviceId: $ruleForm.deviceId,
        status: $ruleForm.status,
        saleUserId: $ruleForm.saleUserId,
        outputUserId: $ruleForm.outputUserId,
        distributionUserId: '1'
        // 1415
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    confirm($data) {
      // exelc解析
      if (this.formStatus === "send") {
        apiComm.excelUploadPic({
          url: $data.deviceIdentifierList.dialogImageUrl,
          type: "deviceOutput"
        }).then(res => {
          this.device = res.object;
          api.finishOutput({
            expressNo: $data.expressNo,
            outputRemark: $data.outputRemark,
            outputTime: $data.outputTime,
            id: this.tableDate.id,
            infoRequestVOList: [
              {
                deviceId: this.tableDeviceId,
                deviceIdentifierList: this.device
              }
            ]
          }).then(res => {
            this.$refs.table.getData();
            this.drawer = false;
            this.$message("保存成功");
          }).catch(err => {
            this.$message(err);
          });
        }).catch(err => {
          this.$message(err);
        });
      } else {
        switch (this.formStatus) {
          case "reject":
            api.reject({
              rejectRemark: $data.rejectRemark,
              id: this.tableId
            }).then(res => {
              this.$refs.table.getData();
              this.drawer = false;
              this.$message("已驳回");
            }).catch(err => {
              this.$message(err);
            });
            break;
          case "check":
            this.drawer = false;
            break;
          case "distribution":
            api.distribute({
              type: "facility",
              typeNo: this.tableId,
              distributionUserId: $data.distributionUserId
            }).then(res => {
              this.$refs.table.getData();
              this.drawer = false;
              this.$message("分配成功");
            }).catch(err => {
              this.$message(err);
            });
            break;
          default:
            break;
        }
      }
    },
    cancel() {
      this.drawer = false;
    },
    onClick_reject($data) {
      this.tableId = $data.id;
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },
    onClick_check($row) {
      const newFromConfigData = FORM_CONFIG.checkData;
      api.deviceOutputQueryById({ id: $row.id }).then(res => {
        newFromConfigData.formData.forEach((item, index) => {
          item.initVal = res.object[item.key];
        });
        this.fromConfigData = newFromConfigData;
        this.formStatus = "check";
        this.drawer = true;
      }).catch(err => {
        this.$message(err);
      });
    },
    onClick_detail($item) {
      this.$router.push({
        path: "/deviceManage/stock/stockOut/detail"
      });
    },
    onClick_send($data) {
      this.tableId = $data.id;
      this.tableDeviceId = $data.infoVOList[0].deviceId;
      this.formStatus = "send";
      this.fromConfigData = FORM_CONFIG.sendData;
      this.drawer = true;
    },
    onClick_distribution($row) {
      this.tableId = $row.id;
      this.formStatus = "distribution";
      this.activityRow = $row;
      this.fromConfigData = FORM_CONFIG.distributionData;
      this.drawer = true;
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
