<template>
  <div class="container">
    <div class="w-welcome">
      <div class="head">您好，{{ name }}</div>
      <div class="tip">今天是{{ date }}，欢迎您回到小马哥运营后台</div>
    </div>
    <!-- <detailMode :config-data="configData"></detailMode> -->
    <detailMode :config-data="configData2"></detailMode>
  </div>
</template>

<script>
import api from "@/api/api_workBench";
import detailMode from "@/components/detailMode/detailMode3.vue";
import { CONFIG_DATA_2 } from "./formConfig/workBench";
import store from "@/store"

export default {
  name: "WorkBench",
  components: { detailMode },
  data() {
    return {
      name: store.state.admin.userInfo.name,
      /* configData: {
        name: "日常应用",
        imgColor: "#1989FA",
        list: [
          {
            list: [
              {
                imgUrl: "",
                text: "待办事项",
                permission: TODO_BTN,
                path: "/work/todo"
              }
            ]
          }
        ]
      },*/
      date: ''
    };
  },
  computed: {
    todoTask: function() {
      return this.$store.state.admin.todoList;
    },
    configData2() {
      const configData2 = this.$g.utils.deepClone(CONFIG_DATA_2);
      configData2.list = configData2.list.filter(item => {
        const list = item.list.filter(btn => {
          return this.$_has(btn.permission);
        })
        if (list.length > 0) {
          return true;
        }
      })
      return configData2;
    }
  },
  mounted() {
    this.getData();
    this.date = this.getCurrentDate()
  },
  methods: {
    getCurrentDate() {
      var myDate = new Date();
      var year = myDate.getFullYear(); // 年
      var month = myDate.getMonth() + 1; // 月
      var day = myDate.getDate(); // 日
      var days = myDate.getDay();
      switch (days) {
        case 1:
          days = '星期一';
          break;
        case 2:
          days = '星期二';
          break;
        case 3:
          days = '星期三';
          break;
        case 4:
          days = '星期四';
          break;
        case 5:
          days = '星期五';
          break;
        case 6:
          days = '星期六';
          break;
        case 0:
          days = '星期日';
          break;
      }
      var str = year + "年" + month + "月" + day + "日  " + days;
      return str;
    },
    getData() {
      api
        .queryAllTaskMenu({
          receiverId: 1,
          undoType: 1,
          taskType: 1,
          status: ""
        })
        .then(res => {})
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
