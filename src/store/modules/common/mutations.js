export default {
  SAVE_MANAGER_LIST(state, $info) {
    state.mangerList = $info
  },
  SAVE_CUSTOMER_LIST(state, $info) {
    state.customerList = $info
  },
  SAVE_ROLE_LIST(state, $info) {
    state.roleList = $info
  },
  SAVE_BUSINESS_LIST(state, $info) {
    state.businessList = $info
  },
  SET_SUPPLIER_TASK($state, $tasks) {
    $state.supplierUploadTasks = $tasks;
  },
  SET_SHOP_TASK($state, $tasks) {
    $state.shopUploadTasks = $tasks;
  },
  SET_PURCHASE_TASK($state, $tasks) {
    $state.purchaseUploadTasks = $tasks;
  },
  SET_RECONCILIATION_TASK($state, $tasks) {
    $state.reconciliationDownTasks = $tasks;
  }
};
