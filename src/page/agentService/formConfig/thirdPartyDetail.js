import { setRules } from '@/libs/kit/formFns.js'
import api from "@/api/api_agent"

export const FORM_CONFIG = {
  detailData: {
    showFootBtn: false,
    formData: [
      {
        type: 0,
        label: '对接商名称',
        key: 'name',
        initVal: '',
        rules: setRules('对接商名称').isRequired.get
      },
      {
        type: 0,
        label: '对接人',
        key: 'developerId',
        initVal: '',
        rules: setRules('对接人').isRequired.get
      },
      {
        type: 0,
        label: '对接人手机号',
        key: 'phone',
        initVal: '',
        rules: setRules('对接人手机号').isSelected.get
      },
      {
        type: 0,
        label: '设备数量限制',
        key: 'allotCount',
        initVal: '',
        isShowSlot: true,
        showSlotName: '台',
        rules: setRules('设备数量').isSelected.get
      },
      {
        type: 0,
        label: '异步通知地址',
        key: 'asyncCallback',
        initVal: ''
      },
      {
        type: 0,
        label: '同步通知地址',
        key: 'syncCallback',
        initVal: ''
      },
      {
        type: 0,
        label: '同步失败地址',
        key: 'syncFailCallback',
        initVal: ''
      },
      {
        type: 5,
        label: '网络状态',
        key: 'netStatus',
        initVal: '1',
        options: [
          {
            label: '外网对接',
            value: '1'
          },
          {
            label: '局域网对接',
            value: '2'
          }
        ],
        rules: setRules('邮箱').isSelected.get
      },
      {
        type: 0,
        label: '备注',
        key: 'remark',
        inputType: 'textarea',
        rules: setRules('备注').isRequired.get
      },
      {
        type: 1,
        label: '所属服务商',
        key: 'agentNo',
        isSearch: true,
        urlOptions: {
          url: api.agentList,
          keyName: 'agentNo',
          valueName: 'agentName',
          method: 'get',
          params: {
            currentPage: 1,
            pageSize: 10000
          }
        },
        rules: setRules('所属服务商').isSelected.get
      }
    ]
  },
  editData: {
    showFootBtn: false,
    formData: [
      {
        type: 0,
        label: '对接商名称',
        key: 'name',
        initVal: '',
        rules: setRules('对接商名称').isRequired.get
      },
      {
        type: 0,
        label: '对接人',
        key: 'developerId',
        initVal: '',
        rules: setRules('对接人').isRequired.get
      },
      {
        type: 0,
        label: '对接人手机号',
        key: 'phone',
        initVal: '',
        rules: setRules('对接人手机号').isSelected.get
      },
      {
        type: 0,
        label: '设备数量限制',
        key: 'allotCount',
        initVal: '',
        isShowSlot: true,
        showSlotName: '台',
        rules: setRules('设备数量').isSelected.get
      },
      {
        type: 0,
        label: '异步通知地址',
        key: 'asyncCallback',
        initVal: ''
      },
      {
        type: 0,
        label: '同步通知地址',
        key: 'syncCallback',
        initVal: ''
      },
      {
        type: 0,
        label: '同步失败地址',
        key: 'syncFailCallback',
        initVal: ''
      },
      {
        type: 5,
        label: '网络状态',
        key: 'netStatus',
        initVal: '1',
        options: [
          {
            label: '外网对接',
            value: '1'
          },
          {
            label: '局域网对接',
            value: '2'
          }
        ],
        rules: setRules('邮箱').isSelected.get
      },
      {
        type: 1,
        label: '所属服务商',
        key: 'agentNo',
        isSearch: true,
        urlOptions: {
          url: api.agentList,
          keyName: 'agentNo',
          valueName: 'agentName',
          method: 'get',
          params: {
            currentPage: 1,
            pageSize: 10000
          }
        },
        rules: setRules('所属服务商').isSelected.get
      }
    ]
  }
}
