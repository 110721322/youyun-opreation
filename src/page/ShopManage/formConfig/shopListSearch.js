export const SEARCH_CONFIG = {
  formData: [
  {
    label: '门店ID',
    key: 'shopNo',
    type: 0,
    span: 12
  },
  {
    label: '门店名称',
    key: 'shopName',
    type: 0,
    span: 12
  },
  {
    label: '服务电话',
    key: 'phone',
    type: 0,
    span: 12
  },
  {
    label: '所属商户',
    key: 'merchantName',
    type: 1,
    span: 12,
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '深圳', value: 'shenzhen' },
      { label: '香港', value: 'hongkong' }
    ]
  },
  {
    label: '审核状态',
    key: 'status',
    type: 1,
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
    label: '所属服务商',
    key: 'agentName',
    type: 1,
    span: 12,
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '深圳', value: 'shenzhen' },
      { label: '香港', value: 'hongkong' }
    ]
  },
  {
    label: '门店状态',
    key: 'isDisabled',
    type: 1,
    span: 12,
    options: [
      {label: "禁用", value: 0},
      {label: "启用", value: 1}
    ]
  }],
  showFootBtn: true
}
