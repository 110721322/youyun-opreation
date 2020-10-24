import * as API from '.';
import store from "@/store";
import utils from "../libs/kit/utils";

export default {
  queryTradeByType: (params) => API.POST('/operation/v1/tradeData/queryTradeByType', params),
  queryDailyTradeBrokenLine: (params) => API.GET('/operation/v1/tradeData/queryDailyTradeBrokenLine', params),
  tradeDataQueryRegionTradeSummaryByCondition: (params) => API.POST('/operation/v1/tradeData/queryRegionTradeSummaryByCondition', params),
  queryCategoryIndustryByCondition: (params) => API.POST('/operation/v1/tradeData/queryCategoryTradeSummaryByCondition', params),
  tradeData: (params) => API.GET('/operation/v1/tradeData/', params),
  merchantDataQueryAllProvinceCountAndRank: (params) => API.POST('/operation/v1/merchantData/queryAllProvinceCountAndRank', params),
  selectRegionMerchantCount: (params) => API.POST('/operation/v1/merchantData/selectRegionMerchantCount', params),
  selectCategoryMerchantCount: (params) => API.POST('/operation/v1/merchantData/selectCategoryMerchantCount', params),
  queryCategoryTradeSummaryByCondition: (params) => API.GET('/operation/v1/merchantData/queryCategoryTradeSummaryByCondition', params),
  queryDailyTradeAvg: (params) => API.POST('/operation/v1/merchantData/queryDailyTradeAvg', params),
  queryTradeTop5ByCondition: (params) => API.POST('/operation/v1/merchantData/queryTradeTop5ByCondition', params),
  queryTradeCountRatio: (params) => API.POST('/operation/v1/merchantData/queryTradeCountRatio', params),
  queryTradeRiseRatioTop5ByCondition: (params) => API.GET('/operation/v1/merchantData/queryTradeRiseRatioTop5ByCondition', params),
  selectTradeRiseRatioRoughByCondition: (params) => API.GET('/operation/v1/merchantData/selectTradeRiseRatioRoughByCondition', params),
  selectNonTradeTop5ByCondition: (params) => API.GET('/operation/v1/merchantData/selectNonTradeTop5ByCondition', params),
  queryTradeSummaryAndCycleByCondition: (params) => API.POST('/operation/v1/merchantData/queryTradeSummaryAndCycleByCondition', params),
  queryAllProvinceCount: (params) => API.POST('/operation/v1/agentCount/queryAllProvinceCount', params),
  queryRegionRatio: (params) => API.POST('/operation/v1/agentCount/queryRegionRatio', params),
  queryGradeRatio: (params) => API.POST('/operation/v1/agentCount/queryGradeRatio', params),
  queryTypeRatio: (params) => API.POST('/operation/v1/agentCount/queryTypeRatio', params),
  queryAgentDailyAverageTrade: (params) => API.POST('/operation/v1/tradeData/queryAgentDailyAverageTrade', params),
  queryAgentTradeAmountRank: (params) => API.POST('/operation/v1/tradeData/queryAgentTradeAmountRank', params),
  queryNewMerchantRank: (params) => API.POST('/operation/v1/tradeData/queryNewMerchantRank', params),
  queryAgentFaceTradeAmountRank: (params) => API.POST('/operation/v1/tradeData/queryAgentFaceTradeAmountRank', params),
  queryListByTurnover: (params) => API.POST('/operation/v1/topAgentGrail/queryListByTurnover', params),
  queryAgentTradeAmountPerRank: (params) => API.GET('/operation/v1/tradeData/queryAgentTradeAmountPerRank', params),
  queryListByNewMerchantCount: (params) => API.POST('/operation/v1/topAgentGrail/queryListByNewMerchantCount', params),
  queryAgentFaceTradeCountRank: (params) => API.POST('/operation/v1/tradeData/queryAgentFaceTradeCountRank', params),
  queryAgentTradeList: (params) => API.POST('/operation/v1/tradeData/queryAgentTradeList', params),
  saveUserDiagrams: (params) => API.POST('/operation/v1/userDiagram/saveUserDiagrams', params),
  queryUserDiagram: (type) => API.GET('operation/v1/userDiagram/' + type),
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
  getTopAgentDetail: (params) => API.GET('/operation/v1/topAgent/getTopAgentDetail', params),
  /**
   * 交易数据-总交易额排行初始化数据,存储在store中
   * @param params
   * @returns {Promise<>}
   */
  tradeDataQueryInit: (params) => API.POST('/operation/v1/tradeData/queryInit', params).then(res => {
    if (!utils.isObj(res.datas)) return res;
    const { labelList, userDTOList, regionSetList, AgentTypes, categoryList } = res.datas;
    if (utils.isArr(labelList)) store.dispatch('setTradeLabel', labelList);
    if (utils.isArr(regionSetList)) store.dispatch('setTradeRegion', regionSetList);
    if (utils.isArr(userDTOList)) store.dispatch('setTradeUSER', userDTOList);
    if (utils.isArr(AgentTypes)) store.dispatch('setAgentTypes', AgentTypes);
    if (utils.isArr(categoryList)) store.dispatch('setCategoryList', categoryList);
    return res;
  })
};
