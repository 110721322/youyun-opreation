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
          label: '预审核',
          value: 0
        },
        {
          label: '平台驳回',
          value: 1
        },
        {
          label: '通道审核中',
          value: 2
        },
        {
          label: '通道驳回',
          value: 3
        },
        {
          label: '通道通过',
          value: 4
        },
        {
          label: '微信实名认证中',
          value: 5
        },
        {
          label: '微信认证拒绝',
          value: 6
        },
        {
          label: '微信认证成功',
          value: 7
        }
      ],
      span: 11
    },
    {
      type: 1,
      label: '门店状态',
      key: 'isDisabled',
      labelWidth: '128px',
      options: [
        {
          label: '启用',
          value: 0
        },
        {
          label: '禁用',
          value: 1
        }
      ],
      span: 11
    },
    {
      type: 0,
      label: '服务电话',
      key: 'phone',
      labelWidth: '128px',
      span: 11
    }
  ]
}