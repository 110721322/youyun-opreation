import * as API from '.';
import * as g from '../libs/global';

export default {
// 分润统计-服务商分润统计-按支付方式,通道统计
selectAgentDataByPage: (params) => API.POST(g.config.server + '/operation/v1/topAgentStatistics/selectAgentDataByPage', params)
};s