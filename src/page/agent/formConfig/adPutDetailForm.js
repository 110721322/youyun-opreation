import { setRules } from '@/libs/kit/formFns.js'
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  deviceData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '广告名称',
        key: 'name',
        initVal: 'pdd',
        style: 'width:364px',
        rules: setRules('广告名称').isRequired.get
      },
      {
        type: 1,
        label: '广告类型',
        key: 'type',
        urlOptions: {
          url: apiAgent.queryAllAdvertType,
          keyName: 'advertType',
          valueName: 'advertTypeDesc',
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
        key: 'priority',
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
        initVal: 0,
        options: [
          {
            label: '所有服务商',
            value: 0
          },
          {
            label: '有权限服务商',
            value: 1
          },
          {
            label: '无权限服务商',
            value: 2
          },
          {
            label: '其他服务商',
            value: 3
          }
        ],
        rules: setRules('投放服务商').isRequired.get
      }
    ]
  }
}
