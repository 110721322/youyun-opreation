<template>
  <div class="result-page">
    <div class="bg">
      <img src alt class="bg-img" />
    </div>
    <div class="tip">开通成功，请联系主管配置后进入后台哟</div>
  </div>
</template>
<script>
export default {
  name: "Result",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.result-page {
  height: 100%;
  background: #fbfbfb;
  overflow: hidden;
  .bg {
    margin-top: 89px;
    text-align: center;
    .bg-img {
      display: inline-block;
      width: 217px;
      height: 166px;
      background: #aaa;
    }
  }
  .tip {
    margin-top: 30px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 16px;
    text-align: center;
  }
}
</style>
