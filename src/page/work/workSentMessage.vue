<template>
  <div class="main_page">
    <div class="p_head">
        短信群发
      </div>
    <div class="content-box">
      
      <div class="title">
        {{fromConfigData.title}}
      </div>

      <sendMessage 
      :formBaseData="fromConfigData.formData"
      :labelWidth ="'auto'"
      ></sendMessage>
    </div>

  </div>
</template>

<script>
import sendMessage from '@/components/form/sendMessage.vue';
import { FORM_CONFIG } from "./formConfig/sendMessage";

export default {
    name: 'Theme',
    components: { sendMessage },
    data () {
        return {
          fromConfigData:FORM_CONFIG.sendMessageData,
            configData: {
                name:"短信群发",
                models:[
                  {name:"添加标签用户",type:"select"},
                  {name:"手机号",type:"phoneNums"},
                  {name:"短信信息",type:"message"},
                ]
            },
            ruleForm:{
              tags:[
                {
                  value: 'html',
                  label: 'HTML'
                },
                {
                  value: 'css',
                  label: 'CSS'
                },
              ],
              phoneNums:"18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787； 18628900909； 13046667888； 15590908787；",
              message:"这是一个脾气特别好，也很有耐心的客户！",
            }
        };
    },
};
</script>

<style scoped>
.content-box {
  margin:24px;
  background-color:#fff;
  padding-bottom:90px;
}
.title {
    height: 54px;
    line-height: 54px;
    padding-left: 32px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
  }
</style>
