<template>
  <div class="page">
    <div class="title">购物车</div>
    <div class="equiment">
      <div class="tabtle-title">刷脸设备</div>
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :api-service="null"
        :hide-edit-area="false"
      >
      </BaseCrud>
    </div>
    <div class="bottom">
      <div class="bottom-area">
        <div class="left-radio">
          <div class="radio"></div>
          <div class="select-all">全选</div>
          <div class="delete">删除</div>
        </div>
        <div class="right-area">
          <div class="right-amount">合计（不含运费）：<span style="color: #F64D4C; font-size: 20px; font-weight: 500;">345.0</span></div>
          <button @click="onClick_toorder">结算(10)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SHOPPING_CONFIG } from "./tableConfig/shoppingCartConfig";
export default {
  components: { BaseCrud },
  data() {
    return {
      testData: [],
      configData: SHOPPING_CONFIG
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    onClice_remove() {},
    onClick_toorder() {
      this.$router.push({
        path: '/serveMarket/equipmentMall/equimentOrder'
      })
    },
    getData() {
      this.testData = [
        {
          goodsName: 'q青蛙plus',
          goodsPrice: '10000'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .page {
    width: 100%;
  }
  .title {
    width: 100%;
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    font-weight: 500;
    color: #333335;
    border-bottom: 1px solid #EBEEF5;
    background: #ffffff;
    padding-left: 32px;
  }
  .equiment {
    width: 100%;
    padding: 32px 32px;
    background: #ffffff;
  }
  .tabtle-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 16px;
    color: #000000;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    padding: 0 24px 0 324px;
    box-sizing: border-box;
  }
  .bottom-area {
    width: 100%;
    height: 56px;
    background: #FAFAFA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 68px;
  }
  .left-radio {
    display: flex;
    align-items: center;
    color: #909399;
    font-size: 14px;
  }
  .radio {
    width: 14px;
    height: 14px;
    border: 1px solid #D5D8DE;
    background: #ffffff;
    margin-right: 16px;
  }
  .select-all {
    margin-right: 56px;
  }
  .right-area {
    display: flex;
    align-items: center;
  }
  .right-amount {
    font-size: 14px;
    color: #606266;
    line-height: 56px;
  }
  .right-area button {
    width: 130px;
    height: 56px;
    background: #1989FA;
    color: #ffffff;
    font-size: 14px;
    line-height: 56px;
    margin-left: 32px;
  }
</style>

