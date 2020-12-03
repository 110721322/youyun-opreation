export const CONFIG_DATA = {
  baseData: {
    name: "基本信息",
    items: [
      {
        name: "商户名称",
        key: "merchantName"
      },
      {
        name: "营业执照编号",
        key: "shopLicenseNo"
      },
      {
        name: "法人姓名",
        key: "lawPerson"
      },

      {
        name: "法人手机号",
        key: "lawMobile"
      },
      {
        name: "法人身份证号",
        key: "idCardNo"
      },
      {
        name: '银行卡号',
        key: 'bankCardNo'
      },
      {
        name: '商户地址',
        key: 'merchantAddress'
      }
    ]
  },
  appealData: {
    name: "商户信息",
    items: [
      {
        name: "法人手持营业执照",
        key: "shopLicenseImg",
        type: "image"
      },
      {
        name: "法人手持身份证正面",
        key: "idCardHandImg",
        type: "image"
      },
      {
        name: "法人身份证原件正面",
        key: "idCardPortraitImg",
        type: "image"
      },
      {
        name: "手持银行卡原件正面",
        key: "bankCardImg",
        type: "image"
      },
      {
        name: "商户门店照片",
        key: "shopFaceImg",
        type: "image"
      },
      {
        name: "其他照片",
        key: "otherImg",
        type: "image"
      },
      {
        name: "商户机打指定小票照片1",
        key: "machineTicketImg1",
        type: "image"
      },
      {
        name: "商户机打指定小票照片2",
        key: "machineTicketImg2",
        type: "image"
      },
      {
        name: "商户机打指定小票照片3",
        key: "machineTicketImg3",
        type: "image"
      },
      {
        name: "视频",
        key: "video",
        type: "video"
      }
    ]
  }
}
