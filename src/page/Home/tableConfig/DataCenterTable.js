import { DataCenter} from "@/libs/config/constant.config";
import utils from "youyun-vue-components/global/kit/utils";

export const AGENT_TABLE_CONFIG = {
  gridConfig: [
    {
      label: '排名',
      prop: 'rank',
      render: (h, params) => {
        const rank = params.row.rank;
        return (
          <span class={[rank <= 3 ? "m-rank m-top" : 'm-rank']}>{ rank }</span>
        )
      },
      width: '60px'
    },
    {
      label: '服务商名称',
      prop: 'agentName',
      width: '90px'
    },
    {
      label: '商户数量',
      prop: 'merchantCount',
      width: '80px'
    },
    {
      label: '支付笔数',
      prop: 'tradeCount',
      width: '90px',
      formatter($row) {
        return utils.toLocaleString($row.tradeCount)
      }
    },
    {
      label: '支付总额',
      prop: 'actualAmount',
      width: '80px',
      formatter($row) {
        return utils.toLocaleString($row.actualAmount)
      }
    }
  ]
}

export const MERCHANT_TABLE_CONFIG = {
  gridConfig: [
    {
      label: '排名',
      prop: 'rank',
      render: (h, params) => {
        const rank = params.row.rank;
        return (
          <span class={[rank <= 3 ? "m-rank m-top" : 'm-rank']}>{ rank }</span>
        )
      },
      width: '60px'
    },
    {
      label: '所属服务',
      prop: 'service',
      width: '80px'
    },
    {
      label: '商户名称',
      prop: 'merchantName',
      width: '80px'
    },
    {
      label: '支付笔数',
      prop: 'tradeCount',
      width: '90px',
      formatter($row) {
        return utils.toLocaleString($row.tradeCount)
      }
    },
    {
      label: '支付总额',
      prop: 'actualAmount',
      width: '80px',
      formatter($row) {
        return utils.toLocaleString($row.actualAmount)
      }
    }
  ]
}

export const SHOP_TABLE_CONFIG = {
  gridConfig: [
    {
      label: '排名',
      prop: 'rank',
      render: (h, params) => {
        const rank = params.row.rank;
        return (
          <span class={[rank <= 3 ? "m-rank m-top" : 'm-rank']}>{ rank }</span>
        )
      },
      width: '60px'
    },
    {
      label: '所属服务',
      prop: 'service',
      width: '80px'
    },
    {
      label: '所属商户',
      prop: 'merchantName',
      width: '80px'
    },
    {
      label: '门店名称',
      prop: 'shopName',
      width: '90px'
    },
    {
      label: '支付笔数',
      prop: 'tradeCount',
      width: '80px',
      formatter($row) {
        return utils.toLocaleString($row.tradeCount)
      }
    },
    {
      label: '支付总额',
      prop: 'actualAmount',
      width: '80px',
      formatter($row) {
        return utils.toLocaleString($row.actualAmount)
      }
    }
  ]
}

export const AGENT_RADIO_GROUP = [
  {
    label: '活跃服务商',
    value: DataCenter.ACTIVE_RADIO
  },
  {
    label: '新服务商',
    value: DataCenter.NEW_RADIO
  },
  {
    label: '异常服务商',
    value: DataCenter.WARN_RADIO
  }
]

export const MERCHANT_RADIO_GROUP = [
  {
    label: '活跃商户',
    value: DataCenter.ACTIVE_RADIO
  },
  {
    label: '新商户',
    value: DataCenter.NEW_RADIO
  },
  {
    label: '异常商户',
    value: DataCenter.WARN_RADIO
  }
]

export const SHOP_RADIO_GROUP = [
  {
    label: '活跃门店',
    value: DataCenter.ACTIVE_RADIO
  },
  {
    label: '新门店',
    value: DataCenter.NEW_RADIO
  },
  {
    label: '异常门店',
    value: DataCenter.WARN_RADIO
  }
]
