<template>
  <div>
    <div class="tab_head">
      <span class="title">入库管理</span>
    </div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table_box">
      <div class="tabale_title_box">
        <div class="title">入库列表</div>
        <el-button class="btn" type="primary" @click="onClick_addDevice">新增入库</el-button>
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
        :hide-edit-area="configData.hideEditArea"
        @detail="onClick_detail"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        v-if="drawer"
        ref="form"
        :is-drawer="true"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
      >
<!--        <template slot="content">-->
<!--          <div>11111</div>-->
<!--        </template>-->
      </Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_device";
import apiComm from "@/api/api_common";
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "./../formConfig/saveDetail";
import { SEARCH_CONFIG } from "./../formConfig/saveSearch";
import { SAVELIST_CONFIG } from "./../tableConfig/savelistConfig";

export default {
  name: "StockSave",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchMaxHeight: "200",
      searchConfig: SEARCH_CONFIG,
      configData: SAVELIST_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      count: 0,
      params: {},
      api: ""
    };
  },
  // computed: {
  //   selectType() {
  //     const form = this.$refs.form;
  //     console.log(form);
  //     return "1"
  //   }
  // },
  created() {
    const beginDate = this.$g.utils.getNowFormatDate() + ' ' + '00' + ':' + '00' + ':' + '00'
    const endDate = this.$g.utils.getNowFormatDate() + ' ' + '23' + ':' + '59' + ':' + '59'
    this.params = {
      beginDate: beginDate,
      endDate: endDate
    }
    this.api = api.deviceInputQueryByPage
  },
  methods: {
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        deviceId: $ruleForm.deviceId ? $ruleForm.deviceId : ''
      };
      this.params = params;
    },
    onClick_addDevice() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
      // this.$nextTick(() => {
      //   console.log(this.$refs.form);
      // })
    },
    confirm($data) {
      if (!$data.deviceId || !$data.deadline || !$data.inputTime) {
        this.$message({
          message: "请填写必填信息",
          type: "warning"
        })
        return
      }
      // exelc解析
      apiComm.excelUploadPic({
        url: $data.deviceIdentifier,
        type: "deviceInput"
      }).then(res => {
        console.log(res)
        if (res.object.length === 0) {
          this.$message({
            message: "请填写设备标识",
            type: "warning"
          })
          return
        }
        $data.deviceIdentifierList = res.object
        this.deviceInputAdd($data);
      }).catch(err => {
        this.$message(err);
      });
    },
    // 新增
    deviceInputAdd($data, arr) {
      api.deviceInputAdd({
        employeeId: this.$store.state.admin.userInfo.id,
        count: $data.deviceIdentifierList.length,
        deadline: $data.deadline,
        deviceId: $data.deviceId,
        inputTime: $data.inputTime,
        deviceIdentifierList: $data.deviceIdentifierList
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          })
          this.$refs.table.getData();
          this.drawer = false;
        }
      }).catch(err => {
        this.$message(err);
      });
    },
    cancel() {
      this.drawer = false;
    },
    onClick_detail($item) {
      this.$router.push({
        name: "stockDetail",
        query: {
          id: $item.id
        }
      });
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
