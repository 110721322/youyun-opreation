<template>
  <div class>
    <router-view
      v-if="this.$route.path.indexOf('/detail') !== -1||this.$route.path.indexOf('/recordDetail') !== -1"
    />
    <div v-else>
      <div class="tab_head">
        <span class="title">商户微信直连审核</span>
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
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_merchantAudit";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";

import { SEARCH_CONFIG } from "./../formConfig/aliDirectListSearch";
import { FORM_CONFIG } from "./../formConfig/wxDirectListConfig";
import { WXDIRECTLIST_CONFIG } from "./../tableConfig/wxDirectListConfig";

export default {
  name: "WXDirectList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      channelAgentCode: '',
      merchantNo: '',
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: WXDIRECTLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      drawer: false,
      formStatus: "",
      params: {},
      api: api.queryWechatAuditPageByCondition
    };
  },
  mounted() {},
  methods: {
    confirm($data) {
      if (this.formStatus === "reject") {
        api.rejectDirectChannelAudit({
          merchantNo: this.merchantNo,
          reason: $data["reason"],
          channelCode: "wechat",
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
        }).catch(err => {
          this.$message({
            message: err.errorMessage,
            type: 'info'
          });
        });
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
            channelCode: "wechat",
            channelAgentCode: this.channelAgentCode
          }).then(res => {
            console.log(res)
            api.updateOthersInfo({
              merchantNo: this.merchantNo,
              channelCode: "wechat",
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
        path: "/approval/checkMerchant/wxDirectList/detail",
        query: {
          merchantNo: row.merchantNo,
          channelCode: row.channel,
          channelAgentCode: row.channelAgentCode
        }
      });
    },
    handlePreApprove(row) {
      this.$router.push({
        path: "/approval/checkMerchant/wxDirectList/detail",
        query: {
          merchantNo: row.merchantNo,
          channelCode: row.channel,
          channelAgentCode: row.channelAgentCode
        }
      });
    },
    handleRecord(row) {
      this.$router.push({
        path: "/approval/checkMerchant/wxDirectList/recordDetail",
        query: {
          merchantNo: row.merchantNo,
          channel: row.channel
        }
      });
    },
    handlePass(data) {
      this.formStatus = "pass";
      this.channelAgentCode = data.channelAgentCode
      this.merchantNo = data.merchantNo
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.passData;
    },
    handleReject(data) {
      this.drawer = true;
      this.channelAgentCode = data.channelAgentCode
      this.merchantNo = data.merchantNo
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
    },
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
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
