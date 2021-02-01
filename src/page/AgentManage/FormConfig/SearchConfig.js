import api from '@/api/api_agentManage';
import areaData from "youyun-vue-components/assets/data/areaData.ws";
export const SEARCH_FORM_CONFIG = {
  formData: [
    {
      type: 0,
      label: '服务商ID',
      key: 'agentNo',
      span: 11
    },
    {
      type: 0,
      label: '服务商名称',
      key: 'agentName',
      span: 11
    },
    {
      type: 9,
      label: '到期时间',
      key: 'date',
      isHiddenBtn: true,
      span: 11
    },
    {
      type: 1,
      label: '状态',
      key: 'blockStatus',
      urlOptions: {
        url: api.getAgentStatus,
        keyName: 'status',
        valueName: 'desc'
      },
      span: 11
    },
    {
      type: 0,
      label: '手机号码',
      key: 'loginAccount',
      span: 11
    },
    {
      type: 8,
      label: '地址',
      key: 'area',
      options: areaData,
      span: 11
    },
    // TODO {
    //   type: 1,
    //   label: '所属服务商',
    //   key: 'parentAgentNo',
    //   options: [
    //     {
    //       label: '张三',
    //       value: 1
    //     },
    //     {
    //       label: '李四',
    //       value: 21
    //     }
    //   ],
    //   span: 11
    // },
    {
      type: 1,
      label: '管理员',
      key: 'operationId',
      urlOptions: {
        url: api.queryAllOperation,
        method: 'get',
        keyName: 'operationId',
        valueName: 'operationName',
        params: {}
      },
      span: 11
    }
  ]
}
