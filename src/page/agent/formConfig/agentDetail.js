import { setRules } from '@/libs/kit/formFns.js';

export const FORM_CONFIG = {
    basicData: {
        title: '基本信息',
        showFootBtn: true,
        formData: [
            {
                type: 5,
                label: '户口性质',
                key: 'adressType',
                initVal: 0,
                options: [
                    {
                        label: '农村',
                        value: 0,
                    },
                    {
                        label: '城市',
                        value: 1,
                    },
                ],
            },
            {
                type: 0,
                label: '邮箱',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('邮箱').isRequired.get,
            },
            {
                type: 0,
                label: '公司名称',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('公司名称').isRequired.get,
            },
            {
                type: 0,
                label: '公司地址',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('公司地址').isRequired.get,
            },
            {
                type: 0,
                label: '法人姓名',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('法人姓名').isRequired.get,
            },
            {
                type: 0,
                label: '法人手机号',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('法人手机号').isRequired.get,
            },
            {
                type: 0,
                label: '营业执照',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('营业执照').isRequired.get,
            },
        ],
    },
    finance: {
        title: '财务信息',
        showFootBtn: true,
        formData: [
            {
                type: 0,
                label: '开户名',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('开户名').isRequired.get,
            },
            {
                type: 0,
                label: '银行卡号',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('银行卡号').isRequired.get,
            },
            {
                type: 0,
                label: '开户支行地区',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('开户支行地区').isRequired.get,
            },
            {
                type: 0,
                label: '开户支行',
                key: 'name',
                initVal: 'pdd',
                rules: setRules('开户支行').isRequired.get,
            },
        ],
    },
};
