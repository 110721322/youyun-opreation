import { setRules } from '@/libs/kit/formFns.js'
import apiDevice from "@/api/api_device";

export const FORM_CONFIG = {
  deviceData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备类型',
        key: 'deviceType',
        urlOptions: {
          url: apiDevice.queryAllDeviceModel,
          keyName: 'deviceId',
          valueName: 'deviceType',
          method: 'get',
          params: {
            classification: 1
          }
        }
      },
      {
        type: 0,
        label: '设备型号',
        key: 'deviceModel',
        rules: setRules('设备型号').isRequired.get
      },
      {
        type: 6,
        label: '图片',
        key: 'deviceImg',
        rules: setRules('图片').isRequired.get
      },
      {
        type: 0,
        label: '单台设备成本价',
        key: 'costPrice',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('单台设备成本价').isRequired.get
      },
      {
        type: 0,
        label: '单台设备售卖价',
        key: 'salePrice',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('单台设备售卖价').isRequired.get
      },
      {
        type: 0,
        label: '排序',
        key: 'sort',
        rules: setRules('排序').isRequired.get
      }
    ]
  },
  buyData: {
    title: '订购信息',
    showFootBtn: true,
    formData: [
      {
        type: 0,
        label: '销售人员',
        key: 'saleUserName',
        initVal: '12',
        isDisabled: true,
        rules: setRules('销售人员').isRequired.get
      },
      {
        type: 1,
        label: '设备型号',
        key: 'deviceModel',
        isDisabled: true,
        urlOptions: {
          url: apiDevice.queryAllDeviceModel,
          keyName: 'deviceId',
          valueName: 'deviceType',
          method: 'get',
          params: {
            classification: 1
          }
        }
      },
      {
        type: 0,
        label: '订购数量',
        key: 'count',
        isShowSlot: true,
        showSlotName: '台',
        rules: setRules('订购数量').isRequired.get
      },
      {
        type: 0,
        label: '订单金额',
        key: 'amount',
        isDisable: () => {
          return true;
        },
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('订单金额').isRequired.get
      },
      {
        type: 0,
        label: '实付金额',
        key: 'actualAmount',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('实付金额').isRequired.get
      },
      {
        type: 1,
        label: '购买服务商',
        key: 'agentNo',
        urlOptions: {
          url: apiDevice.finishAllAgent,
          keyName: 'agentNo',
          valueName: 'agentName',
          method: 'get'
        }
      },
      {
        type: 1,
        label: '支付方式',
        key: 'payType',
        urlOptions: {
          url: apiDevice.finishAllPrivilegeType,
          keyName: 'status',
          valueName: 'statusDesc',
          method: 'get'
        }
      },
      {
        type: 6,
        label: '打款凭证',
        key: 'voucher',
        rules: setRules('打款凭证').isRequired.get
      },
      {
        type: 0,
        label: '邮寄地址',
        key: 'buyerAddress',
        rules: setRules('邮寄地址').isRequired.get
      },
      {
        type: 0,
        label: '备注',
        key: 'buyerRemark',
        inputType: 'textarea',
        rules: setRules('备注').isRequired.get
      }
    ]
  },
  editData: {
    title: '设备',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: '设备类型',
        key: 'deviceType',
        urlOptions: {
          url: apiDevice.queryAllDeviceModel,
          keyName: 'deviceId',
          valueName: 'deviceType',
          method: 'get',
          params: {
            classification: 1
          }
        }
      },
      {
        type: 0,
        label: '设备型号',
        key: 'deviceModel',
        initVal: 'pdd',
        rules: setRules('设备型号').isRequired.get
      },
      {
        type: 6,
        label: '图片',
        key: 'deviceImg',
        rules: setRules('图片').isRequired.get
      },
      {
        type: 0,
        label: '单台设备成本价',
        key: 'costPrice',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('单台设备成本价').isRequired.get
      },
      {
        type: 0,
        label: '单台设备售卖价',
        key: 'salePrice',
        initVal: 'pdd',
        isShowSlot: true,
        showSlotName: '元',
        rules: setRules('单台设备售卖价').isRequired.get
      },
      {
        type: 0,
        label: '排序',
        key: 'sort',
        initVal: 'pdd',
        rules: setRules('排序').isRequired.get
      }
    ]
  }
}
