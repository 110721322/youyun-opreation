import store from "@/store"

export const FORM_CONFIG = {
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
          value: 'channelAgentName'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 10,
      label: '法人姓名/电话',
      key: 'person',
      class: 'max-width',
      options: [
        {
          label: '法人姓名',
          value: 'personName'
        },
        {
          label: '法人电话',
          value: 'personMobile'
        }
      ],
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '所属运营',
      key: 'operationId',
      class: "clear_both",
      options: store.state.dataMarket.userList
    },
    {
      type: 1,
      label: '状态',
      key: 'status',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          label: '待补全',
          value: 3
        },
        {
          label: '已补全',
          value: 4
        },
        {
          label: '已冻结',
          value: 5
        }
      ]
    }
  ]
}
