import { AGENT_DATA_MORE } from "../../../libs/data/permissionBtns";

export const MERCHANTDATACONFIG1 = {
  permission: {
    searchMore: AGENT_DATA_MORE
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
      label: "服务商名称",
      prop: "agentName",
      width: "176px"
    },
    {
      label: "交易额",
      prop: "actualAmount",
      width: "120px"
    },
    {
      label: "环比涨幅",
      prop: "ratio",
      width: "100px",
      hasIcon: true
    }
  ]
}
export const MERCHANTDATACONFIG2 = {
  permission: {
    searchMore: AGENT_DATA_MORE
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
      label: "服务商名称",
      prop: "channelAgentCode",
      width: "196px"
    },
    {
      label: "新增商户数",
      prop: "newMerchantNum",
      width: "112px"
    }
  ]
}
export const MERCHANTDATACONFIG3 = {
  permission: {
    searchMore: AGENT_DATA_MORE
  },
  gridConfig: [
    {
      label: "排名",
      prop: "rank",
      width: "52px",
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: "服务商名称",
      prop: "name",
      width: "176px"
    },
    {
      label: "新增会员商户数",
      prop: "new",
      width: "176px"
    },
    {
      label: "占比",
      prop: "perc",
      width: "70px"
    }
  ]
}
export const MERCHANTDATACONFIG4 = {
  permission: {
    searchMore: AGENT_DATA_MORE
  },
  gridConfig: [
    {
      label: "排名",
      prop: "rank",
      width: "52px",
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: "服务商名称",
      prop: "name",
      width: "176px"
    },
    {
      label: "刷脸交易额",
      prop: "amount",
      width: "176px"
    },
    {
      label: "占比",
      prop: "perc",
      width: "70px"
    }
  ]
}
export const MERCHANTDATACONFIG5 = {
  permission: {
    searchMore: AGENT_DATA_MORE
  },
  gridConfig: [
    {
      label: "排名",
      prop: "rank",
      width: "52px",
      render: (h, params) => {
        return h('span', params.index + 1);
      }
    },
    {
      label: "服务商名称",
      prop: "channelAgentCode",
      width: "176px"
    },
    {
      label: "交易额",
      prop: "tradeAmount",
      width: "70px"
    }
  ]
}
