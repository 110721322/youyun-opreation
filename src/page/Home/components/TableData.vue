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
        ref="refTable"
        hide-edit-area
        :is-async="true"
        :grid-data="testData"
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
      apiService: Function,
      tableConfig: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        params: {},
        testData: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          },
          {
            id: 4
          }
        ]
      }
    },
    methods: {
      changeRadio($val) {

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
