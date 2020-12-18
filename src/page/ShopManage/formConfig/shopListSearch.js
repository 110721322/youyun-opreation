export const SEARCH_CONFIG = {
  formData: [
  {
    label: '门店ID',
    key: 'shopNo',
    type: 0
  },
  {
    label: '门店名称',
    key: 'shopName',
    type: 0
  },
  {
    label: '服务电话',
    key: 'phone',
    type: 0
  },
  {
    type: 1,
    label: "所属商户",
    key: "merchantName",
    labelWidth: '120px',
    span: 12,
    options: [
    ]
  },
  {
    type: 1,
    label: '审核状态',
    key: 'status',
    labelWidth: '120px',
    span: 12,
    options: [
      {label: "平台审核中", value: 0},
      {label: "通道审核中", value: 1},
      {label: "已开通", value: 2},
      {label: "驳回", value: 3},
      {label: "微信未认证", value: 4}
    ]
  },
  {
    type: 1,
    label: '所属服务商',
    key: 'agentName',
    labelWidth: '120px',
    span: 12,
    options: [
    ]
  },
  {
    type: 1,
    label: "门店状态",
    key: "disabled",
    labelWidth: '120px',
    span: 12,
    options: [
      {label: "禁用", value: 0},
      {label: "启用", value: 1}
    ]
  }],
  showFootBtn: true,
  configData: [
    {
      title: 'Title1',
      data: '这是内容1'
    },
    {
      title: 'Title2',
      data: '这是内容2'
    },
    {
      title: 'Title3',
      data: '这是内容3'
    }
  ]
}
