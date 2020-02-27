<template>
  <div class="w-box">
    <div class="head">{{configData.name}}</div>
    <div class="box">
      <div :key="index" v-for="(item,index) in configData.list">
        <div class="title" v-if="item.title">{{item.title}}</div>
        <div class="list">
          <div class="item1" :key="index" v-for="(item,index) in configData.list[index].list">
            <div class="img" :style="{backgroundColor:configData.imgColor}">
              <div class="dot" v-if="item.dotNum>0">{{item.dotNum}}</div>
              <img :src="item.imgUrl" alt />
            </div>
            <div class="text">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: { configData: Object, isShowEditBtn: Boolean },
  computed: {},
  data() {
    return {
      rules: {
        name: [{ required: true }]
      }
    };
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.w-box {
  margin: 24px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .head {
    padding-left: 32px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    line-height: 64px;
    border-bottom: 1px solid rgba(235, 238, 245, 1);
  }
  .box {
    padding: 8px 24px;
  }
  .list {
    width: 100%;
    overflow: hidden;
    display: flex;
    .item {
      display: flex;
      align-items: center;
      margin: 24px;
      width: 278px;
      height: 80px;
      border-radius: 2px;
      border: 1px solid rgba(220, 223, 230, 0);
    }
    .item1 {
      display: flex;
      align-items: center;
      width: 278px;
      height: 80px;
      border-radius: 2px;
      border: 1px solid rgba(220, 223, 230, 0);
    }
    .img {
      position: relative;
      margin: 16px 0 16px 8px;
      width: 48px;
      height: 48px;
      background: rgba(25, 137, 250, 1);
      border-radius: 4px;
      .dot {
        position: absolute;
        top: -12px;
        right: -12px;
        width: 24px;
        height: 24px;
        background: rgba(234, 21, 21, 1);
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 50%;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
    }
    .text {
      margin-left: 22px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 53, 1);
      line-height: 22px;
    }
  }
  .title {
    margin: 16px 0 0 8px;
    width:28px;
    height:20px;
    font-size:14px;
    font-family:PingFang-SC-Regular,PingFang-SC;
    font-weight:400;
    color:rgba(96,98,102,1);
    line-height:20px;
  }
}
</style>
