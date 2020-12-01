<template>
  <div class="g-bg-box">
    <div class="s-title">
      {{ configData.name }}
      <slot name="operatingTop"></slot>
    </div>
    <slot name="step"></slot>
    <div v-for="(child, key) of configData.child" :key="key" class="g-container-box">
      <template v-if="child.models && child.models.length > 0">
        <div class="s-title">
          {{ child.name }}
          <slot name="operatingItem">
            <span v-if="!child.hiddenEdit" class="s-edit" @click="clickEdit(child.modelName)">编辑</span>
          </slot>
        </div>
        <el-form
          ref="ruleForm"
          :inline="false"
          :model="ruleForm"
          :rules="rules"
          class="s-form"
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
                  lazy
                  v-if="item2.type === 'img' && ruleForm[item2.key]"
                  style="width: 100px; height: 100px;"
                  :src="ruleForm[item2.key]"
                  :preview-src-list="[ruleForm[item2.key]]"
                ></el-image>
                <span v-if="item2.type === 'descript'" class="item-value">{{ getDescriptText(item2) }}</span>
                <span v-else-if="item2.type === 'area'" class="item-value">{{ areaName }}</span>
                <span v-else-if="item2.type !== 'img'" class="item-value">{{ ruleForm[item2.key] }}{{ afterChar(item2) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </div>
    <slot name="operatingBottom"></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: { ruleForm: Object, configData: Object },
  data() {
    return {
      rules: {
        name: [{ required: true }]
      }
    };
  },
  computed: {
    areaName() {
      return this.ruleForm['provinceName'] + this.ruleForm['cityName'] + this.ruleForm['areaName']
    }
  },

  methods: {
    clickEdit($modelName) {
      this.$emit("edit", $modelName);
    },
    getDescriptText($item) {
      const val = this.ruleForm[$item.key]
      if (val === 'all') {
        return '全国'
      } else if (val === 'province') {
        return '省'
      } else if (val === 'city') {
        return '市'
      } else {
        return ''
      }
    },
    afterChar($item) {
      const type = $item.type;
      if (type === 'pecent') {
        return '‰'
      } else if (type === 'pecent1') {
        return '%'
      } else {
        return ''
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.g-bg-box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .s-title {
    height: 54px;
    line-height: 54px;
    padding-left: 32px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
  }
  .s-edit {
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: rgba(25, 137, 250, 1);
    margin-right: 32px;
    cursor: pointer;
  }
  .g-container-box {
    margin: 24px;
    background: #fff;
    overflow: hidden;
    border: 1px solid #e9e9e9;
    .s-title {
      height: 44px;
      line-height: 44px;
      background: #fafafa;
    }
    .s-form {
      margin: 32px;
      .s-item-value {
        color: rgba(96, 98, 102, 1);
        word-wrap: break-word;
      }
    }
  }
}
</style>
