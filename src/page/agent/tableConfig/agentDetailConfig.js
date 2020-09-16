export const DETAILCONFIG = {
  configData: {
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
                key: "agentName"
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
                key: "businessLicenseImg",
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
                key: "companyAddress"
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
                key: "bankAccountType",
                type: "bankType"
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
      }
      // {
      //   name: "邮寄地址",
      //   modelName: "address",
      //   models: [
      //     {
      //       items: [
      //         {
      //           name: "收件人",
      //           key: "personName"
      //         },
      //         {
      //           name: "详细地址",
      //           key: "detailAddress"
      //         }
      //       ]
      //     },
      //     {
      //       items: [
      //         {
      //           name: "手机号",
      //           key: "personMobile"
      //         }
      //       ]
      //     },
      //     {
      //       items: [
      //         {
      //           name: "地区",
      //           key: "name3"
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  configData2: {
    name: "行业信息",
    child: [
      {
        name: "费率",
        modelName: "rateInfo",
        models: [
          {
            items: [
              {
                name: "微信/支付宝费率",
                key: "wechatPayRate",
                type: "pecent"
              },
              {
                name: "云闪付费率单笔＞1000",
                key: "cloudPayGt1000Rate",
                type: "pecent"
              }
            ]
          },
          {
            items: [
              {
                name: "云闪付费率单笔≤1000",
                key: "cloudPayLe1000Rate",
                type: "pecent"
              }
            ]
          }
        ]
      },
      {
        name: "续费",
        modelName: "renew",
        models: [
          {
            items: [
              {
                name: "开户时间",
                key: "activeDate"
              },
              {
                name: "缴费金额",
                key: "renewValue"
              }
            ]
          },
          {
            items: [
              {
                name: "到期时间",
                key: "expireDate"
              }
            ]
          },
          {
            items: [
              {
                name: "续费方式",
                key: "renewTypeCn"
              }
            ]
          }
        ]
      },
      {
        name: "权限",
        modelName: "mailAddress",
        models: [
          {
            items: [
              {
                name: "服务地区",
                key: "activeScopeType",
                type: "descript"
              },
              {
                name: "平台分润抽成",
                key: "chargeFeePercent",
                type: "pecent"
              }
            ]
          },
          {
            items: [
              {
                name: "可否开通下级",
                key: "expandSubCn"
              }
            ]
          },
          {
            items: [
              {
                name: "服务类型",
                key: "activeModeCn"
              }
            ]
          }
        ]
      }
    ]
  }
}
