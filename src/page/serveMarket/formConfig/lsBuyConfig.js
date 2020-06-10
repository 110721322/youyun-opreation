// import { setRules } from '@/libs/kit/formFns.js';

export const FORM_CONFIG = {
  sendMessageData: {
    title: '公告信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '乐刷代理商ID',
        key: 'lsId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '代理商ID',
        key: 'id',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '微信公众号APPID',
        key: 'lsId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '支付宝PID',
        key: 'lsId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '交易加密key',
        key: 'lsId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '微信费率',
        key: 'lsId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '云闪付费率(单笔<=1000)',
        key: 'lsId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      },
      {
        type: 0,
        label: '云闪付费率(单笔>=1000)',
        key: 'lsId',
        initVal: '',
        inputType: "input",
        row: 1,
        style: 'width:364px',
        placeholder: '请输入'
      }
    ]
  }
};