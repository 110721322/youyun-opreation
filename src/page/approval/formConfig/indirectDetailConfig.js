import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  rejectReason: {
    title: '驳回原因',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '驳回原因',
        key: 'reason',
        inputType: 'textarea',
        rules: setRules('请填写驳回原因').isRequired.get
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
        key: "fullName"
      },
      {
        name: "公司地址",
        key: "address"
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
        key: "idCardNo"
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
        name: "内景照",
        key: "shopInnerImg",
        type: "image"
      },
      {
        name: "收银台照",
        key: "shopCashdeskImg",
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
        name: "商户类型",
        key: "merchantTypeName"
      },
      {
        name: "商户简称",
        key: "shortName"
      },
      {
        name: "营业执照开始日期",
        key: "shopLicenseBegDate"
      },
      {
        name: "营业执照编号",
        key: "shopLicenseNo"
      },
      {
        name: "客服手机号",
        key: "serviceTel"
      },
      {
        name: "法人身份证到期日",
        key: "idCardExpireDate"
      }
    ]
  },
  merchantData1: {
    name: "商户信息",
    items: [
      {
        name: "门头照",
        key: "shopFaceImg",
        type: "image"
      },
      {
        name: "内景照",
        key: "shopInnerImg",
        type: "image"
      },
      {
        name: "收银台照",
        key: "shopCashdeskImg",
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
        name: "商户类型",
        key: "merchantTypeName"
      },
      {
        name: "商户简称",
        key: "shortName"
      },
      {
        name: "客服手机号",
        key: "serviceTel"
      },
      {
        name: "法人身份证到期日",
        key: "idCardExpireDate"
      }
    ]
  },
  settleData1: {
    name: "结算卡信息",
    items: [
      {
        name: "开户许可证",
        key: "bankOpenAccountLicenseImg",
        type: "image"
      },
      {
        name: "结算卡类型",
        key: "accountType"
      },
      {
        name: "银行卡号",
        key: "bankCardNo"
      },
      {
        name: "开户行地区",
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
  settleData2: {
    name: "结算卡信息",
    items: [
      {
        name: "结算人银行卡",
        key: "bankCardImg",
        type: "image"
      },
      {
        name: "结算卡类型",
        key: "accountType"
      },
      {
        name: "银行卡号",
        key: "bankCardNo"
      },
      {
        name: "开户行地区",
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
  settleData3: {
    name: "结算卡信息",
    items: [
      {
        name: "结算人银行卡",
        key: "bankCardImg",
        type: "image"
      },
      {
        name: "结算人身份证正面照",
        key: "nonLawIdCardPortraitImg",
        type: "image"
      },
      {
        name: "结算人身份证国徽照",
        key: "nonLawIdCardEmblemImg",
        type: "image"
      },
      {
        name: "非法人结算授权书",
        key: "nonLawSettleAuthImg",
        type: "image"
      },
      {
        name: "结算人身份证号",
        key: "nonLawIdCardNo"
      },
      {
        name: "结算卡类型",
        key: "accountType"
      },
      {
        name: "银行卡号",
        key: "bankCardNo"
      },
      {
        name: "开户名",
        key: "bankAccountName"
      },
      {
        name: "开户行地区",
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
        name: "支付宝/微信费率",
        key: "alipayRatePecent"
      },
      {
        name: "云闪付费率（单笔≤1000元)",
        key: "cloudPayGt1000RatePecent"
      },
      {
        name: "云闪付费率（单笔＞1000元)",
        key: "cloudPayLe1000RatePecent"
      },
      {
        name: "邮箱",
        key: "email"
      }
    ]
  }
}
