<template>
  <div>
    <div class="tab_head">
      <span class="title">商户支付宝直连审核</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

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
        :grid-edit-width="250"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @detail="handleDetail"
        @preApprove="handlePreApprove"
        @record="handleRecord"
        @pass="handlePass"
        @reject="handleReject"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        :isDrawer="true"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { SEARCH_CONFIG } from "./../formConfig/aliDirectListSearch";
import { FORM_CONFIG } from "./../formConfig/aliDirectListConfig";
import { ALIDIRECTLIST_CONFIG } from "./../tableConfig/aliDirectListConfig";

export default {
  name: "AliDirectList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      channelAgentCode: '',
      merchantNo: '',
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: ALIDIRECTLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      drawer: false,
      formStatus: "",
      params: {},
      api: api.queryAlipayAuditPageByCondition
    };
  },
  mounted() {},
  created() {
    this.params.beginTime = this.getDay(0);
    this.params.endTime = this.getDay(0);
  },
  methods: {
    getDay(day) {
      var today = new Date();
      const targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetdayMilliseconds); // 注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    },
    confirm($data) {
      if (this.formStatus === "reject") {
        api.rejectDirectChannelAudit({
          merchantNo: this.merchantNo,
          reason: $data["reason"],
          channelCode: "alipay",
          channelAgentCode: this.channelAgentCode
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '已驳回',
              type: 'success'
            })
            this.drawer = false
            this.$refs.table.getData()
          }
        })
      }
      if (this.formStatus === "pass") {
        if (!$data.appid || !$data.pid || !$data.rate) {
          this.$message({
            message: '请填写必填信息',
            type: 'warning'
          })
          return false
        } else {
          api.passDirectChannelAudit({
            merchantNo: this.merchantNo,
            channelCode: "alipay",
            channelAgentCode: this.channelAgentCode
          }).then(res => {
            api.updateOthersInfo({
              merchantNo: this.merchantNo,
              channelCode: "alipay",
              appid: $data["appid"],
              pid: $data["pid"]
            }).then(rem => {
              if (rem.status === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                this.drawer = false
                this.$refs.table.getData()
              }
            })
          })
        }
      }
    },
    cancel() {
      this.drawer = false;
    },
    handleDetail(row) {
      this.$router.push({
        name: "aliDirectListDetail",
        query: {
          merchantNo: row.merchantNo,
          channelCode: row.channel,
          channelAgentCode: row.channelAgentCode
        }
      });
    },
    handlePreApprove(row) {
      this.$router.push({
        name: "aliDirectListDetail",
        query: {
          merchantNo: row.merchantNo,
          channelCode: row.channel,
          channelAgentCode: row.channelAgentCode
        }
      });
    },
    handleRecord(row) {
      this.$router.push({
        name: "aliDirectRecordDetail",
        query: {
          merchantNo: row.merchantNo,
          channel: row.channel
        }
      });
    },
    handlePass(data) {
      this.channelAgentCode = data.channelAgentCode
      this.merchantNo = data.merchantNo
      this.drawer = true;
      this.formStatus = "pass";
      this.fromConfigData = FORM_CONFIG.passData;
    },
    handleReject(data) {
      this.channelAgentCode = data.channelAgentCode
      this.merchantNo = data.merchantNo
      this.drawer = true;
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
    },
    search($ruleForm) {
      const params = {
        beginTime: $ruleForm.date ? $ruleForm.date[0] : this.getDay(0),
        endTime: $ruleForm.date ? $ruleForm.date[1] : this.getDay(0),
        channelStatus: $ruleForm.channelStatus,
        operationUserNo: $ruleForm.operationUserNo
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
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
</style>
<style>
</style>
