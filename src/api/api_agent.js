import * as API from '.';

export default {
  // 服务商审核-分页查询服务商审核列表
  agentExamineList: (params) => API.GET('/operation/v1/agentAudit/queryAuditPageByCondition', params),
  // 服务商审核-通过服务商审核
  pass: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfPass', params),
  // 服务商审核-驳回服务商审核
  reject: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfReject', params),
  // 服务商审核-激活服务商审核
  activate: (params) => API.GET('/operation/v1/agentAudit/updateAuditStatusOfActivate', params),
  // 服务商审核-分页查询下级服务商审核列表
  subagentExamineList: (params) => API.GET('/operation/v1/agentAudit/querySubAuditPageByCondition', params),
  // 服务商审核-通过下级服务商审核
  subpass: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfPass', params),
  // 服务商审核-驳回下级服务商审核
  subreject: (params) => API.GET('/operation/v1/agentAudit/updateSubAuditStatusOfReject', params),
  // 分页查询服务商列表
  agentList: (params) => API.GET('/operation/v1/agent/queryPageByCondition', params),
  // 服务商-转移运营
  transferOperate: (params) => API.GET('/operation/v1/agent/updateOperateUserNo', params),
  // 服务商-冻结服务商账号
  frozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfFrozen', params),
  // 服务商-解冻服务商账号
  unfrozen: (params) => API.GET('/operation/v1/agent/updateAccountStatusOfUnfrozen', params),
  // 服务商-查看服务商详情
  getAgentDetail: (params) => API.GET('/operation/v1/agent/getAgentDetail', params),
  // 服务商-更新服务商基本资料
  updateAgentBaseInfo: (params) => API.POST('/operation/v1/agent/updateAgentBaseInfo', params),
  // 服务商-更新服务商财务信息
  updateFinancial: (params) => API.POST('/operation/v1/agent/updateAgentFinancialInfo', params),
  // 服务商-更新服务商续费
  updateAgentRenew: (params) => API.POST('/operation/v1/agent/updateAgentRenew', params),
  // 服务商-更新服务商费率
  updateAgentRate: (params) => API.POST('/operation/v1/agent/updateAgentRate', params),
  // 服务商-更新服务商权限
  updateAgentPrivilege: (params) => API.POST('/operation/v1/agent/updateAgentPrivilege', params),
  // 分润总览-分润总览
  totalCommission: (params) => API.GET('/operation/v1/commission/queryTotalCommission', params),
  // 分润总览-服务商分润
  agentCommission: (params) => API.GET('/operation/v1/commission/listAgentCommission', params),
  // 分润总览-商户分润
  merchantCommission: (params) => API.GET('/operation/v1/commission/listMerchantCommission', params),
  // 服务商信息-查询某服务商已关联的标签集合
  queryRelatedLabels: (params) => API.GET('/operation/v1/label/queryRelatedLabels/agent', params),
  // 服务商信息-沟通联系人-添加通讯簿
  addTalkAddressBook: (params) => API.POST('/operation/v1/talkAddressBook/add', params),
  // 服务商信息-沟通联系人-更新通讯簿
  updateTalkAddressBook: (params) => API.POST('/operation/v1/talkAddressBook/update', params),
  // 服务商信息-沟通联系人-查询单个通讯簿
  getById: (params) => API.GET('/operation/v1/talkAddressBook/getById', params),
  // 服务商信息-沟通联系人-分页查询通讯簿
  addressBookQuery: (params) => API.GET('/operation/v1/talkAddressBook/queryByPage', params),
  // 服务商信息-沟通联系人-查询通讯簿下拉框
  queryByAgentNo: (params) => API.GET('/operation/v1/talkAddressBook/queryByAgentNo', params),
  // 服务商信息-沟通记录-更新沟通记录
  updateAgent: (params) => API.POST('/operation/v1/talkLists/update/agent', params),
  // 服务商信息-沟通记录-新增沟通记录
  addTalkLists: (params) => API.POST('/operation/v1/talkLists/add/agent', params),
  // 服务商信息-沟通记录-分页查询沟通记录
  queryPlanList: (params) => API.GET('/operation/v1/talkLists/queryByPage', params),
  // 服务商信息-沟通记录-查询单个沟通记录
  talkListsGetById: (params) => API.GET('/operation/v1/talkLists/getById', params),
  // 服务商信息-沟通记录-查询沟通数据
  selectSummary: (params) => API.GET('/operation/v1/talkLists/selectSummaryByCondition', params),
  // 服务商信息-沟通计划-添加沟通计划
  addTalkPlan: (params) => API.POST('/operation/v1/talkPlan/add', params),
  // 服务商信息-沟通计划-修改沟通计划
  updateTalkPlan: (params) => API.POST('/operation/v1/talkPlan/update', params),
  // 服务商信息-沟通计划-查询单个沟通计划
  getTalkPlan: (params) => API.GET('/operation/v1/talkPlan/getById', params),
  // 服务商信息-沟通计划-分页查询沟通计划
  queryTalkPlan: (params) => API.GET('/operation/v1/talkPlan/queryByPage', params),
  // 服务商信息-沟通计划-查询待沟通次数
  queryWait: (params) => API.GET('/operation/v1/talkPlan/queryWaitExecutePlanCount', params),
  // 服务商审核-下级服务商详情
  getSubAgentDetail: (params) => API.GET('/operation/v1/agent/getSubAgentDetail', params),
  // 服务商-添加邮寄地址
  addPostAddress: (params) => API.POST('/operation/v1/postAddress/add/agent', params),
  // 服务商-更新邮寄地址
  updatePostAddress: (params) => API.POST('/operation/v1/postAddress/update/agent', params),
  // 服务商-下级服务商列表
  queryPageByCondition: (params) => API.GET('/operation/v1/subAgent/queryPageByCondition', params),
  // 服务商-查看下级服务商的详情
  subAgentDetail: (params) => API.GET('/operation/v1/subAgent/getSubAgentDetail', params),
  // 服务商-冻结下级服务商
  updateAccountStatusOfFrozen: (params) => API.GET('/agent/v1/subAgent/updateAccountStatusOfFrozen', params),
  // 更换所属上级服务商
  updateParentAgentNo: (params) => API.GET('/operation/v1/agent/updateParentAgentNo', params),
  // 根据服务商名模糊查询顶级服务商
  queryNamesByCondition: (params) => API.GET('/operation/v1/agent/queryNamesByCondition', params),
  // 查询标签接口
  selectByChannelAgentCode: () => API.GET('/operation/v1/label/selectByChannelAgentCode'),
  // 查询所属大区
  queryAllRegion: () => API.GET('/operation/v1/region/queryAllRegion'),
  // 添加服务商
  addAgent: (params) => API.POST('/operation/v1/agent/addAgent', params),
  // 服务商标签下拉框
  queryLaBleAgent: (params) => API.GET('/operation/v1/label/queryLaBleAgent', params),
  planCount: (params) => API.GET('/operation/v1/talkPlan/queryWaitExecutePlanCount', params),
  // 订单管理
  hardwarePageOrder: (params) => API.GET('/operation/v1/deviceOrder/hardwarePageOrder', params),
  hardwareDetail: (params) => API.GET('/operation/v1/deviceOrder/hardwareDetail', params),
  getAgentNosByAgentName: (params) => API.GET('/operation/v1/deviceOrder/getAgentNosByAgentName', params),
  getMerchantNosByMerchantName: (params) => API.GET('/operation/v1/deviceOrder/getMerchantNosByMerchantName', params),
  orderStatus: (params) => API.GET('/operation/v1/deviceOrder/orderStatus', params),
  // 广告权限
  advertPrivilege: (params) => API.GET('/operation/v1/advertPrivilege/queryByPage', params),
  advertPrivilegeUpdate: (params) => API.POST('/operation/v1/advertPrivilege/update', params),
  queryAllPrivilege: (params) => API.GET('/operation/v1/advertPrivilege/queryAllPrivilege', params),
  advertList: (params) => API.GET('/operation/v1/advert/queryByPage', params),
  advertDelete: (params) => API.GET('/operation/v1/advert/delete', params),
  advertDistribute: (params) => API.GET('/operation/v1/advertDistribute/delete', params),
  advertAdd: (params) => API.POST('/operation/v1/advert/add', params),
  advertUpdate: (params) => API.POST('/operation/v1/advert/update', params),
  queryById: (params) => API.GET('/operation/v1/advertDistribute/queryById', params),
  queryAllDistributeName: (params) => API.GET('/operation/v1/advertDistribute/queryAllDistributeName', params),
  queryAllPrivilegeType: (params) => API.GET('/operation/v1/advertDistribute/queryAllPrivilegeType', params),
  queryAllAdvertDistributeType: (params) => API.GET('/operation/v1/advertDistribute/queryAllAdvertDistributeType', params),
  advertQueryById: (params) => API.GET('/operation/v1/advert/queryById', params),
  putList: (params) => API.GET('/operation/v1/advertDistribute/queryByPage', params),
  advertDistributeAdd: (params) => API.POST('/operation/v1/advertDistribute/add', params),
  advertDistributeUpdate: (params) => API.GET('/operation/v1/advertDistribute/update', params),
  // 运营结算审核
  listOperationSettle: (params) => API.GET('/operation/v1/agentSettle/listOperationSettle', params),
  // 第三方对接列表
  queryByPage: (params) => API.GET('/operation/v1/agentOpenConfig/queryByPage', params),
  updateOfFrozen: (params) => API.GET('/operation/v1/agentOpenConfig/updateOfFrozen', params),
  updateOfUnFrozen: (params) => API.GET('/operation/v1/agentOpenConfig/updateOfUnFrozen', params),
  add: (params) => API.GET('/operation/v1/agentOpenConfig/add', params),
  update: (params) => API.GET('/operation/v1/agentOpenConfig/update', params),
  // 平台广告列表-广告类型下拉列表接口
  queryAllAdvertType: (params) => API.GET('/operation/v1/advert/queryAllAdvertType', params),
  queryAllOperation: (params) => API.GET('/operation/v1/advertPrivilege/queryAllOperation', params),
  queryAllDistributeStatus: (params) => API.GET('/operation/v1/advertDistribute/queryAllDistributeStatus', params),
  queryAllDistributeAgent: (params) => API.GET('/operation/v1/advertDistribute/queryAllDistributeAgent', params),
  // 服务商-分页查询财务续费审核记录
  agentRenewRecord: (params) => API.GET('/operation/v1/agentRenewRecord/queryByPage', params),
  // 服务商-添加佣金按比例续费
  addPercentRenew: (params) => API.POST('/operation/v1/agent/addPercentRenew', params),
  // 服务商-批量转移运营
  updateOperationId: (params) => API.POST('/operation/v1/agent/updateOperationId', params),
  // 顶级服务商审核列表
  topAgentAuditList: (params) => API.GET('/operation/v1/topAgent/auditPageByCondition', params),
  // 顶级服务商服务器部署列表
  selectPageSourceCodeDeploy: (params) => API.GET('/operation/v1/topAgent/selectPageSourceCodeDeploy', params),
  // 修改顶级服务商状态
  updateTopAgentStatus: (params) => API.POST('/operation/v1/topAgent/updateStatus', params),
  // 修改补充顶级服务商资料
  updateTopAgentInfo: (params) => API.POST('/operation/v1/topAgent/update', params),
  // 更新源码的部署状态
  updateTopSourceCodeDeployStatus: (params) => API.POST('/operation/v1/topAgent/updateSourceCodeDeployStatus', params),
  // 查询顶级服务商源码部署详情
  getSourceCodeDeployDetail: (params) => API.GET('/operation/v1/topAgent/getSourceCodeDeployDetail', params)
};
