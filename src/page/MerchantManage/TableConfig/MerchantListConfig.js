export const LIST_CONFIG = {
  configData: [
    {
      label: "所属服务商",
      key: "agentName"
    },
    {
      label: "商户ID",
      key: "merchantNo"
    },
    {
      label: "商户名称",
      key: "merchantName",
      emitEdit: 'editName'
    },
    {
      label: "添加时间",
      key: "createTime",
    },

    {
      label: "商户状态",
      key: "disabledSn",
      filedType: 'slot',
      slot: 'status'
    },
    {
      label: "手机号码",
      key: "loginAccount",
      emitEdit: "editPhone"
    }
  ]
}