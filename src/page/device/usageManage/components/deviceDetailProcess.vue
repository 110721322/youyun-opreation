<template>
  <div class="process-page">
    <i class="el-icon-arrow-left iconArrow" @click="onClick_scrollLeft"></i>
    <div class="process-content hideScroll">
      <template v-for="(item,index) in row.processList">
        <div :key="index" class="process-item">
          <div>
            <img class="process-icon" :src="item.icon" />
          </div>
          <div class="label">{{ item.actionTypeDesc || '' }}</div>
          <div class="time">{{ item.date }}</div>
        </div>
        <img
          v-if="!(index===row.processList.length-1)"
          :key="'img'+index"
          :src="arrow"
          class="arrow-img"
        />
      </template>
    </div>
    <i class="el-icon-arrow-right iconArrow" @click="onClick_scrollRight"></i>
  </div>
</template>
<script>
import arrowImg from "@/assets/img/arrow.png";
import iconRuku from "@/assets/img/ruku.png";
import iconChuku from "@/assets/img/chuku.png";
import iconBingMerchant from "@/assets/img/bingMerchant.png";
import iconUnbing from "@/assets/img/unbing.png";
import iconGenerateTransaction from "@/assets/img/generateTransaction.png";
export default {
  name: "DeviceDetailProcess",
  props: ["row"],
  data() {
    return {
      arrow: arrowImg,
      iconRuku: iconRuku,
      iconChuku: iconChuku,
      iconBingMerchant: iconBingMerchant,
      iconUnbing: iconUnbing,
      iconGenerateTransaction: iconGenerateTransaction
    };
  },
  methods: {
    onClick_scrollLeft($event) {
      const scrollBox = $event.currentTarget.nextSibling;
      scrollBox.scrollLeft = scrollBox.scrollLeft - 195;
    },
    onClick_scrollRight($event) {
      const scrollBox = $event.currentTarget.previousSibling;
      scrollBox.scrollLeft = scrollBox.scrollLeft + 195;
    }
  }
};
</script>
<style lang="scss" scoped>
.hideScroll::-webkit-scrollbar {
  width: 0 !important;
}

.hideScroll {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

.process-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .process-content {
    display: flex;
    align-items: center;
    overflow: hidden;
    .process-item {
      width: 70px;
      text-align: center;
      flex-shrink: 0;
      position: relative;
      .process-icon {
        height: 40px;
        width: 40px;
      }
      .label {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333335;
        line-height: 22px;
      }
      .time {
        font-size: 12px;
        font-family: HelveticaNeue;
        color: rgba(0, 0, 0, 0.45);
        line-height: 12px;
      }
    }
    .arrow-img {
      width: 127px;
      height: 12px;
    }
  }
}
.iconArrow {
  font-size: 23px;
  color: #1989fa;
}
</style>
