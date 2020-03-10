<template>
  <div class="bg_box" :class="configData.border?'border':''">
    <div class="title" :style="{background:configData.headColor}">
      {{ configData.name }}
      <slot name="taskDetail"></slot>
      <el-button v-show="isShowEditBtn" type="primary" class="edit_btn" size="mini">编辑</el-button>
      <el-button v-show="isShowCallBtn" type="primary" class="edit_btn" size="mini">立即沟通</el-button>
    </div>

    <el-form
      ref="ruleForm"
      :inline="false"
      :model="ruleForm"
      :rules="rules"
      class="form"
      label-position="left"
    >
      <el-row>
        <el-col
          v-for="(item1, key1) of configData.models"
          :key="key1"
          :span="spanWidth?spanWidth:8"
        >
          <el-form-item v-for="(item, key) of item1.items" :key="key" :label="item.name + '：'">
            <el-image
              v-if="item.type === 'img'"
              style="width: 100px; height: 100px"
              :src="ruleForm[item.key]"
              :preview-src-list="[ruleForm[item.key]]"
            ></el-image>
            <span v-else class="item-value">{{ ruleForm[item.key] }}</span>
            <span v-if="item.type == 'edit'" class="edit_btn">修改</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object,
    configData: Object,
    isShowEditBtn: Boolean,
    isShowCallBtn: Boolean,
    spanWidth: Number
  },
  data() {
    return {
      rules: {
        name: [{ required: true }]
      }
    };
  },
  computed: {},

  methods: {}
};
</script>

<style lang="scss" scoped>
.border {
  border: 1px solid #ebeef5;
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
