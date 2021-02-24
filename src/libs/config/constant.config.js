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
  BALANCE: 'balance',
  CLOUDPAY: 'cloudPay',
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
  PERSONAL: 'personal',
  ENTERPRISE: 'enterprise',
  INDIVIDUAL: 'individual',
  PUBLIC_PERSON: '0',
  PRIVATE_PERSON: '1',
  PRIVATE_UNLEGAL_PERSON: '2'
}

export const AgentList = {
  ENABLE: 1, // 启用
  DISABLED: 2, // 禁用
  BAN: 3, // 封禁
  FROZEN: 4, // 冻结
  UNCALL: 1, // 未划拨
  UNBIND: 2, // 未绑定
  BIND: 3, // 已绑定
  MERCHANT_AUDIT: 0, // 门店预审核
  PLATEFORM_REJECT: 1, // 平台驳回
  CHANNEL_AUDIT: 2, // 通道审核中
  CHANNEL_REJECT: 3, // 通道驳回
  CHANNEL_PASS: 4, // 通道通过
  WECHAT_AUDIT: 5, // 微信审核中
  WECHAT_UNAUTH: 6, // 微信未认证
  WECHAT_REJECT: 7, // 微信认证拒绝
  WECHAT_PASS: 8, // 微信认证成功
  MERCHANT_OPEN: 0, // 门店启用
  MERCHANT_DISABLED: 1, // 门店禁用
  SETTLED: '1', // 已结算
  SETTLE: '2', // 结算中
  UNSETTLE: '3', // 未结算
  SETTLE_REJECT: '4', // 结算驳回
  SETTLE_RECORD_FAIL: 0, // 结算记录结算失败
  SETTLE_RECORD_STEELE: 1, // 结算记录结算中
  SETTLE_RECORD_SUCCESS: 2, // 结算成功
}