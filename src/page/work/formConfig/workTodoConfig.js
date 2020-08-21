import { setRules } from '@/libs/kit/formFns.js'
import api from "@/api/api_agent"

export const FORM_CONFIG = {
  communicationData: {
    title: '添加沟通小记',
    showFootBtn: true,
    footBtnLabel: "添加",
    formData: [
      {
        type: 0,
        label: "联系人",
        key: "contactPerson",
        initVal: "",
        rules: setRules("联系人").isRequired.get
      },
      {
        type: 0,
        label: "手机号",
        key: "mobile",
        rules: setRules("姓名").isRequired.get,
        isDisable: () => {
          return true;
        }
      },
      {
        type: 1,
        label: '沟通方式',
        key: 'way',
        options: [
          {
            label: '电话呼出',
            value: 'phoneOut'
          },
          {
            label: '电话呼入',
            value: 'phoneIn'
          },
          {
            label: '微信',
            value: 'wechat'
          },
          {
            label: '面谈',
            value: 'interview'
          },
          {
            label: '邮件',
            value: 'mail'
          }
        ],
        rules: setRules('请选择').isSelected.get
      },
      {
        type: 0,
        label: "沟通主题",
        key: "contactTheme",
        initVal: "",
        rules: setRules("姓名").isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: "问题商户",
        key: "questionMerchant",
        initVal: "",
        rules: setRules("性别").isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: '沟通内容',
        key: 'contactContent',
        initVal: '',
        inputType: 'textarea',
        maxlength: 500,
        rules: setRules("联系电话").isRequired.get
      },
      {
        type: 11,
        label: "下次沟通时间",
        key: "nextContactTime",
        initVal: null,
        format: "yyyy-MM-dd HH:mm:ss",
        datatype: "datetime"
      },
      {
        type: 1,
        label: '提醒时间',
        key: 'remindType',
        options: [
          {
            label: '十分钟前',
            value: 'before10M'
          },
          {
            label: '半个小时前',
            value: 'before30M'
          },
          {
            label: '一个小时前',
            value: 'before1H'
          },
          {
            label: '两个小时前',
            value: 'before2H'
          },
          {
            label: '三个小时前',
            value: 'before3H'
          },
          {
            label: '一天前',
            value: 'before1D'
          }
        ],
        isShow: ($item) => {
          return $item.nextContactTime
        }
      },
      {
        type: 0,
        label: "联系人",
        key: "contactPerson2",
        initVal: "",
        isShow: ($item) => {
          return $item.nextContactTime
        }
      },
      {
        type: 0,
        label: '备注',
        key: 'remark',
        initVal: '',
        isShow: ($item) => {
          return $item.nextContactTime
        },
        inputType: 'textarea',
        maxlength: 50
      }
    ]
  },
  distributionData: {
    title: '分配处理人员',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '处理人员',
        key: 'operatorId',
        urlOptions: {
          url: api.queryAllOperation,
          keyName: 'operationId',
          valueName: 'operationName',
          method: 'get'
        },
        rules: setRules("处理人员").isSelected.get
      }
    ]
  },
  replyData: {
    title: '工单回复',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '解决方案',
        key: 'solution',
        inputType: 'textarea',
        maxlength: '200',
        rules: setRules("回复内容").isRequired.get
      }
    ]
  },
  openAgentData: {
    title: '服务商开通申请',
    showFootBtn: true,
    footBtnLabel: '同意',
    formData: [
      {
        type: 0,
        label: '公司名称',
        key: 'agengName',
        initVal: '',
        rules: setRules("公司名称").isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: '法人姓名',
        key: 'person',
        initVal: '',
        rules: setRules("法人姓名").isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: '法人手机号',
        key: 'personMobile',
        initVal: '',
        rules: setRules("法人手机号").isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: '邮箱',
        key: 'email',
        initVal: '',
        rules: setRules("法人手机号").isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: '服务商类型',
        key: 'businessType',
        initVal: '',
        rules: setRules("法人手机号").isRequired.get,
        isDisabled: true
      },
      {
        type: 0,
        label: '地址',
        key: 'companyAddress',
        initVal: '',
        rules: setRules("法人手机号").isRequired.get,
        isDisabled: true
      }
    ]
  }
}
