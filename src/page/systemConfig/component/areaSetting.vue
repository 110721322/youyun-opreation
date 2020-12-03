<template>
  <div>
    <DetailBox title="大区" :border="true">
      <div v-for="(item,key) of areaList" :key="key" class="area-box">
        <div class="area-box-title">
          {{ item.regionName }}
          <el-button
            type="primary"
            style="float: right; margin-top: 16px;"
            @click="clickEditArea(item)"
          >编辑</el-button>
        </div>
        <div class="tag-box">
          <el-tag
            v-for="tag in item.province"
            :key="tag.value"
            closable
            :disable-transitions="false"
            @close="clickClose(item.regionCode, tag.value)"
          >{{ tag.label }}</el-tag>
          <el-select
            v-if="item.isShowSelect"
            v-model="item.addOption"
            style="margin-left: 15px;"
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
          <el-button class="button-new-tag" size="small" @click="areaSelect(item)">+ 添加城市</el-button>
        </div>
      </div>

      <el-button type="primary" class="add-area" @click="clickAddArea">添加大区类型</el-button>
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
          break;

        default:
          break;
      }
    },
    queryAllRegion() {
      api.queryRegionProvince({}).then(res => {
        this.areaList = res.data;
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

    clickEditArea($row) {
      this.formStatus = "edit";
      this.activeRow = $row;
      this.fromConfigData = FORM_CONFIG.editData;
      this.fromConfigData.formData[0].initVal = $row.regionName;
      this.drawer = true;
    },

    clickAddArea($row) {
      this.formStatus = "add";
      this.activeRow = $row;
      this.fromConfigData = FORM_CONFIG.addData;
      this.drawer = true;
    },

    clickClose($regionCode, $provinceCode) {
      api.deleteProvince({
        regionCode: $regionCode,
        provinceCode: $provinceCode
      }).then(res => {
        this.$message({
          type: 'success',
          message: '已删除'
        })
        this.queryAllRegion();
      })
    },

    areaSelect($item) {
      this.$set($item, "isShowSelect", true);
      // $item.isShowSelect = true;
    },

    areaSelectConfirm($value, $item) {
      const params = {
        provinceCode: $value,
        regionCode: $item.regionCode
      }
      api.saveRegionProvinceSet(params).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.queryAllRegion()
        }
      }).catch(err => {
        console.log(err)
        $item.addOption = ''
      });
    },
    cancel() {
      this.drawer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.area-box {
  border-bottom: 1px solid #ebeef5;
}

.add-area {
  margin: 24px;
}

.area-box-title {
  padding: 0 32px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 53, 1);
  height: 64px;
  line-height: 64px;
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
}

.form-box {
  display: flex;
  justify-content: space-between;
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
  overflow: scroll;

  .tag-box {
    margin: 24px;
  }

  .color-item {
    float: left;
    width: 230px;
    margin: 24px;

    .color-box {
      float: left;
      margin-right: 16px;
      width: 140px;
      height: 20px;
      background: rgba(245, 34, 45, 1);
    }

    .item-text {
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 53, 1);
      line-height: 20px;
    }
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

.button-new-tag {
  margin-left: 10px;
  padding-top: 0;
  padding-bottom: 0;
  height: 32px;
  line-height: 30px;
}

.input-new-tag {
  margin-left: 10px;
  width: 90px;
  vertical-align: bottom;
}
</style>
