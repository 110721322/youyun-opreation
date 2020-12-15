export const LIST_CONFIG = {
  configData: {
    name: "商户详情",
    child: [
      {
        name: "商户信息",
        modelName: "merchantData",
        models: [
          {
            items: [
              {
                name: "所属服务商",
                key: "agentName"
              },
              {
                name: "添加时间",
                key: "createTime",
              }
            ]
          },
          {
            items: [
              {
                name: "商户Id",
                key: "merchantNo"
              },
              {
                name: "商户状态",
                key: "disabledSn"
              }
            ]
          },
          {
            items: [
              {
                name: "商户名称",
                key: "merchantName"
              },
              {
                name: "手机号码",
                key: "loginAccount"
              }
            ]
          }
        ]
      }
    ]
  }
}