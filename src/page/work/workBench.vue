<template>
  <div class="main_page">
    <div class="w-welcome">
      <div class="head">您好，小柒</div>
      <div class="tip">今天是2019年08月08日 星期四，欢迎您回到小马哥运营后台</div>
    </div>
    <detailMode :config-data="configData"></detailMode>
    <detailMode :config-data="configData2"></detailMode>
  </div>
</template>

<script>
import api from "@/api/api_workBench";
import detailMode from "@/components/detailMode/detailMode3.vue";
import { TODO_BTN, MERCHANT_ENTRY_AUDIT, LOWER_AGENT_ENTRY,
  PARTNER_ENTRY_AUDIT, AGENT_COMMISSION_SETTLE, DEVICE_UNBIND,
  AGENT_ANNOUNCE, MERCHANT_DATA, AGENT_DATA,
  DEVICE_DATA } from "../../libs/data/permissionBtns";
// import search from '@/components/search/search.vue';
// import BaseCrud from '@/components/table/BaseCrud.vue';
// import { USER_CONFIG } from './tableConfig/merchantConfig';

export default {
  name: "Theme",
  components: { detailMode },
  data() {
    return {
      configData: {
        name: "日常应用",
        imgColor: "#1989FA",
        list: [
          {
            list: [
              {
                imgUrl: "",
                dotNum: 5,
                text: "待办事项",
                permission: TODO_BTN,
                path: "/work/todo"
              }
            ]
          }
        ]
      },
      configData2: {
        name: "业务应用",
        hasTitle: true,
        imgColor: "#E4611B",
        list: [
          {
            title: "审核",
            list: [
              {
                imgUrl: "",
                text: "商户入件审核",
                permission: MERCHANT_ENTRY_AUDIT
              },
              {
                imgUrl: "",
                text: "下级服务商入件审核",
                permission: LOWER_AGENT_ENTRY
              },
              {
                imgUrl: "",
                text: "合伙人入件审核",
                permission: PARTNER_ENTRY_AUDIT
              },
              {
                imgUrl: "",
                text: "服务商佣金结算",
                permission: AGENT_COMMISSION_SETTLE
              }
            ]
          },
          {
            title: "服务",
            list: [
              {
                imgUrl: "",
                text: "设备解绑",
                permission: DEVICE_UNBIND
              },
              {
                imgUrl: "",
                text: "公告",
                path: "/message/serviceAnnouncementList",
                permission: AGENT_ANNOUNCE
              },
              {
                imgUrl: "",
                text: "短信群发",
                path: "/work/sentMessage"
              }
            ]
          },
          {
            title: "数据",
            list: [
              {
                imgUrl: "",
                text: "商户数据",
                permission: MERCHANT_DATA
              },
              {
                imgUrl: "",
                text: "服务商数据",
                permission: AGENT_DATA
              },
              {
                imgUrl: "",
                text: "设备数据",
                permission: DEVICE_DATA
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api
        .queryAllTaskMenu({
          receiverId: 1,
          undoType: 1,
          taskType: 1,
          status: ""
        })
        .then(res => {
          console.log(res);
        })
        .catch();
    }
  }
};
</script>

<style lang="scss" scoped>
.w-welcome {
  width: 100%;
  height: 140px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .head {
    margin: 48px 0 0 24px;
    width: 100%;
    height: 32px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(53, 64, 82, 1);
    line-height: 32px;
  }
  .tip {
    margin: 8px 0 0 24px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(144, 147, 153, 1);
    line-height: 20px;
  }
}
</style>
