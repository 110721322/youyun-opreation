<template>
  <el-dialog
    :visible.sync="dialoger"
    :width="width"
    @closed="cancel"
  >
    <div v-if="title" slot="title" class="s-title">{{ title }}</div>
    <slot name="body"></slot>
    <div slot="footer" class="s-footer flex-between" style="align-items: flex-end;">
      <slot name="footerRight"></slot>
      <i></i>
      <div>
        <el-button class="g-btn s-btn-height-32" @click="cancel">{{ cancelText }}</el-button>
        <el-button type="primary" class="g-btn s-btn-height-32" @click="confirm">{{ confirmText }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    title: String,
    dialoger: {
      type: Boolean,
      default() {
        return false
      }
    },
    width: {
      type: String,
      default() {
        return '643px'
      }
    },
    cancelText: {
      type: String,
      default() {
        return '取消'
      }
    },
    confirmText: {
      type: String,
      default() {
        return '确认'
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/variables.scss";
  /deep/ .el-dialog {
    border-radius: 5px;
    overflow: hidden;
  }
  /deep/ .el-dialog__body {
    padding: 0 0 24px 0;
  }
  /deep/ .el-dialog__header,.el-dialog__footer{
    padding: 16px 24px;
    background-color: #FAFAFA;
    border-bottom: 1px solid rgba(235,238,245,1);;
  }
  /deep/ .el-dialog__footer {
    padding: 16px 24px;
    background-color: #FAFAFA;
    border-top: 1px solid rgba(235,238,245,1);;
  }
  .s-title {
    color: #606266;
    font-size: 16px;
  }
</style>
