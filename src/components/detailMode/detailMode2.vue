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
        <el-col v-for="(item, key) of imageList" :key="key" :span="imgWidth?imgWidth:8" style="width: 100px;margin-right: 24px;">
          <el-form-item>
            <el-image
                style="width: 100px; height: 100px;display:block;margin: auto;"
                :src="ruleForm[item.key]"
                :preview-src-list="imgList"
            ></el-image>
            <div class="img-des">{{ item.name }}</div>
            <span v-if="item.type == 'edit'" class="edit_btn">修改</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col
            v-for="(item, key) in textList"
            v-if="isShow(item)"
            :key="key"
            :span="spanWidth?spanWidth:8"
            class="col text-ellipsis"
        >
          <i v-if="item.hasIconTime" class="el-icon-time icon-time"></i>
          <el-form-item
              :label="item.name +(item.hideColon?'':'：')"
              :label-width="item.labelWidth ? item.labelWidth : ''">
            <el-tooltip class="item" effect="dark" :content="ruleForm[item.key]" placement="top" v-if="item.showToolTip">
              <span v-if="item.type != 'switch'&&item.key!=='isMsgVerify'&&item.key !== 'amount'&&item.type !== 'isDisabled'" class="item-value">{{ ruleForm[item.key] }}</span>
            </el-tooltip>
            <div v-else-if="item.type != 'switch'&&item.key!=='isMsgVerify'&&item.key !== 'amount'&&item.type !== 'isDisabled'" class="flex-align-center">
              <span class="item-value">{{ item.formatter ? item.formatter(ruleForm) : ruleForm[item.key] }}</span>
              <span v-if="item.type == 'edit'" class="edit_btn" @click="toEdit(item)">修改</span>
            </div>
            <span v-if="item.type === 'isDisabled'" class="edit_btn" :style="'color:'+(ruleForm[item.key] === 0 ? 'green' : 'red')" @click="changeStatus">{{ ruleForm[item.key] === 0 ? '启用' : '禁用' }}</span>
            <!-- 交易户授权 -->
            <div class="flex-align-center">
              <!-- <el-switch
                v-if="item.type == 'switch'"
                v-model="ruleForm[item.key]"
                :inactive-value="0"
                :active-value="1"
                :disabled="true"
              ></el-switch> -->
              <span v-if="item.type == 'switch'" class="item-value">{{ ruleForm[item.key]===0?'未授权':'已授权' }}</span>
              <!-- 交易户模块 -->
              <el-tooltip popper-class="el-tooltip-opacity" effect="dark" content="（仅限交易户添加人修改）" placement="top">
                <img v-if="item.key === 'isAuthoriz'" style="width:20px;height:20px;margin-left:16px;" src="@/assets/img/icon_desc.png" alt="">
              </el-tooltip>
            </div>
            <!-- 特殊渲染item -->
            <slot :name="item.slotName" :item="item"></slot>
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
    computed: {
      imgList() {
        return this.imageList.map(item => {
          return this.ruleForm[item.key]
        })
      }
    },
    mounted() {
      this.configData.items.forEach($item => {
        if ($item.type === "image") {
          this.imageList.push($item);
        } else {
          this.textList.push($item);
        }
      });
    },

    methods: {
      isShow($item) {
        if (this.$g.utils.isFunction($item.isShow)) {
          return $item.isShow(this.ruleForm)
        } else if (this.$g.utils.isBoolean($item.isShow)) {
          return $item.isShow
        } else {
          return true
        }
      },
      toEdit() {
        this.$emit("editItem", this.ruleForm);
      },
      onClick_edit() {
        this.$emit("edit", this.ruleForm);
      },
      changeStatus() {
        this.$emit("changeStatus", this.ruleForm);
      }
    }
  };
</script>

<style lang="scss" scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
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
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .actText{
        color: #1989FA;
        cursor: pointer;
      }
      .edit_btn {
        color: #1989fa;
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
  .el-form-item {
    display: flex;
    align-items: center;
    /deep/ .el-form-item__label{
      flex-shrink: 0;
      padding: 0px;
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
