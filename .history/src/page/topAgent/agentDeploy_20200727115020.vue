<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/deployDetail') !== -1" />
    <div v-else>
      <div class="p_head">服务器部署</div>
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
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_agent.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/agentDeployConfig";
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
          sort: "1",
          ID: '123333',
          tel: "15184318420",
          name: "小白",
          email: "412412@qq.com",
          status: "1",
          people: "扩展信息一",
          role: ["2"],
          createTime: '2020-06-20',
          lawPerson: '啦啦啦'
        },
        {
          sort: "2",
          ID: '1223',
          tel: "13777369283",
          name: "小红",
          email: "456465@qq.com",
          status: "0",
          people: "hashashashas",
          role: ["1"],
          createTime: '2020-06-20',
          lawPerson: '啦啦啦'
        }
      ]
    },
    search() {},
    reject() {},
    activation() {
      this.$router.push({
        path: "/topAgent/agentDeploy/deployDetail"
      })
    },
    adopt() {}
  }
}
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
