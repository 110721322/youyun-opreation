export const SETTLE_CONFIG = {
  configData: {
    name: "结算信息",
    child: [
      {
        name: "发票信息",
        modelName: "basicData",
        models: [
          {
            items: [
              {
                name: "发票图片",
                key: "expressImg",
                type: "image"
              },
              {
                name: "备注",
                key: "settleRemark"
              }
            ]
          },
        ]
      },
      {
        name: "账户信息",
        modelName: "bankInfo",
        models: [
          {
            items: [
              {
                name: "开户行",
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
          },
          {
            items: [
              {
                name: "开户人",
                key: "bankAccountHolder"
              }
            ]
          }
        ]
      }
    ]
  }
}
