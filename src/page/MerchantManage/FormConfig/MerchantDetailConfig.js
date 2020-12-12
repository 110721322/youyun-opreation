export const FORM_CONFIG = {
  resetPassword: {
    formData: [
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
        ]
      }
    ]
  },
  shopInfo: {
    formData: [
      {
        type: 0,
        label: '商户昵称',
        labelWidth: '120px',
        key: 'shopName'
      }
    ]
  },
  loginSet: {
    formData: [
      {
        type: 0,
        label: '新登录手机号',
        labelWidth: '120px',
        key: 'mobile'
      },
      {
        type: 0,
        label: '验证码',
        labelWidth: '120px',
        key: 'code'
      }
    ]
  },
  showSubmit: false,
  showFootBtn: false
}