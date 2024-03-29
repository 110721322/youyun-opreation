import { AgentList } from "@/libs/config/constant.config";
export const AGENT_LIST_CONFIG = {
  gridConfig: [
    {
      label: '服务商ID',
      prop: 'agentNo',
      render: (h, params) => {
        return h(
          'span', { 'class': 'tab-color' }, params.row.agentNo
        )
      }
    },
    {
      label: '服务商名称',
      prop: 'agentName',
    },
    {
      label: '手机号码',
      prop: 'loginAccount',
    },
    {
      label: '商户数量',
      prop: 'merchantCount'
    },
    {
      label: '服务商地址',
      prop: 'fullAddress'
    },
    {
      label: '到期时间',
      prop: 'expireDate'
    },
    {
      label: '管理员',
      prop: 'operationName'
    },
    {
      label: '状态',
      prop: 'blockStatus',
      render: (h, params) => {
        const actions = new Map([
          [AgentList.ENABLE, {className: 's-status-success', statusDesc: '启用'}],
          [AgentList.DISABLED, {className: 's-status-fail', statusDesc: '禁用'}],
          [AgentList.BAN, {className: 's-status-fail', statusDesc: '封禁'}],
          [AgentList.FROZEN, {className: 's-status-fail', statusDesc: '冻结'}],
          ['default', {className: 's-status-pending', statusDesc: '等待'}],
        ])
        const action = actions.get(params.row.blockStatus) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    }
  ],


  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '详情',
        emitName: 'details',
        type: 'text'
      },
      {
        name: '服务商后台',
        emitName: 'goAgent',
        type: 'text'
      }
    ]
  }
};

export const AGENT_LIST_COUNT = [
  {
    span: 8,
    style: 'height: 98px;',
    label: '服务商数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    key: 'totalAgentNum',
    value: '0'
  },
  {
    span: 8,
    style: 'height: 98px;',
    label: '活跃服务商（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    key: 'activeAgentNum',
    value: '0'
  },
  {
    span: 8,
    style: 'height: 98px;',
    label: '异常服务商（个）',
    icon: 'iconyichang',
    iconStyle: 'color: #EFA911;',
    tooltip: '',
    key: 'abnormalAgentNum',
    value: '0'
  }
]
