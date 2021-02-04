import * as API from '.';
export default {
  // 分润统计-汇总数据
  queryTotalData: (params) => API.GET('/operation/v1/benefitStatistic/queryTotalData', params),
  // 分润统计-趋势数据列表查询
  queryTrendDataList: (params) => API.GET('/operation/v1/benefitStatistic/queryTrendDataList', params),
  // 分润统计-门店佣金排行
  queryShopDataList: (params) => API.GET('/operation/v1/benefitStatistic/queryShopDataList', params),
  // 分润统计-商户佣金排行
  queryMerchantDataList: (params) => API.GET('/operation/v1/benefitStatistic/queryMerchantDataList', params),
  // 分润统计-服务商佣金排行
  queryAgentDataList: (params) => API.GET('/operation/v1/benefitStatistic/queryAgentDataList', params)
}
