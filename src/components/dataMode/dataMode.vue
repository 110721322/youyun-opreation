<template>
  <div class="g-box">
    <div v-for="(item,index) in configData" :key="index" class="s-item-box">
      <div class="s-title">{{ item.title }}</div>
      <div class="s-data">{{ item.data }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataMode",
  props: ["configData"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.g-box {
  height: 106px;
  margin: 24px 24px 24px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}
.s-item-box {
  text-align: center;
  height: 58px;
  border-right: 1px solid #e8e8e8;
  margin-top: 24px;
  overflow: hidden;
  // flex-basis: 100%;
  width: 50%;
  .s-title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 3px;
  }
  .s-data {
    font-size: 24px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 10px;
  }
  &:last-child {
    border: none;
  }
}
</style>
