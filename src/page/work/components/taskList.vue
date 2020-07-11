<template>
  <div class="list-box">
    <div
      v-for="(item,index) in listData"
      :key="index"
      class="item"
      :style="{height:cssConfig.itemHeight}"
    >
      <div class="status">
        {{ item.status+":" }}
        <transformTime :time="item.time"></transformTime>
      </div>
      <div class="title">{{ item.title }}</div>
      <div class="detail" :style="{width:cssConfig.detailWidth}">
        <div v-for="(item1,index1) in item.detail" :key="index1">
          <div
            v-if="item1.label==='失败原因'"
            class="reason ellipsis"
          >{{ item1.label ? item1.label+":"+item1.value :item1.value }}</div>
          <div
            v-else-if="item1.label==='发起人备注'"
            class="note ellipsis3"
          >{{ item1.label ? item1.label+":"+item1.value :item1.value }}</div>
          <div v-else>{{ item1.label ? item1.label+":"+item1.value :item1.value }}</div>
        </div>
      </div>
      <div v-if="type===1" v-has="TASK_DEALT" class="oper-box">
        <el-button type="primary" class="btn" @click="onClick_communication(item)">立即沟通</el-button>
      </div>
      <div v-if="type===2" v-has="TASK_DEALT" class="oper-box">
        <el-button type="primary" class="btn_agree" @click="onClick_pass(item)">同意</el-button>
        <el-button plain class="btn_refuse" @click="onClick_reject(item)">拒绝</el-button>
      </div>

      <div v-if="type===3" v-has="TASK_DEALT" class="oper-box">
        <img v-if="item.handleStatus===1" src="../../../assets/img/pass.png" />
        <img v-if="item.handleStatus===2" src="../../../assets/img/refuse.png" />
        <img v-if="item.handleStatus===3" src="../../../assets/img/approval.png" />
        <img v-if="item.handleStatus===4" src="../../../assets/img/revoke.png" />
      </div>
      <template v-if="isCheck===true">
        <div class="mask"></div>
        <el-checkbox v-model="checkList[index]" class="checkbox-item" @change="changeCheckList"></el-checkbox>
      </template>
    </div>
  </div>
</template>

<script>
import transformTime from "./transformTime";
import { TASK_DEALT } from "../../../libs/data/permissionBtns";

export default {
  name: "TaskList",
  components: { transformTime },
  props: ["listData", "type", "cssConfig", "isCheck", "isCheckAll"],

  data() {
    return {
      checkList: [],
      TASK_DEALT: TASK_DEALT
    };
  },
  watch: {
    isCheckAll: function($val) {
      if ($val === true) {
        this.checkList.forEach(($item, $index) => {
          this.$set(this.checkList, $index, true);
        });
      }
      this.changeCheckList();
    },
    listData: function($val) {
      this.checkList.length = this.listData.length;
      this.checkList.fill(false);
    }
  },
  mounted() {},
  methods: {
    onClick_communication($data) {
      this.$emit("communication", $data);
    },
    onClick_pass($data) {
      this.$emit("pass", $data);
    },
    onClick_reject($data) {
      this.$emit("reject", $data);
    },
    changeCheckList() {
      this.$emit("handleCheckList", this.checkList);
    }
  }
};
</script>
<style lang="scss" scoped>
.list-box {
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  align-content: flex-start;
  overflow: auto;
  .item {
    position: relative;
    margin-bottom: 24px;
    padding: 16px 24px;
    width: 48%;
    height: 236px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    &:nth-child(even) {
      margin-left: 24px;
    }
    .status {
      position: absolute;
      right: 24px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
      line-height: 22px;
    }
    .title {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
    }
    .detail {
      margin-top: 6px;
      width: 357px;
      height: 154px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
      line-height: 22px;
      .reason {
        width: 80%;
      }
      .note {
        width: 80%;
      }
    }
    .oper-box {
      position: absolute;
      bottom: 16px;
      right: 24px;
      img {
        width: 92px;
        height: 92px;
      }
    }
    .btn {
      width: 109px;
      height: 32px;
    }
    .btn_agree {
      width: 86px;
      height: 32px;
    }

    .btn_refuse {
      width: 86px;
      height: 32px;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0.5;
    }
    .checkbox-item {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
    }
  }
}
.ellipsis {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}
.ellipsis2 {
  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  overflow: hidden;

  /*! autoprefixer: off */

  -webkit-box-orient: vertical;
}

.ellipsis3 {
  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-line-clamp: 3;

  overflow: hidden;

  /*! autoprefixer: off */

  -webkit-box-orient: vertical;
}
</style>
