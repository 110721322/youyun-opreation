import * as API from '.';
import store from "@/store";
import utils from "../libs/kit/utils";

export default {
  // 交易数据-各支付方式的总交易额/交易笔数
  queryTradeByType: (params) => API.POST('/operation/v1/tradeData/queryTradeByType', params),
  // 交易数据-大区交易占比
  tradeDataQueryRegionTradeSummaryByCondition: (params) => API.POST('/operation/v1/tradeData/queryRegionTradeSummaryByCondition', params),
  // 交易数据-行业交易占比
  queryCategoryIndustryByCondition: (params) => API.POST('/operation/v1/tradeData/queryCategoryTradeSummaryByCondition', params),
  // 商户数据-新增商户地图数据分布与排行榜
  merchantDataQueryAllProvinceCountAndRank: (params) => API.POST('/operation/v1/merchantData/queryAllProvinceCountAndRank', params),
  // 商户数据-大区占比
  selectRegionMerchantCount: (params) => API.POST('/operation/v1/merchantData/selectRegionMerchantCount', params),
  // 商户数据-行业占比
  selectCategoryMerchantCount: (params) => API.POST('/operation/v1/merchantData/selectCategoryMerchantCount', params),
  // 商户数据-商户交易走势
  queryDailyTradeAvg: (params) => API.POST('/operation/v1/merchantData/queryDailyTradeAvg', params),
  // 商户数据-交易额排行
  queryTradeTop5ByCondition: (params) => API.POST('/operation/v1/merchantData/queryTradeTop5ByCondition', params),
  // 商户数据-交易笔数分布
  queryTradeCountRatio: (params) => API.POST('/operation/v1/merchantData/queryTradeCountRatio', params),
  // 商户数据-商户交易涨跌排行
  queryTradeRiseRatioTop5ByCondition: (params) => API.GET('/operation/v1/merchantData/queryTradeRiseRatioTop5ByCondition', params),
  // 商户数量-交易涨跌概况
  selectTradeRiseRatioRoughByCondition: (params) => API.GET('/operation/v1/merchantData/selectTradeRiseRatioRoughByCondition', params),
  // 商户数据-无交易商户
  selectNonTradeTop5ByCondition: (params) => API.GET('/operation/v1/merchantData/selectNonTradeTop5ByCondition', params),
  // 商户数据-商户数据详情
  queryTradeSummaryAndCycleByCondition: (params) => API.POST('/operation/v1/merchantData/queryTradeSummaryAndCycleByCondition', params),
  // 服务商数量-获取地图服务商数据分布
  queryAllProvinceCount: (params) => API.POST('/operation/v1/agentCount/queryAllProvinceCount', params),
  // 服务商数量-大区占比
  queryRegionRatio: (params) => API.POST('/operation/v1/agentCount/queryRegionRatio', params),
  // 服务商数量-等级占比
  queryGradeRatio: (params) => API.POST('/operation/v1/agentCount/queryGradeRatio', params),
  // 服务商数量-类型占比
  queryTypeRatio: (params) => API.POST('/operation/v1/agentCount/queryTypeRatio', params),
  // 服务商交易统计-服务商平均交易额走势
  queryAgentDailyAverageTrade: (params) => API.POST('/operation/v1/tradeData/queryAgentDailyAverageTrade', params),
  // 服务商交易统计-服务商总交易额排行榜
  queryAgentTradeAmountRank: (params) => API.POST('/operation/v1/tradeData/queryAgentTradeAmountRank', params),
  // 服务商交易统计-服务商新增商户数排行
  queryNewMerchantRank: (params) => API.POST('/operation/v1/tradeData/queryNewMerchantRank', params),
  // 服务商交易统计-服务商刷脸订单排行-金额
  queryAgentFaceTradeAmountRank: (params) => API.POST('/operation/v1/tradeData/queryAgentFaceTradeAmountRank', params),
  // 数据大盘-总交易额排行
  queryListByTurnover: (params) => API.POST('/operation/v1/topAgentGrail/queryListByTurnover', params),
  // 服务商交易统计-服务商交易额涨跌排行
  queryAgentTradeAmountPerRank: (params) => API.GET('/operation/v1/tradeData/queryAgentTradeAmountPerRank', params),
  // 数据大盘-新增商户数量排行
  queryListByNewMerchantCount: (params) => API.POST('/operation/v1/topAgentGrail/queryListByNewMerchantCount', params),
  // 服务商交易统计-服务商刷脸订单排行-笔数
  queryAgentFaceTradeCountRank: (params) => API.POST('/operation/v1/tradeData/queryAgentFaceTradeCountRank', params),
  // 服务商交易统计-服务商数据详情
  queryAgentTradeList: (params) => API.POST('/operation/v1/tradeData/queryAgentTradeList', params),
  // 保存用户图表配置
  saveUserDiagrams: (params) => API.POST('/operation/v1/userDiagram/saveUserDiagrams', params),
  // 查询当前用户所设置的交易数据图表
  queryUserDiagram: (type) => API.GET('/operation/v1/userDiagram/' + type),
  // 顶级服务商数量分布
  queryTopAgentNumber: (params) => API.POST('/operation/v1/topAgentGrail/queryTopAgentNumber', params),
  // 顶级服务商平均交易额走势
  queryTradeAverageList: (params) => API.POST('/operation/v1/topAgentGrail/queryTradeAverageList', params),
  // 获取标签，大区，运营人员列表
  queryInit: (params) => API.POST('/operation/v1/topAgentGrail/queryInit', params),
  // 数据大盘分页查询相关数据
  selectTradeDailyByPage: (params) => API.POST('/operation/v1/topAgentGrail/selectTradeDailyByPage', params),
  // 顶级服务商列表
  topAgentPageByCondition: (params) => API.GET('/operation/v1/topAgent/topAgentPageByCondition', params),
  // 查看顶级服务商详情
  getTopAgentDetail: (params) => API.GET('/operation/v1/topAgent/getTopAgentDetail', params),

  /**
   * 交易数据-总交易额排行初始化数据,存储在store中
   * @param params
   * @returns {Promise<>}
   */
  tradeDataQueryInit: (params) => API.POST('/operation/v1/tradeData/queryInit', params).then(res => {
    if (!utils.isObj(res.data)) return res;
    const { labelList, userDTOList, regionSetList, AgentTypes, categoryList } = res.data;
    if (utils.isArr(labelList)) store.dispatch('setTradeLabel', labelList);
    if (utils.isArr(regionSetList)) store.dispatch('setTradeRegion', regionSetList);
    if (utils.isArr(userDTOList)) store.dispatch('setTradeUSER', userDTOList);
    if (utils.isArr(AgentTypes)) store.dispatch('setAgentTypes', AgentTypes);
    if (utils.isArr(categoryList)) store.dispatch('setCategoryList', categoryList);
    return res;
  })
};
