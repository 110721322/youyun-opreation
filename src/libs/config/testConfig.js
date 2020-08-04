const webConfig = {
  server: 'http://operation.intranet.aduer.com/', // 测试环境地址
  loginserver: 'http://service.intranet.aduer.com/',  //登录开发调试端口
  agentServer: 'http://service.intranet.aduer.com/',
  timeout: 30000,
  successCode: 2000, // 和后端约定的接口正常状态码
  unLoginCode: 4005, // 未登录的接口返回状态码
  globalParameObj: {}, // 全局参数
  fileDownloadUrl: 'http://service.intranet.aduer.com/'
};

export default webConfig;