<template>
  <div class="main_page">
    <div class="p_head">下级服务商信息</div>

    <detailMode :rule-form="ruleForm" :config-data="configData"></detailMode>
  </div>
</template>

<script>
import detailMode from "@/components/detailMode/detailMode2.vue";
import api from "@/api/api_agent.js"
export default {
  name: "Theme",
  components: { detailMode },
  data() {
    return {
      ruleForm: {
        parentAgentNo: "1",
        businessType: "2",
        name3: "3",
        lawPerson: "4",
        email: "12312312@163.com",
        area: "",
        detailAddress: ''
      },
      configData: {
        name: "基本信息",
        items: [
          {
            name: "所属上级服务商",
            key: "parentAgentNo",
            type: "edit"
          },
          {
            name: "账号类型",
            key: "businessType"
          },

          {
            name: "公司名称",
            key: "name3"
          },
          {
            name: "法人姓名",
            key: "lawPerson"
          },
          {
            name: "地区",
            key: "area"
          },
          {
            name: "详细地址",
            key: "detailAddress"
          },
          {
            name: "邮箱",
            key: "email"
          }
        ]
      }
    };
  },
  mounted() {
    this.getDeatil()
  },
  methods: {
    getDeatil() {
      api.getAgentDetail({
        agentNo: ''
      }).then(res => {
        var request = res.object;
        this.ruleForm = {
          parentAgentNo: request.parentAgentNo,
          businessType: request.businessType,
          name3: "",
          lawPerson: request.lawPerson,
          email: request.email,
          area: "",
          detailAddress: request.companyArea.detailAddress
        }
      })
    }
  }
};
</script>

<style scoped></style>
