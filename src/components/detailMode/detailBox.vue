<template>
  <div class="bg_box">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    title: {
      type: String
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
