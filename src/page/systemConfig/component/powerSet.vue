
<template>
  <div>
    <div class="p_head">权限设置</div>
    <el-form ref="form" :model="form" label-width="100px" style="margin:24px">
      <el-form-item label="复制成员权限:">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div style="margin-top:16px">
          <el-button type="primary">复制</el-button>
          <el-button>重置</el-button>
        </div>
      </el-form-item>

      <el-tree
        :data="data"
        node-key="id"
        show-checkbox
        default-expand-all
        :expand-on-click-node="false"
      >
        <span slot-scope="{node,itemData}" class="custom-tree-node">
          <span>
            <img
              v-if="itemData.type=='page'"
              class="trre_icon"
              src="@/assets/img/page_icon.png"
              alt
            />
            <img
              v-if="itemData.type=='button'"
              class="trre_icon"
              src="@/assets/img/btn_icon.png"
              alt
            />
          </span>
          <span>
            <i :class="node.icon"></i>
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </el-form>
    <div class="foot_btn_box">
      <el-button type="primary" class="foot_btn">确定</el-button>
      <el-button class="foot_btn">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      data: [
        {
          id: 1,
          label: "一级 1",
          icon: "el-icon-delete",
          type: "page",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              type: "page",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                  type: "page"
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  type: "page",
                  children: [
                    {
                      id: 9,
                      label: "三级 1-1-1",
                      type: "page"
                    },
                    {
                      id: 10,
                      label: "三级 1-1-2",
                      type: "page"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          type: "page",
          children: [
            {
              id: 5,
              type: "page",
              label: "二级 2-1"
            },
            {
              id: 6,
              type: "page",
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          type: "page",
          label: "一级 3",
          children: [
            {
              id: 7,
              type: "page",
              label: "二级 3-1"
            },
            {
              id: 8,
              type: "button",
              label: "二级 3-2"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.foot_btn_box {
  width: 100%;
  height: 96px;
  border-top: 1px solid #ebeef5;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  .foot_btn {
    width: 113px;
    height: 40px;
    margin-top: 28px;
    margin-left: 12px;
    margin-right: 12px;
  }

  .form_box {
    margin: 0 59px;
  }
}
.custom-tree-node {
  font-size: 16px;
}
.trre_icon {
  width: 16px;
  height: 16px;
}
</style>
