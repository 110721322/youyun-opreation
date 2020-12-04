<template>
  <div>
    <div class="tab_head">
      <span class="title">任务统计详情</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="cleckSelect"
      >
        <el-menu-item index="1">未完成</el-menu-item>
        <el-menu-item index="2">已完成</el-menu-item>
      </el-menu>
    </div>
    <transition name="fade">
      <div>
        <Search
          :is-show-all="true"
          :form-base-data="searchConfig.formData"
          :permission="searchConfig.permission"
          :open-height="searchMaxHeight"
          @search="search"
        />
        <data-mode :config-data="modeConfigData" />
        <div class="table-box">
          <BaseCrud
            ref="table"
            :params="params"
            :api-service="false"
            :grid-config="configData.gridConfig"
            :grid-btn-config="configData.gridBtnConfig"
            :grid-data="taskList.datas"
            :form-config="configData.formConfig"
            :form-data="configData.formModel"
            :grid-edit-width="300"
            :is-async="true"
            :is-select="false"
            :is-expand="false"
            :default-expand-all="false"
            :hide-edit-area="configData.hideEditArea"
            @remind="onClickRemind"
            @detail="onClickDetail"
          >
            <template v-slot="{ row }">
              <el-form label-position="left" inline class="demo-table-expand">
                <div v-for="(item,index) in row.childrenData" :key="index" class="form-box">
                  <el-form-item label="商户ID：">
                    <span>{{ item.id }}</span>
                  </el-form-item>
                  <el-form-item label="商户名称：">
                    <span>{{ item.name }}</span>
                  </el-form-item>
                  <el-form-item label="结算金额：">
                    <span>{{ item.amount }}</span>
                  </el-form-item>
                  <el-form-item label="失败原因：">
                    <span>{{ item.reason }}</span>
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
import api from "@/api/api_task";
import Search from "@/components/search/search.vue";
import DataMode from "@/components/dataMode/dataMode.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FINISH_CONFIG } from "./tableConfig/finishConfig";
import { UNFINISH_CONFIG } from "./tableConfig/unfinishConfig";
import { FORM_CONFIG } from "./formConfig/staticDetailSearch";
import {TASK_SEARCH_1, TASK_SEARCH_2 } from "../../libs/data/permissionBtns";

export default {
  name: "StatisticsDetail",
  components: { Search, BaseCrud, DataMode },
  // components: { dataMode, BaseCrud },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      modeConfigData: [],
      searchMaxHeight: "260",
      activeIndex: "1",
      configData: UNFINISH_CONFIG,
      testData: [],
      isChangeMode: true,
      params: {},
      api: '',
      receiverId: '',
      taskList: {}
    };
  },
  created() {
    this.receiverId = this.$route.query.receiverId
    this.params = {
      receiverId: this.receiverId,
      status: this.activeIndex === '2' ? 'initiated' : 'undo'
    };
    this.queryTask()
    this.api = api.queryTaskList
  },
  mounted() {
    // this.queryOperationAllTaskMenu();
  },
  methods: {
    queryTask() {
      api.queryTaskList({
        receiverId: this.receiverId,
        status: this.activeIndex === '2' ? 'initiated' : 'undo'
      }).then(res => {
        this.taskList = res.data
        this.modeConfigData = [
          {
            title: "任务总数",
            data: res.data.totalCount
          }
        ]
      })
    },

    cleckSelect($item) {
      this.activeIndex = $item;
      switch ($item) {
        case "1":
          this.configData = UNFINISH_CONFIG;
          this.searchConfig.permission = TASK_SEARCH_1;
          this.params.status = "undo";
          break;
        case "2":
          this.configData = FINISH_CONFIG;
          this.searchConfig.permission = TASK_SEARCH_2;
          this.params.status = "done";
          break;
      }
      this.$refs.table.getData();
    },

    search($ruleForm) {
      this.params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        provinceCode: $ruleForm.address ? $ruleForm.address[0] : null,
        cityCode: $ruleForm.address ? $ruleForm.address[1] : null,
        useChannelCode: $ruleForm.useChannelCode,
        channelStatus: $ruleForm.channelStatus,
        categoryCOde: $ruleForm.categoryCOde,
        operateNo: $ruleForm.operateNo
      }
    },

    onClickRemind(row) {},

    onClickDetail(row) {
      this.$router.push({
        name: 'statisticsAll',
        query: {
          statisticsData: row
        }
      })
    }
    // queryOperationAllTaskMenu() {
    //   api
    //     .queryOperationAllTaskMenu({
    //       receiverId: 1,
    //       undoType: 1,
    //       taskType: 1,
    //       status: "undo",
    //       taskOwner: ""
    //     })
    //     .then(res => {
    //       this.modeConfigData[0].data = res.data.totalCount;
    //     })
    //     .catch();
    // },
  }
};
</script>

<style scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
