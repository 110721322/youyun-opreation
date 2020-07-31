import { setRules } from '@/libs/kit/formFns.js'
import apiAgent from "@/api/api_ticketCenter.js";
export const FORM_CONFIG = {
  addQuestionData: {
    title: '添加问题',
    showFootBtn: true,
    formData: [
      {
        type: 16,
        label: '所属模块 分类',
        label1: '所属模块',
        label2: '所属分类',
        key1: 'firstId',
        key2: 'secondId',
        urlOptions1: {
          url: apiAgent.queryFirstClassByPage,
          keyName: 'id',
          valueName: 'menuName',
          method: 'get'
        },
        urlOptions2: {
          url: apiAgent.querySecondClassByPage,
          keyName: 'id',
          valueName: 'menuName',
          method: 'get'
        },
        rules: setRules('所属模块/分类').isSelected.get
      },
      {
        type: 0,
        label: '问题',
        key: 'questionContent',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('问题').isRequired.get
      },
      {
        type: 0,
        label: '答案',
        key: 'answerContent',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('答案').isRequired.get
      }
    ]
  },
  menuData: {
    title: '添加菜单',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '菜单名称',
        key: 'menuName',
        initVal: "",
        rules: setRules('菜单名称').isRequired.get
      }
    ]
  },
  editQuestionData: {
    title: '编辑问题',
    showFootBtn: true,
    formData: [
      {
        type: 16,
        label: '所属模块 分类',
        label1: '所属模块',
        label2: '所属分类',
        key1: 'firstId',
        key2: 'secondId',
        urlOptions1: {
          url: apiAgent.queryFirstClassByPage,
          keyName: 'id',
          valueName: 'menuName',
          method: 'get'
        },
        urlOptions2: {
          url: apiAgent.querySecondClassByPage,
          keyName: 'id',
          valueName: 'menuName',
          method: 'get'
        },
        rules: setRules('所属模块/分类').isSelected.get
      },
      {
        type: 0,
        label: '问题',
        key: 'questionContent',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('问题').isRequired.get
      },
      {
        type: 0,
        label: '答案',
        key: 'answerContent',
        initVal: '',
        inputType: 'textarea',
        rules: setRules('答案').isRequired.get
      }
    ]
  }
}
