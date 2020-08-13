import { setRules } from '@/libs/kit/formFns.js'
import api from "@/api/api_merchant"

export const CONTACTS_CONFIG = {
  title: '添加备注',
  showFootBtn: true,
  footBtnLabel: "确定",
  formData: [
    {
      type: 0,
      label: '备注',
      key: 'remark',
      inputType: 'textarea',
      maxlength: '150',
      rules: setRules('请输入').isRequired.get
    }
  ],
  changeData: [
    {
      type: 1,
      label: '所属服务商',
      key: 'agentNo',
      rules: setRules('请输入').isRequired.get,
      urlOptions: {
        url: api.selectAgent,
        keyName: 'agentNo',
        valueName: 'agentName',
        method: 'get',
        params: {}
      }
    }
  ]
}
