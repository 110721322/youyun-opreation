<template>
  <div>
    <div class="tab_head">
      <span class="title">订单详情</span>
    </div>
    <el-alert
      v-if="showComponents.showRejectTitle"
      class="detail-alert"
      :title="rejectTitle"
      type="info"
      :closable="false"
      show-icon
    ></el-alert>
    <div class="bg_box border">
      <div class="title">{{ configData3.name }}</div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :span-method="arraySpanMethod"
          style="width: 100%"
          max-height="279"
          show-summary
          :summary-method="getSummaries"
          :header-cell-style="{height:'48px',background:'rgb(250,250,250)'}"
          size="medium"
          class="slot"
        >
          <el-table-column prop="deviceModel" label="设备名称" width="180"></el-table-column>
          <el-table-column prop="name" label="图片">
            <template slot-scope="scope">
              <el-image
                style="width: 65px; height: 65px"
                :src="scope.row.deviceImg"
                :preview-src-list="[scope.row.deviceImg]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="salePrice" label="设备单价（元）"></el-table-column>
          <el-table-column prop="count" label="设备数量（个）"></el-table-column>
        </el-table>
      </div>
      <el-form class="form" label-position="left">
        <el-row class="row">
          <el-col v-for="(item, key) in configData3.items" :key="key" :span="8" class="col">
            <el-form-item :label="item.name + '：' ">
              <span class="item-value">{{ ruleForm3[item.key] }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <detailMode :rule-form="ruleForm" :config-data="configData"></detailMode>
    <detailMode :rule-form="ruleForm2" :config-data="configData2"></detailMode>
  </div>
</template>
<script>
import detailMode from "@/components/detailMode/detailMode2.vue";
import api from "@/api/api_agent.js"
export default {
  name: "HardwareOrderDetail",
  components: { detailMode },
  data() {
    return {
      rejectTitle: "驳回原因：商户名称与营业执照不符合",
      showComponents: {
        showRejectTitle: false
      },
      currentType: "",
      tableData: [],
      ruleForm: {
        // buyerName: "1",
        // buyerMobile: "2",
        // buyerAddress: "3"
      },
      configData: {
        name: "邮寄信息",
        items: [
          {
            name: "联系人",
            key: "buyerName"
          },
          {
            name: "联系人手机号",
            key: "buyerPhone"
          },
          {
            name: "邮寄地址",
            key: "buyerAddress"
          }
        ]
      },
      ruleForm2: {
        // actualAmount: "1",
        // payTypeDesc: "2"
      },
      configData2: {
        name: "付款信息",
        items: [
          {
            name: "付款金额",
            key: "actualAmount"
          },
          {
            name: "付款方式",
            key: "payTypeDesc"
          }
        ]
      },
      ruleForm3: {
        // outputNo: "1",
        // createTime: "2020-01-11",
        // agentName: "3",
        // amount: "3",
        // statusDesc: "3"
      },
      configData3: {
        name: "订单信息",
        items: [
          {
            name: "订单号",
            key: "outputNo"
          },
          {
            name: "创建时间",
            key: "createTime"
          },
          {
            name: "购买服务商",
            key: "agentName"
          },
          {
            name: "订单金额",
            key: "amount"
          },
          {
            name: "订单状态",
            key: "statusDesc"
          },
          {
            name: "订单备注",
            key: "buyerRemark"
          }
        ]
      },
      params: {
        id: 0
      }
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "pass":
          break;
        case "preApproval":
          break;
        case "checking":
          break;
        case "reject":
          this.$set(this.showComponents, "showRejectTitle", true);
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.currentType = "reject";
    this.params.id = this.$route.query.id
    this.getHardDetail()
  },
  methods: {
    getSummaries() {
      const sums = [];
      sums[0] = "累计金额（元）";
      sums[3] = "3560.0";
      return sums;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        return [this.tableData.length, 1];
      }
    },
    getHardDetail() {
      api.hardwareDetail(this.params).then(res => {
        this.tableData = res.data.infoVOList
        this.ruleForm = {
          buyerName: res.data.buyerName,
          buyerPhone: res.data.buyerPhone,
          buyerAddress: res.data.buyerAddress
        }
        this.ruleForm2 = {
          actualAmount: res.data.actualAmount,
          payTypeDesc: res.data.payTypeDesc
        }
        this.ruleForm3 = {
          outputNo: res.data.outputNo,
          createTime: res.data.createTime,
          agentName: res.data.agentName,
          amount: res.data.amount,
          statusDesc: res.data.statusDesc,
          buyerRemark: res.data.buyerRemark
        }
        this.rejectTitle = res.data.rejectRemark
        if (res.data.rejectRemark) {
          this.showComponents.showRejectTitle = true
        } else {
          this.showComponents.showRejectTitle = false
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.table-box {
  margin: 24px 24px 0;
  border: 1px solid #ebeef5;
  border-bottom: none;
}
.border {
  border: 1px solid #ebeef5;
}
.detail-alert {
  margin: 24px;
  padding: 9px 24px;
  background-color: #ffe8e9;
  border: 1px solid #ff7f85;
  color: #f5222d;
  width: auto;
}
.bg_box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .title {
    position: relative;
    height: 54px;
    line-height: 54px;
    padding-left: 24px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
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
.table-box /deep/ th.gutter {
  background: #fafafa;
}
.table-box /deep/.el-table__footer-wrapper tbody td {
  color: #606266;
  height: 48px;
  background: rgb(250, 250, 250);
}
</style>
