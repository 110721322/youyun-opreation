export const FORM_CONFIG = {
  sendMessageData: {
    title: '域名定制',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '主域名',
        key: 'mainDomain',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '例如laoban.'
      },
      {
        type: 0,
        label: 'oa办公后台',
        key: 'oaDomain',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: 'www.laoban.oa.aduer.com'
      },
      {
        type: 0,
        label: '服务商后台',
        key: 'agentDomain',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: 'www.laoban.fx.aduer.com'
      },
      {
        type: 0,
        label: '商户后台',
        key: 'merchantDomain',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: ' www.laoban.sh.aduer.com'
      }
    ]
  }
}

