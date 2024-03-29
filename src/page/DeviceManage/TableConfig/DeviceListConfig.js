import { DeviceList } from "@/libs/config/constant.config";
export const DEVICE_LIST_CONFIG = {
  gridConfig: [
    {
      label: '设备ID',
      prop: 'deviceNo',
      render: (h, params) => {
        return h(
          'span', { 'class': 'tab-color' }, params.row.deviceNo
        )
      }
    },
    {
      label: '设备类型',
      prop: 'deviceType',
      render: (h, params) => {
        return h(
          'span', params.row.deviceName + '(' + params.row.deviceType + ')'
        )
      }
    },
    {
      label: '设备型号',
      prop: 'deviceModel',
    },
    {
      label: '设备SN码',
      prop: 'deviceSn'
    },
    {
      label: '所属服务商',
      prop: 'currentAgentNo'
    },
    {
      label: '绑定状态',
      prop: 'currentStatus',
      render: (h, params) => {
        const actions = new Map([
          [DeviceList.UNCALL, {className: 's-status-fail', statusDesc: '未划拨'}],
          [DeviceList.UNBIND, {className: 's-status-pending', statusDesc: '未绑定'}],
          [DeviceList.BIND, {className: 's-status-success', statusDesc: '已绑定'}],
          ['default', {className: 's-status-pending', statusDesc: '等待'}],
        ])
        const action = actions.get(params.row.currentStatus) || actions.get('default')
        return (
          <span class={['flex-align-center', 'g-status-icon', 's-status-radius', action.className]}>{ action.statusDesc }</span>
      )
      }
    },
    {
      label: '绑定时间',
      prop: 'currentStatusDate'
    },
    {
      label: '保修到期时间',
      prop: 'guaranteeDate'
    }
  ],


  gridBtnConfig: {
    create: false,
    update: false,
    delete: false,
    view: false,
    expands: [
      {
        name: '解绑',
        emitName: 'unBind',
        type: 'text',
        isShow: (params) => {
          return params.currentStatus === DeviceList.BIND
        }
      },
      {
        name: '回拨',
        emitName: 'callBind',
        type: 'text',
        isShow: (params) => {
          return (params.currentStatus === DeviceList.UNBIND || params.currentStatus === DeviceList.BIND)
        }
      },
      {
        name: '详情',
        emitName: 'details',
        type: 'text'
      }
    ]
  }
};
