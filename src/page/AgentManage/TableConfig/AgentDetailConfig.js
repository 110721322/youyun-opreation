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
                name: "所属服务商",
                key: "agentName"
              },
              {
                name: "到期时间",
                key: "endTime",
                type: "editIcon",
                iconSrc: require('@/assets/img/ding.png')
              },
              {
                name: "手机号码",
                key: "phone"
              }
            ]
          },
          {
            items: [
              {
                name: "服务商ID",
                key: "agentNo"
              },
              {
                name: "服务商状态",
                key: "status",
                type: "switch"
              },
              {
                name: "地址",
                key: "address"
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
                key: "alipyRate"
              }
            ]
          },
          {
            items: [
              {
                name: "微信费率",
                key: "wechatRate"
              }
            ]
          },
          {
            items: [
              {
                name: "服务商利润分成",
                key: "moneyRate"
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
                key: "bankName"
              }
            ]
          },
          {
            items: [
              {
                name: "银行卡账号",
                key: "bankNo"
              }
            ]
          },
          {
            items: [
              {
                name: "开户人姓名",
                key: "personName"
              }
            ]
          }
        ]
      }
    ]
  }
}
