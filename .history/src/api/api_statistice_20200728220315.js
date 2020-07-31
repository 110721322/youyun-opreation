import * as API from '.';
import * as g from '../libs/global';

export default {
// 分润统计-服务商分润统计-按支付方式,通道统计
  selectAgentDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectAgentDataByPage', params),
  // 分润统计-服务商分润统计-间连分润统计
  selectIndirectDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectIndirectDataByPage', params),
  // 代理商下的商户明细
  selectMerchantDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectMerchantDataByPage', params)
}
