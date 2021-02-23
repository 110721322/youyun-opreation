export const TaskManage = {
  TASK_PENDING: 0,  // 任务进行中
  TASK_SUCCESS: 1,  // 任务完成
  TASK_FAIL: 2,  // 任务失败
  RECONCILIATION_TASK: 'reconciliation' // 下载回执单任务
}

export const AccountList = {
  ACCOUNT_NORMAL: 'normal',   // 用户启用状态
  ACCOUNT_LOCK: 'lock',   // 用户冻结状态
  OPERATION_PLATFORM: 1 // 运营后台
}

export const RoleList = {
  OPERATION_PLATFORM: 1, // 运营后台
  OPERATION_SYSTEM: 'operation'
}

export const DataCenter = {
  PAY_AMOUNT: 'tradeAmount',
  PAY_COUNT: 'tradeCount',
  WX_PAY_AMOUNT: 'wechatTradeAmount',
  ALI_PAY_AMOUNT: 'alipayTradeAmount',
  ACTIVE_RADIO: 'active',
  NEW_RADIO: 'new',
  WARN_RADIO: 'warn',
  ALL_YEAR: 1
}

export const TransactionFlow = {
  UNPAY: 0,
  PAYING: 1,
  PAY_SUCCESS: 2,
  PAY_CLOSE: 3,
  PART_REFUND: 4,
  ALL_REFUND: 5,
  LESHUA: 'leshua',
  MYBANK: 'mybank',
  ALIPAY: 'alipay',
  WECHAT: 'wechat',
  NEWLAND: 'newland'
}

export const ShopList = {
  DISABLE: 1,
  ENABLE: 0,
  INQUIRY: 0,
  REJECTED: 1,
  CHANNEL_REVIEW: 2,
  CHANNEL_REJECTED: 3,
  CHANNEL_PASS: 4,
  WECHAT_REVIEW: 5,
  WECHAT_IDENTIFY: 6,
  WECHAT_REJECTED: 7,
  OPENED: 8,
}