<template>
  <div class="w-box">
    <div class="head">{{ configData.name }}</div>
    <div class="box">
      <div v-for="(item,index) in configData.list" :key="index">
        <div v-if="item.title" class="title">{{ item.title }}</div>
        <div class="list">
          <div
            v-for="(item2,index2) in configData.list[index].list"
            :key="index2"
            v-has="item2.permission"
            class="item1"
            @click="onClick_item(item2)"
          >
            <div class="img" :style="{backgroundColor:configData.imgColor}">
              <div v-if=" item2.dotNum>0 " class="dot">{{ item2.dotNum }}</div>
              <img :src="item2.imgUrl" alt="" />
<!--              <img src="../../assets/img/agentSer.png" alt="">-->
            </div>
            <div class="text">{{ item2.text }}</div>
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
  data() {
    return {
      rules: {
        name: [{ required: true }]
      }
    };
  },
  computed: {},

  methods: {
    onClick_item($item) {
      if ($item.path) {
        this.$router.push({
          path: $item.path
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.w-box {
  margin: 24px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .head {
    padding-left: 24px;
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
      cursor: pointer;
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
    width: 28px;
    height: 20px;
    font-size: 14px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
    line-height: 20px;
  }
}
</style>
