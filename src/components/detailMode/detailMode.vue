<template>
  <div class="bg_box">
    <div class="title">{{ configData.name }}</div>
    <div class="con_box" v-for="(child, key) of configData.child" :key="key">
      <div class="title">
        {{ child.name }}
        <span class="edit" @click="edit(child.modelName)">编辑</span>
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
          <el-col :span="8" v-for="(item, key) of child.models" :key="key">
            <el-form-item
              :label="item.name + '：'"
              prop="name"
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
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
        };
    },

    methods: {
        edit ($modelName) {
            this.$emit('edit', $modelName);
        },
    },
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
  }
  .con_box {
    margin: 24px;
    background: #fff;
    overflow: hidden;
    border: 1px solid #e9e9e9;
    .title {
      height: 44px;
      line-height: 44px;
      background: #fafafa;
      .edit {
        float: right;
        font-size: 14px;
        font-weight: 400;
        color: rgba(25, 137, 250, 1);
        margin-right: 32px;
        cursor: pointer;
      }
    }
    .form {
      margin: 32px;
      .item-value {
        color: rgba(96, 98, 102, 1);
        word-wrap: break-word;
      }
    }
  }
}
</style>
