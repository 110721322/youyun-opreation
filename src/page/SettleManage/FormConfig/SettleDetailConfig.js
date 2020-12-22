export const SETTLE_CONFIG = {
  basicData: [
    {
      label: '图片信息',
      key: 'images',
      span: 24,
      children: [
        {label: '发票图片', key: 'expressImg'}
      ],
      filedType: 'image'
    },
    {
      label: "备注",
      key: "settleRemark"
    }
  ],
  bankInfoData: [
    {
      label: "开户行",
      key: "bankBranchName"
    },
    {
      label: "银行卡号",
      key: "bankCardNo"
    },
    {
      label: "开户人",
      key: "bankAccountHolder"
    }
  ]
}
