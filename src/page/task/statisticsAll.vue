<template>
  <div>
    <div class="p_head">任务类型: {{statisticsData.taskValue}}</div>
    <div class="table-box">
      <BaseCrud
          v-if="openType === 1"
          ref="table"
          :params="params"
          :api-service="api"
          :grid-config="configData"
          :grid-btn-config="configData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :default-expand-all="false"
          :hide-edit-area="true"
      >
      </BaseCrud>
      <BaseCrud
          v-if="openType === 2"
          ref="table"
          :api-service="null"
          :grid-config="configData"
          :grid-btn-config="configData"
          :grid-data="commissionData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :default-expand-all="false"
          :hide-edit-area="true"
      >
      </BaseCrud>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_task"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { WORK_CONFIG } from "./tableConfig/workConfig"
export default {
  name: "StatisticsAll",
  components: { BaseCrud },
  data() {
    return {
      configData: WORK_CONFIG,
      params: {},
      taskList: [],
      statisticsData: {},
      api: '',
      openType: 1,
      commissionData: []
    }
  },
  created() {
    this.statisticsData = this.$route.query.statisticsData
    this.params = {
      receiverId: this.statisticsData.receiverId,
      undoType: this.statisticsData.undoType,
      taskType: this.statisticsData.taskType,
      status: this.statisticsData.status
    }
    const type = this.statisticsData.taskType
    const undo = this.statisticsData.undoType
    if (type === 1 && undo === 1) {
      this.configData = WORK_CONFIG.gridConfig
    } else if (type === 2 && undo === 1) {
      this.configData = WORK_CONFIG.merchantExamine
    } else if (type === 3 && undo === 1) {
      this.configData = WORK_CONFIG.overTime
    } else if (type === 4 && undo === 1) {
      this.configData = WORK_CONFIG.commission
    } else if (type === 5 && undo === 1) {
      this.configData = WORK_CONFIG.subscribe
    } else if (type === 6 && undo === 1) {
      this.configData = WORK_CONFIG.newAgent
    } else if (type === 7 && undo === 1) {
      this.configData = WORK_CONFIG.unitPrice
    } else if (type === 8 && undo === 1) {
      this.configData = WORK_CONFIG.transaction
    } else if (type === 9 && undo === 1) {
      this.configData = WORK_CONFIG.agentCompletion
    } else if (type === 10 && undo === 1) {
      this.configData = WORK_CONFIG.stock
    } else if (type === 11 && undo === 1) {
      this.configData = WORK_CONFIG.distribution
    } else if (type === 12 && undo === 1) {
      this.configData = WORK_CONFIG.leSuhaExamine
    } else if (type === 13 && undo === 1) {
      this.configData = WORK_CONFIG.channelExamine
    } else if (undo === 2) {
      this.configData = WORK_CONFIG.commissionSettle
      this.getData()
    } else if (undo === 1) {
      this.api = api.queryOperationTaskList
    }
  },
  methods: {
    getData() {
      api.queryOperationTaskList({
        receiverId: this.statisticsData.receiverId,
        undoType: this.statisticsData.undoType,
        taskType: this.statisticsData.taskType,
        status: this.statisticsData.status
      }).then(res => {
        if (res.data.datas) {
          res.data.datas.forEach(m => {
            var newArr = {}
            newArr = m.agentSettleRecord
            this.commissionData.push(newArr)
          })
        }
      })
    }
  }
}
</script>

<style>
  .table-box {
    padding: 24px 24px;
  }
</style>

