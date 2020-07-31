import apiAgent from "@/api/api_agent.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '精准筛选',
      key: 'banField',
      class: 'max-width',
      placeholder: "",
      options: [
        {
          label: '营业执照编号',
          value: 'shopLicenseNo'
        },
        {
          label: '法人身份证号',
          value: 'lawIdCard'
        },
        {
          label: '法人手机号',
          value: 'lawMobile'
        },
        {
          label: '银行卡号',
          value: 'bankCardNo'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operateUserNo',
      labelWidth: '100px',
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '类型',
      key: 'type',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '灰名单',
          value: 'gray'
        },
        {
          label: '黑名单',
          value: 'black'
        }
      ]
    }
  ]
}
