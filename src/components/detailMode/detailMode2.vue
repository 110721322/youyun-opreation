<template>
  <div class="g-bg-box" :class="configData.border?'m-border':''">
    <div class="m-title" :style="{background:configData.headColor}">
      {{ configData.name }}
      <slot name="taskDetail"></slot>
      <el-button
        v-show="isShowEditBtn"
        type="primary"
        class="f-edit-btn"
        size="mini"
        @click="clickEdit"
      >编辑</el-button>
    </div>

    <el-form
      ref="ruleForm"
      :inline="false"
      :model="ruleForm"
      :rules="rules"
      class="form"
      label-position="left"
    >
      <slot v-if="currentType" :currentType="currentType"></slot>
      <el-row>
        <el-col
          v-for="(item, key) of imageList"
          :key="key"
          :span="imgWidth?imgWidth:8"
          style="width: 100px;margin-right: 24px;">
          <el-form-item v-if="ruleForm[item.key]">
            <el-image
              style="width: 100px; height: 100px;display:block;margin: auto;"
              :src="ruleForm[item.key]"
              :preview-src-list="[ruleForm[item.key]]"
            ></el-image>
            <div class="m-img-des">{{ item.name }}</div>
            <span v-if="item.type == 'edit'" class="f-edit-btn">修改</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col
          v-for="(item, key) in textList"
          :key="key"
          :span="spanWidth?spanWidth:8"
          class="col"
        >
          <i v-if="item.hasIconTime" class="el-icon-time m-icon-time"></i>
          <el-form-item :label="item.name +(item.hideColon?'':'：') " v-if="!item.hideItem">
            <span v-if="item.type != 'switch'" class="m-item-value">{{ item.formatter ? item.formatter(ruleForm) : ruleForm[item.key] }}</span>
            <span v-if="item.type == 'edit'" class="f-edit-btn" @click="clickModify">修改</span>
            <el-switch
              v-if="item.type === 'switch'"
              v-model="ruleForm[item.key]"
              :inactive-value="false"
              :active-value="true"
            ></el-switch>
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
    spanWidth: Number,
    imgWidth: Number,
    currentType: String
  },
  data() {
    return {
      rules: {
        name: [{ required: true }]
      }
    };
  },
  computed: {
    imageList() {
      return this.configData.items.filter($item => {
        if ($item.type === "image") {
          return true
        }
      });
    },
    textList() {
      return this.configData.items.filter($item => {
        if ($item.type !== "image") {
          return true
        }
      });
    }
  },
  mounted() {},

  methods: {
    clickEdit() {
      this.$emit("edit", this.ruleForm);
    },
    clickModify() {
      this.$emit("modify", this.ruleForm);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-img-des {
  color: rgba(96, 98, 102, 1);
  line-height: 22px;
  text-align: center;
}
.m-border {
  border: 1px solid #ebeef5;
}
.g-bg-box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .m-title {
    position: relative;
    height: 54px;
    line-height: 54px;
    padding-left: 24px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
    .f-edit-btn {
      float: right;
      margin: 13px;
    }
  }

  .form {
    position: relative;
    margin: 32px;
    .m-item-value {
      color: rgba(96, 98, 102, 1);
      word-wrap: break-word;
    }
    .f-edit-btn {
      color: #1989fa;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  position: relative;
  .m-icon-time {
    position: absolute;
    color: rgb(200, 200, 15);
    top: 9px;
    left: -21px;
  }
}
</style>
