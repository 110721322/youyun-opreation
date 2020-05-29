<template>
  <div class="">
    <div class="tab_head">
      <span class="title">设备库存</span>
    </div>
    <Search :is-show-all="true" :form-base-data="searchConfig.formData" @search="search" />
    <div class="table_box">
      <div class="tabale_title_box">
        <div class="title">库存列表</div>
        <el-button class="btn" type="primary" @click="onClick_addDevice">新增设备</el-button>
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
        @buy="onClick_buy"
        @edit="onClick_edit"
        @remove="onClick_remove"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        v-if="drawer"
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
import { FORM_CONFIG } from "./../formConfig/deviceDetail";
import { SEARCH_CONFIG } from "./../formConfig/stockListSearch";
import { STOCKLIST_CONFIG } from "./../tableConfig/stocklistConfig";

export default {
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: STOCKLIST_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      formStatus: "",
      stockId: '',
      deviceId: '',
      params: {
        deviceModel: "",
        deviceType: "",
        classification: 1
      },
      allApi: api,
      api: api.deviceQueryByPage
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        deviceModel: $ruleForm.deviceModel,
        deviceType: $ruleForm.deviceType
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    onClick_addDevice() {
      this.formStatus = "add";
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },
    confirm($data) {
      console.log('#data', $data);
      switch (this.formStatus) {
        case "add":
          api
            .deviceAdd({
              costPrice: $data.costPrice,
              deviceImg: $data.deviceImg.dialogImageUrl,
              deviceModel: $data.deviceModel,
              deviceType: $data.deviceType,
              id: $data.id,
              salePrice: $data.salePrice,
              sort: $data.sort,
              classification: 1
            })
            .then(res => {
              this.$refs.table.getData();
              this.drawer = false;
              this.$message("添加成功");
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "edit":
          api
            .deviceUpdate({
              costPrice: $data.costPrice,
              deviceImg: $data.deviceImg.dialogImageUrl || $data.deviceImg.split('com/')[1],
              deviceModel: $data.deviceModel,
              deviceType: $data.deviceType,
              id: this.stockId,
              salePrice: $data.salePrice,
              sort: $data.sort,
              classification: 1
            })
            .then(res => {
              this.$refs.table.getData();
              this.drawer = false;
              this.$message("编辑成功");
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "buy":
          api
            .deviceOutputAdd({
              // saleUserName: $data.saleUserName,fffxxx
              saleUserId: 1,
              saleUserName: '123',
              amount: $data.amount,
              actualAmount: $data.actualAmount,
              agentNo: $data.agentNo,
              payType: $data.payType,
              voucher: $data.voucher.dialogImageUrl,
              buyerRemark: $data.buyerRemark,
              infoVOList: [{
                count: $data.count,
                deviceModel: $data.deviceModel,
                deviceId: this.deviceId,
                salePrice: $data.actualAmount
              }]
            })
            .then(res => {
              this.$refs.table.getData();
              this.drawer = false;
              this.$message("订购成功");
            })
            .catch(err => {
              this.$message(err);
            });
          break;

        default:
          break;
      }
    },
    cancel() {
      this.drawer = false;
    },
    onClick_buy($row) {
      this.deviceId = $row.id;
      const buyDataFromConfigData = FORM_CONFIG.buyData;
      buyDataFromConfigData.formData.forEach((item, index) => {
        item.initVal = $row[item.key];
      });
      this.fromConfigData = buyDataFromConfigData;
      this.formStatus = "buy";
      this.drawer = true;
    },
    onClick_edit($row) {
      console.log('编辑', $row);
      this.stockId = $row.id;
      // 对配置文件进行动态修改
      const newFromConfigData = FORM_CONFIG.editData;
      // 编辑前重赋值
      newFromConfigData.formData.forEach((item, index) => {
        item.initVal = $row[item.key];
      });
      this.fromConfigData = newFromConfigData;
      this.formStatus = "edit";
      this.drawer = true;
    },
    onClick_remove($row) {
      this.$confirm("删除后，该设备将不能再进行订购，请谨慎操作", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .deviceDelete({
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
