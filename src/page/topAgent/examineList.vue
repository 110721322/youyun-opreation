<template>
  <div class="container">
    <div class="p_head">服务商审核列表</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <!-- <data-mode></data-mode> -->
    <div class="table_box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="160"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @reject="reject"
        @active="active"
        @pass="pass"
      />
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">分配运营</div>
      <Form
          v-if="drawer"
          ref="memberEdit"
          :form-base-data="formConfig.formData"
          :show-foot-btn="true"
          :isDrawer="true"
          @cancel="drawer = false"
          @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import api_dataMarket from "@/api/api_dataMarket";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { USER_CONFIG } from "./tableConfig/agentCheckListConfig";
import { FORM_CONFIG, FORM_CONFIG3 } from "./formConfig/agentCheckListSearch";
import {mapActions} from "vuex";
export default {
  name: "ExamineList",
  components: { search, BaseCrud, Form },
  data() {
    return {
      searchMaxHeight: "280",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      formConfig: FORM_CONFIG3,
      testData: [],
      drawer: false,
      selectOption: null,
      params: {
        channelAgentCode: null,
        channelAgentName: null,
        personName: null,
        personMobile: null,
        operationId: null,
        status: null
      },
      api: api.topAgentAuditList
    };
  },
  created() {},
  mounted() {
    this.queryInit();
  },
  methods: {
    ...mapActions(['setLabelList', 'setRegionList', 'setUserList']),
    queryInit() {
      api_dataMarket.queryInit().then(res => {
        const labelList = res.object.labelList.map($ele => {
          return {
            label: $ele.name,
            value: $ele.id
          }
        })
        const regionList = res.object.regionSetList.map($ele => {
          return {
            label: $ele.regionName,
            value: $ele.regionCode
          }
        })
        const userList = res.object.userDTOList.map($ele => {
          return {
            label: $ele.jobName || $ele.name,
            value: $ele.id
          }
        })
        this.setLabelList(labelList)
        this.setRegionList(regionList)
        this.setUserList(userList)
      })
    },
    search($form) {
      this.params = {
        [$form.channelAgent]: $form.channelAgentVal,
        personName: $form.personName,
        personMobile: $form.personMobile,
        operationId: $form.operationId,
        status: $form.status
      }
    },
    reject(row) {
      this.$confirm("是否要驳回该代理商？", "驳回代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认驳回",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 2,
          channelAgentCode: row.channelAgentCode
        }).then((result) => {
          this.$message({
            type: "success",
            message: "已驳回"
          });
          this.$refs.table.getData();
        })
      }).catch(() => {});
    },
    active(row) {
      this.$confirm("是否要激活该代理商？", "激活代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认激活",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 3,
          channelAgentCode: row.channelAgentCode
        }).then((result) => {
          this.$message({
            type: "success",
            message: "已激活"
          });
          this.$refs.table.getData();
        })
      })
    },
    pass(row) {
      this.selectOption = row;
      this.drawer = true;
    },
    confirm($ruleForm) {
      this.$confirm("是否要通过该代理商？", "通过代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认通过",
        cancelButtonText: "取消"
      }).then(() => {
        api.updateTopAgentStatus({
          operate: 1,
          channelAgentCode: this.selectOption.channelAgentCode,
          operationId: $ruleForm.operationId
        }).then(res => {
          if (res.code) return res;
          this.$message({
            type: "success",
            message: "已通过"
          });
          this.drawer = false;
          this.$refs.table.getData();
        })
      })
    }
  }
};
</script>

<style scoped>
  .table_box {
    margin: 24px;
    padding: 24px;
    overflow: hidden;
    background: #fff;
    /* min-width: 1000px; */
  }
</style>
