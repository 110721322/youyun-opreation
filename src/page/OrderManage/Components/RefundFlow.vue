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
        params: {},
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
      }
    }
  }
</script>
