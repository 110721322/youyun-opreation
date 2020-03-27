<template>
  <div>
    <DetailBox title="大区" :border="true">
      <div v-for="(item,key) of areaList" :key="key" class="area_box">
        <div class="area_box_title">
          {{ item.title }}
          <el-button type="primary" style="float:right;margin-top:16px">编辑</el-button>
        </div>
        <div class="tag-box">
          <el-tag
            v-for="tag in item.dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{ tag }}</el-tag>
          <el-cascader
            v-if="item.isShowSelect"
            :options="areaDate"
            size="small"
            @change="areaSelectConfirm($event,item)"
          ></el-cascader>
          <el-button v-else class="button-new-tag" size="small" @click="areaSelect(item)">+ 添加城市</el-button>
        </div>
      </div>

      <el-button type="primary" class="add_area">添加大区类型</el-button>
    </DetailBox>

    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import Form from "@/components/form/index.vue";
import DetailBox from "@/components/detailMode/detailBox.vue";
import areaDate from "@/assets/data/areaData";

export default {
  name: "Theme",
  components: { Form, DetailBox },
  data() {
    return {
      areaDate: areaDate,
      drawer: false,
      fromConfigData: {},
      areaList: [
        {
          id: 1,
          title: "华中",
          isShowSelect: false,
          dynamicTags: ["标签一", "标签二"]
        },
        {
          id: 2,
          title: "华东",
          isShowSelect: false,
          dynamicTags: ["标签一"]
        }
      ]
    };
  },
  mounted() {},
  methods: {
    areaSelect($item) {
      $item.isShowSelect = true;
    },
    areaSelectConfirm($value, $item) {
      const options = JSON.parse(JSON.stringify(this.areaDate));
      const obj = [];
      obj[0] = options.find(item => {
        return item.value === $value[0];
      });
      obj[1] = obj[0].children.find(item => {
        return item.value === $value[1];
      });
      obj[2] = obj[1].children.find(item => {
        return item.value === $value[2];
      });
      obj.forEach(item => {
        delete item.children;
      });
      $item.dynamicTags.push(
        obj[0].label + "," + obj[1].label + "," + obj[2].label
      );
      $item.isShowSelect = false;
    },
    cancel(done) {
      done();
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
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  height: calc(100% - 48px - 76px);
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
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
  overflow: scroll;
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
