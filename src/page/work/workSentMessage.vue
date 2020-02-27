<template>
  <div class="main_page">
    <div class="p_head">
      短信群发
    </div>

    <detailMode :ruleForm="ruleForm" :configData="configData"></detailMode>

  </div>
</template>

<script>
import detailMode from '@/components/detailMode/detailMode4.vue';

export default {
    name: 'Theme',
    components: { detailMode },
    data () {
        return {
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

<style scoped></style>
