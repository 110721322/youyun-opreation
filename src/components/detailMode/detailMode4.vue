<template>
  <div class="bg_box">
    <div class="title">
      {{ configData.name }}
      <el-button
        plain
        class="download_btn"
        size="mini"
        >手机号模版下载</el-button
      >
      <el-button
        type="primary"
        class="upload_btn"
        size="mini"
        >导入手机号</el-button
      >
    </div>

    <el-form
      :inline="false"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="form"
      label-position="right"
      label-width="auto"
    >
      <el-form-item
      v-for="(item, key) of configData.models" 
      :key="key"
      :label="item.name + '：'"
      >
        <el-select
          v-model="value"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择标签"
          v-if="item.type==='select'"
        >
          <el-option
            v-for="item in ruleForm.tags"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input type="textarea" v-if="item.type==='phoneNums'" v-model="ruleForm.phoneNums" :autosize="{ minRows: 6, maxRows: 6}"></el-input>
        <el-input type="textarea" v-if="item.type==='message'" v-model="ruleForm.message" :autosize="{ minRows: 6, maxRows: 6}"></el-input>
      </el-form-item>
    <el-button type="primary" class="sent_btn">发送</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    name: '',
    props: { ruleForm: Object, configData: Object },
    computed: {},
    data () {
        return {
            rules: {
                name: [{ required: true }],
            },
            value:[],
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
    .download_btn {
      float: right;
      margin: 13px 24px 13px 0;
    }
    .upload_btn {
      float: right;
      margin: 13px 16px;
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
    .sent_btn {
      display: block;
      margin: 14px auto;
      width:113px;
      height:40px;
      background:rgba(25,137,250,1);
      border-radius:4px;
    }
  }
}
</style>