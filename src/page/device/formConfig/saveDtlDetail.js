
export const FORM_CONFIG = {
  formData: {
    title: '入库信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '设备型号',
        key: 'deviceModel',
        initVal: 'pdd'
      },
      {
        type: 3,
        label: '保修截止日期',
        key: 'deadline',
        initVal: ''
      },
      {
        type: 3,
        label: '入库时间',
        key: 'inputTime',
        initVal: ''
      },
      {
        type: 0,
        label: '设备标识',
        key: 'deviceIdentifier',
        initVal: 'pdd'
      }
    ]
  }
}
