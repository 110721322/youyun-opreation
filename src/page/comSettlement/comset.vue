<template>
  <div>
    <div class="top_head">
      <span>佣金结算</span>
      <span>结算时间为每月28日至下月10日，需快递发票单</span>
      <span @click="handleLookBill">查看发票信息></span>
    </div>
    <div class="content">
      <ul class="content-banner">
        <li><p>间联佣金(元)</p><p style="color: #262626; line-height: 32px; font-weight: 500; font-size: 20px;">{{ settleNum.indirectCommission || 0 }}</p></li>
        <li><p>活动奖励(元)</p><p style="color: #1989FA; font-size: 20px; font-weight: 500; line-height: 32px;">{{ settleNum.activityReward || 0 }}</p></li>
        <li>
          <p>总佣金</p>
          <p style="font-size: 24px; margin-top: 4px; line-height: 24px; font-weight: 500; color: #333333">{{ settleNum.totalCommission }}</p>
          <div class="option-btn">
            <el-button type="primary" @click="settleDrawer">立即结算</el-button>
            <el-button type="primary" plain @click="handel_record">结算记录</el-button>
          </div>
        </li>
      </ul>
      <div class="table_box">
        <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :params="typeflage"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          :api-service="api"
          @detail="onClick_detail"
        ></BaseCrud>
      </div>
      <el-drawer
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose"
        size="500px"
      >
        <div slot="title" class="drawer-contenttitle">
          <span>申请结算</span>
        </div>
        <div class="content-draw">
          <div class="content-form">
            <div class="form-select">
              <div class="select">
                <div class="left-label">结算类型：</div>
                <div class="check-box">
                  <el-checkbox-group v-model="isCheck" @change="checkChange">
                    <el-checkbox v-for="(confDate, index) in seetlmap.confDate" :key="index" :label="confDate" class="select-box">
                      {{ (confDate.name+'['+confDate.dateTxt+']') }}
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="select" style="margin: 16px 0 24px 0;">
                <div class="left-label">总佣金：</div>
                <div class="select-price">{{ settleCommission }}</div>
              </div>
            </div>
            <Form
              :form-base-data="fromConfigData.formData"
              :show-foot-btn="fromConfigData.showFootBtn"
              label-width="130px"
              @cancel="cancel"
              @confirm="confirm"
            ></Form>
          </div>
        </div>
      </el-drawer>
    </div>

    <el-dialog width="942px" title="发票实例" :visible.sync="billInfoModalVisible">
      <BillInfoModal />
    </el-dialog>
  </div>
</template>

