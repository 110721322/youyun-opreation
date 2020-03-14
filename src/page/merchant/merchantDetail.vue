<template>
  <div class="main_page">
    <div class="p_head">商户详情</div>

    <detailMode :rule-form="ruleForm" :config-data="configData" :is-show-edit-btn="true"></detailMode>
    <detailMode :rule-form="ruleForm2" :config-data="configData2"></detailMode>
  </div>
</template>

<script>
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
            key: "name1"
          },
          {
            name: "新大陆商户号",
            key: "email"
          },
          {
            name: "支付宝通道",
            key: "name"
          },
          {
            name: "支付后第三方广告",
            key: "name"
          },
          {
            name: "开通会员",
            key: "pic"
          },
          {
            name: "所属服务商",
            key: "name"
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
      ruleForm2: {
        name: "1",
        name1: "2",
        name2: "3",
        name3: "4",
        email: "12312312@163.com",
        pic:
          "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
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
            key: "email"
          },
          {
            name: "法人手机号",
            key: "name3"
          },
          {
            name: "登陆账号",
            key: "name"
          },
          {
            name: "登陆密码",
            key: "name"
          },
          {
            name: "地址",
            key: "name"
          },
          {
            name: "营业执照编号",
            key: "name"
          },
          {
            name: "营业执照图",
            key: "pic",
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
  }
};
</script>

<style scoped></style>
