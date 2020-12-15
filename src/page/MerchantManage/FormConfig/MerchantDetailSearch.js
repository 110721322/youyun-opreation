export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '门店ID',
      key: 'shopNo',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '门店名称',
      key: 'shopName',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 1,
      label: '审核状态',
      key: 'status',
      labelWidth: '128px',
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '平台审核中',
          value: 1
        },
        {
          label: '通道审核中',
          value: 2
        },
        {
          label: '已开通',
          value: 3
        },
        {
          label: '已驳回',
          value: 4
        }
      ],
      span: 11
    },
    {
      type: 1,
      label: '门店状态',
      key: 'disabled',
      labelWidth: '128px',
      options: [
        {
          label: '禁用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        }
      ],
      span: 11
    },
    {
      type: 1,
      label: '服务电话',
      key: 'phone',
      labelWidth: '128px',
      span: 11
    }
  ]
}