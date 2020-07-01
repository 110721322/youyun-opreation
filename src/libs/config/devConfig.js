const webConfig = {
  // server: 'http://192.168.2.174:8081/', // 正式
  server: 'http://192.168.2.102:8082/', // 测试环境地址
  // server: 'http://192.168.2.158:8888/app/mock/16',  // mock数据地址
  // server: 'http://127.0.0.1:8082/', // 登录获取地址
  timeout: 30000,
  successCode: 2000, // 和后端约定的接口正常状态码
  unLoginCode: 4005, // 未登录的接口返回状态码
  globalParameObj: {}, // 全局参数
  fileDownloadUrl: 'http://192.168.2.102:8082'
  // fileDownloadUrl: 'http://192.168.2.102:8082'
};

export default webConfig;