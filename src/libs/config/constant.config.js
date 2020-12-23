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
