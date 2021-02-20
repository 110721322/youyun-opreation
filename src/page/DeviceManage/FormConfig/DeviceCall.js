import agentApi from '@/api/api_agentManage'
export const DEVICE_CALL = {
  //TODO review: 无意义的命名空间
  deviceData: {
    formData: [
      {
        type: 1,
        label: '所属服务商',
        key: 'toOperator',
        isSearch: true,
        urlOptions: {
          searchKey: 'agentName',
          url: agentApi.queryPageByCondition,
          keyName: 'agentNo',
          valueName: 'agentName',
          params: {
            currentPage: 1,
            pageSize: 20
          }
        },
        rules: [
          { required: true, message: '请选择服务商', trigger: 'change' },
        ],
        span: 12
      }
    ]
  },
  showSubmit: false,
  showFootBtn: false
}
