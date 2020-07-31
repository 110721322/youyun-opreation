import * as API from '.';

export default {
  queryTradeByType: (params) => API.GET('/operation/v1/tradeData/queryTradeByType', params),
  queryDailyTradeBrokenLine: (params) => API.GET('/operation/v1/tradeData/queryDailyTradeBrokenLine', params),
  tradeDataQueryRegionTradeSummaryByCondition: (params) => API.GET('/operation/v1/tradeData/queryRegionTradeSummaryByCondition', params),
  tradeData: (params) => API.GET('/operation/v1/tradeData/', params),
  merchantDataQueryAllProvinceCountAndRank: (params) => API.GET('/operation/v1/merchantData/queryAllProvinceCountAndRank', params),
  queryRegionTradeSummaryByCondition: (params) => API.GET('/operation/v1/merchantData/queryRegionTradeSummaryByCondition', params),
  queryCategoryTradeSummaryByCondition: (params) => API.GET('/operation/v1/merchantData/queryCategoryTradeSummaryByCondition', params),
  queryDailyTradeAvgByCondition: (params) => API.GET('/operation/v1/merchantData/queryDailyTradeAvgByCondition', params),
  queryTradeTop5ByCondition: (params) => API.GET('/operation/v1/merchantData/queryTradeTop5ByCondition', params),
  queryTradeCountRatioByCondition: (params) => API.GET('/operation/v1/merchantData/queryTradeCountRatioByCondition', params),
  queryTradeRiseRatioTop5ByCondition: (params) => API.GET('/operation/v1/merchantData/queryTradeRiseRatioTop5ByCondition', params),
  selectTradeRiseRatioRoughByCondition: (params) => API.GET('/operation/v1/merchantData/selectTradeRiseRatioRoughByCondition', params),
  selectNonTradeTop5ByCondition: (params) => API.GET('/operation/v1/merchantData/selectNonTradeTop5ByCondition', params),
  queryTradeSummaryAndCycleByCondition: (params) => API.GET('/operation/v1/merchantData/queryTradeSummaryAndCycleByCondition', params),
  queryAllProvinceCount: (params) => API.GET('operation/v1/agentCount/queryAllProvinceCount', params),
  queryProvinceRank: (params) => API.GET('operation/v1/agentCount/queryProvinceRank', params),
  queryRegionRatio: (params) => API.GET('operation/v1/agentCount/queryRegionRatio', params),
  queryGradeRatio: (params) => API.GET('operation/v1/agentCount/queryGradeRatio', params),
  queryTypeRatio: (params) => API.GET('operation/v1/agentCount/queryTypeRatio', params),
  queryAgentDailyAverageTrade: (params) => API.GET('/operation/v1/tradeData/queryAgentDailyAverageTrade', params),
  queryListByTurnover: (params) => API.POST('/operation/v1/topAgentGrail/queryListByTurnover', params),
  queryAgentTradeAmountPerRank: (params) => API.GET('/operation/v1/tradeData/queryAgentTradeAmountPerRank', params),
  queryListByNewMerchantCount: (params) => API.POST('/operation/v1/topAgentGrail/queryListByNewMerchantCount', params),
  queryAgentFaceTradeAmountRank: (params) => API.GET('/operation/v1/tradeData/queryAgentFaceTradeAmountRank', params),
  queryAgentFaceTradeCountRank: (params) => API.GET('/operation/v1/tradeData/queryAgentFaceTradeCountRank', params),
  queryAgentTradeList: (params) => API.GET('/operation/v1/tradeData/queryAgentTradeList', params),
  /**
   * 顶级服务商数量分布
   * @param params
   * @returns {Promise<>}
   */
  queryTopAgentNumber: (params) => API.POST('/operation/v1/topAgentGrail/queryTopAgentNumber', params),
  /**
   * 顶级服务商平均交易额走势
   * @param params
   * @returns {Promise<>}
   */
  queryTradeAverageList: (params) => API.POST('/operation/v1/topAgentGrail/queryTradeAverageList', params),
  /**
   * 获取标签，大区，运营人员列表
   * @param params
   * @returns {Promise<>}
   */
  queryInit: (params) => API.POST('/operation/v1/topAgentGrail/queryInit', params),
  /**
   * 数据大盘分页查询相关数据
   * @param params
   * @returns {Promise<>}
   */
  selectTradeDailyByPage: (params) => API.POST('/operation/v1/topAgentGrail/selectTradeDailyByPage', params),
  /**
   * 顶级服务商列表
   * @param params
   * @returns {Promise<>}
   */
  topAgentPageByCondition: (params) => API.GET('/operation/v1/topAgent/topAgentPageByCondition', params),
  /**
   * 查看顶级服务商详情
   * @param params
   * @returns {Promise<>}
   */
  getTopAgentDetail: (params) => API.GET('/operation/v1/topAgent/getTopAgentDetail', params)
};
