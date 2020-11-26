export const FORM_CONFIG = {
  rejectReason: {
    title: '驳回',
    showFootBtn: true,
    formData: [
      {
        type: 2,
        label: '基本信息',
        key: 'baseData',
        initVal: ['商户全称与营业执照不一致'],
        options: [
          {
            label: '商户全称与营业执照不一致',
            value: 0
          },
          {
            label: '经营类目与营业执照不一致',
            value: 1
          }
        ]
      },
      {
        type: 2,
        label: '商户信息',
        key: 'merData',
        initVal: ['营业执照编号有误'],
        options: [
          {
            label: '营业执照编号有误',
            value: 0
          },
          {
            label: '营业执照不清晰',
            value: 1
          },
          {
            label: '门头照与商户名称不符',
            value: 2
          },
          {
            label: '法人名称有误',
            value: 3
          },
          {
            label: '法人身份证照片有误',
            value: 4
          },
          {
            label: '法人身份证到期时间有误',
            value: 5
          },
          {
            label: '法人身份证正面不清晰',
            value: 6
          },
          {
            label: '法人身份证反面不清晰',
            value: 7
          }
        ]
      },
      {
        type: 2,
        label: '商户结算卡',
        key: 'settelmentData',
        initVal: ['银行卡号不正确开户支行地区有误'],
        options: [
          {
            label: '银行卡号不正确开户支行地区有误',
            value: 0
          },
          {
            label: '开户支行有误',
            value: 1
          },
          {
            label: '开户许可证照片不清晰',
            value: 2
          }
        ]
      },
      {
        type: 0,
        label: '其他原因',
        key: 'reason',
        initVal: 'pdd',
        inputType: 'textarea'
      }
    ]
  }
}
