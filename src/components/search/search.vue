<template>
  <div class="s_box" :style="isOpen ? 'height:' + openHeight + 'px' : ''">
    <el-form
      size="large"
      :model="searchData"
      class="form-inline"
      :style="isOpen ? 'height:' + (openHeight + 40) + 'px' : ''"
    >
      <el-form-item label="开通时间：" label-width="100px">
        <date-select
          size="large"
          :type="'daterange'"
          @select="onChange_Time"
          :pickerOptions="pickerOptions"
          :isSelectToday="isSelectToday"
          :isRest="refresh"
        ></date-select>
      </el-form-item>

      <el-form-item label="精准筛选：" label-width="100px">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          size="large"
          v-model="inputForm"
        >
          <el-select
            slot="prepend"
            v-model="inputSelect"
            style="width:294px"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, key) in inputOptions"
              :key="key"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>

      <el-form-item
        :key="key"
        v-for="(item, key) of setects"
        :label="item.name + '：'"
        :class="['form_item', key % 2 == 0 ? 'clear_both' : '']"
        :label-width="key % 2 == 0 ? '100px' : '185px'"
      >
        <el-select
          style="width:294px"
          v-model="searchData[item.key]"
          placeholder="请选择"
          size="large"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <div class="btn_list" style="margin-bottom:0">
        <el-button
          type="primary"
          size="large"
          v-show="isOpen"
          @click="onClick_search"
        >
          搜索</el-button
        >
        <el-button plain size="large" @click="reset">重置</el-button>
        <div class="open_btn" @click="onClick_openOrClose">
          <span v-show="!isOpen">展开</span>
          <span v-show="isOpen">收起</span>

          <i :class="['el-icon-arrow-down', 'more', isOpen ? 'down' : '']"></i>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import DateSelect from '@/components/dateSelect.vue';

export default {
    name: 'search',
    components: {
        DateSelect,
    },
    props: ['setects', 'inputOptions', 'openHeight'],
    data () {
        return {
            isSelectToday: true,
            isOpen: false,
            inputSelect: '',
            inputForm: '',
            searchData: {},
            slectedData: '',
            searchObj: {},
            refresh: false,
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now() - 3600 * 1000 * 24 * 1;
                },
            },
        };
    },
    methods: {
        onChange_Time ($date) {
            this.searchData.startTime = $date[0];
            this.searchData.endTime = $date[1];
            this.$emit('search', this.searchData, this.searchObj);
        },
        onClick_openOrClose () {
            this.isOpen = !this.isOpen;
        },
        onClick_search () {
            if (this.inputSelect) {
                this.searchObj = {};
                this.searchObj[this.inputSelect] = this.inputForm;
            }
            this.$emit('search', this.searchData, this.searchObj);
        },
        reset () {
            this.searchObj = {};
            this.inputForm = '';
            this.searchData = {};
            this.refresh = true;
            setTimeout(() => {
                this.refresh = false;
            }, 1000);
        },
    },
};
</script>

<style scoped>
.s_box {
  height: 88px;
  background: rgba(255, 255, 255, 1);
  margin: 24px 24px 0;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  min-width: 1000px;
}

.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}
.open_btn {
  float: right;
  margin-left: 16px;
  line-height: 40px;
  color: #1890ff;
  cursor: pointer;
  user-select: none;
}
.form-inline {
  margin: 27px 24px;
  height: 40px;
  overflow: hidden;
  transition: 0.5s;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select {
  width: 774px;
}

.more {
  transition: 0.5s;
}
.down {
  transform: rotate(180deg);
}

.el-form-item {
  margin-bottom: 16px !important;
  margin-top: 0px !important;
}

.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
</style>
