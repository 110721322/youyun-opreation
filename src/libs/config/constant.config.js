export const DateSelect = {
  TODAY_LABEL: '今日',
  YESTERDAY_LABEL: '昨天',
  ALL_LABEL: '累计',
  DATE_RANGE: 'daterange',    // 日期类型YYYY:MM:DD
  DATE_TIME_RANGE: 'datetimerange'    // 时间期类型YYYY:MM:DD hh:mm:ss
}

export const CustomerDetail = {
  CUSTOMER_DISABLED_STATUS: 1,
  CUSTOMER_ENABLE_STATUS: 0,
  CUSTOMER_DISABLED_MSG: '禁用成功',
  CUSTOMER_ENABLE_MSG: '启用成功',
}

export const PurchaseOrderManage = {
  ORDER_PAY_PENDING: 0,  // 待支付
  ORDER_PAYING: 1,  // 支付中
  ORDER_PAID: 2,  // 已完成
  ORDER_CLOSED: 3,  // 交易关闭
  ORDER_REFUNDED: 5,  // 已退款
  ORDER_REFUND_PENDING: 6,  // 待退款
  ORDER_REFUNDING: 7  // 退款中
}

export const RechargeManage = {
  RECHARGE_SUCCESS_STATUS: 1,
  RECHARGE_FAIL_STATUS: 2
}

export const Transactions = {
  AUTHORIZED_MANAGE: 1, //  已授权平台管理
  UNAUTHORIZED_MANAGE: 0,  //  未授权平台管理
  MSG_VERIFY: 1,  // 支付免短信已验证
  NOT_MSG_VERIFY: 0,  // 支付免短信未验证
  BUSINESS_DISABLED: 1,  // 交易户禁用
  BUSINESS_ENABLED: 0,  // 交易户启用
  BUSINESS_AUDIT_PENDING: 0,  // 交易户审核中
  BUSINESS_AUDIT_SUCCESS: 1,  // 交易户审核成功
  BUSINESS_AUDIT_FAIL: 2  // 交易户审核失败
}

export const WithdrawalManage = {
  CHECKOUT_PENDING_STATUS: 0,
  CHECKOUT_SUCCESS_STATUS: 1,
  CHECKOUT_FAIL_STATUS: 2
}

export const TaskManage = {
  TASK_PENDING: 0,  // 任务进行中
  TASK_SUCCESS: 1,  // 任务完成
  TASK_FAIL: 2,  // 任务失败
  RECONCILIATION_TASK: 'reconciliation' // 下载回执单任务
}
