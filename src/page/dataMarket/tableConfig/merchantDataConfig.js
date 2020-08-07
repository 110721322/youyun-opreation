import { MERCHANT_DATA_MORE } from "../../../libs/data/permissionBtns";

export const MERCHANTDATACONFIG1 = {
  permission: {
    searchMore: MERCHANT_DATA_MORE
  },
  gridConfig: [
    {
      label: "排名",
      prop: "rank",
      width: "72px",
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: "商户名称",
      prop: "merchantNo",
      width: "176px"
    },
    {
      label: "上期笔数",
      prop: "tradeCount",
      width: "120px"
    },
    {
      label: "上期交易额",
      prop: "tradeAmount",
      width: "100px"
    }
  ]
}
export const MERCHANTDATACONFIG2 = {
  permission: {
    searchMore: MERCHANT_DATA_MORE
  },
  gridConfig: [
    {
      label: "排名",
      prop: "rank",
      width: "72px",
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: "商户名称",
      prop: "merchantNo",
      width: "196px"
    },
    {
      label: "交易额",
      prop: "tradeAmount",
      width: "112px"
    },
    {
      label: "同比涨幅",
      prop: "cycle",
      width: "100px",
      hasIcon: true
    }
  ]
}
export const MERCHANTDATACONFIG3 = {
  permission: {
    searchMore: MERCHANT_DATA_MORE
  },
  gridConfig: [
    {
      label: "排名",
      prop: "merchantNo",
      width: "52px",
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: "商户名称",
      prop: "merchantName",
      width: "176px"
    },
    {
      label: "交易额",
      prop: "tradeAmount",
      width: "70px",
      formatter($row) {
        return "¥" + $row['tradeAmount']
      }
    }
  ]
}
