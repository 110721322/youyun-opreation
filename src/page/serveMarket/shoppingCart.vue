<template>
  <div class="page">
    <div class="title">购物车</div>
    <div class="equiment">
      <div class="tabtle-title">刷脸设备</div>
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="shopList.FACE"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="false"
        :is-select="true"
        :is-expand="false"
        :hide-edit-area="false"
        @delete="handel_delete"
        @okEdit="handel_sure"
      >
      </BaseCrud>
      <div class="tabtle-title">收银机具</div>
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="shopList.POSS"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :row-key="'id'"
        :is-async="false"
        :is-select="true"
        @selectionChange="handel_select"
        @delete="handel_delete"
        @okEdit="handel_sure"
      >
      </BaseCrud>
    </div>
    <div class="bottom">
      <div class="bottom-area">
        <div class="left-radio">
          <el-checkbox v-model="checkAll" @change="handel_selectAll">全选</el-checkbox>
          <div v-if="deviceIdList.length>0" class="delete" @click="click_delete">删除</div>
        </div>
        <div class="right-area">
          <div class="right-amount">合计（不含运费）：<span style="color: #F64D4C; font-size: 20px; font-weight: 500;">{{ totalAmount|| '0' }}</span></div>
          <button @click="onClick_toorder">结算({{ deviceIdList.length || '0' }})</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_serveMarket";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SHOPPING_CONFIG } from "./tableConfig/shoppingCartConfig";
export default {
  components: { BaseCrud },
  data() {
    return {
      testData: [],
      configData: SHOPPING_CONFIG,
      shopList: [],
      addcart: false,
      deviceIdList: [],
      totalAmount: '',
      isIndeterminate: false,
      checkAll: false,
      deleteList: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      api.queryShopCartList({
        userId: localStorage.getItem('agentUserId')
      }).then(res => {
        if (res.object) {
          this.shopList = res.object
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handel_select($row) {
      this.deviceIdList = []
      this.deleteList = ''
      this.totalAmount = 0
      $row.forEach((v, index) => {
        this.deviceIdList.push(v.deviceId)
        this.totalAmount += v.shopSubtotal
      })
      for (let i = 0; i < $row.length; i++) {
        this.deleteList += $row[i].deviceId + ",";
      }
      if (this.deleteList.length > 0) {
        this.deleteList = this.deleteList.substr(0, this.deleteList.length - 1);
      }
    },
    handel_selectAll() {},
    handel_delete($row) {
      this.$confirm("确定删除该订单么", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      }).then(res => {
        api.delShopCart({
          deviceIdList: $row.deviceId,
          userId: localStorage.getItem('agentUserId'),
          count: $row.shopCartCount
        }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.shopList = []
          this.getData()
        }).catch(err => {
          this.$message(err.message)
        })
      }).catch(() => {
        this.$message('取消操作')
      })
    },
    click_delete() {
      this.$confirm("确定删除购物车列表么", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      }).then(res => {
        api.delShopCart({
          deviceIdList: this.deleteList,
          userId: localStorage.getItem('userId'),
          count: 1
        }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.shopList = []
          this.getData()
        }).catch(err => {
          this.$message(err.message)
        })
      })
    },
    onClick_toorder() {
      if (this.deviceIdList.length === 0) {
        this.$message({
          message: '请选择设备',
          type: 'warning'
        })
      } else {
        api.settle({
          deviceIds: this.deviceIdList
        }).then(res => {
          this.$router.push({
            path: '/serveMarket/equipmentMall/equimentOrder',
            query: {
              cartList: res.object
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handel_sure($item) {
      api.setShopCartCount({
        deviceId: $item.deviceId,
        count: $item.shopCartCount,
        userId: localStorage.getItem('agentUserId')
      }).then(() => {
        $item.edit = false;
        this.$message({
          message: '修改数量成功',
          type: 'success'
        })
        this.getData()
      })
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
    padding-left: 24px;
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
  .select-all {
    margin-right: 56px;
  }
  .delete {
    margin-left: 24px;
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
  .el-image__preview {
    width: 80px;
    height: 80px;
  }
</style>

