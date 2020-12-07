<template>
  <div :class="[border?'m-border g-bg-box':'g-bg-box']">
    <div class="s-title">
      {{ title }}
      <el-button
        v-show="isShowEditBtn"
        type="primary"
        class="s-edit-btn"
        size="mini"
        @click="clickEdit"
      >{{ btnName }}</el-button>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DetailBox",
  props: {
    title: {
      type: String
    },
    border: {
      type: Boolean
    },
    isShowEditBtn: {
      type: Boolean
    },
    btnName: {
      type: String,
      default() {
        return "编辑"
      }
    }
  },
  data() {
    return {};
  },
  computed: {},

  methods: {
    clickEdit() {
      this.$emit("edit");
    }
  }
};
</script>

<style lang="scss" scoped>
.m-border {
  border: 1px solid #ebeef5;
  .s-title {
    background: #ebeef5;
  }
}
.g-bg-box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .s-title {
    position: relative;
    height: 54px;
    line-height: 54px;
    padding-left: 24px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
    .s-edit-btn {
      float: right;
      margin: 13px;
    }
  }

  .form {
    margin: 32px;
    .item-value {
      color: rgba(96, 98, 102, 1);
      word-wrap: break-word;
    }
    .s-edit-btn {
      color: #1989fa;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>
