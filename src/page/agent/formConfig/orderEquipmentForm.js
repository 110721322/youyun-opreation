import equipmentApi from "@/api/api_device";
import store from "@/store"
import { setRules } from '@/libs/kit/formFns.js'
export const ORDER_EQUIPMENT = {
  title: '订购信息',
  formData: [
    {
      type: 'show',
      label: '营销人员',
      initVal: store.state.admin.userInfo.name,
      labelWidth: '100px'
    },
    {
      type: 1,
      label: '设备型号',
      labelWidth: '100px',
      key: 'deviceId',
      urlOptions: {
        url: equipmentApi.queryAllDeviceModel,
        keyName: 'deviceId',
        valueName: 'deviceModel',
        method: 'get',
        params: {
          classification: 1
        }
      },
      callback($ruleForm, $option) {
        $ruleForm['deviceModel'] = $option.deviceModel;
      },
      rules: setRules('设备型号').isSelected.get
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
      label: '支付方式',
      key: 'payType',
      urlOptions: {
        url: equipmentApi.finishAllPrivilegeType,
        keyName: 'status',
        valueName: 'statusDesc',
        method: 'get'
      }
    },
    {
      type: 6,
      label: '打款凭证',
      key: 'voucher',
      maxNum: 1,
      rules: setRules('打款凭证').isRequired.get
    },
    {
      type: 0,
      label: '邮寄地址',
      key: 'buyerAddress',
      initVal: '',
      rules: setRules('邮寄地址').isRequired.get
    },
    {
      type: 0,
      label: '备注',
      key: 'buyerRemark',
      inputType: 'textarea',
      rules: setRules('备注').isRequired.get
    },
    {
      type: 0,
      label: '设备型号名称',
      key: 'deviceModel',
      initVal: '',
      isDisabled: true,
      isShow() {
        return false
      }
    }
  ]
}
