<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="p_head">下级服务商列表</div>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />
      <!-- <data-mode></data-mode> -->
      <div class="table_box">
        <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="false"
          @detail="openDetail"
          @thaw="thaw"
          @frozen="frozen"
          @openAgentManager="openAgentManager"
          @goMerchantList="goMerchantList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
// import dataMode from '@/components/dataMode/dataMode.vue'
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/subAgentConfig";
import { FORM_CONFIG } from "./formConfig/subAgentListSearch";

export default {
  name: "Theme",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "380",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: []
    };
  },
  mounted() {
    this.getData();
  },
  // beforeRouteUpdate(to,from,next) {
  //   this.testData = [
  //     {
  //       id: '1',
  //       tel: '15184318420',
  //       name: '小白',
  //       email: '412412@qq.com',
  //       status: '1',
  //       create_time: '2018-04-20',
  //       expand: '扩展信息一',
  //       role: ['2']
  //     },
  //     {
  //       id: '2',
  //       tel: '13777369283',
  //       name: '小红',
  //       email: '456465@qq.com',
  //       status: '0',
  //       create_time: '2018-03-23',
  //       expand: 'hashashashas',
  //       role: ['1']
  //     }
  //   ]
  //   next();

  // },
  methods: {
    getData() {
      this.testData = [
        {
          serviceName: "1两行两行两行两行",
          id: "1两行两行两行两行",
          tel: "15184318420",
          name: "小白",
          email: "412412@qq.com",
          status: "1",
          create_time: "2018-04-20",
          expand: "扩展信息一",
          role: ["2"]
        },
        {
          serviceName: "1两行两行两行两行",
          id: "2两行两行两行两行",
          tel: "13777369283",
          name: "小红",
          email: "456465@qq.com",
          status: "0",
          create_time: "2018-03-23",
          expand: "hashashashas",
          role: ["1"]
        }
      ];
    },
    search($form, $obj) {
      this.getData();
    },
    openDetail() {
      this.$router.push({
        path: "/agent/subList/detail"
      });
    },
    thaw() {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "已解冻"
          });
        })
        .catch(() => {});
    },
    frozen() {
      this.$confirm("是否要冻结该代理商？", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "已冻结"
          });
        })
        .catch(() => {});
    },
    openAgentManager() {},
    goMerchantList() {
      this.$router.push({
        path: "/merchant/list"
      });
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
}
</style>
