<template>
  <div class="bg_box">
    <div class="title">
      {{ configData.name }}
      <el-button
        v-show="isShowEditBtn"
        type="primary"
        class="edit_btn"
        size="mini"
        >编辑</el-button
      >
    </div>

    <el-form
      :inline="false"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="form"
      label-position="left"
    >
      <el-row>
        <el-col :span="8" v-for="(item, key) of configData.models" :key="key">
          <el-form-item
            :label="item.name + '：'"
            v-for="(item, key) of item.items"
            :key="key"
          >
            <el-image
              v-if="item.type === 'img'"
              style="width: 100px; height: 100px"
              :src="ruleForm[item.key]"
              :preview-src-list="[ruleForm[item.key]]"
            >
            </el-image>
            <span v-else class="item-value">{{ ruleForm[item.key] }}</span>
            <span class="edit_btn" v-if="item.type == 'edit'">修改</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
    name: '',
    props: { ruleForm: Object, configData: Object, isShowEditBtn: Boolean },
    computed: {},
    data () {
        return {
            rules: {
                name: [{ required: true }],
            },
        };
    },

    methods: {},
};
</script>

<style lang="scss" scoped>
.bg_box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .title {
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
