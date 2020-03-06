const webConfig = {
  server: 'http://link.aduer.com', // 正式
  timeout: 30000,
  successCode: 2000, // 和后端约定的接口正常状态码
  unLoginCode: 4005, // 未登录的接口返回状态码
  globalParameObj: {}, // 全局参数
  fileDownloadUrl: 'http://link.aduer.com'
};

export default webConfig;
