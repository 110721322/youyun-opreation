import apiAgent from "@/api/api_coupon.js";
export const FORM_CONFIG = {
  formData: [
    {
      type: 9,
      label: '筛选时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '80px',
      span: 22
    },
    // {
    //   type: 0,
    //   label: '优惠码名称',
    //   key: 'couponName',
    //   labelWidth: '100px'
    // },
    {
      type: 10,
      inputType: 'autocomplete',
      label: '优惠码名称',
      hiddenSelect: true,
      labelWidth: '80px',
      span: 22,
      placeholder: '请输入优惠码名称',
      // valueKey: 'id',
      options: [
        {
          valueKey: 'id',
          label: '优惠码名称',
          value: 'promoCodeName',
          isAutocomplete: true,
          style: 'width:294px',
          api: apiAgent.selectByName
        }
      ]
    },
    {
      type: 1,
      label: '状态',
      key: 'state',
      style: 'width:294px',
      labelWidth: '185px',
      options: [
        {
          label: '进行中',
          value: 0
        },
        {
          label: '已结束',
          value: 1
        }
      ]
    }
  ]
}
