export const FORM_CONFIG = {
  resetPassword: [
    {
      type: 5,
      label: '密码重置',
      initVal: 1,
      labelWidth: '120px',
      options: [
        {
          label: '登录密码',
          value: 1
        }
      ],
      span: 24
    }
  ],
  shopInfo: [
    {
      type: 0,
      label: '商户名称',
      labelWidth: '120px',
      key: 'merchantName',
      span: 24,
      rules: [
        { required: true, message: '请填写商户名称', trigger: 'blur' }
      ]
    }
  ],
  // TODO loginSet: [
  //   {
  //     type: 0,
  //     label: '新登录手机号',
  //     labelWidth: '120px',
  //     key: 'mobile',
  //     span: 24
  //   },
  //   {
  //     type: 0,
  //     label: '验证码',
  //     labelWidth: '120px',
  //     key: 'code',
  //     span: 24
  //   }
  // ],
  showSubmit: false,
  showFootBtn: false
}
