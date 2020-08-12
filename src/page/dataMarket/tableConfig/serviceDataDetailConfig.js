export const MERCHANTDATADETAILCONFIG = {
  gridConfig: [
    {
      label: "服务商",
      prop: [{ key: 'agentName' }, { key: 'agentNo', label: 'ID:' }],
      width: "150px"
    },
    {
      label: "入件商户数(个)",
      prop: "newMerchantCount",
      width: "176px"
    },
    {
      label: "流失商户数(个)",
      prop: "lostMerchantCount",
      width: "120px"
    },
    {
      label: "交易额(元)",
      prop: "actualAmount",
      width: "100px",
      formatter($row) {
        return "¥" + $row['actualAmount']
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
      prop: "amountRatio",
      width: "120px",
      formatter($row) {
        return $row['amountRatio'] + "%"
      }
    },
    {
      label: "笔数环比",
      prop: "countRatio",
      width: "120px",
      formatter($row) {
        return $row['countRatio'] + "%"
      }
    }
  ],
  hideEditArea: true
}
