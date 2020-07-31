export const MERCHANTDATADETAILCONFIG = {
  gridConfig: [
    {
      label: "服务商",
      prop: [{ key: 'channelAgentName' }, { key: 'channelAgentCode', label: 'ID:' }],
      width: "150px"
    },
    {
      label: "入件商户数(个)",
      prop: "getMerchantNum",
      width: "176px"
    },
    {
      label: "流失商户数(个)",
      prop: "loseMerchantNum",
      width: "120px"
    },
    {
      label: "交易额(元)",
      prop: "tradeAmount",
      width: "100px"
    },
    {
      label: "笔数(笔)",
      prop: "tradeCount",
      width: "120px"
    },
    {
      label: "客单价(元)",
      prop: "guestUnitPrice",
      width: "120px"
    },
    {
      label: "交易额环比",
      prop: "tradeChain",
      width: "120px"
    },
    {
      label: "笔数环比",
      prop: "countChain",
      width: "120px"
    },
    {
      label: "会员交易额(元)",
      prop: "memberTradeAmount",
      width: "120px"
    },
    {
      label: "会员交易笔数(笔)",
      prop: "memberTradeCount",
      width: "140px"
    }
  ],
  hideEditArea: true
}
