import { setRules } from '@/libs/kit/formFns.js';

export const FORM_CONFIG1 = {
  formData: [
    {
      type: 0,
      label: '优惠码名称',
      key: 'couponName',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '优惠码面值',
      key: 'couponPrice',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 3,
      label: '领取截止时间',
      key: 'endTime',
      rules: setRules('请选择').isRequired.get
    },
    {
      type: 11,
      label: '使用有效期',
      key: 'legalPhone',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '领取后有效天数',
      key: 'day'
    },
    {
      type: 0,
      label: '发行数量',
      key: 'num',
      rules: setRules('请输入').isRequired.get
    }
  ]
}

export const FORM_CONFIG2 = {
  formData: [
    {
      type: 0,
      label: '活动主标题',
      key: 'title',
      placeholder: '支付立减优惠码，等你来抢购',
      rules: setRules('请输入').isRequired.get
    },
    {
      type: 0,
      label: '活动副标题',
      key: 'subTitle',
      placeholder: '扫脸时代感恩回馈',
      rules: setRules('请输入').isRequired.get
    }
  ]
}
