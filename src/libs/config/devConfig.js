const webConfig = {
  server: 'http://192.168.2.174:8081/', // 正式
  // server: 'http://192.168.2.102:8081/', // 正式

  timeout: 30000,
  successCode: 2000, // 和后端约定的接口正常状态码
  unLoginCode: 4005, // 未登录的接口返回状态码
  globalParameObj: {}, // 全局参数
  fileDownloadUrl: 'http://192.168.2.174:8082'
  // fileDownloadUrl: 'http://192.168.2.102:8082'
};

export default webConfig;