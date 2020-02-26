<template>
  <div class="d-box">
    <div class="item-box">
      <div class="title">商家数量</div>
      <div class="data">555个</div>
    </div>

    <div class="item-box">
      <div class="title">交易金额</div>
      <div class="data">3237800.00元</div>
    </div>

    <div class="item-box">
      <div class="title">手续费</div>
      <div class="data">37800.00元</div>
    </div>

    <div class="item-box last_item">
      <div class="title">手续费</div>
      <div class="data">37800.00元</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'dataMode',
    data () {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.d-box {
  height: 106px;
  margin: 24px 24px 24px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

}
.item-box {
  text-align: center;
  height: 58px;
  border-right: 1px solid #e8e8e8;
  margin-top: 24px;
  overflow: hidden;
  flex-basis: 100%;
  .title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 3px;
  }
  .data {
    font-size: 24px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 10px;
  }
}
.last_item{
  border: none
}
</style>
