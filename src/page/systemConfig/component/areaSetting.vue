<template>
  <div>
    <DetailBox title="大区" :border="true">
      <div v-for="(item,key) of areaList" :key="key" class="area_box">
        <div class="area_box_title">
          {{ item.regionName }}
          <el-button
            type="primary"
            style="float:right;margin-top:16px"
            @click="onClick_editArea(item)"
          >编辑</el-button>
        </div>
        <div class="tag-box">
          <el-tag
            v-for="tag in item.province"
            :key="tag.value"
            closable
            :disable-transitions="false"
            @close="handleClose(item.regionCode, tag.value)"
          >{{ tag.label }}</el-tag>
          <el-select
            v-if="item.isShowSelect"
            v-model="item.addOption"
            size="small"
            @change="areaSelectConfirm($event, item)"
          >
            <el-option
              v-for="province in areaData"
              :key="province.value"
              :label="province.label"
              :value="province.value"
            ></el-option>
          </el-select>
          <el-button v-else class="button-new-tag" size="small" @click="areaSelect(item)">+ 添加城市</el-button>
        </div>
      </div>

      <el-button type="primary" class="add_area" @click="onClick_addArea">添加大区类型</el-button>
    </DetailBox>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        v-if="drawer"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
        @confirm="confirm"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import api from "@/api/api_systemConfig";
import Form from "@/components/form/index.vue";
import DetailBox from "@/components/detailMode/detailBox.vue";
import areaData from "@/assets/data/areaData";
import { FORM_CONFIG } from "../formConfig/areaSettingForm";

export default {
  name: "AreaSetting",
  components: { Form, DetailBox },
  data() {
    return {
      areaData: areaData,
      addOption: "",
      drawer: false,
      fromConfigData: {},
      activeRow: {},
      areaList: [
        {
          id: 1,
          title: "华中",
          isShowSelect: false,
          citys: ["标签一", "标签二"]
        },
        {
          id: 2,
          title: "华东",
          isShowSelect: false,
          citys: ["标签一"]
        }
      ],
      formStatus: ""
    };
  },
  mounted() {
    this.queryAllRegion();
  },
  methods: {
    confirm($ruleform) {
      switch (this.formStatus) {
        case "edit":
          api
            .update({
              regionCode: this.activeRow.regionCode,
              regionName: $ruleform.regionName
            })
            .then(res => {
              this.$message({
                type: 'success',
                message: '已修改'
              })
              this.queryAllRegion()
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;
        case "add":
          api
            .saveRegion({ regionName: $ruleform.regionName })
            .then(res => {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.queryAllRegion()
              this.drawer = false;
            })
            .catch(err => {
              this.$message(err);
            });
          break;

        default:
          break;
      }
    },
    queryAllRegion() {
      api.queryRegionProvince({}).then(res => {
        this.areaList = res.object;
        this.areaList = this.areaList.map($area => {
          $area.addOption = "";
          $area.province = $area.provinceCodes.map($code => {
            return areaData.filter($province => {
              if ($province.value === $code) {
                return $province;
              }
            }).map($province => {
              return {label: $province.label, value: $province.value};
            })[0];
          }).filter($province => {
            if ($province) {
              return $province;
            }
          })
          return $area;
        })
      });
    },
    onClick_editArea($row) {
      this.formStatus = "edit";
      this.activeRow = $row;
      this.fromConfigData = FORM_CONFIG.editData;
      this.fromConfigData.formData[0].initVal = $row.regionName;
      this.drawer = true;
    },
    onClick_addArea($row) {
      this.formStatus = "add";
      this.activeRow = $row;
      this.fromConfigData = FORM_CONFIG.addData;
      console.log('add');
      this.drawer = true;
    },
    handleClose($regionCode, $provinceCode) {
      api
        .deleteProvince({
          regionCode: $regionCode,
          provinceCode: $provinceCode
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '已删除'
          })
          this.queryAllRegion();
        })
        .catch(err => {
          this.$message(err);
        });
    },
    areaSelect($item) {
      this.$set($item, "isShowSelect", true);
      // $item.isShowSelect = true;
    },
    areaSelectConfirm($value, $item) {
      console.log($value, $item);
      const params = {
        provinceCode: $value,
        regionCode: $item.regionCode
      }
      api
        .saveRegionProvinceSet(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.queryAllRegion()
        })
        .catch(err => {
          this.$message(err);
        });
    },
    cancel() {
      this.drawer = false;
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
