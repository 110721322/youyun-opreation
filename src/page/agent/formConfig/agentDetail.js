import { setRules } from '@/libs/kit/formFns.js'
import apiDevice from "@/api/api_device";
import areaData from "@/assets/data/areaData"
import serviceData from "@/assets/data/serviceData";

export const FORM_CONFIG = {
  basicData: {
    title: '基本信息',
    showFootBtn: true,
    formData: [
      {
        type: 5,
        label: '账户类型',
        key: 'businessType',
        isDisabled: true,
        initVal: 'enterprise',
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
        initVal: '',
        rules: setRules('公司名称').isRequired.get
      },
      {
        type: 0,
        label: '法人姓名',
        key: 'personName',
        initVal: '',
        rules: setRules('法人姓名').isRequired.get
      },
      {
        type: 0,
        label: '法人手机号',
        key: 'personMobile',
        initVal: '',
        rules: setRules('法人手机号').isRequired.get
      },
      {
        type: 0,
        label: '邮箱',
        key: 'email',
        initVal: ''
      },
      {
        type: 8,
        label: '公司地址',
        key: 'area',
        options: areaData,
        rules: setRules('公司地址').isSelected.get
      },
      {
        type: 0,
        label: '详细地址',
        key: 'companyAddress',
        rules: setRules('详细地址').isRequired.get
      },
      {
        type: 6,
        label: '营业执照',
        key: 'businessLicenseImg',
        maxNum: 1,
        initVal: '',
        rules: setRules('营业执照').isSelected.get,
        isShow: (item) => {
          if (item.businessType === 'enterprise') {
            return true
          } else {
            return false
          }
        }
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
        rules: setRules('收件人').isRequired.get
      },
      {
        type: 0,
        label: '联系方式',
        key: 'personMobile',
        initVal: '',
        rules: setRules('联系方式').isRequired.get
      },
      {
        type: 8,
        label: '选择地区',
        key: 'postArea',
        style: 'width:294px',
        labelWidth: '185px',
        options: areaData,
        rules: [
          {required: true, message: "请选择地区", trigger: "change"}
        ]
      },
      {
        type: 0,
        label: '详细地址',
        key: 'detailAddress',
        initVal: '',
        rules: setRules('详细地址').isRequired.get
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
        placeholder: '建议范围2.6-6',
        isShowSlot: true,
        showSlotName: '‰',
        rules: [
          {required: true, message: "请填写微信/支付宝费率", trigger: "blur"}
        ]
      },
      {
        type: 0,
        label: '云闪付(单笔<=1000)',
        key: 'cloudPayLe1000Rate',
        initVal: '',
        isShowSlot: true,
        showSlotName: '‰',
        placeholder: '输入范围2.3-10',
        rules: [
          {required: true, message: "请填写云闪付(单笔<=1000)", trigger: "blur"}
        ]
      },
      {
        type: 0,
        label: '云闪付(单笔>1000)',
        key: 'cloudPayGt1000Rate',
        initVal: '',
        isShowSlot: true,
        showSlotName: '‰',
        placeholder: '输入范围2.3-10',
        rules: [
          {required: true, message: "请填写云闪付(单笔>1000)", trigger: "blur"}
        ]
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
        key: 'activeScopeCode',
        style: 'width:294px',
        labelWidth: '185px',
        options: serviceData,
        rules: [
          {required: true, message: "请选择服务地区", trigger: "change"}
        ]
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
        rules: setRules('可否开通下级').isSelected.get
      },
      {
        type: 5,
        label: '服务类型',
        key: 'activeMode',
        initVal: 'relyus',
        options: [
          {
            label: '产品代理',
            value: 'relyus'
          }
          // {
          //   label: 'OEM贴牌代理',
          //   value: 'oem'
          // }
        ],
        rules: setRules('服务类型').isRequired.get
      },
      {
        type: 0,
        label: '平台分润抽成',
        key: 'chargeFeePercent',
        labelWidth: '111px',
        initVal: '',
        rules: setRules('平台分润抽成').isSelected.get,
        isShowSlot: true,
        showSlotName: '%'
      }
    ]
  },
  renew: {
    title: '续费信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '续费方式',
        key: '',
        initVal: '固定续费',
        placeholder: '固定续费',
        isDisabled: true
      },
      {
        type: 1,
        label: '续费时间',
        key: 'monthCount',
        options: [
          // {
          //   label: '1个月',
          //   value: 1
          // },
          // {
          //   label: '2个月',
          //   value: 2
          // },
          // {
          //   label: '6个月',
          //   value: 6
          // },
          {
            label: '1年',
            value: 12
          }
          // {
          //   label: '2年',
          //   value: 24
          // },
          // {
          //   label: '3年',
          //   value: 36
          // }
        ],
        rules: setRules('续费时间').isSelected.get
      },
      {
        type: 0,
        label: '续费金额',
        key: 'renewValue',
        initVal: ''
      }
    ]
  },
  buyDevice: {
    title: '订购设备',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '销售人员',
        key: 'saleUserName',
        initVal: '12',
        isDisabled: true,
        rules: setRules('销售人员').isRequired.get
      },
      {
        type: 1,
        label: '设备型号',
        key: 'deviceId',
        urlOptions: {
          url: apiDevice.queryAllDeviceModel,
          keyName: 'deviceId',
          valueName: 'deviceModel',
          method: 'get',
          params: {
            classification: 1
          }
        },
        callback($ruleForm, $option) {
          $ruleForm['deviceModel'] = $option.deviceModel;
        },
        rules: [
          {required: true, message: "请选择设备型号", trigger: "change"}
        ]
      },
      {
        type: 0,
        label: '订购数量',
        key: 'count',
        isShowSlot: true,
        showSlotName: '台',
        rules: setRules('订购数量').isRequired.get
      },
      {
        type: 0,
        label: '订单金额',
        key: 'amount',
        isDisable: () => {
          return true;
        },
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('订单金额').isRequired.get
      },
      {
        type: 0,
        label: '实付金额',
        key: 'actualAmount',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('实付金额').isRequired.get
      },
      {
        type: 0,
        label: '购买服务商',
        key: 'agentName',
        initVal: '',
        isDisabled: true
      },
      {
        type: 1,
        label: '支付方式',
        key: 'payType',
        urlOptions: {
          url: apiDevice.finishAllPrivilegeType,
          keyName: 'status',
          valueName: 'statusDesc',
          method: 'get'
        }
      },
      {
        type: 6,
        label: '打款凭证',
        key: 'voucher',
        maxNum: 1,
        rules: setRules('打款凭证').isRequired.get
      },
      {
        type: 0,
        label: '邮寄地址',
        key: 'buyerAddress',
        initVal: '',
        rules: setRules('邮寄地址').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'buyerRemark',
        inputType: 'textarea',
        rules: setRules('备注').isRequired.get
      },
      {
        type: 0,
        key: 'saleUserId',
        initVal: 1,
        isDisabled: true,
        isShow() {
          return false
        }
      },
      {
        type: 0,
        label: '服务商编号',
        key: 'agentNo',
        initVal: '',
        isDisabled: true,
        isShow() {
          return false
        }
      },
      {
        type: 0,
        label: '设备型号名称',
        key: 'deviceModel',
        initVal: '',
        isDisabled: true,
        isShow() {
          return false
        }
      }
    ]
  },
  businessModes: {
    title: '权限分配',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '销售人员',
        key: 'saleUserName',
        initVal: '12',
        isDisabled: true,
        rules: setRules('销售人员').isRequired.get
      }
    ]
  }
}
