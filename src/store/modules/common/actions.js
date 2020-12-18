import axios from "axios";
import utils from "youyun-vue-components/global/kit/utils";
import { TaskManage } from "@/libs/config/constant.config";

/**
 * 初始化一个提交任务的mutation及state
 * @param $type
 * @param $state
 * @returns {{mutation: string, uploadTasks: *}}
 */
const computedTaskType = ($type, $state) => {
  let uploadTasks = [];
  let mutation = "";
  switch ($type) {
    case "supplierInput":
      uploadTasks = utils.deepClone($state.supplierUploadTasks);
      mutation = "SET_SUPPLIER_TASK";
      break;
    case "shopInput":
      uploadTasks = utils.deepClone($state.shopUploadTasks);
      mutation = "SET_SHOP_TASK";
      break;
    case "purchaseOrderInput":
      uploadTasks = utils.deepClone($state.purchaseUploadTasks);
      mutation = "SET_PURCHASE_TASK";
      break;
    default:
      uploadTasks = utils.deepClone($state.supplierUploadTasks);
      mutation = "SET_SUPPLIER_TASK";
  }
  return {
    uploadTasks,
    mutation
  }
}

/**
 * 初始化一个下载任务的mutation及state
 * @param $type
 * @param $state
 * @returns {{mutation: string, uploadTasks: *}}
 */
const computedDownType = ($type, $state) => {
  let downTasks = [],
      mutation = "";
  switch ($type) {
    case 'reconciliation':
    default:
      downTasks = utils.deepClone($state.reconciliationDownTasks);
      mutation = 'SET_RECONCILIATION_TASK'
  }
  return {
    downTasks,
    mutation
  }
}

/**
 * 过滤过期的任务
 * @param $tasks  任务列表
 * @param successTime  导出完成后任务保留时间
 * @param pendingTime   等待或失败时任务保留时间
 * @return {*}
 */
const filterOverDue = ($tasks, successTime, pendingTime) => {
  return $tasks.filter(task => {
    const createTime = new Date(task.date);
    const nowTime = new Date();
    const timeDiff = createTime.getTime() - nowTime.getTime();
    if (task.data.status === TaskManage.TASK_SUCCESS) {
      return timeDiff < successTime
    } else {
      return timeDiff < pendingTime
    }
  })
}

