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
            <div v-if="item.data.status === TaskManage.TASK_SUCCESS" class="sysMask-info" style="color: #67C23A;">审核通过</div>
            <div v-else-if="item.data.status === TaskManage.TASK_FAIL" class="sysMask-info" style="color: #F56C6C">{{ item.data.errMsg }}</div>
          </div>
          <div style="width: 130px;justify-content: flex-end;" class="flex-row">
            <el-button
                v-if="item.data.status === TaskManage.TASK_SUCCESS"
                type="primary"
                style="margin-right: 6px;"
                @click="upload(item)"
            >上传</el-button>
            <el-button
                v-if="item.data.status === TaskManage.TASK_SUCCESS"
                type="warning"
                style="margin-right: 12px;"
                @click="cancel(item)"
            >取消</el-button>
            <el-button
                v-else
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
  import { TaskManage } from "@/libs/config/constant.config";

  export default {
    name: "TaskList",
    props: {
      title: String,
      taskList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        TaskManage: TaskManage
      }
    },
    methods: {
      upload($item) {
        this.$emit("upload", $item)
      },
      cancel($item) {
        this.$emit("cancel", $item)
      },
      isShowProgress($item) {
        return $item.data.status === TaskManage.TASK_PENDING || $item.data.status === TaskManage.TASK_SUCCESS
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sysMask {
    width: 450px;
    padding: 20px 0;
  }
  .sysMask-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 0 20px;
  }
  .sysMask-title span:nth-child(2) {
    opacity: 0.85;
  }
  .sysMask-info {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ffffff;
    opacity: 0.85;
    margin-bottom: 4px;
  }
  .sysMask ul {
    max-height: 400px;
    overflow-y: scroll;
    opacity: 0.85;
  &::-webkit-scrollbar {
     width: 10px;  //高宽分别对应横竖滚动条的尺寸
   height: 10px;
   }
  &::-webkit-scrollbar-thumb {
     border-radius: 10px;
     background-color: skyblue;
     background-image: -webkit-linear-gradient(
         45deg,
         rgba(255, 255, 255, 0.2) 25%,
         transparent 25%,
         transparent 50%,
         rgba(255, 255, 255, 0.2) 50%,
         rgba(255, 255, 255, 0.2) 75%,
         transparent 75%,
         transparent
     );
   }
  &::-webkit-scrollbar-track {
     box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
     background: #ededed;
     border-radius: 10px;
   }
  }
  .sysMask ul li {
    padding: 10px 0 10px 20px;
    cursor: pointer;
    border-bottom: 1px solid #ffffff;
    &:hover {
      background: rgba(255, 255, 255, .3);
      transition: all .3s;
    }
  }
  .sysMask ul li span {
    color: #ffffff;
    font-size: 12px;
    opacity: 0.4;
    line-height: 17px;
  }
</style>
