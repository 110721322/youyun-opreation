<template>
  <div class="main_page">
    <div class="p_head">服务商公告</div>
    <!-- <search
        :inputOptions="inputOptions"
        :setects="setects"
        :openHeight="searchMaxHeight"
        @search="search"
    ></search>-->
    <!-- <data-mode></data-mode> -->
    <div class="search_box">
      <el-form :inline="true" size="medium">
        <el-form-item label="标题:">
          <el-input v-model="searchConfig.title" placeholder="请输入标题进行搜索" style="width:294px;"></el-input>
        </el-form-item>

        <el-form-item label="消息类型:" style="margin-left: 48px;">
          <el-select v-model="searchConfig.type" placeholder="请选择">
            <el-option label="全部" value="all"></el-option>
            <el-option label="弹窗消息" value="alert"></el-option>
            <el-option label="普通消息" value="normal"></el-option>
          </el-select>
        </el-form-item>

        <div class="btn_list">
          <el-button type="primary" size="large" @click="onClick_search">搜索</el-button>
          <el-button plain size="large" @click="onClick_reset">重置</el-button>
        </div>
      </el-form>
    </div>
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
        :grid-edit-width="300"
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

export default {
  name: "ServiceAnnouncementList",
  components: { BaseCrud },
  data() {
    return {
      searchMaxHeight: "300",

      configData: USER_CONFIG,
      testData: [],
      searchConfig: {
        title: "",
        type: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handelEdit($row) {
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
    selectionChange($val) {},
    go_detail() {
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
.search_box {
  margin: 24px;
  padding: 24px 24px 0;
  overflow: hidden;
  background: #fff;
}
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
.btn_list {
  float: right;
  margin-left: 24px;
  display: inline-block;
}
</style>
