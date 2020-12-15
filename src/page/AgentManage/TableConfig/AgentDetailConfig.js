export const DETAILCONFIG = {
  configData: {
    name: "服务商详情",
    child: [
      {
        name: "门店信息",
        modelName: "basicData",
        models: [
          {
            items: [
              {
                name: "服务商ID",
                key: "agentNo"
              },
              {
                name: "到期时间",
                key: "expireDate"
              },
              {
                name: "地址",
                key: "companyAddress"
              }
            ]
          },
          {
            items: [
              {
                name: "服务商名称",
                key: "agentName"
              },
              {
                name: "服务商状态",
                key: "accountStatus",
              },
            ]
          },
          {
            items: [
              {
                name: "手机号码",
                key: "personMobile"
              },
              {
                name: "管理员",
                key: "opreationer"
              }
            ]
          }
        ]
      },
      {
        name: "费率信息",
        modelName: "rateInfo",
        models: [
          {
            items: [
              {
                name: "支付宝费率",
                key: "alipayRate"
              }
            ]
          },
          {
            items: [
              {
                name: "微信费率",
                key: "wechatPayRate"
              }
            ]
          },
          {
            items: [
              {
                name: "服务商利润分成",
                key: "chargeFeePercent"
              }
            ]
          }
        ]
      },
      {
        name: "开户信息",
        modelName: "bankInfo",
        showEditBtn: true,
        editName: '修改',
        models: [
          {
            items: [
              {
                name: "开户支行",
                key: "bankBranchName"
              }
            ]
          },
          {
            items: [
              {
                name: "银行卡账号",
                key: "bankCardNo"
              }
            ]
          },
          {
            items: [
              {
                name: "开户人姓名",
                key: "bankAccountHolder"
              }
            ]
          }
        ]
      }
    ]
  }
}
