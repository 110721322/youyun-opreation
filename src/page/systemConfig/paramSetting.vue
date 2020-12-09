<template>
  <div>
    <div class="tab-head">
      <span class="title">参数设置</span>
    </div>

    <div class="table-box">
      <div class="left-box">
        <div class="tab-head">
          <span class="title">类型</span>
        </div>
        <div class="device-list">
          <div
            v-for="(item,key) of menuList"
            :key="key"
            class="device-item"
            :class="item.type == selectMenu.type?'select':''"
            @click="clickMenuItem(item)"
          >
            <div class="device-name">{{ item.name }}</div>
            <div class="device-num"></div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div v-if="selectMenu.type == 'area'">
          <AreaSetting></AreaSetting>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AreaSetting from "./component/areaSetting.vue";

export default {
  name: "ParamSetting",
  components: { AreaSetting },
  data() {
    return {
      menuList: [
        // {
        //   name: "待办事项",
        //   type: "todoList"
        // },
        {
          name: "大区",
          type: "area"
        }
      ],
      selectMenu: {}
    };
  },
  mounted() {
    this.selectMenu = this.menuList[0];
  },
  methods: {
    clickMenuItem($item) {
      this.selectMenu = $item;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 0 0;
  overflow: hidden;
  background: #fff;
  height: calc(100% - 48px - 76px);
}

.left-box {
  width: 290px;
  background: rgba(255, 255, 255, 1);
  border-right: 1px solid #ebeef5;
  float: left;
  height: 100%;
}

.right-box {
  float: left;
  width: calc(100% - 290px - 48px);
  height: 100%;
  overflow-y: scroll;

  .tag-box {
    margin: 24px;
  }
}

.device-list {
  margin-top: 20px;
  height: 392px;
  overflow: auto;
}

.select {
  background: rgba(236, 237, 241, 1);
}

.device-item {
  width: 100%;
  height: 48px;
  cursor: pointer;
}

.device-name {
  float: left;
  margin-left: 30px;
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  line-height: 48px;
}

.device-num {
  float: right;
  margin-right: 30px;
  width: 31px;
  height: 22px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
}

.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
