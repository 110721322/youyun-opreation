export const MERCHANTDATADETAILCONFIG = {
  gridConfig: [
    {
      label: "服务商",
      prop: [{ key: 'service' }, { key: 'id', label: 'ID:' }],
      width: "150px"
    },
    {
      label: "入件商户数(个)",
      prop: "inMerchantNum",
      width: "176px"
    },
    {
      label: "流失商户数(个)",
      prop: "outMerchantNum",
      width: "120px"
    },
    {
      label: "交易额(元)",
      prop: "amount",
      width: "100px"
    },
    {
      label: "笔数(笔)",
      prop: "times",
      width: "120px"
    },
    {
      label: "客单价(元)",
      prop: "everyPrice",
      width: "120px"
    },
    {
      label: "交易额环比",
      prop: "amountPerc",
      width: "120px"
    },
    {
      label: "笔数环比",
      prop: "timesPerc",
      width: "120px"
    },
    {
      label: "会员交易额(元)",
      prop: "memberAmount",
      width: "120px"
    },
    {
      label: "会员交易笔数(笔)",
      prop: "memberTimes",
      width: "140px"
    }
  ],
  hideEditArea: true
}
