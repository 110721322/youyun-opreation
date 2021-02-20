<script>
  import OrderFlow from "./OrderFlow";
  import api from "@/api/api_order";
  import { REFUND_SEARCH_CONFIG } from "../formConfig/flowFormConfig";
  import { REFUND_TABLE_CONFIG } from "../tableConfig/flowTableConfig";

  export default {
    extends: OrderFlow,
    name: "RefundFlow",
    data() {
      return {
        params: {
          queryBeginPayTime: this.$g.utils.getToday(0) + ' 00:00:00',
          queryEndPayTime: this.$g.utils.getToday(0) + ' 23:59:59'
        },
        api: api.selectPageRefundOrder,
        searchConfig: REFUND_SEARCH_CONFIG,
        gridConfig: REFUND_TABLE_CONFIG.gridConfig,
        title: ''
      }
    },
    created() {
      this.title = '退单管理'
    },
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          refundOrderNo: $ruleForm.refundOrderNo,
          shopNo: $ruleForm.shopNo,
          queryBeginPayTime: $ruleForm.date?$ruleForm.date[0]:'',
          queryEndPayTime: $ruleForm.date?$ruleForm.date[1]:'',
          refundChannel: $ruleForm.refundChannel,
          refundStatus: $ruleForm.refundStatus,
          agentNo: $ruleForm.agentNo,
          merchantNo: $ruleForm.merchantNo
        }
      },
      onClickDetail(row) {
        //TODO review: 路由跳转以路由名称name方式跳转
        this.$router.push('/orderManage/transactionFlow/flowDetail?merchantNo=' + row.merchantNo + '&shopNo=' + row.shopNo + '&orderNo=' + row.orderNo + '&refundOrderNo=' + row.refundNo).catch(() => {})
      }
    }
  }
</script>
