export const DETAILCONFIG = {
  shopInfoData: [
    {
      label: "服务商ID",
      key: "agentNo"
    },
    {
      label: "服务商名称",
      key: "agentName"
    },
    {
      label: "手机号码",
      key: "personMobile"
      // TODO emitEdit: 'editTel'
    },
    {
      label: "到期时间",
      key: "expireDate"
    },
    {
      label: "服务商状态",
      key: "accountStatus",
      filedType: 'slot',
      slot: 'status'
    },
    {
      label: "管理员",
      key: "opreationer"
    },
    {
      label: "地址",
      key: "companyAddress"
    }
  ],
  rateInfoData: [
    {
      label: '支付宝费率',
      key: 'alipayRate'
    },
    {
      label: '微信费率',
      key: 'wechatPayRate'
    },
    {
      label: '服务商利润分成',
      key: 'chargeFeePercent'
    }
  ],
  bankInfoData: [
    {
      label: "开户支行",
      key: "bankBranchName"
    },
    {
      label: '银行卡账号',
      key: 'bankCardNo'
    },
    {
      label: '开户人姓名',
      key: 'bankAccountHolder'
    }
  ]
}
