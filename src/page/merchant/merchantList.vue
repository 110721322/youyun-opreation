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
        />
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
      searchMaxHeight: "300",
      searchConfig: FORM_CONFIG,
      configData: USER_CONFIG,
      testData: [],
      inputOptions: [
        {
          label: "商户ID",
          value: "ID"
        },
        {
          label: "商户名称",
          value: "name"
        },
        {
          label: "所属服务商名称",
          value: "agentName"
        },
        {
          label: "开通通道情况",
          value: "openType"
        },
        {
          label: "乐刷商户号",
          value: "leshuaNo"
        },
        {
          label: "新大陆商户号",
          value: "xindaluNo"
        }
      ],
      setects: [
        {
          name: "使用通道",
          key: "channel",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "企业",
              value: "qiye"
            },
            {
              labee: "个人",
              value: "geren"
            }
          ]
        },
        {
          name: "行业类目",
          key: "class",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "已驳回",
              value: "1"
            },
            {
              labee: "待审核",
              value: "2"
            }
          ]
        },
        {
          name: "地区",
          key: "address",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "已驳回",
              value: "1"
            },
            {
              labee: "待审核",
              value: "2"
            }
          ]
        },
        {
          name: "所属运营",
          key: "yunying",
          options: [
            {
              labee: "全部",
              value: "all"
            },
            {
              labee: "已驳回",
              value: "1"
            },
            {
              labee: "待审核",
              value: "2"
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  methods: {
    getData() {
      this.testData = [
        {
          id: "1",
          tel: "15184318420",
          name: "小白",
          email: "412412@qq.com",
          status: "1",
          create_time: "2018-04-20",
          expand: "扩展信息一",
          role: ["2"]
        },
        {
          id: "2",
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

<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
