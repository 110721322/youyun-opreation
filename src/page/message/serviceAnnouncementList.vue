<template>
  <div>
    <div class="p-head">服务商公告</div>
    <search
        :is-show-all="true"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
        @reset="reset"
    />
    <!-- <data-mode></data-mode> -->
    <div class="table-box">
      <div>
        <el-button type="primary" class="add_btn" @click="onClick_addAnnouncement">添加公告</el-button>
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
          form-title="用户"
          :is-async="true"
          :is-select="false"
          @detail="go_detail"
          @edit="handelEdit"
          @delete="handelDelete"
      ></BaseCrud>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_message";
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
      searchConfig: SEARCH_CONFIG,
      params: {},
      api: api.queryByPage
    };
  },
  created() {
    this.params = {
      to: 'agent',
      title: ""
    };
  },
  mounted() {},
  methods: {
    handelEdit($row) {
      this.$router.push({
        name: 'agentAnnounceDetail',
        query: {
          id: $row.id
        }
      });
    },
    onClick_addAnnouncement() {
      this.$router.push({
        name: 'agentAnnounceAdd'
      });
    },
    go_detail() {
      this.$router.push("/merchant/list/detail");
    },
    handelDelete(row) {
      this.$confirm("确定删除该消息吗", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      }).then(() => {
        api.delete({
          id: row.id,
          deleted: true
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已删除"
            });
            this.$refs.table.getData()
          }
        }).catch();
      }).catch(() => {
        this.$message({
          message: '取消操作',
          type: 'info'
        })
      });
    },
    search($ruleForm) {
      const params = {
        title: $ruleForm.title,
        messageType: $ruleForm.messageType,
        to: 'agent'
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    reset($ruleForm) {
      const params = {
        title: $ruleForm.title,
        messageType: $ruleForm.messageType,
        to: 'agent'
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    }
  }
};
</script>

<style scoped>
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.add_btn {
  float: right;
}
</style>
