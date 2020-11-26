export const FORM_CONFIG = {
  rejectReason: {
    title: '驳回',
    showFootBtn: true,
    formData: [
      {
        type: 5,
        label: '驳回原因',
        key: 'baseData',
        options: [
          {
            label: '合伙人姓名与证件不符',
            value: 1
          },
          {
            label: '合伙人身份证正面照有误',
            value: 2
          },
          {
            label: '合伙人身份证反面照有误',
            value: 3
          },
          {
            label: '合伙人手持身份证有误',
            value: 4
          }
        ]
      },
      {
        type: 0,
        label: '其他原因',
        key: 'reason',
        inputType: 'textarea'
      }
    ]
  }
}

export const CONFIG_DATA = {
  baseData1: {
    name: "基本信息",
    items: [
      {
        name: "身份证正面照",
        key: "idPortraitImg",
        type: "image"
      },
      {
        name: "身份证反面照",
        key: "idEmblemImg",
        type: "image"
      },
      {
        name: "手持身份证照",
        key: "withIdImg",
        type: "image"
      },
      {
        name: "人员类型",
        key: "jobType"
      },
      {
        name: "合伙人姓名",
        key: "partnerName"
      },
      {
        name: "手机号码",
        key: "mobile"
      },
      {
        name: "支付宝/微信费率",
        key: "alipayRate"
      },
      {
        name: "云闪付费率（单笔≤1000元）",
        key: "cloudPayLe1000Rate"
      },

      {
        name: "云闪付费率（单笔＞1000元）",
        key: "cloudPayGt1000Rate"
      },
      {
        name: "合伙人佣金提成",
        key: "kickbackPercent"
      }
    ]
  },
  baseData2: {
    name: "基本信息",
    items: [
      {
        name: "身份证正面照",
        key: "idPortraitImg",
        type: "image"
      },
      {
        name: "身份证反面照",
        key: "idEmblemImg",
        type: "image"
      },
      {
        name: "手持身份证照",
        key: "withIdImg",
        type: "image"
      },
      {
        name: "人员类型",
        key: "jobType"
      },
      {
        name: "合伙人姓名",
        key: "partnerName"
      },
      {
        name: "手机号码",
        key: "mobile"
      }
    ]
  }
}

export const CONFIG_DATA_SERVICE = {
  baseData: {
    name: "基本信息",
    items: [
      {
        name: "所属上级服务商",
        key: "parentAgentName"
      },
      {
        name: "账号类型",
        key: "businessTypeCn"
      },
      {
        name: "营业执照",
        key: "businessLicenseImg",
        type: "image"
      },
      {
        name: "法人身份证正面照",
        key: "idPortraitImg",
        type: "image"
      },
      {
        name: "法人身份证反面照",
        key: "idEmblemImg",
        type: "image"
      },

      {
        name: "公司名称",
        key: "agentName"
      },
      {
        name: "法人姓名",
        key: "personName"
      },
      {
        name: "法人手机号",
        key: "personMobile"
      },
      {
        name: "地区",
        key: "areaAddress"
      },

      {
        name: "详细地址",
        key: "companyAddress"
      },
      {
        name: "邮箱",
        key: "email"
      }
    ]
  },
  baseData1: {
    name: "基本信息",
    items: [
      {
        name: "所属上级服务商",
        key: "parentAgentName"
      },
      {
        name: "账号类型",
        key: "businessTypeCn"
      },
      {
        name: "法人身份证正面照",
        key: "idPortraitImg",
        type: "image"
      },
      {
        name: "法人身份证反面照",
        key: "idEmblemImg",
        type: "image"
      },

      {
        name: "公司名称",
        key: "agentName"
      },
      {
        name: "法人姓名",
        key: "personName"
      },
      {
        name: "法人手机号",
        key: "personMobile"
      },
      {
        name: "地区",
        key: "areaAddress"
      },

      {
        name: "详细地址",
        key: "companyAddress"
      },
      {
        name: "邮箱",
        key: "email"
      }
    ]
  },
  serviceSetupData: {
    name: "下级服务商设置",
    items: [
      {
        name: "服务区域",
        key: "activeScope"
      },
      {
        name: "微信/支付宝费率",
        key: "alipayRatePecent"
      },
      {
        name: "云闪付费率（单笔≤1000元）",
        key: "cloudPayLe1000RatePecent"
      },
      {
        name: "云闪付费率（单笔＞1000元）",
        key: "cloudPayLe1000RatePecent"
      }
    ]
  }
}
