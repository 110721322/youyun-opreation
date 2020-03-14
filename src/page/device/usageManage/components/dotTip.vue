<template>
  <div class="tip">
    <template v-for="(item,index) in configData">
      <span :key="index" class="dot" :class="item.className" />
      {{ item.label }}
    </template>
  </div>
</template>
<script>
export default {
  name: "DotTip",
  props: ["configData"],
  data() {
    return {};
  }
};
</script>
<style scoped>
.dot {
  display: inline-block;
  margin-left: 24px;
  margin-right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  vertical-align: middle;
}
.dot_blue {
  background: #1989fa;
}
.dot_green {
  background: #37cbcb;
}
.dot_yellow {
  background: #fbd955;
}
.dot_pink {
  background: #f47a8f;
}
</style>
