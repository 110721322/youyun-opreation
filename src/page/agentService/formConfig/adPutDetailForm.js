import { setRules } from '@/libs/kit/formFns.js'
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  addData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '投放广告类型',
        key: 'advertType',
        urlOptions: {
          url: apiAgent.queryAllAdvertType,
          keyName: 'advertType',
          valueName: 'advertTypeDesc',
          method: 'get'
        }
      },
      {
        type: 1,
        label: '投放广告名称',
        key: 'id',
        urlOptions: {
          url: apiAgent.queryAllDistributeName,
          keyName: 'id',
          valueName: 'advertName',
          method: 'get'
        }
      },
      {
        type: 3,
        label: '广告有效期',
        key: 'time',
        initVal: null,
        dateType: 'daterange',
        style: 'width:364px',
        rules: setRules('广告有效期').isRequired.get,
        showCheck: true
      },
      {
        type: 0,
        label: '优先级',
        key: 'sort',
        initVal: '',
        rules: setRules('优先级').isRequired.get,
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入0—100正整数',
        showText: true,
        text: "该广告类型的轮播顺序，数字越小，优先级越高"
      },
      {
        type: 5,
        label: '投放服务商',
        key: 'putService',
        urlOptions: {
          url: apiAgent.queryAllAdvertDistributeType,
          keyName: 'status',
          valueName: 'statusDesc',
          method: 'get'
        }
      }
    ]
  },
  editData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '投放广告类型',
        key: 'advertType',
        isDisabled: true,
        urlOptions: {
          url: apiAgent.queryAllAdvertType,
          keyName: 'advertType',
          valueName: 'advertTypeDesc',
          method: 'get'
        }
      },
      {
        type: 1,
        label: '投放广告名称',
        key: 'advertName',
        isDisabled: true,
        urlOptions: {
          url: apiAgent.queryAllDistributeName,
          keyName: 'id',
          valueName: 'advertName',
          method: 'get'
        }
      },
      {
        type: 3,
        label: '广告有效期',
        key: 'time',
        dateType: 'daterange',
        style: 'width:364px',
        rules: setRules('广告有效期').isRequired.get,
        showCheck: true
      },
      {
        type: "show",
        label: '优先级',
        key: 'sort',
        rules: setRules('优先级').isRequired.get,
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入0—100正整数'
      },
      {
        type: 5,
        label: '投放服务商',
        key: 'distributeType',
        urlOptions: {
          url: apiAgent.queryAllAdvertDistributeType,
          keyName: 'status',
          valueName: 'statusDesc',
          method: 'get'
        }
      }
    ]
  }
}
