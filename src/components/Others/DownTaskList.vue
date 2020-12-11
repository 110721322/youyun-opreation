<template>
  <div class="sysMask">
    <div class="sysMask-title">
      <span>{{ title }}</span>
      <span>{{ taskList.length }}个任务</span>
    </div>
    <ul v-if="taskList.length > 0">
      <li v-for="(item, index) in taskList" :key="index">
        <div class="flex-between" style="align-items: center;">
          <div style="width: 300px;">
            <div class="sysMask-info">{{ item.fileName }}</div>
            <div v-if="item.data.status === TaskManage.TASK_SUCCESS" class="sysMask-info" style="color: #67C23A;">导出完成</div>
            <div v-else-if="item.data.status === TaskManage.TASK_FAIL" class="sysMask-info" style="color: #F56C6C">{{ item.data.errMsg }}</div>
          </div>
          <div style="width: 130px;justify-content: flex-end;" class="flex-row">
            <el-button
                v-if="item.data.status === TaskManage.TASK_SUCCESS"
                type="primary"
                style="margin-right: 6px;"
                @click="download(item)"
            >下载</el-button>
            <el-button
                type="danger"
                style="margin-right: 12px;"
                @click="cancel(item)"
            >删除</el-button>
          </div>
        </div>
        <el-progress
            v-if="isShowProgress(item)"
            :percentage="Number(item.data.percent)"></el-progress>
        <span>{{ item.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import TaskList from "./TaskList"

export default {
  extends: TaskList,
  name: "DownTaskList",
  props: {
    title: String,
    taskList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    download($item) {
      this.$emit("download", $item)
    },
    cancel($item) {
      this.$emit("cancel", $item)
    }
  }
}
</script>
