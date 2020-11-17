import * as API from '.';
/**
 *
 * @param params
 */
export default {
  /**
   * 服务商审核-分页查询服务商审核列表
   * @param params
   */
  agentExamineList: (params) => API.GET('/operation/v1/agentAudit/queryAuditPageByCondition', params),

  /**
   * 服务商审核-通过服务商审核
   * @param params
   */
  pass: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfPass', params),

  /**
   * 服务商审核-驳回服务商审核
   * @param params
   */
  reject: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfReject', params),

  /**
   * 服务商审核-激活服务商审核
   * @param params
   */
  activate: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfActivate', params),

  /**
   * 服务商审核-分页查询下级服务商审核列表
   * @param params
   */
  subagentExamineList: (params) => API.GET('/operation/v1/agentAudit/querySubAuditPageByCondition', params),

  /**
   * 服务商审核-通过下级服务商审核
   * @param params
   */
  subpass: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfPass', params),

  /**
   * 服务商审核-驳回下级服务商审核
   * @param params
   */
  subreject: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfReject', params),

  /**
   * 分页查询服务商列表
   * @param params
   */
  agentList: (params) => API.GET('/operation/v1/agent/queryPageByCondition', params),

  /**
   * 服务商-转移运营
   * @param params
   */
  transferOperate: (params) => API.GET('/operation/v1/agent/updateOperateUserNo', params),

  /**
   * 服务商-冻结服务商账号
   * @param params
   */
  frozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfFrozen', params),

  /**
   * 服务商-解冻服务商账号
   * @param params
   */
  unfrozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfUnfrozen', params),

  /**
   * 服务商-查看服务商详情
   * @param params
   */
  getAgentDetail: (params) => API.GET('/operation/v1/agent/getAgentDetail', params),

  /**
   * 服务商-更新服务商基本资料
   * @param params
   */
  updateAgentBaseInfo: (params) => API.POST('/operation/v1/agent/updateAgentBaseInfo', params),

  /**
   * 服务商-更新服务商财务信息
   * @param params
   */
  updateFinancial: (params) => API.POST('/operation/v1/agent/updateAgentFinancialInfo', params),

  /**
   * 服务商-更新服务商续费
   * @param params
   */
  updateAgentRenew: (params) => API.POST('/operation/v1/agent/updateAgentRenew', params),
  /**
   *
   * 服务商-更新服务商费率
   * @param params
   */
  updateAgentRate: (params) => API.POST('/operation/v1/agent/updateAgentRate', params),

  /**
   * 服务商-更新服务商权限
   * @param params
   */
  updateAgentPrivilege: (params) => API.POST('/operation/v1/agent/updateAgentPrivilege', params),

  /**
   * 分润总览-分润总览
   * @param params
   */
  totalCommission: (params) => API.GET('/operation/v1/commission/queryTotalCommission', params),

  /**
   * 分润总览-服务商分润
   * @param params
   */
  agentCommission: (params) => API.GET('/operation/v1/commission/listAgentCommission', params),

  /**
   * 分润总览-商户分润
   * @param params
   */
  merchantCommission: (params) => API.GET('/operation/v1/commission/listMerchantCommission', params),

  /**
   * 服务商信息-查询某服务商已关联的标签集合
   * @param params
   */
  queryRelatedLabels: (params) => API.GET('/operation/v1/label/queryRelatedLabels/agent', params),

  /**
   * 服务商信息-沟通联系人-添加通讯簿
   * @param params
   */
  addTalkAddressBook: (params) => API.POST('/operation/v1/talkAddressBook/add', params),

  /**
   * 服务商信息-沟通联系人-更新通讯簿
   * @param params
   */
  updateTalkAddressBook: (params) => API.POST('/operation/v1/talkAddressBook/update', params),

  /**
   * 服务商信息-沟通联系人-查询单个通讯簿
   * @param params
   */
  getById: (params) => API.GET('/operation/v1/talkAddressBook/getById', params),

  /**
   * 服务商信息-沟通联系人-分页查询通讯簿
   * @param params
   */
  addressBookQuery: (params) => API.GET('/operation/v1/talkAddressBook/queryByPage', params),

  /**
   * 服务商信息-沟通联系人-查询通讯簿下拉框
   * @param params
   */
  queryByAgentNo: (params) => API.GET('/operation/v1/talkAddressBook/queryByAgentNo', params),

  /**
   * 服务商信息-沟通记录-更新沟通记录
   * @param params
   */
  updateAgent: (params) => API.POST('/operation/v1/talkLists/update/agent', params),

  /**
   * 服务商信息-沟通记录-新增沟通记录
   * @param params
   */
  addTalkLists: (params) => API.POST('/operation/v1/talkLists/add/agent', params),

  /**
   * 服务商信息-沟通记录-分页查询沟通记录
   * @param params
   */
  queryPlanList: (params) => API.GET('/operation/v1/talkLists/queryByPage', params),

  /**
   * 服务商信息-沟通记录-查询单个沟通记录
   * @param params
   */
  talkListsGetById: (params) => API.GET('/operation/v1/talkLists/getById', params),

  /**
   * 服务商信息-沟通记录-查询沟通数据
   * @param params
   */
  selectSummary: (params) => API.GET('/operation/v1/talkLists/selectSummaryByCondition', params),

  /**
   * 服务商信息-沟通计划-添加沟通计划
   * @param params
   */
  addTalkPlan: (params) => API.POST('/operation/v1/talkPlan/add', params),

  /**
   * 服务商信息-沟通计划-修改沟通计划
   * @param params
   */
  updateTalkPlan: (params) => API.POST('/operation/v1/talkPlan/update', params),

  /**
   * 服务商信息-沟通计划-查询单个沟通计划
   * @param params
   */
  getTalkPlan: (params) => API.GET('/operation/v1/talkPlan/getById', params),

  /**
   * 服务商信息-沟通计划-分页查询沟通计划
   * @param params
   */
  queryTalkPlan: (params) => API.GET('/operation/v1/talkPlan/queryByPage', params),

  /**
   * 服务商信息-沟通计划-查询待沟通次数
   * @param params
   */
  queryWait: (params) => API.GET('/operation/v1/talkPlan/queryWaitExecutePlanCount', params),

  /**
   * 服务商审核-下级服务商详情
   * @param params
   */
  getSubAgentDetail: (params) => API.GET('/operation/v1/agent/getSubAgentDetail', params),

  /**
   * 服务商-添加邮寄地址
   * @param params
   */
  addPostAddress: (params) => API.POST('/operation/v1/postAddress/add/agent', params),

  /**
   * 服务商-更新邮寄地址
   * @param params
   */
  updatePostAddress: (params) => API.POST('/operation/v1/postAddress/update/agent', params),

  /**
   * 服务商-下级服务商列表
   * @param params
   */
  queryPageByCondition: (params) => API.GET('/operation/v1/subAgent/queryPageByCondition', params),

  /**
   * 服务商-查看下级服务商的详情
   * @param params
   */
  subAgentDetail: (params) => API.GET('/operation/v1/subAgent/getSubAgentDetail', params),

  /**
   * 服务商-冻结下级服务商
   * @param params
   */
  updateAccountStatusOfFrozen: (params) => API.GET('/agent/v1/subAgent/updateAccountStatusOfFrozen', params),

  /**
   * 更换所属上级服务商
   * @param params
   */
  updateParentAgentNo: (params) => API.GET('/operation/v1/agent/updateParentAgentNo', params),

  /**
   * 根据服务商名模糊查询顶级服务商
   * @param params
   */
  queryNamesByCondition: (params) => API.GET('/operation/v1/agent/queryNamesByCondition', params),

  /**
   * 查询标签接口
   * @param params
   */
  selectByChannelAgentCode: () => API.GET('/operation/v1/label/selectByChannelAgentCode'),

  /**
   * 查询所属大区
   * @param params
   */
  queryAllRegion: () => API.GET('/operation/v1/region/queryAllRegion'),

  /**
   * 添加服务商
   * @param params
   */
  addAgent: (params) => API.POST('/operation/v1/agent/addAgent', params),

  /**
   * 服务商标签下拉框
   * @param params
   */
  queryLaBleAgent: (params) => API.GET('/operation/v1/label/queryLaBleAgent', params),

  /**
   *
   * @param params
   */
  planCount: (params) => API.GET('/operation/v1/talkPlan/queryWaitExecutePlanCount', params),

  /**
   * 订单管理
   * @param params
   */
  hardwarePageOrder: (params) => API.GET('/operation/v1/deviceOrder/hardwarePageOrder', params),

  /**
   *
   * @param params
   */
  hardwareDetail: (params) => API.GET('/operation/v1/deviceOrder/hardwareDetail', params),

  /**
   *
   * @param params
   */
  getAgentNosByAgentName: (params) => API.GET('/operation/v1/deviceOrder/getAgentNosByAgentName', params),

  /**
   *
   * @param params
   */
  getMerchantNosByMerchantName: (params) => API.GET('/operation/v1/deviceOrder/getMerchantNosByMerchantName', params),

  /**
   *
   * @param params
   */
  orderStatus: (params) => API.GET('/operation/v1/deviceOrder/orderStatus', params),

  /**
   * 广告权限
   * @param params
   */
  advertPrivilege: (params) => API.GET('/operation/v1/advertPrivilege/queryByPage', params),

  /**
   *
   * @param params
   */
  advertPrivilegeUpdate: (params) => API.POST('/operation/v1/advertPrivilege/update', params),

  /**
   *
   * @param params
   */
  queryAllPrivilege: (params) => API.GET('/operation/v1/advertPrivilege/queryAllPrivilege', params),

  /**
   *
   * @param params
   */
  advertList: (params) => API.GET('/operation/v1/advert/queryByPage', params),

  /**
   *
   * @param params
   */
  advertDelete: (params) => API.POST('/operation/v1/advert/delete', params),

  /**
   *
   * @param params
   */
  advertDistribute: (params) => API.POST('/operation/v1/advertDistribute/delete', params),

  /**
   *
   * @param params
   */
  advertAdd: (params) => API.POST('/operation/v1/advert/add', params),

  /**
   *
   * @param params
   */
  advertUpdate: (params) => API.POST('/operation/v1/advert/update', params),

  /**
   *
   * @param params
   */
  queryById: (params) => API.GET('/operation/v1/advertDistribute/queryById', params),

  /**
   *
   * @param params
   */
  queryAllDistributeName: (params) => API.GET('/operation/v1/advertDistribute/queryAllDistributeName', params),

  /**
   *
   * @param params
   */
  queryAllPrivilegeType: (params) => API.GET('/operation/v1/advertDistribute/queryAllPrivilegeType', params),

  /**
   *
   * @param params
   */
  queryAllAdvertDistributeType: (params) => API.GET('/operation/v1/advertDistribute/queryAllAdvertDistributeType', params),

  /**
   *
   * @param params
   */
  advertQueryById: (params) => API.GET('/operation/v1/advert/queryById', params),

  /**
   *
   * @param params
   */
  putList: (params) => API.GET('/operation/v1/advertDistribute/queryByPage', params),

  /**
   *
   * @param params
   */
  advertDistributeAdd: (params) => API.POST('/operation/v1/advertDistribute/add', params),

  /**
   *
   * @param params
   */
  advertDistributeUpdate: (params) => API.POST('/operation/v1/advertDistribute/update', params),

  /**
   * 运营结算审核
   * @param params
   */
  listOperationSettle: (params) => API.GET('/operation/v1/agentSettle/listOperationSettle', params),

  /**
   * 第三方对接列表
   * @param params
   */
  queryByPage: (params) => API.GET('/operation/v1/agentOpenConfig/queryByPage', params),

  /**
   *
   * @param params
   */
  updateOfFrozen: (params) => API.GET('/operation/v1/agentOpenConfig/updateOfFrozen', params),

  /**
   *
   * @param params
   */
  updateOfUnFrozen: (params) => API.GET('/operation/v1/agentOpenConfig/updateOfUnFrozen', params),

  /**
   *
   * @param params
   */
  add: (params) => API.GET('/operation/v1/agentOpenConfig/add', params),

  /**
   *
   * @param params
   */
  update: (params) => API.GET('/operation/v1/agentOpenConfig/update', params),

  /**
   * 平台广告列表-广告类型下拉列表接口
   * @param params
   */
  queryAllAdvertType: (params) => API.GET('/operation/v1/advert/queryAllAdvertType', params),

  /**
   *
   * @param params
   */
  queryAllOperation: (params) => API.GET('/operation/v1/advertPrivilege/queryAllOperation', params),

  /**
   *
   * @param params
   */
  queryAllDistributeStatus: (params) => API.GET('/operation/v1/advertDistribute/queryAllDistributeStatus', params),

  /**
   *
   * @param params
   */
  queryAllDistributeAgent: (params) => API.GET('/operation/v1/advertDistribute/queryAllDistributeAgent', params),

  /**
   * 服务商-分页查询财务续费审核记录
   * @param params
   */
  agentRenewRecord: (params) => API.GET('/operation/v1/agentRenewRecord/queryByPage', params),

  /**
   * 服务商-添加佣金按比例续费
   * @param params
   */
  addPercentRenew: (params) => API.POST('/operation/v1/agent/addPercentRenew', params),

  /**
   * 服务商-批量转移运营
   * @param params
   */
  updateOperationId: (params) => API.POST('/operation/v1/agent/updateOperationId', params),

  /**
   * 顶级服务商审核列表
   * @param params
   */
  topAgentAuditList: (params) => API.GET('/operation/v1/topAgent/auditPageByCondition', params),

  /**
   * 顶级服务商服务器部署列表
   * @param params
   */
  selectPageSourceCodeDeploy: (params) => API.GET('/operation/v1/topAgent/selectPageSourceCodeDeploy', params),

  /**
   * 修改顶级服务商状态
   * @param params
   */
  updateTopAgentStatus: (params) => API.POST('/operation/v1/topAgent/updateStatus', params),

  /**
   * 修改补充顶级服务商资料
   * @param params
   */
  updateTopAgentInfo: (params) => API.POST('/operation/v1/topAgent/update', params),

  /**
   * 更新源码的部署状态
   * @param params
   */
  updateTopSourceCodeDeployStatus: (params) => API.POST('/operation/v1/topAgent/updateSourceCodeDeployStatus', params),

  /**
   * 查询顶级服务商源码部署详情
   * @param params
   */
  getSourceCodeDeployDetail: (params) => API.GET('/operation/v1/topAgent/getSourceCodeDeployDetail', params),

  /**
   * 根据关键字查询支行信息
   * @param params
   */
  listBankLineByName: (params) => API.GET('/agent/v1/merchant/listBankLineByName', params),

  /**
   * 根据联行号查询联行支行
   * @param params
   */
  getBankLineByNo: (params) => API.GET('/agent/v1/merchant/getBankLineByNo', params),

  /**
   * 更新服务商续费金额
   * @param params
   */
  updateRenewAmount: (params) => API.POST('/operation/v1/agent/updateAgentRenewAmount', params),

  /**
   * 跨平台票据生成
   * @param params
   */
  generateLoginTicket: (params) => API.POST('/common/v1/user/generateLoginTicket', params),

  /**
   * 跨平台登录
   * @param params
   */
  loginWithTicket: (params) => API.GET('/common/v1/user/loginWithTicket', params),

  /**
   * 服务商管理-通过时查询运营人员
   * @param params
   */
  queryEmployeeList: () => API.GET('/operation/v1/employee/queryEmployeeList'),

  /**
   * 第三方对接分页查询
   * @param params
   */
  getOpenOperatorPageList: (params) => API.GET('/operation/v1/openOperator/getOpenOperatorPageList', params),

  /**
   * 第三方对接-冻结
   * @param params
   */
  blocking: (params) => API.GET('/operation/v1/openOperator/blocking', params),

  /**
   * 第三方对接详情
   * @param params
   */
  getOpenOperatorDetail: (params) => API.GET('/operation/v1/openOperator/getOpenOperatorDetail', params),

  /**
   * 第三方新增对接商
   * @param params
   */
  addOpenAgent: (params) => API.POST('/operation/v1/openOperator/addOpenAgent', params)
};
