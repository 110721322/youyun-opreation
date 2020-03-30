<template>
  <div class="bg_box" :class="configData.border?'border':''">
    <div class="title" :style="{background:configData.headColor}">
      {{ configData.name }}
      <slot name="taskDetail"></slot>
      <el-button
        v-show="isShowEditBtn"
        type="primary"
        class="edit_btn"
        size="mini"
        @click="onClick_edit"
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
        <el-col v-for="(item, key) of imageList" :key="key" :span="imgWidth?imgWidth:8">
          <el-form-item>
            <el-image
              style="width: 100px; height: 100px;display:block;margin: auto;"
              :src="ruleForm[item.key]"
              :preview-src-list="[ruleForm[item.key]]"
            ></el-image>
            <div class="img-des">{{ item.name }}</div>
            <span v-if="item.type == 'edit'" class="edit_btn">修改</span>
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
          <i v-if="item.hasIconTime" class="el-icon-time icon-time"></i>
          <el-form-item :label="item.name +(item.hideColon?'':'：') ">
            <span v-if="item.type != 'switch'" class="item-value">{{ ruleForm[item.key] }}</span>
            <span v-if="item.type == 'edit'" class="edit_btn">修改</span>
            <el-switch
              v-if="item.type == 'switch'"
              v-model="ruleForm[item.key]"
              inactive-value="0"
              active-value="100"
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
      },
      imageList: [],
      textList: []
    };
  },
  computed: {},
  mounted() {
    console.log(this.configData.models);
    this.configData.items.forEach($item => {
      if ($item.type === "image") {
        this.imageList.push($item);
      } else {
        this.textList.push($item);
      }
    });
  },

  methods: {
    onClick_edit() {
      this.$emit("edit", this.ruleForm);
    }
  }
};
</script>

<style lang="scss" scoped>
.img-des {
  color: rgba(96, 98, 102, 1);
  line-height: 22px;
  text-align: center;
}
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
    position: relative;
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
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  position: relative;
  .icon-time {
    position: absolute;
    color: rgb(200, 200, 15);
    top: 9px;
    left: -21px;
  }
}
</style>
