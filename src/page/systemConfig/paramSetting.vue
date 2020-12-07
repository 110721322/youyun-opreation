<template>
  <div>
    <div class="tab-head">
      <span class="title">参数设置</span>
    </div>

    <div class="table-box" style="padding:0">
      <div class="left_box">
        <div class="tab-head">
          <span class="title">类型</span>
        </div>
        <div class="device_list">
          <div
            v-for="(item,key) of menuList"
            :key="key"
            class="device_item"
            :class="item.type == selectMenu.type?'select':''"
            @click="onClick_menuItem(item)"
          >
            <div class="device_name">{{ item.name }}</div>
            <div class="device_num"></div>
          </div>
        </div>
      </div>
      <div class="right_box">
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
    onClick_menuItem($item) {
      this.selectMenu = $item;
    }
  }
};
</script>

<style lang="scss" scoped>
.area_box {
  border-bottom: 1px solid #ebeef5;
}
.add_area {
  margin: 24px;
}
.area_box_title {
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  line-height: 24px;
  height: 64px;
  line-height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid #ebeef5;
}
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  height: calc(100% - 48px - 76px);
}
.left_box {
  width: 290px;
  background: rgba(255, 255, 255, 1);
  border-right: 1px solid #ebeef5;
  float: left;
  height: 100%;
}
.right_box {
  float: left;
  width: calc(100% - 290px - 48px);
  height: 100%;
  overflow-y: scroll;
  // margin: 24px;
  .tag-box {
    margin: 24px;
  }

  .color_item {
    width: 230px;
    margin: 24px;
    float: left;
    .color_box {
      width: 140px;
      height: 20px;
      background: rgba(245, 34, 45, 1);
      float: left;
      margin-right: 16px;
    }
    .item_text {
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 53, 1);
      line-height: 20px;
    }
  }
}
.device_list {
  margin-top: 20px;
  height: 392px;
  overflow: auto;
}
.select {
  background: rgba(236, 237, 241, 1);
}
.device_item {
  width: 100%;
  height: 48px;
  cursor: pointer;
}
.device_name {
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  line-height: 48px;
  float: left;
  margin-left: 30px;
}
.device_num {
  width: 31px;
  height: 22px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 53, 1);
  float: right;
  margin-right: 30px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
