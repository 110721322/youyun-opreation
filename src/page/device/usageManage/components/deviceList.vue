<template>
  <div class="device-contain">
    <template v-if="!hasSelectOne">
      <el-form :model="ruleForm" :class="[isOpen?'':'device-form']">
        <el-form-item
          v-for="(item,index) in deviceListData"
          :key="index"
          :label="item.label+':'"
          :label-width="item.labelWidth"
        >
          <div class="device-list">
            <div
              v-for="(item1,index1) in item.deviceList"
              :key="index1"
              class="device-item"
              @click="onClick_selectItem(item1)"
            >
              <img class="device-img" :src="item1.imgUrl" />
              <div class="nums">{{ item1.nums }}</div>
              <div class="name">{{ item1.name }}</div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div v-if="showExpandBtn" class="expand-btn" @click="onClick_openOrClose">
        <span v-show="!isOpen">展开</span>
        <span v-show="isOpen">收起</span>

        <i :class="[ isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']" />
      </div>
    </template>
    <template v-if="hasSelectOne">
      <div class="select-item">
        <i class="el-icon-close close-icon" @click="onClick_closeItem"></i>
        <img class="device-img" :src="selectItem.imgUrl" />
        <div class="nums">{{ selectItem.nums }}</div>
        <div class="name">{{ selectItem.name }}</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "DeviceList",
  props: ["deviceListData", "showExpandBtn"],
  data() {
    return {
      ruleForm: {},
      isOpen: false,
      selectItem: {},
      hasSelectOne: false
    };
  },
  methods: {
    onClick_closeItem() {
      this.hasSelectOne = false;
      this.isOpen = false;
    },
    onClick_selectItem($itemData) {
      this.selectItem = $itemData;
      this.hasSelectOne = true;
    },
    onClick_openOrClose() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.device-contain {
  margin: 24px;
  .device-form {
    height: 150px;
    overflow: hidden;
  }
  .device-list {
    display: flex;
    flex-wrap: wrap;
    .device-item {
      text-align: center;
      flex-shrink: 0;
      margin-left: 20px;
      margin-bottom: 16px;
      .device-img {
        height: 100px;
        width: 100px;
      }
      .nums {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333335;
        line-height: 16px;
      }
      .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333335;
        line-height: 12px;
      }
    }
  }
  .select-item {
    text-align: center;
    display: inline-block;
    position: relative;
    padding: 16px 12px;
    border-radius: 1px;
    border: 1px dashed rgba(25, 137, 250, 1);
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      color: #0089ff;
    }
    .device-img {
      height: 100px;
      width: 100px;
    }
    .nums {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333335;
      line-height: 16px;
    }
    .name {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333335;
      line-height: 12px;
    }
  }
  .expand-btn {
    margin: auto;
    width: 80px;
    text-align: center;
    color: #1890ff;
  }
}
</style>
