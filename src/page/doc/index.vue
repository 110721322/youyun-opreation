<template>
  <div class="container">
    <TicketAddForm :form-item="formItem" :rule-form="ruleForm"></TicketAddForm>
  </div>
</template>

<script>
import TicketAddForm from "@/components/form/ticketAddForm"
import apiAgent from "@/api/api_ticketCenter.js";
export default {
  name: "Index",
  components: {TicketAddForm},
  data() {
    return {
      ruleForm: {
        firstId: "",
        secondId: ""
      },
      formItem: {
        type: 16,
        label: '所属模块',
        label1: '所属模块',
        label2: '所属分类',
        labelWidth: 'auto',
        span: 22,
        key1: 'firstId',
        key2: 'secondId',
        urlOptions1: {
          url: apiAgent.queryFirstClassByPage,
          keyName: 'id',
          valueName: 'menuName',
          method: 'get'
        },
        urlOptions2: {
          url: apiAgent.querySecondClassByPage,
          keyName: 'id',
          valueName: 'menuName',
          method: 'get'
        }
      }
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 50px;
  }
</style>
