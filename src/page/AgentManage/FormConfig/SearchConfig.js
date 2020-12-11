export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '服务商ID',
      key: 'agentId',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 0,
      label: '服务商名称',
      key: 'agentName',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 11,
      label: '到期时间',
      key: 'endTime',
      labelWidth: '128px',
      span: 11
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
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
      type: 0,
      label: '手机号码',
      key: 'phone',
      span: 11
    },
    {
      type: 0,
      label: '地址',
      key: 'address',
      span: 11
    },
    {
      type: 1,
      label: '所属服务商',
      key: 'onerAgentId',
      options: [
        {
          label: '张三',
          value: 1
        },
        {
          label: '李四',
          value: 21
        }
      ],
      span: 11
    },
    {
      type: 0,
      label: '管理员',
      key: 'manager',
      labelWidth: '128px',
      options: [
        {
          label: '元宝',
          value: 1
        },
        {
          label: '元胡',
          value: 21
        }
      ],
      span: 11
    }
  ]
}