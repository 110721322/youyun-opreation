<template>
  <yun-detail-box
      :title="title"
      style="margin: 0;"
  >
    <yun-radio-group
        slot="titleRight"
        theme="btnPlain"
        :default-value="radioGroup[0].value"
        :radio-group="radioGroup"
        @change="changeRadio"
    ></yun-radio-group>
    <yun-table
        class="m-table"
        ref="table"
        hide-edit-area
        :is-async="true"
        :page-sizes="pageSizes"
        :grid-config="tableConfig.gridConfig"
        :params="params"
        :api-service="apiService"
    ></yun-table>
  </yun-detail-box>
</template>

<script>
  export default {
    name: "TableData",
    props: {
      title: String,
      radioGroup: {
        type: Array,
        required: true
      },
      apiServiceStrategies: {
        type: Object,
        default() {
          return {}
        }
      },
      tableConfig: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        params: {},
        apiService: null,
        pageSizes: [5, 10, 20, 30, 40, 100]
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        for (let key in this.apiServiceStrategies) {
          this.apiService = this.apiServiceStrategies[key]
          return
        }
      },
      changeRadio($val) {
        this.apiService = this.apiServiceStrategies[$val]
        this.$nextTick(() => {
          this.$refs.table.initData()
        })
      },
      refresh() {
        this.$refs.table.getData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-table {
    padding: 16px 24px;
    /deep/ .m-rank {
      display: block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      text-align: center;
      &.m-top {
        background: #314659;
        border-radius: 50%;
        color: #FFFFFF;
      }
    }
  }
</style>
