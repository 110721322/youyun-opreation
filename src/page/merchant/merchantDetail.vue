<template>
  <div class="main_page">
    <div class="p_head">商户详情</div>

    <detailMode :rule-form="ruleForm" :config-data="configData" :is-show-edit-btn="true"></detailMode>
    <detailMode :rule-form="ruleForm" :config-data="configData2"></detailMode>
  </div>
</template>

<script>
import api from "@/api/api_merchant";
import detailMode from "@/components/detailMode/detailMode2.vue";

export default {
  name: "Theme",
  components: { detailMode },
  data() {
    return {
      ruleForm: {
        name: "1",
        name1: "2",
        name2: "3",
        name3: "4",
        email: "12312312@163.com",
        pic: "123123"
      },
      configData: {
        name: "业务信息",
        items: [
          {
            name: "乐刷商户号",
            key: "merchantName"
          },
          {
            name: "新大陆商户号",
            key: "merchantNo"
          },
          {
            name: "支付宝通道",
            key: "name"
          },
          {
            name: "支付后第三方广告",
            key: "advertStatus"
          },
          {
            name: "开通会员",
            key: "memberStatus"
          },
          {
            name: "所属服务商",
            key: "agentName"
          },
          {
            name: "微信通道",
            key: "name"
          },
          {
            name: "云闪付通道",
            key: "pic"
          }
        ]
      },
      configData2: {
        name: "基本信息",
        items: [
          {
            name: "公司名称",
            key: "name1"
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
            name: "登陆账号",
            key: "loginAccount"
          },
          {
            name: "登陆密码",
            key: "password"
          },
          {
            name: "地址",
            key: "address"
          },
          {
            name: "营业执照编号",
            key: "name"
          },
          {
            name: "营业执照图",
            key: "shopLicenseImg",
            type: "image"
          },
          {
            name: "备注",
            key: "name",
            type: "edit"
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
        .getDetailByMerchantNo({ merchantNo: "" })
        .then(res => {
          this.ruleForm = res.object;
          console.log(res);
        })
        .catch();
    }
  }
};
</script>

<style scoped></style>
