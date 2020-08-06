// import { setRules } from '@/libs/kit/formFns.js';

export const FORM_CONFIG = {
  sendMessageData: {
    title: '公告信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '乐刷代理商ID',
        key: '0',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '代理商ID',
        key: 'channelAgentId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '微信公众号APPID',
        key: '1',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '支付宝PID',
        key: 'alipayRate',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '交易加密key',
        key: '3',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '微信费率',
        key: 'wechatPayRate',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '云闪付费率(单笔<=1000)',
        key: 'cloudPayLe1000Rate',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '云闪付费率(单笔>=1000)',
        key: 'cloudPayGt1000Rate',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      }
    ]
  }
};
