<template>
  <div class="main_page">
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
        ref="child"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="null"
        @reject="reject"
        @activation="activation"
        @adopt="adopt"
      />
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/agentCheckListConfig";
import { FORM_CONFIG } from "./formConfig/agentCheckListSearch";
export default {
  name: "Theme",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "320",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      params: {},
      api: api.agentExamineList
    };
  },
  created() {
    this.params = {
      "agentNo": "",
      "agentName": "",
      "personName": "",
      "personMobile": "",
      "operateUserNo": "",
      "contractStatus": "",
      "contractStatusSet": ""
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = [
        {
          id: "1",
          tel: "15184318420",
          name: "小白",
          email: "412412@qq.com",
          status: "1",
          expand: "扩展信息一",
          role: ["2"],
          createTime: '2020-06-20',
          lawPerson: '啦啦啦'
        },
        {
          id: "2",
          tel: "13777369283",
          name: "小红",
          email: "456465@qq.com",
          status: "0",
          expand: "hashashashas",
          role: ["1"],
          createTime: '2020-06-20',
          lawPerson: '啦啦啦'
        }
      ];d
    },
    search($form, $obj) {
      this.params = {
        "agentNo": "",
        "agentName": "",
        "personName": $form.personName,
        "personMobile": $form.personMobile,
        "operateUserNo": "",
        "contractStatus": $form.contractStatus,
        "contractStatusSet": ""
      }
      this.params[$form.inputSelect] = $form.inputForm
      // this.$refs.child.getData()
    },
    reject(row) {
      this.$confirm("是否要驳回该代理商？", "驳回代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认驳回",
        cancelButtonText: "取消"
      }).then(() => {
        api.reject({
          "agentNo": row.agentNo
        }).then((result) => {
          this.$message({
            type: "info",
            message: "已驳回"
          });
        }).catch(err => {
          console.error(err);
        });
      }).catch(() => {});
    },
    activation(row) {
      this.$confirm("是否要激活该代理商？", "激活代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认激活",
        cancelButtonText: "取消"
      }).then(() => {
        api.activate({
          "agentNo": row.agentNo
        }).then((result) => {
          this.$message({
            type: "info",
            message: "已激活"
          });
        }).catch(err => {
          console.error(err);
        });
      }).catch(() => {});
    },
    adopt(row) {
      this.$confirm("是否要通过该代理商？", "通过代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认通过",
        cancelButtonText: "取消"
      }).then(() => {
        api.pass({
          "agentNo": row.agentNo
        }).then((result) => {
          this.$message({
            type: "info",
            message: "已通过"
          });
        }).catch(err => {
          console.error(err);
        });
      }).catch(() => {});
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
    min-width: 1000px;
  }
</style>
