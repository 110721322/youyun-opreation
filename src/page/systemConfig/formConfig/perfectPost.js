import { setRules } from '@/libs/kit/formFns.js'

export const FORM_CONFIG = {
  editData: {
    title: '完善岗位信息',
    showFootBtn: true,
    formData: [
      {
        type: 1,
        label: "直属上级",
        key: "superiorId",
        initVal: "",
        rules: setRules("直属上级", 1).isSelected.get
      },
      {
        type: 1,
        label: "职位",
        key: "positionId",
        initVal: ""
      }
    ]
  }
}
