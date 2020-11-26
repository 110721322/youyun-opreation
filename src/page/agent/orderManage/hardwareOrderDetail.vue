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
          style="width: 100%;"
          max-height="279"
          show-summary
          :summary-method="getSummaries"
          :header-cell-style="{height:'48px',background:'rgb(250,250,250)'}"
          size="medium"
          class="slot"
        >
          <el-table-column prop="id" label="设备名称" width="180"></el-table-column>
          <el-table-column prop="name" label="图片">
            <template slot-scope="scope">
              <el-image
                style="width: 65px; height: 65px;"
                :src="scope.row.name"
                :preview-src-list="[scope.row.name]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="amount1" label="设备单价（元）"></el-table-column>
          <el-table-column prop="amount2" label="设备数量（个）"></el-table-column>
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
      tableData: [
        {
          id: "12987122",
          name:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          amount1: "234",
          amount2: "3.2",
          amount3: 3560.0
        },
        {
          id: "12987123",
          name:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],
      ruleForm: {
        name: "1",
        name1: "2",
        name2: "3"
      },
      configData: {
        name: "邮寄信息",
        items: [
          {
            name: "联系人",
            key: "name"
          },
          {
            name: "联系人手机号",
            key: "name1"
          },
          {
            name: "邮寄地址",
            key: "name2"
          }
        ]
      },
      ruleForm2: {
        name: "1",
        name1: "2",
        name2: "3"
      },
      configData2: {
        name: "付款信息",
        items: [
          {
            name: "付款金额",
            key: "name"
          },
          {
            name: "付款方式",
            key: "name1"
          }
        ]
      },
      ruleForm3: {
        name: "1",
        name1: "2",
        name2: "3"
      },
      configData3: {
        name: "订单信息",
        items: [
          {
            name: "订单号",
            key: "name"
          },
          {
            name: "创建时间",
            key: "name1"
          },
          {
            name: "购买服务商",
            key: "name1"
          },
          {
            name: "订单金额",
            key: "name1"
          },
          {
            name: "订单状态",
            key: "name1"
          },
          {
            name: "订单备注",
            key: "name1"
          }
        ]
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