<script>
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SERVICE_CONFIG } from "./tableConfig/comsetConfig";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "./formConfig/thirdPartyDetail";
import BillInfoModal from './components/billInfoModal';
import api from "@/api/api_comSettlement";
export default {
  name: "Comset",
  components: {
    BaseCrud,
    Form,
    BillInfoModal
  },
  data() {
    return {
      fromConfigData: {},
      configData: SERVICE_CONFIG,
      testData: [],
      drawer: false,
      isChenk: [],
      typeflage: {
        typeFlag: 1
      },
      api: api.queryAllSettle,
      indirectCommission: '',
      activityReward: '',
      totalCommission: '',
      settleNum: {},
      seetlmap: {
        confDate: []
      },
      info: {},
      isCheck: [],
      settleCommission: 0,
      platformCommission: 0,
      actualAmount: 0,
      settleInfo: {},
      billInfoModalVisible: false
    }
  },
  created() {
    this.getSettleNum()
  },
  mounted() {},
  methods: {
    getSettleNum() {
      api.querySettleSum({}).then(res => {
        this.settleNum = res.data
      })
    },
    checkChange($val) {
      var settleCommission = 0
      this.isCheck.forEach((item, index) => {
        settleCommission += item.settleAmount
      })
      this.settleCommission = settleCommission
    },
    handleClose() {
      this.drawer = false
    },
    onClick_detail($row) {
      this.$router.push({
        name: 'comsetDetail',
        query: {
          tradeMonth: $row.totalTradeMonth
        }
      })
    },
    settleDrawer() {
      this.isCheck = []
      this.settleCommission = 0
      if (this.settleNum.totalCommission === 0) {
        this.$message({
          message: '暂无可结算金额',
          type: 'warning'
        })
      } else {
        api.initSettle({}).then(res => {
          if (res.data) {
            this.drawer = true
            this.info = res.data.settleMap
            this.settleInfo = res.data
            const newFromConfigData = FORM_CONFIG.detailData.formData
            newFromConfigData[2].initVal = res.data.settleAccount
            newFromConfigData[3].initVal = res.data.settleMobile
            this.fromConfigData.formData = newFromConfigData
            var keyArr = []
            for (const keyItem in res.data.settleMap) {
              keyArr.push({key: keyItem})
            }
            keyArr.forEach((item, index) => {
              const name = res.data.settleMap[item.key][0].settleTypeName
              item.name = name
              const dateArr = []
              var totalSettleAmount = 0
              res.data.settleMap[item.key].forEach((dateItem, dateIndex) => {
                dateArr.push(dateItem.tradeMonth)
                totalSettleAmount += dateItem.settleAmount
              })
              item.dateTxt = dateArr.join(',')
              item.settleAmount = totalSettleAmount
            })
            this.seetlmap.confDate = keyArr || []
          }
        })
      }
    },
    handel_record() {
      this.$router.push({
        name: 'comsetRecord'
      })
    },
    cancel() {
      this.drawer = false
    },
    confirm($sunmit) {
      if (this.isCheck.length === 0 || !$sunmit.expressNumber || !$sunmit.settleAccount || !$sunmit.settleMobile || !$sunmit.expressImg) {
        this.$message({
          message: '请填写必填信息',
          type: 'warning'
        })
        return false
      } else {
        var keyArr = []
        var arr = []
        var arr1 = []
        var typeMonthList = []
        for (const keyItem in this.info) {
          keyArr.push({key: keyItem})
        }
        this.isCheck.forEach(m => {
          keyArr.forEach(v => {
            if (m.key === v.key) {
              arr.push(this.info[m.key])
            }
          })
        })
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            arr1.push(arr[i][j])
          }
        }
        arr1.forEach(item => {
          var obj = {}
          obj.id = item.id
          obj.settleType = item.settleType
          obj.tradeMonth = item.tradeMonth
          typeMonthList.push(obj)
        })
        api.submitSettle({
          expressNumber: $sunmit.expressNumber,
          settleName: this.settleInfo.settleName,
          expressImg: $sunmit.expressImg.dialogImageUrl,
          settleCommission: this.settleCommission,
          settleAccount: $sunmit.settleAccount,
          actualAmount: this.settleCommission,
          settleMobile: $sunmit.settleMobile,
          alternatePhone: $sunmit.alternatePhone,
          settleRemark: $sunmit.settleRemark,
          typeMonthList: typeMonthList
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.drawer = false
            this.getSettleNum()
          }
        })
      }
    },
    // 查看发票信息
    handleLookBill() {
      this.billInfoModalVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .top_head {
    width: 100%;
    height: 76px;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding-left: 24px;
  }
  .top_head span:nth-child(1) {
    display: block;
    font-size: 20px;
    font-weight: 500;
    margin-right: 16px;
  }
  .top_head span:nth-child(2) {
    font-size: 14px;
    color: #909399;
  }
  .top_head span:nth-child(3) {
    font-size: 14px;
    color: #1989FA;
    cursor: pointer;
  }
  .content {
    width: 100%;
    padding: 24px 24px;
  }
  .content-banner {
    width: 100%;
    height: 184px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .content-banner li {
    width: 33.3%;
    text-align: center;
  }
  .content-banner li:nth-child(1) {
    padding: 50px 0 0 0;
  }
  .content-banner li:nth-child(2) {
    padding: 50px 0 0 0;
  }
  .content-banner li:nth-child(3) {
    padding-top: 35px;
  }
  .content-banner li p {
    color: #909399;
    margin-bottom: 16px;
  }
  .content-banner li p:nth-child(1) {
    font-size: 14px;
    color: #9E9E9E;
    font-weight: 500;
  }
  .el-drawer__header {
    margin-bottom: 20px;
  }
  .drawer-contenttitle {
    font-size: 20px;
    font-weight: 500;
  }
  .content-draw {
    width: 100%;
    padding: 24px 32px 100px 32px;
  }
  .content-form {
    width: 100%;
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  .content-title {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #E9E9E9;
    background: #EBEEF5;
    line-height: 44px;
    padding-left: 24px;
    font-size: 14px;
    font-weight: 500;
  }
  .form-select {
    padding: 32px 0;
  }
  .select {
    display: flex;
  }
  .left-label {
    width: 130px;
    text-align: right;
    margin-right: 6px;
  }
  .select-price {
    font-size: 14px;
    color: #606266;
  }
/deep/ .el-dialog__header {
  padding: 16px 24px;
  background: #FAFAFA;
}
/deep/ .el-dialog .el-dialog__body {
  padding: 0 !important;
}
</style>

