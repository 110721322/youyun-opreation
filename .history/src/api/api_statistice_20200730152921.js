import * as API from '.';
import * as g from '../libs/global';

export default {
  // 导入商户蜻蜓活动奖励excel
  merchantinput: (params, config) => API.POST(g.config.server + '/operation/v1/dragonfly/reward/merchant/input', params, config),
  // 服务商蜻蜓奖励分页查询
  queryByPage: (params) => API.GET(g.config.server + '/operation/v1/dragonfly/reward/agent/queryByPage', params),
  // 商户蜻蜓奖励明细分页查询
  merchantqueryByPage: (params) => API.GET(g.config.server + '/operation/v1/dragonfly/reward/merchant/queryByPage', params),
  // 分润统计-服务商分润统计-按支付方式,通道统计
  selectAgentDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectAgentDataByPage', params),
  // 分润统计-服务商分润统计-间连分润统计
  selectIndirectDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectIndirectDataByPage', params),
  // 代理商下的商户明细
  selectMerchantDataByPage: (params) => API.POST(g.config.server + 'operation/v1/topAgentStatistics/selectMerchantDataByPage', params)
}
