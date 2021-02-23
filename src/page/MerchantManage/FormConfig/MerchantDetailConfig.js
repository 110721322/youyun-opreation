export const FORM_CONFIG = {
  //TODO review: 无意义的命名空间
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
  //TODO review: 无意义的命名空间
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
  //TODO review: 无意义的命名空间
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
