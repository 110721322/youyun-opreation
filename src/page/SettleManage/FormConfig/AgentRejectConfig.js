export const REJECT_CONFIG = {
  formData: [
    {
      type: 0,
      label: '备注',
      labelWidth: '60px',
      inputType: 'textarea',
      key: 'remark',
      rules: [
        { required: true, message: '请输入驳回原因', trigger: 'blur' }
      ]
    }
  ],
  showSubmit: false,
  showFootBtn: false
}