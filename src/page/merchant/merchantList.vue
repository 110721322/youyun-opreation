<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="p_head">商户列表</div>
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
          @selectionChange="selectionChange"
          @detail="go_detail"
          @openAgentManager="openAgentManager"
          @openMerchantManager="openMerchantManager"
        >
          <div slot="head" slot-scope="item">
            <span>{{ item.item.label }}</span>
            <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
              <div slot="content">
                <div>
                  <span class="dot opened"></span>已开通
                </div>
                <div>
                  <span class="dot review"></span>审核中
                </div>
                <div>
                  <span class="dot reject"></span>驳回
                </div>
                <div>
                  <span class="dot unused"></span>未审核
                </div>
              </div>
              <i class="el-icon-info" />
            </el-tooltip>
          </div>
        </BaseCrud>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/merchantConfig";
import { FORM_CONFIG } from "./formConfig/merchantListSearch";

export default {
  name: "Theme",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "380",
      searchConfig: FORM_CONFIG,
      configData: USER_CONFIG,
      testData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.testData = [
        {
          id: "1",
          tel: "紫菜网络科技有限公司",
          name: "小白",
          email: "412412@qq.com",
          statusList: [
            { name: "乐刷", status: "opened" },
            { name: "乐刷", status: "review" },
            { name: "乐刷", status: "reject" },
            { name: "乐刷", status: "unused" }
          ],
          create_time: "2018-04-20",
          expand: "扩展信息一",
          role: ["2"]
        },
        {
          id: "2",
          tel: "紫菜网络科技有限公司",
          name: "小红",
          email: "456465@qq.com",
          statusList: [
            { name: "乐刷", status: "opened" },
            { name: "乐刷", status: "review" },
            { name: "乐刷", status: "reject" },
            { name: "乐刷", status: "unused" }
          ],
          create_time: "2018-03-23",
          expand: "hashashashas",
          role: ["1"]
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
    openMerchantManager() {}
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #52c41a;
  vertical-align: middle;
  margin: 0 5px;
  &.opened {
    background-color: #52c41a;
  }
  &.review {
    background-color: #ffc620;
  }
  &.reject {
    background-color: #f5222d;
  }
  &.unused {
    background-color: #9c9c9c;
  }
}
</style>
