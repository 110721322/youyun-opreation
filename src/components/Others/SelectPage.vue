<template>
  <div :class="selectClass">
    <el-select
        ref="select"
      v-model="ruleForm[formItem.key]"
      style="position: relative"
      :multiple="isArray(formItem.initVal)"
      :filterable="formItem.isSearch"
      :clearable="selectClearable"
      :remote="formItem.isSearch"
      :placeholder="placeholder"
      :remote-method="remoteMethod"
      :disabled="formItem.isDisabled"
        :reserve-keyword="true"
      :style="selectStyle"
      @change="changeEvent"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
      <div class="text-center" style="position: sticky;background: #fff;height:30px;bottom:0;z-index:1">
        <a class="text-normal">
          <el-pagination class="pagination" :page-sizes="[10]" @current-change="pageChange" :total='total' layout="prev,pager,next" />
        </a>
      </div>
    </el-select>
  </div>
</template>

<script>
import * as g from "@/libs/global";

export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {
      selectOptions: [],
      total: 0,
      query: ''
    };
  },
  computed: {
    selectStyle() {
      const item = this.formItem;
      return item.style ? item.style : "width:294px";
    },

    placeholder() {
      const item = this.formItem;
      return item.placeholder ? item.placeholder : `请选择${item.label}`;
    },
    selectClass() {
      const item = this.formItem;
      return item.className ? item.className : "";
    },
    selectClearable() {
      const item = this.formItem;
      return item.clearable ? item.clearable : false;
    }
  },
  created() {
    this.selectOptionsFun();
  },

  methods: {
    pageChange(page) {
      this.formItem.urlOptions.params.currentPage = page
      this.remoteMethod(this.query, true)
    },
    remoteMethod(query, pageChangeFlag) {
      console.log(query)
      const { urlOptions } = this.formItem;
      if (query !== '' || pageChangeFlag) {
        this.loading = true;
        this.query = query
        if (!pageChangeFlag) {
          urlOptions.params.currentPage = 1
        }
        setTimeout(() => {
          this.loading = false;
          urlOptions
            .url(
              {...urlOptions.params, bankName: query} || {}
            )
            .then(res => {
              const newArr = [];
              if (res.data) {
                for (const item of res.data) {
                  item.value = item[urlOptions.keyName];
                  item.label = item[urlOptions.valueName];
                  newArr.push(item);
                }
                this.total = res.totalCount
              }
              this.selectOptions = newArr;
              this.$nextTick(() => {
                this.$refs.select.selectedLabel = this.query
                this.$refs.select.query = this.query
              })
            })
            .catch(err => {
              console.error(err);
            });
        }, 200);
      } else {
        this.bankOptions = [];
      }
    },
    changeEvent($event) {
      const checked = this.selectOptions.filter($item => {
        if ($item.value === this.ruleForm[this.formItem.key]) {
          return $item;
        }
      })[0]
      this.query = checked.label;
      if (this.$g.utils.isFunction(this.formItem.callback)) {
        this.formItem.callback(this.ruleForm, checked)
      }
    },
    isArray(value) {
      return g.utils.isArr(value);
    },
    selectOptionsFun() {
      const { options, urlOptions } = this.formItem;
      if (!options && !urlOptions) {
        throw new ReferenceError(
          'options or urlOptions" does not exist.open fn.js and add it'
        );
      }
      if (options) {
        this.selectOptions = options;
      } else {
        console.log(urlOptions.params);
        urlOptions
          .url(
            {bankName: this.ruleForm[this.formItem.key2], ...urlOptions.params} || {}
          )
          .then(res => {
            const newArr = [];
            if (res.data) {
              for (const item of res.data) {
                item.value = item[urlOptions.keyName];
                item.label = item[urlOptions.valueName];
                newArr.push(item);
              }
              this.total = res.totalCount
            }
            this.selectOptions = newArr;
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>

<style></style>
