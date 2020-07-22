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
      ruleForm: {},
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
            key: "agentName"
          },
          {
            name: "法人姓名",
            key: "personName"
          },
          {
            name: '法人手机号',
            key: 'personMobile'
          },
          {
            name: "地区",
            key: "area"
          },
          {
            name: "详细地址",
            key: "companyAddress"
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
    const agentNo = this.$route.query.agentNo
    this.getDeatil(agentNo)
  },
  methods: {
    getDeatil(agentNo) {
      api.subAgentDetail({
        agentNo: agentNo
      }).then(res => {
        var request = res.object;
        this.ruleForm = {
          agentName: request.agentName,
          personName: request.personName,
          personMobile: request.personMobile,
          parentAgentNo: request.parentAgentNo,
          businessType: request.businessType,
          email: request.email,
          companyAddress: request.companyAddress
        }
      })
    }
  }
};
</script>

<style scoped></style>
