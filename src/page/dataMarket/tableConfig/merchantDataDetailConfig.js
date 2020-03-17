export const MERCHANTDATADETAILCONFIG = {
  gridConfig: [
    {
      label: "商户名称",
      prop: [{ key: 'merchantName' }, { key: 'id', label: 'ID:' }],
      width: "150px"
    },
    {
      label: "所属服务商名称",
      prop: [{ key: 'serviceProvider' }, { key: 'id', label: 'ID:' }],
      width: "176px"
    },
    {
      label: "门店数量(个)",
      prop: "shopNum",
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
