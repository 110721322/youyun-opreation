<template>
  <div class="main_page">
    <div class="p_head">下级服务商信息</div>

    <detailMode :rule-form="ruleForm" :config-data="configData"></detailMode>
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
        pic:
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      },
      configData: {
        name: "基本信息",
        items: [
          {
            name: "所属上级服务商",
            key: "name1",
            type: "edit"
          },
          {
            name: "账号类型",
            key: "email"
          },

          {
            name: "公司名称",
            key: "name3"
          },
          {
            name: "法人姓名",
            key: "name"
          },
          {
            name: "地区",
            key: "pic"
          },
          {
            name: "详细地址",
            key: "name"
          },
          {
            name: "邮箱",
            key: "name"
          }
        ]
      }
    };
  }
};
</script>

<style scoped></style>
