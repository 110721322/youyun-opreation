import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectData: {
    title: '驳回原因',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '驳回原因',
        key: 'reason',
        inputType: 'textarea',
        rules: setRules('请输入').isRequired.get
      }
    ]
  },
  passData: {
    title: '补充信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: 'APPID',
        key: 'appid',
        rules: setRules('请输入').isRequired.get
      },
      {
        type: 0,
        label: 'PID',
        key: 'pid',
        rules: setRules('请输入').isRequired.get
      },
      {
        type: 0,
        label: '费率',
        key: 'rate',
        rules: setRules('请输入').isRequired.get
      }
    ]
  },
  detailEdit: {
    title: '补充信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '邮箱',
        key: 'email',
        initVal: ''
      },
      {
        type: 0,
        label: 'APPID',
        key: 'appid',
        initVal: 'pdd',
        rules: setRules('APPID').isRequired.get
      },
      {
        type: 0,
        label: 'PID',
        key: 'pid',
        initVal: 'pdd',
        rules: setRules('PID').isRequired.get
      }
    ]
  }
}

export const CONFIG_DATA = {
  baseData: {
    name: "基本信息",
    items: [
      {
        name: "商户全称",
        key: "merchantName"
      },
      {
        name: "公司地址",
        key: "detailComAddress"
      },
      {
        name: "经营类目",
        key: "category"
      },
      {
        name: "法人姓名",
        key: "lawPerson"
      },

      {
        name: "法人手机号",
        key: "lawMobile"
      },
      {
        name: "法人身份证",
        key: "lawIdCard"
      }
    ]
  },
  merchantData: {
    name: "商户信息",
    items: [
      {
        name: "营业执照",
        key: "shopLicenseImg",
        type: "image"
      },
      {
        name: "门头照",
        key: "shopFaceImg",
        type: "image"
      },
      {
        name: "法人身份证正面",
        key: "idCardPortraitImg",
        type: "image"
      },
      {
        name: "结算人身份证反面",
        key: "idCardEmblemImg",
        type: "image"
      },
      {
        name: "特殊资质",
        key: "specImg",
        type: "image"
      },
      {
        name: "法人身份证有效日期",
        key: "idCardExpireTime"
      },
      {
        name: "商户类型",
        key: "merchantType"
      },
      {
        name: "商户简称",
        key: "shortName"
      },
      {
        name: "超级管理员姓名",
        key: "wxLinkman"
      },
      {
        name: "超级管理员联系方式",
        key: "wxLinkmanPhone"
      },
      {
        name: "营业执照编号",
        key: "shopLicenseNo"
      },
      {
        name: "营业执照有效日期",
        key: "shopLicenseTime"
      }
    ]
  },
  merchantSettle: {
    name: "商户结算卡",
    items: [
      {
        name: "结算卡类型",
        key: "bankAccountType"
      },
      {
        name: "银行卡号",
        key: "bankCardNo"
      },
      {
        name: "开户支行地区",
        key: "bankArea"
      },
      {
        name: "开户支行",
        key: "bankBranchName"
      },
      {
        name: "银行预留手机号",
        key: "bankMobile"
      }
    ]
  },
  other: {
    name: "其他",
    items: [
      {
        name: "费率",
        key: "wechatPayRatePecent"
      },
      {
        name: "邮箱",
        key: "email"
      },
      {
        name: "APPID",
        key: "appid"
      },
      {
        name: "PID",
        key: "pid"
      }
    ]
  }
}
