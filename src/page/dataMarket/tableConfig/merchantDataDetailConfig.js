export const MERCHANTDATADETAILCONFIG = {
  gridConfig: [
    {
      label: "商户名称",
      prop: [{ key: 'merchantName' }, { key: 'merchantNo', label: 'ID:' }],
      width: "150px"
    },
    {
      label: "所属服务商名称",
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: "176px"
    },
    {
      label: "门店数量(个)",
      prop: "shopCount",
      width: "120px"
    },
    {
      label: "交易额(元)",
      prop: "tradeAmount",
      width: "100px",
      formatter($row) {
        return "¥" + $row['tradeAmount']
      }
    },
    {
      label: "笔数(笔)",
      prop: "tradeCount",
      width: "120px"
    },
    {
      label: "客单价(元)",
      prop: "unitPrice",
      width: "120px",
      formatter($row) {
        return "¥" + $row['unitPrice']
      }
    },
    {
      label: "交易额环比",
      prop: "amountCycle",
      width: "120px",
      formatter($row) {
        return $row['amountCycle'] + "%"
      }
    },
    {
      label: "笔数环比",
      prop: "countCycle",
      width: "120px",
      formatter($row) {
        return $row['countCycle'] + "%"
      }
    }
  ],
  hideEditArea: true
}
