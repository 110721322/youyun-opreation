export const LIST_CONFIG = {
  configData: [
    {
      label: "所属服务商",
      key: "agentName"
    },
    {
      label: "商户ID",
      key: "merchantNo"
    },
    {
      label: "商户名称",
      key: "merchantName"
    },
    {
      label: "添加时间",
      key: "createTime",
    },

    {
      label: "商户状态",
      key: "isDisabled",
      fieldType: 'slot',
      slot: 'status'
    },
    {
      label: "手机号码",
      key: "loginAccount"
    }
  ]
}

export const STATISTICS_LIST =[
  {
    span: 8,
    style: 'height: 98px;',
    label: '商户数量（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #50C514;',
    tooltip: '',
    value: '0'
  },
  {
    span: 8,
    style: 'height: 98px;',
    label: '活跃商户（个）',
    icon: 'iconshuliang',
    iconStyle: 'color: #1989FA;',
    tooltip: '',
    value: '0'
  },
  {
    span: 8,
    style: 'height: 98px;',
    label: '异常商户（个）',
    icon: '',
    iconStyle: 'color: #FA6577;',
    tooltip: '',
    value: '0'
  }
]