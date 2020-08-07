export const pieList = [
  {
    title: '大区占比',
    permission: 'merchantRegionRatio',
    radio: {
      radio: "newMerchant",
      key: 'region',
      val: 'newMerchant',
      namelist: [
        { name: "新增商户", label: "newMerchant" },
        { name: "交易商户", label: "tradeMerchant" },
        { name: "流失商户", label: "lossMerchant" }
      ]
    },
    dataList: []
  },
  {
    title: '行业占比',
    permission: 'merchantIndustryRatio',
    radio: {
      radio: "newMerchant",
      key: 'industry',
      val: 'newMerchant',
      namelist: [
        { name: "新增商户", label: "newMerchant" },
        { name: "交易商户", label: "tradeMerchant" },
        { name: "流失商户", label: "lossMerchant" }
      ]
    },
    dataList: []
  }
]

export const tradeRankRadio = {
  radio: "newMerchant",
  key: 'tradeRank',
  val: 'newMerchant',
  namelist: [
    { name: "新增商户", label: "newMerchant" },
    { name: "交易商户", label: "tradeMerchant" }
  ]
}

export const averagePieRadio = {
  title: '平均交易笔数分布',
  radio: {
    radio: "newMerchant",
    key: 'averagePie',
    val: 'newMerchant',
    namelist: [
      { name: "新增商户", label: "newMerchant" },
      { name: "交易商户", label: "tradeMerchant" }
    ]
  },
  dataList: []
}
