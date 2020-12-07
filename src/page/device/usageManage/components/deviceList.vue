<template>
  <div class="device-contain">
    <template v-if="!hasSelectOne">
      <el-form :model="ruleForm" :class="[isOpen?'':'device-form']">
        <el-form-item
          v-for="(item,index) in deviceListData"
          :key="index"
          :label-width="item.labelWidth"
        >
          <div class="device-list">
            <div>{{item.deviceTypeDesc}}</div>
            <div class="device-list" v-for="(item1, index1) in item.usingList" :key="index1">
              <div class="device-item" @click="onClickSelectItem(item1)">
                <img class="device-img" :src="item1.deviceImg" />
                <div class="nums">{{ item1.usingCount || '0' }}台</div>
                <div class="name">{{ item1.deviceModel }}</div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div v-if="showExpandBtn" class="expand-btn" @click="onClickOpenOrClose">
        <span v-show="!isOpen">展开</span>
        <span v-show="isOpen">收起</span>

        <i :class="[ isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']" />
      </div>
    </template>
    <template v-if="hasSelectOne">
      <div class="select-item">
        <i class="el-icon-close close-icon" @click="onClickCloseItem"></i>
        <img class="device-img" :src="selectItem.deviceImg" />
        <div class="nums">{{ selectItem.usingCount || '0' }}台</div>
        <div class="name">{{ selectItem.deviceModel }}</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "DeviceList",
  props: ["deviceListData", "showExpandBtn", "beginDate", "endDate"],
  data() {
    return {
      ruleForm: {},
      isOpen: false,
      selectItem: {},
      hasSelectOne: false
    };
  },
  methods: {
    onClickCloseItem() {
      this.hasSelectOne = false;
      this.isOpen = false;
      this.$emit("province");
    },
    onClickSelectItem($itemData) {
      this.selectItem = $itemData;
      this.hasSelectOne = true;
      this.$emit("province", $itemData);
    },
    onClickOpenOrClose() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.device-contain {
  margin: 24px;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    margin-right: 24px;
  }
  .device-form {
    height: 200px;
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
        font-weight: 500;
        color: #333335;
        line-height: 16px;
        margin-bottom: 8px;
        margin-top: 16px;
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
.el-form-item--small.el-form-item {
  width: 100%;
  margin-bottom: 40px;
}
</style>
