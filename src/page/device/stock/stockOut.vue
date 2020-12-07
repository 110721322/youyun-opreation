<template>
  <div>
    <div class="tab-head">
      <span class="title">出库管理</span>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table-box">
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
        @reject="clickReject"
        @check="clickCheck"
        @detail="clickDetail"
        @send="clickSend"
        @distribution="clickDistribution"
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
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p-head">{{ fromConfigData.title }}</div>
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
  name: "StockOut",
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
        distributionUserId: 1
      },
      device: {},
      api: ""
    };
  },
  created() {
    if (this.$route.query.outputNo) {
      this.params.outputNo = this.$route.query.outputNo
    }
    this.params.beginDate = this.$g.utils.getToday(-6);
    this.params.endDate = this.$g.utils.getToday(0);
    this.api = api.deviceOutputQueryByPage
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : this.$g.utils.getToday(-6),
        endDate: $ruleForm.date ? $ruleForm.date[1] : this.$g.utils.getToday(0),
        deviceId: $ruleForm.deviceId ? $ruleForm.deviceId : '',
        status: $ruleForm.status ? $ruleForm.status : '',
        saleUserId: $ruleForm.saleUserId ? $ruleForm.saleUserId : '',
        outputUserId: $ruleForm.outputUserId ? $ruleForm.outputUserId : '',
        distributionUserId: '1',
        [$ruleForm.search]: $ruleForm.searchVal
      };
      this.params = params;
    },
    confirm($data) {
      // exelc解析
      if (this.formStatus === "send") {
        this.excelUploadPic($data)
      } else {
        switch (this.formStatus) {
          case "reject":
            this.rejectEvent($data);
            break;
          case "check":
            this.drawer = false;
            break;
          case "distribution":
            this.distributionEvent($data);
            break;
          default:
            break;
        }
      }
    },
    cancel() {
      this.drawer = false;
    },
    excelUploadPic($data) {
      apiComm.excelUploadPic({
        url: $data.deviceIdentifierList.dialogImageUrl,
        type: "deviceOutput"
      }).then(res => {
        this.device = res.data;
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
          if (res.status === 0) {
            this.$refs.table.getData();
            this.drawer = false;
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        })
      })
    },
    rejectEvent($data) {
      api.reject({
        rejectRemark: $data.rejectRemark,
        id: this.tableId
      }).then(res => {
        if (res.status === 0) {
          this.$refs.table.getData();
          this.drawer = false;
          this.$message({
            message: "已驳回",
            type: "success"
          });
        }
      })
    },
    distributionEvent($data) {
      api.distribute({
        type: "facility",
        typeNo: this.tableId,
        distributionUserId: $data.distributionUserId
      }).then(res => {
        if (res.status === 0) {
          this.$refs.table.getData();
          this.drawer = false;
          this.$message({
            message: "分配成功",
            type: "success"
          });
        }
      })
    },
    clickReject($data) {
      this.tableId = $data.id;
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },
    clickCheck($row) {
      const newFromConfigData = FORM_CONFIG.checkData;
      api.deviceOutputQueryById({ id: $row.id }).then(res => {
        newFromConfigData.formData.forEach((item, index) => {
          item.initVal = res.data[item.key];
        });
        this.fromConfigData = newFromConfigData;
        this.formStatus = "check";
        this.drawer = true;
      })
    },
    clickDetail($item) {
      this.$router.push({
        name: "outDetail",
        query: {
          id: $item.id
        }
      });
    },
    clickSend($data) {
      this.tableId = $data.id;
      this.tableDeviceId = $data.infoVOList[0].deviceId;
      this.formStatus = "send";
      this.fromConfigData = FORM_CONFIG.sendData;
      this.drawer = true;
    },
    clickDistribution($row) {
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
