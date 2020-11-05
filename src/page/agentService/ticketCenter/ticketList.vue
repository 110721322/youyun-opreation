<template>
  <div>
    <div class="tab_head">
      <span class="title">工单列表</span>
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
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @detail="handleDetail"
          @distribution="handleDistribution"
          @reply="handleReply"
          @checkReply="handleCheckReply"
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
</template>
<script>
import api from "@/api/api_ticketCenter";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";

import { SEARCH_CONFIG } from "../formConfig/ticketListSearch";
import { TABLE_CONFIG } from "../tableConfig/ticketListConfig";
import { FORM_CONFIG } from "../formConfig/ticketListForm";

export default {
  name: "TicketList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "320",
      drawer: false,
      id: this.$route.query.id,
      params: {
        startTime: this.$g.utils.getToday(0) + ' 00:00:00',
        endTime: this.$g.utils.getToday(0) + ' 23:59:59',
        // startTime: "yyyy-MM-dd HH:mm:ss",
        // endTime: "yyyy-MM-dd HH:mm:ss",
        operatorId: this.$route.query.id
      },
      api: api.workerOrderQueryByPage,
      formStatus: "",
      activityRow: {}
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.drawer = false;
    },
    confirm($data) {
      switch (this.formStatus) {
        case "distribution":
          api
            .designate({
              id: this.activityRow.id,
              operatorId: $data.operatorId
            })
            .then(res => {
              this.$message("已分配");
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "reply":
          api
            .reply({
              id: this.activityRow.id,
              solution: $data.checkSolution
            })
            .then(res => {
              this.$message("已回复");
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "checkReply":
          this.drawer = false;
          break;

        default:
          break;
      }
    },
    handleDetail($row) {
      this.$router.push({
        name: "ticketListDetail",
        query: { id: $row.id }
      });
    },
    handleDistribution($row) {
      const FormData = JSON.parse(JSON.stringify(FORM_CONFIG.distributionData));
      this.activityRow = $row;
      this.formStatus = "distribution";
      this.fromConfigData = FormData;
      this.drawer = true;
    },
    handleReply($row) {
      const FormData = JSON.parse(JSON.stringify(FORM_CONFIG.replyData));
      this.activityRow = $row;
      this.formStatus = "reply";
      this.fromConfigData = FormData;
      this.drawer = true;
    },
    handleCheckReply($row) {
      api
        .detail({
          id: $row.id
        })
        .then(res => {
          const FormData = JSON.parse(
            JSON.stringify(FORM_CONFIG.checkReplyData)
          );
          FormData.formData.forEach((item, index) => {
            item.initVal = res.data[item.key];
          });
          this.activityRow = $row;
          this.formStatus = "checkReply";
          this.fromConfigData = FormData;
          this.drawer = true;
        })
        .catch(err => {
          this.$message(err);
        });
    },
    search($ruleForm) {
      const params = {
        startTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        questionModule: $ruleForm.questionModule,
        questionType: $ruleForm.questionType,
        operatorId: $ruleForm.operatorId,
        status: $ruleForm.status,
        [$ruleForm.search]: $ruleForm.searchVal
      }
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
</style>
<style>
</style>
