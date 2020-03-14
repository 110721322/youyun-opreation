<template>
  <div :class="[border?'border bg_box':'bg_box']">
    <div class="title">
      {{ title }}
      <el-button v-show="isShowEditBtn" type="primary" class="edit_btn" size="mini">编辑</el-button>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    title: {
      type: String
    },
    border: {
      type: Boolean
    },
    isShowEditBtn: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: {},

  methods: {}
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid #ebeef5;
  .title {
    background: #ebeef5;
  }
}
.bg_box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .title {
    position: relative;
    height: 54px;
    line-height: 54px;
    padding-left: 32px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
    .edit_btn {
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
    .edit_btn {
      color: #1989fa;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>
