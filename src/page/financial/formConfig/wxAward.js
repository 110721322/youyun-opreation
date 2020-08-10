export const WXMSRARD_CONFIG = {
  formData: [
    {
      type: 11,
      label: '奖励核算时间',
      key: 'date',
      class: 'max-width',
      labelWidth: '100px',
      style: 'width:294px',
      datatype: 'date',
      format: 'yyyy-MM-dd'
    },
    {
      type: 'uploadFile',
      label: '上传文件',
      key: 'excil',
      dateurl: "excel/wx_reward.xls"
    }
  ]
}
