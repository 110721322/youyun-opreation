export default {
  server: 'http://192.168.2.102:8081/', // 测试环境地址
  loginserver: 'http://192.168.2.102:8082/',  //登录开发调试端口
  agentServer: 'http://192.168.2.102:8082',
  timeout: 30000,
  successCode: 2000, // 和后端约定的接口正常状态码
  unLoginCode: 4005, // 未登录的接口返回状态码
  globalParameObj: {}, // 全局参数
  fileDownloadUrl: 'http://192.168.2.102:8082'
};
