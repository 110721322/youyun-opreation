<template>
  <div class="bg_box">
    <div class="title">
      {{ configData.name }}
      <slot name="operatingTop">
      <!-- <span class="edit" @click="edit(child.modelName)">编辑</span> -->
      </slot>
    </div>
    <slot name="step"></slot>
    <slot name="operatinTopCont"></slot>
    <div v-for="(child, key) of configData.child" :key="key" class="con_box">
      <div class="title">
        {{ child.name }}
        <slot name="operatingItem" :child="child">
          <span v-if="child.ShowEditBtn" class="edit" @click="edit(child.modelName)">{{child.ShowEditBtn}}</span>
        </slot>
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
          <el-col v-for="(item, key1) of child.models" :key="key1" :span="8">
            <el-form-item
              v-for="(item2, key2) of item.items"
              :key="key2"
              :label="item2.name + '：'"
              prop="name"
            >
              <el-image
                v-if="item2.type === 'img'"
                style="width: 100px; height: 100px"
                :src="ruleForm[item2.key]"
                :preview-src-list="[ruleForm[item2.key]]"
              ></el-image>
              <span v-else class="item-value">{{ ruleForm[item2.key] }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <slot name="operatingBottomCont"></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: { ruleForm: Object, configData: Object },
  data() {
    return {
      rules: {
        name: [{ required: false }]
      }
    };
  },
  computed: {},

  methods: {
    edit($modelName) {
      this.$emit("edit", $modelName);
    }
  }
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
  .edit {
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: rgba(25, 137, 250, 1);
    margin-right: 18px;
    cursor: pointer;
  }
  .delete {
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: #F5222D;
    margin-right: 32px;
    cursor: pointer;
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