export default {
  saveManagerList: ({ commit }, $list) => {
    if (!utils.isArr($list)) return;
    $list = $list.map(item => {
      return {
        label: item.userName,
        value: item.userNo
      }
    })
    commit('SAVE_MANAGER_LIST', $list)
  },
  saveCustomerList: ({ commit }, $list) => {
    if (!utils.isArr($list)) return;
    $list = $list.map(item => {
      return {
        label: item.userName,
        value: item.userNo
      }
    })
    commit('SAVE_CUSTOMER_LIST', $list)
  },
  saveRoleList: ({ commit }, $list) => {
    if (!utils.isArr($list)) return;
    $list = $list.map(item => {
      return {
        label: item.roleName,
        value: item.roleId
      }
    })
    commit('SAVE_ROLE_LIST', $list)
  },
  saveBusinessList: ({ commit }, $list) => {
    if (!utils.isArr($list)) return;
    $list = $list.map(item => {
      return {
        label: item.businessName,
        value: item.businessNo
      }
    })
    commit('SAVE_BUSINESS_LIST', $list)
  },
  /**
   * 创建批量导入任务
   * @param commit
   * @param state
   * @param $task 任务对象
   */
  createTask: ({ commit, state }, $task) => {
    const task = {
      taskKey: $task.taskKey,
      fileName: $task.fileName,
      type: $task.type,
      date: $task.date,
      data: {status: TaskManage.TASK_PENDING, percent: 0, process: 0, errMsg: null}
    };
    const { uploadTasks, mutation } = computedTaskType($task.type, state)
    uploadTasks.push(task);
    commit(mutation, uploadTasks);
  },
  /**
   * 刷新任务进度
   * @param commit
   * @param dispatch
   * @param state
   * @param $type 任务类型 //supplierInput:供应商导入; shopInput: 门店导入; purchaseOrderInput: 采购单导入;
   * @return <Promise> 返回promise结果集
   */
  refreshTask: ({ commit, dispatch, state }, $type) => {
    const { uploadTasks, mutation } = computedTaskType($type, state);
    const HALF_HOURS = 30 * 60 * 1000;
    const TEN_MINUTES = 10 * 60 * 1000;

    if (uploadTasks.length === 0) {
      return Promise.resolve(0)
    }

    // 任务成功状态status=1只保留10分钟，其余状态只保留30分钟
    const uploadTasksRes = filterOverDue(uploadTasks, TEN_MINUTES, HALF_HOURS)

    // 并发刷新处理中的任务进度
    const promiseArr = uploadTasksRes
      .filter($task => $task.data.status === TaskManage.TASK_PENDING)
      .map($task => {
      return axios.get('/fund/v1/excel/checkProcess', {
        params: {taskKey: $task.taskKey},
        noLoading: true
      }).then(res => {
        return {
          taskKey: $task.taskKey,
          data: res.data.data
        }
      })
    })
    return dispatch('commitRefresh', {
      $promiseArr: promiseArr,
      $tasks: uploadTasksRes,
      $mutation: mutation
    })
  },
  /**
   * 移除任务
   * @param commit
   * @param state
   * @param $task
   */
  delTask: ({ commit, state }, $task) => {
    const { uploadTasks, mutation } = computedTaskType($task.type, state)
    const uploadTasksRes = uploadTasks.filter(task => task.taskKey !== $task.taskKey);
    commit(mutation, uploadTasksRes);
  },
  /**
   * 创建批量下载任务
   * @param commit
   * @param state
   * @param $task 任务对象
   */
  createDownTask: ({ commit, state }, $task) => {
    const task = {
      taskKey: $task.taskKey,
      fileName: $task.fileName,
      type: $task.type,
      date: $task.date,
      data: {status: TaskManage.TASK_PENDING, percent: 0, process: 0, errMsg: null}
    };
    const { downTasks, mutation } = computedDownType($task.type, state)
    downTasks.push(task);
    commit(mutation, downTasks);
  },
  /**
   * 刷新下载任务进度
   * @param commit
   * @param dispatch
   * @param state
   * @param $type 任务类型 //reconciliation: 对账管理回执单;
   * @return <Promise> 返回promise结果集
   */
  refreshDownTask: ({ commit, dispatch, state }, $type) => {
    const { downTasks, mutation } = computedDownType($type, state);
    const DAY = 24 * 60 * 60 * 1000;
    if (downTasks.length === 0) {
      return Promise.resolve(0)
    }
    // 任务成保留24小时
    const downTasksRes = filterOverDue(downTasks, DAY, DAY)

    // 并发刷新处理中的任务进度
    const promiseArr = downTasksRes
      .filter($task => $task.data.status === TaskManage.TASK_PENDING)
      .map($task => {
      return axios.get('/fund/v1/zip/download/progress', {
        params: {key: $task.taskKey},
        noLoading: true
      }).then(res => {
        return {
          taskKey: $task.taskKey,
          data: res.data.data
        }
      })
    })
    return dispatch('commitRefresh', {
      $promiseArr: promiseArr,
      $tasks: downTasksRes,
      $mutation: mutation
    })
  },
  /**
   * 移除下载任务
   * @param commit
   * @param state
   * @param $task
   */
  delDownTask: ({ commit, state }, $task) => {
    const { downTasks, mutation } = computedDownType($task.type, state)
    const downTasksRes = downTasks.filter(task => task.taskKey !== $task.taskKey);
    commit(mutation, downTasksRes);
  },
  /**
   * 提交下载任务或上传刷新结果
   * @param commit
   * @param $promiseArr 刷新任务的axios实例集合
   * @param $tasks  所有的任务集合
   * @param $mutation 提交的mutation名称
   * @return {Promise<number>}  返回当前刷新任务数
   */
  commitRefresh: ({ commit }, { $promiseArr, $tasks, $mutation }) => {
    if ($promiseArr.length === 0) {
      commit($mutation, $tasks);
      return Promise.resolve(0);
    }
    return axios.all($promiseArr).then(res => {
      res.forEach(item => {
        $tasks.forEach(task => {
          if (item.taskKey === task.taskKey) {
            task.data = item.data;
          }
        })
      })
      commit($mutation, $tasks);
      return res.length;
    })
  }
};
