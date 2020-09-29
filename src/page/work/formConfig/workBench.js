import {LOWER_AGENT_ENTRY, MERCHANT_ENTRY_AUDIT, PARTNER_ENTRY_AUDIT} from "../../../libs/data/permissionBtns";
import merchantAudit from "@/assets/img/icon_merchant_audit.png"
import nestAgentAudit from "@/assets/img/icon_nest_agent_audit.png"
import partnerAudit from "@/assets/img/icon_partner_audit.png"

export const CONFIG_DATA_2 = {
  name: "业务应用",
  hasTitle: true,
  imgColor: "#E4611B",
  list: [
    {
      title: "审核",
      list: [
        {
          imgUrl: merchantAudit,
          text: "商户入件审核",
          path: '/approval/checkMerchant/indirectList',
          permission: MERCHANT_ENTRY_AUDIT
        },
        {
          imgUrl: nestAgentAudit,
          text: "下级服务商入件审核",
          path: '/approval/checkService',
          permission: LOWER_AGENT_ENTRY
        },
        {
          imgUrl: partnerAudit,
          text: "合伙人入件审核",
          path: '/approval/checkPartner',
          permission: PARTNER_ENTRY_AUDIT
        }
      ]
    }
    // {
    //   title: "服务",
    //   list: [
    //     {
    //       imgUrl: "",
    //       text: "设备解绑",
    //       path: '/deviceManage/usageManage/usageList',
    //       permission: DEVICE_UNBIND
    //     },
    //     {
    //       imgUrl: "",
    //       text: "公告",
    //       path: "/message/serviceAnnouncementList",
    //       permission: AGENT_ANNOUNCE
    //     }
    //   ]
    // },
    // {
    //   title: "数据",
    //   list: [
    //     {
    //       imgUrl: "",
    //       text: "商户数据",
    //       path: '/merchant/list',
    //       permission: MERCHANT_DATA
    //     },
    //     {
    //       imgUrl: "",
    //       text: "服务商数据",
    //       path: '/agent/list',
    //       permission: AGENT_DATA
    //     },
    //     {
    //       imgUrl: "",
    //       text: "设备数据",
    //       path: '/deviceManage/usageManage/deviceData',
    //       permission: DEVICE_DATA
    //     }
    //   ]
    // }
  ]
}
