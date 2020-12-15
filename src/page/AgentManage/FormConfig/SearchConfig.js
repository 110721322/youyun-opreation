import api from '@/api/api_agentManage';
import areaData from "../../../assets/data/areaData";
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
      type: 11,
      label: '到期时间',
      key: 'endDate',
      span: 11
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      options: [
        {
          label: '禁用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        }
      ],
      span: 11
    },
    {
      type: 0,
      label: '手机号码',
      key: 'loginAccount',
      span: 11
    },
    {
      type: 1,
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