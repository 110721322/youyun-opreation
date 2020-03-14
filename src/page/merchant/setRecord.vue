<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">商户结算记录</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">结算失败</el-menu-item>
        <el-menu-item index="2">未结算</el-menu-item>
        <el-menu-item index="3">已结算</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
      <div v-if="isChangeMode">
        <search
          :open-height="searchMaxHeight"
          :form-base-data="searchConfig.formData"
          :show-foot-btn="searchConfig.showFootBtn"
          @search="search"
        />
        <data-mode :config-data="modeConfigData" />
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
            :hide-edit-area="true"
            @selectionChange="selectionChange"
            @detail="go_detail"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import dataMode from "@/components/dataMode/dataMode.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { ERR_CONFIG } from "./tableConfig/errRecordConfig";
import { SUCCESS_CONFIG } from "./tableConfig/successRecordConfig";
import { UNEWTTLED_CONFIG } from "./tableConfig/unsettledRecordConfig";
import { FORM_CONFIG } from "./formConfig/setRecordSearch";

export default {
  name: "Theme",
  components: { search, BaseCrud, dataMode },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "240",
      activeIndex: "1",
      configData: ERR_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      isChangeMode: true,
      inputOptions: [
        {
          label: "商户ID",
          value: "companyName"
        },
        {
          label: "商户名称",
          value: "name"
        },
        {
          label: "渠道商户号",
          value: "phone"
        }
      ],
      modeConfigData: [
        {
          title: "任务总数",
          data: "555个"
        },
        {
          title: "任务总数",
          data: "555个"
        }
      ],
      setects: [
        {
          name: "交易通道",
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
        }
      ]
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
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
      // eslint-disable-next-line no-console
      this.$router.push("/agent/list/detail");
    },
    handleSelect($item) {
      // eslint-disable-next-line no-console
      this.activeIndex = $item;
      switch ($item) {
        case "1":
          this.configData = ERR_CONFIG;
          break;
        case "2":
          this.configData = UNEWTTLED_CONFIG;
          break;
        case "3":
          this.configData = SUCCESS_CONFIG;
          break;
      }
      this.isChangeMode = false;
      setTimeout(() => {
        this.isChangeMode = true;
      }, 500);
      // 模拟获取数据
      setTimeout(() => {
        this.getTableData();
      }, 1000);
    },
    search($form, $obj) {}
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
