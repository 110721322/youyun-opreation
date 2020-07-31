export const configData = {
  name: "基本信息",
  child: [
    {
      name: "基本资料",
      modelName: "basicData",
      models: [
        {
          items: [
            {
              name: "公司名称",
              key: "channelAgentName"
            },
            {
              name: "法人手机号",
              key: "personMobile"
            }
          ]
        },
        {
          items: [
            {
              name: "邮箱",
              key: "email"
            },
            {
              name: "营业执照图",
              key: "licenseImg",
              type: "img"
            }
          ]
        },
        {
          items: [
            {
              name: "法人姓名",
              key: "personName"
            },
            {
              name: "公司地址",
              key: "address"
            }
          ]
        }
      ]
    },
    {
      name: "财务",
      modelName: "finance",
      models: [
        {
          items: [
            {
              name: "结算卡类型",
              key: "bankAccountType"
            },
            {
              name: "开户支行地区",
              key: "bankArea"
            }
          ]
        },
        {
          items: [
            {
              name: "开户名",
              key: "bankAccountHolder"
            },
            {
              name: "开户支行",
              key: "bankBranchName"
            }
          ]
        },
        {
          items: [
            {
              name: "银行卡号",
              key: "bankCardNo"
            }
          ]
        }
      ]
    },
    {
      name: "邮寄地址",
      modelName: "address",
      models: [
        {
          items: [
            {
              name: "收件人",
              key: "expReceiver"
            },
            {
              name: "详细地址",
              key: "expAddress"
            }
          ]
        },
        {
          items: [
            {
              name: "手机号",
              key: "expMobile"
            }
          ]
        },
        {
          items: [
            {
              name: "地区",
              key: "expAreaCode"
            }
          ]
        }
      ]
    }
  ]
};
export const configData2 = {
  name: "行业信息",
  child: [
    {
      name: '支付通道',
      moduleName: 'payChannels',
      hiddenEdit: true,
      models: []
    },
    {
      name: "费率",
      modelName: "rateInfo",
      models: [
        {
          items: [
            {
              name: "微信费率(直连)",
              key: "wechatPayRate",
              type: 'pecent'
            },
            {
              name: "云闪付费率单笔＞1000(间连)",
              key: "cloudPayGt1000Rate",
              type: 'pecent'
            },
            {
              name: "支付宝费率(直连)",
              key: "alipayRate",
              type: 'pecent'
            },
            {
              name: "云闪付费率单笔≤1000(间连)",
              key: "cloudPayLe1000Rate",
              type: 'pecent'
            }
          ]
        }
      ]
    },
    {
      name: '权限',
      moduleName: 'businessModes',
      hiddenEdit: true,
      models: []
    },
    {
      name: "交易通道定制",
      modelName: "customChannelComboPriceSets",
      models: []
    },
    {
      name: "品牌定制",
      modelName: "customChannelComboPriceSets",
      models: []
    },
    {
      name: "账户信息",
      modelName: "accountInfo",
      hiddenEdit: true,
      models: [
        {
          items: [
            {
              name: "后台账号",
              key: "loginAccount"
            }
          ]
        }
      ]
    }
  ]
};
