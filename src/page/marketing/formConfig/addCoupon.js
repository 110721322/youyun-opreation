import { setRules } from '@/libs/kit/formFns.js';

export const FORM_CONFIG1 = {
  formData: [
    {
      type: 0,
      label: '优惠码名称',
      key: 'promoCodeName',
      rules: setRules('优惠码名称').isRequired.get
    },
    {
      type: 0,
      label: '优惠码面值',
      key: 'promoCodeAmount',
      rules: setRules('优惠码面值').isRequired.get
    },
    {
      type: 3,
      label: '领取截止时间',
      key: 'date',
      dateType: 'datetimerange',
      rules: setRules('领取截止时间').isRequired.get
    },
    {
      type: 15,
      label: '使用有效期',
      key: 'promoCodeTimeFlag',
      rules: setRules('使用有效期').isSelected.get,
      placeholder: '请选择时间',
      dateKey: 'dateArr',
      options: [
        {
          label: '相对时间',
          value: 0
        },
        {
          label: '指定时间',
          value: 1
        }
      ]
    },
    // {
    //   type: 11,
    //   label: '领取后',
    //   key: 'promoCodeTime2',
    //   placeholder: '请选择时间'
    // },
    {
      type: 0,
      label: '发行数量',
      key: 'promoCodeCount',
      rules: setRules('发行数量').isRequired.get
    }
  ]
}

export const FORM_CONFIG2 = {
  formData: [
    {
      type: 0,
      label: '活动主标题',
      key: 'activityName',
      placeholder: '支付立减优惠码，等你来抢购',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '活动副标题',
      key: 'activitySubName',
      placeholder: '扫脸时代感恩回馈',
      rules: setRules('请输入').isRequired.get
    }
  ]
}
