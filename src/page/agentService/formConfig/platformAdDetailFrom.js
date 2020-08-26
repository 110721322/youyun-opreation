import { setRules } from '@/libs/kit/formFns.js'
import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  addData: {
    title: '',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '广告名称',
        key: 'advertName',
        maxlength: 20,
        rules: setRules('广告名称').isRequired.get
      },
      {
        type: 1,
        label: '广告类型',
        key: 'advertType',
        urlOptions: {
          url: apiAgent.queryAllAdvertType,
          keyName: 'advertType',
          valueName: 'advertTypeDesc',
          method: 'get'
        },
        rules: setRules('广告类型').isSelected.get
      },
      {
        type: 6,
        label: '广告图片',
        key: 'advertImg',
        showFileList: true,
        maxNum: 2,
        rules: setRules('广告图片').isRequired.get
      }
    ]
  },
  editData: {
    title: '',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '广告名称',
        key: 'advertName',
        rules: setRules('广告名称').isRequired.get
      },
      {
        type: 1,
        label: '广告类型',
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
        type: 6,
        label: '广告图片',
        key: 'advertImg',
        showFileList: true,
        maxNum: 6,
        rules: setRules('广告图片').isRequired.get
      }
    ]
  }
}
