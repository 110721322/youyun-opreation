import api from "@/api/api_risk.js";
export const SEARCH_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      selectSevenDay: true,
      labelWidth: '80px',
      span: 22
    },
    {
      type: 10,
      label: '筛选',
      key: 'search',
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
      labelWidth: '80px',
      span: 22
    },
    {
      type: 1,
      label: '加入人员',
      key: 'operateUserNo',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: api.getAllJobName,
        keyName: 'id',
        valueName: 'jobName',
        method: 'get'
      }
    }
  ]
}
