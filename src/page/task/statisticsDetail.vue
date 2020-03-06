<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">任务统计详情</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">未完成</el-menu-item>
        <el-menu-item index="2">已完成</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
      <div>
        <Search :is-show-all="true" :form-base-data="searchConfig.formData" @search="search" />
        <data-mode :config-data="modeConfigData" />
        <div class="table_box">
          <BaseCrud
            :grid-config="configData.gridConfig"
            :grid-btn-config="configData.gridBtnConfig"
            :grid-data="testData"
            :form-config="configData.formConfig"
            :form-data="configData.formModel"
            :grid-edit-width="300"
            :is-async="true"
            :is-select="false"
            :is-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="configData.hideEditArea"
            @selectionChange="selectionChange"
          >
            <template v-slot="{ row }">
              <el-form label-position="left" inline class="demo-table-expand" label-width="80px">
                <div>
                  <el-form-item label="商品名称">
                    <span>{{ row.id }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>123123</span>
                  </el-form-item>
                </div>

                <div>
                  <el-form-item label="商品名称">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>123123</span>
                  </el-form-item>
                </div>

                <div>
                  <el-form-item label="商品名称">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>123123</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>123123</span>
                  </el-form-item>
                </div>
              </el-form>
            </template>
          </BaseCrud>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import DataMode from "@/components/dataMode/dataMode.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FINISH_CONFIG } from "./tableConfig/finishConfig";
import { UNFINISH_CONFIG } from "./tableConfig/unfinishConfig";
import { FORM_CONFIG } from "./formConfig/staticSearch";

export default {
  name: "Theme",
  components: { Search, BaseCrud, DataMode },
  // components: { dataMode, BaseCrud },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      modeConfigData: [
        {
          title: "任务总数",
          data: "555个"
        }
      ],
      searchMaxHeight: "240",
      activeIndex: "1",
      configData: UNFINISH_CONFIG,
      testData: [],
      isChangeMode: true
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.testData = [
        {
          id: 1,
          type: "日常任务",
          name: "商户结算失败",
          num: "4",
          oper: "提醒",
          time: "20:00:23"
        },
        {
          id: 2,
          type: "日常任务",
          name: "商户结算失败",
          num: "4",
          oper: "提醒",
          time: "20:00:23"
        }
      ];
    },
    selectionChange($val) {},
    handleSelect($item) {
      // eslint-disable-next-line no-console
      this.activeIndex = $item;
      switch ($item) {
        case "1":
          this.configData = UNFINISH_CONFIG;
          break;
        case "2":
          this.configData = FINISH_CONFIG;
          break;
      }

      this.getTableData();
    },
    search() {}
  }
};
</script>

<style scoped>
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
</style>
