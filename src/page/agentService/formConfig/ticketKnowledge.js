import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  addQuestionData: {
    title: '添加问题',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '所属分类',
        key: 'type',
        initVal: "0",
        options: [
          {
            label: '川菜',
            value: '0'
          },
          {
            label: '粤菜',
            value: '1'
          },
          {
            label: '杭帮菜',
            value: '2'
          }
        ],
        rules: setRules('广告名称').isRequired.get
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
        type: 1,
        label: '所属分类',
        key: 'type',
        initVal: "0",
        options: [
          {
            label: '川菜',
            value: '0'
          },
          {
            label: '粤菜',
            value: '1'
          },
          {
            label: '杭帮菜',
            value: '2'
          }
        ],
        rules: setRules('广告名称').isRequired.get
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
