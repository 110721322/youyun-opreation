import apiAgent from "@/api/api_agent.js";

export const FORM_CONFIG = {
  formData: [
    // {
    //   type: 10,
    //   label: '服务商名称/ID',
    //   key: 'channelAgent',
    //   class: 'max-width',
    //   options: [
    //     {
    //       label: '服务商ID',
    //       value: 'channelAgentCode'
    //     },
    //     {
    //       label: '服务商名称',
    //       value: 'channelAgentName'
    //     }
    //   ],
    //   labelWidth: '100px'
    // },
    {
      type: 0,
      label: '服务商名称',
      key: 'channelAgentName',
      labelWidth: '100px',
      span: 11
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      labelWidth: '80px',
      span: 11,
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      }
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '待审核',
          value: 1
        },
        {
          label: '已驳回',
          value: 2
        }
      ]
    }
  ]
}

export const FORM_CONFIG2 = {
  formData: [
    {
      type: 10,
      label: '服务商名称/ID',
      key: 'channelAgent',
      class: 'max-width',
      options: [
        {
          label: '服务商ID',
          value: 'channelAgentCode'
        },
        {
          label: '服务商名称',
          value: 'topAgentName'
        }
      ],
      labelWidth: '150px',
      span: 22
    },
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: "max-width",
      labelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '法人姓名',
      key: 'personName',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 0,
      label: '法人电话',
      key: 'personMobile',
      labelWidth: '80px',
      span: 11
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      labelWidth: '80px',
      span: 11,
      options: [
        {
          label: '待部署',
          value: 1
        },
        {
          label: '部署中',
          value: 2
        },
        {
          label: '已完成',
          value: 3
        }
      ]
    }
  ]
}

export const FORM_CONFIG3 = {
  formData: [
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      initVal: "",
      urlOptions: {
        url: apiAgent.queryAllOperation,
        keyName: 'operationId',
        valueName: 'operationName',
        method: 'get'
      },
      rules: [
        {required: true, message: "请选择所属运营", trigger: "blur"}
      ]
    }
  ]
}
