<template>
  <div class="main_page">
    <div class="p_head">服务商公告</div>
    <search
      :is-show-all="true"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <!-- <data-mode></data-mode> -->
    <div class="table_box">
      <div>
        <el-button type="primary" class="add_btn" @click="onClick_addAnnouncement">添加公告</el-button>
      </div>
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        @selectionChange="selectionChange"
        @detail="go_detail"
        @openAgentManager="openAgentManager"
        @openMerchantManager="openMerchantManager"
        @edit="handelEdit"
      ></BaseCrud>
    </div>
  </div>
</template>

<script>
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/announcementConfig";
import search from "@/components/search/search.vue";
import { SEARCH_CONFIG } from "./formConfig/messageSearch";

export default {
  name: "ServiceAnnouncementList",
  components: { BaseCrud, search },
  data() {
    return {
      searchMaxHeight: "300",

      configData: USER_CONFIG,
      testData: [],
      searchConfig: SEARCH_CONFIG
    };
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$route);
    this.getData();
  },
  methods: {
    handelEdit($row) {
      // eslint-disable-next-line no-console
      console.log($row);
      this.$router.push({ path: "/message/announcementEdit" });
    },
    onClick_addAnnouncement() {
      this.$router.push({ path: "/message/announcementEdit" });
    },
    getData() {
      this.testData = [
        {
          id: "1",
          title: "针对防范不法商户的公告，针对防范不法商户的公告…",
          type: "宣传消息",
          time: "42004-05-14 19:00:00"
        },
        {
          id: "2",
          title: "蓝湖行动-餐饮行业0费率扶持",
          type: "公告消息",
          time: "2017-02-10 21:00:23"
        }
      ];
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    go_detail() {
      // eslint-disable-next-line no-console
      this.$router.push("/merchant/list/detail");
    },
    search() {
      this.getData();
    },
    openAgentManager() {},
    openMerchantManager() {},
    onClick_search() {},
    onClick_reset() {}
  }
};
</script>

<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.add_btn {
  float: right;
  width: 109px;
  height: 32px;
}
</style>
