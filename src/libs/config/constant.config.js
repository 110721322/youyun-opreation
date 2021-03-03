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
  PAY_AMOUNT: 'tradeAmount', // 支付金额
  PAY_COUNT: 'tradeCount', // 支付笔数
  WX_PAY_AMOUNT: 'wechatTradeAmount', // 微信支付金额
  ALI_PAY_AMOUNT: 'alipayTradeAmount', // 支付宝支付金额
  ACTIVE_RADIO: 'active', // 活跃服务商
  NEW_RADIO: 'new', // 新服务商
  WARN_RADIO: 'warn', // 异常服务商
  ALL_YEAR: 1
}

export const TransactionFlow = {
  UNPAY: 0, // 交易状态（待支付）
  PAYING: 1, // 交易状态（支付中）
  PAY_SUCCESS: 2, // 交易状态（支付成功）
  PAY_CLOSE: 3, // 交易状态（交易关闭）
  PART_REFUND: 4, // 交易状态（部分退款）
  ALL_REFUND: 5, // 交易状态（全部退款）
  BALANCE: 'balance', // 余额
  CLOUDPAY: 'cloudPay', // 云闪付
  LESHUA: 'leshua', // 乐刷
  MYBANK: 'mybank', // 网商
  ALIPAY: 'alipay', // 支付宝
  WECHAT: 'wechat', // 微信
  NEWLAND: 'newland' // 新大陆
}

export const ShopList = {
  DISABLE: 1, // 禁用
  ENABLE: 0, // 启用
  INQUIRY: 0, // 门店审核状态（预审核中）
  REJECTED: 1, // 门店审核状态（平台驳回）
  CHANNEL_REVIEW: 2, // 门店审核状态（通道审核中）
  CHANNEL_REJECTED: 3, // 门店审核状态（通道驳回）
  CHANNEL_PASS: 4, // 门店审核状态（通道通过）
  WECHAT_REVIEW: 5, // 门店审核状态（微信认证中）
  WECHAT_IDENTIFY: 6, // 门店审核状态（微信未认证）
  WECHAT_REJECTED: 7, // 门店审核状态（微信认证拒绝）
  OPENED: 8, // 门店审核状态（已开通）
  PERSONAL: 'personal', // 门店类型（个人）
  ENTERPRISE: 'enterprise', // 门店类型（企业）
  INDIVIDUAL: 'individual', // 门店类型（个体工商户）
  PUBLIC_PERSON: '0', // 结算类型（对公法人）
  PRIVATE_PERSON: '1', // 结算类型（对私法人）
  PRIVATE_UNLEGAL_PERSON: '2' // 结算类型（对私非法人）
}

export const AgentList = {
  ENABLE: 1, // 启用
  DISABLED: 2, // 禁用
  BAN: 3, // 封禁
  FROZEN: 4, // 冻结
  SETTLED: '1', // 已结算
  SETTLE: '2', // 结算中
  UNSETTLE: '3', // 未结算
  SETTLE_REJECT: '4', // 结算驳回
  SETTLE_RECORD_FAIL: 0, // 结算记录结算失败
  SETTLE_RECORD_STEELE: 1, // 结算记录结算中
  SETTLE_RECORD_SUCCESS: 2, // 结算成功
}

export const DeviceList = {
  UNCALL: 1, // 未划拨
  UNBIND: 2, // 未绑定
  BIND: 3, // 已绑定
}

export const MerchantList = {
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
}

export const SettleList = {
  SETTLED: '1', // 已结算
  SETTLE: '2', // 结算中
  UNSETTLE: '3', // 未结算
  SETTLE_REJECT: '4', // 结算驳回
  SETTLE_RECORD_FAIL: 'settleFail', // 结算记录结算失败
  SETTLE_RECORD_STEELE: 'noSettle', // 结算记录结算中
  SETTLE_RECORD_SUCCESS: 'finishSettle', // 结算成功
}
}
