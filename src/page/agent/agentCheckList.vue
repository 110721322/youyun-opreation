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
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="true"
        @reject="reject"
        @activation="activation"
        @adopt="adopt"
      />
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";

import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/agentCheckConfig";
import { FORM_CONFIG } from "./formConfig/agentListSearch";
export default {
  name: "Theme",
  components: { search, BaseCrud },

  data() {
    return {
      searchMaxHeight: "260",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      inputOptions: [
        {
          label: "公司名称",
          value: "companyName"
        },
        {
          label: "法人姓名",
          value: "name"
        },
        {
          label: "法人手机号",
          value: "phone"
        }
      ],
      setects: [
        {
          name: "服务商类型",
          key: "agentType",
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
          name: "状态",
          key: "type",
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
    search($form, $obj) {
      this.getData();
    },
    reject() {},
    activation() {},
    adopt() {}
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
