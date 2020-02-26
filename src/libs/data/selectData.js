const selectData = {
    passageway: [
        {
            value: 'leShua',
            label: '新大陆',
            text: '新大陆',
        },
        {
            value: 'newLand',
            label: '乐刷',
            text: '乐刷',
        },
        {
            value: 'direct',
            label: '直连',
            text: '直连',
        },
    ],
    paySource: [
        {
            value: 'shopCodeCard',
            label: '门店码牌',
            text: '门店码牌',
        },
        {
            value: 'APP',
            label: 'APP收款',
            text: 'APP收款',
        },
        {
            value: 'POSS',
            label: 'POS收款',
            text: 'POS收款',
        },
        {
            value: 'cashierPlugin',
            label: '收银插件',
            text: '收银插件',
        },
        {
            value: 'cashierHardware',
            label: '收银硬件',
            text: '收银硬件',
        },
        {
            value: 'miniProgram',
            label: '小程序',
            text: '小程序',
        },
        {
            value: 'dockingInterface',
            label: '对接接口',
            text: '对接接口',
        },
        {
            value: 'others',
            label: '其他',
            text: '其他',
        },
    ],
    payState: [
        {
            value: 'unpaid',
            label: '未支付',
            text: '未支付',
        },
        {
            value: 'payClosed',
            label: '交易关闭',
            text: '交易关闭',
        },
        {
            value: 'paid',
            label: '支付成功',
            text: '支付成功',
        },
        {
            value: 'refund',
            label: '已退款',
            text: '已退款',
        },
    ],
    refundStatus: [
        {
            value: 'refundFail',
            label: '退款失败',
            text: '退款失败',
        },
        {
            value: 'refundSuccess',
            label: '退款成功',
            text: '退款成功',
        },
    ],
    payType: [
        {
            value: 'wechat',
            label: '微信',
            text: '微信',
        },
        {
            value: 'alipay',
            label: '支付宝',
            text: '支付宝',
        },
        {
            value: 'unionPay',
            label: '银联',
            text: '银联',
        },
        {
            value: 'cloudPay',
            label: '云闪付',
            text: '云闪付',
        },
        {
            value: 'others',
            label: '其他',
            text: '其他',
        },
    ],
    settleType: [
        {
            value: 'wechatOfficialSettle',
            label: '微信官方结算',
            text: '微信官方结算',
        },
        {
            value: 'alipayOfficialSettle',
            label: '支付宝官方结算',
            text: '支付宝官方结算',
        },
        {
            value: 'thirdPartySettle',
            label: '第三方结算',
            text: '第三方结算',
        },
    ],
    settleStatus: [
        {
            value: 'unknown',
            label: '未知',
            text: '未知',
        },
        {
            value: 'noSettle',
            label: '未结算',
            text: '未结算',
        },
        {
            value: 'finishSettle',
            label: '已结算',
            text: '已结算',
        },
        {
            value: 'settleFail',
            label: '结算失败',
            text: '结算失败',
        },
    ],
};
export default selectData;
