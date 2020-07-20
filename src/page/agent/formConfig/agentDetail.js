import { setRules } from '@/libs/kit/formFns.js'
import areaData from "@/assets/data/areaData"

export const FORM_CONFIG = {
  basicData: {
    title: '基本信息',
    showFootBtn: true,
    formData: [
      {
        type: 5,
        label: '账户类型',
        key: 'businessType',
        options: [
          {
            label: '企业',
            value: 'enterprise'
          },
          {
            label: '个人',
            value: 'individual'
          }
        ],
        rules: setRules('请选择').isRequired.get
      },
      {
        type: 0,
        label: '公司名称',
        key: 'agentName',
        rules: setRules('请填写').isRequired.get
      },
      {
        type: 0,
        label: '法人姓名',
        key: 'personName',
        rules: setRules('请填写').isRequired.get
      },
      {
        type: 0,
        label: '法人手机号',
        key: 'personMobile',
        rules: setRules('法人手机号').isRequired.get
      },
      {
        type: 0,
        label: '邮箱',
        key: 'email',
        rules: setRules('请填写').isRequired.get
      },
      {
        type: 0,
        label: '公司地址',
        key: 'companyAddress',
        rules: setRules('请填写').isRequired.get
      },
      {
        type: 6,
        label: '营业执照',
        key: 'businessLicenseImg',
        rules: setRules('营业执照').isSelected.get
      }
    ]
  },
  finance: {
    title: '财务信息',
    showFootBtn: true,
    formData: [
      {
        type: 5,
        label: '结算卡类型',
        key: 'bankAccountType',
        options: [
          {
            label: '对私',
            value: 'private'
          },
          {
            label: '对公',
            value: 'public'
          }
        ]
      },
      {
        type: 0,
        label: '开户名',
        key: 'bankAccountHolder',
        initVal: ''
      },
      {
        type: 0,
        label: '银行卡号',
        key: 'bankCardNo',
        initVal: ''
      },
      {
        type: 0,
        label: '开户支行地区',
        key: 'bankArea',
        initVal: ''
      },
      {
        type: 0,
        label: '开户支行',
        key: 'bankBranchName',
        initVal: ''
      }
    ]
  },
  address: {
    title: '邮寄地址',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '收件人',
        key: 'personName',
        initVal: '',
        placeholder: '请填写'
      },
      {
        type: 0,
        label: '联系方式',
        key: 'personMobile',
        initVal: '',
        placeholder: '请填写'
      },
      {
        type: 8,
        label: '选择地区',
        key: 'area',
        style: 'width:294px',
        labelWidth: '185px',
        options: areaData
      },
      {
        type: 0,
        label: '详细地址',
        key: 'detailAddress',
        initVal: '',
        placeholder: '请填写'
      }
    ]
  },
  rateInfo: {
    title: '通道及费率',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '微信/支付宝费率',
        labelWidth: '300px',
        key: 'wechatPayRate',
        initVal: '',
        placeholder: '输入范围3-6',
        isShowSlot: true,
        showSlotName: '‰',
        rules: setRules('请输入').oneFloat.get
      },
      {
        type: 0,
        label: '云闪付(单笔<=1000)',
        key: 'cloudPayLe1000Rate',
        initVal: '',
        isShowSlot: true,
        showSlotName: '‰',
        placeholder: '输入范围2.3-10',
        rules: setRules('请输入').isRequired.get
      },
      {
        type: 0,
        label: '云闪付(单笔>1000)',
        key: 'cloudPayGt1000Rate',
        initVal: '',
        isShowSlot: true,
        showSlotName: '‰',
        placeholder: '输入范围2.3-10',
        rules: setRules('请输入').isRequired.get
      }
    ]
  },
  mailAddress: {
    title: '编辑权限',
    showFootBtn: true,
    formData: [
      {
        type: 8,
        label: '服务地区',
        key: 'area',
        style: 'width:294px',
        labelWidth: '185px',
        options: areaData,
        rules: setRules('请输入').isSelected.get
      },
      {
        type: 5,
        label: '可否开通下级',
        key: 'expandSub',
        initVal: '',
        options: [
          {
            label: '是',
            value: 1
          },
          {
            label: '否',
            value: 0
          }
        ],
        rules: setRules('请输入').isSelected.get
      },
      {
        type: 5,
        label: '服务类型',
        key: 'activeMode',
        initVal: '',
        options: [
          {
            label: '产品代理',
            value: 'relyus'
          },
          {
            label: 'OEM贴牌代理',
            value: 'oem'
          }
        ],
        rules: setRules('请输入').isRequired.get
      },
      {
        type: 0,
        label: '平台分润抽成',
        key: 'chargeFeePercent',
        initVal: '',
        placeholder: '请输入',
        rules: setRules('请输入').oneFloat.get,
        isShowSlot: true,
        showSlotName: '‰'
      }
    ]
  }
}
