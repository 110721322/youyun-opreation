<template>
  <div class="RoleMenuSet">
    <div class="p_head">小程序角色权限</div>
    <div class="m-tree-container">
      <el-tree
        :data="templateList"
        show-checkbox
        node-key="id"
        :check-strictly="true"
        :default-checked-keys="checkedIds"
        :props="defaultProps"
        default-expand-all
        style="margin: 24px;"
        @check-change="handleCheckChange"
      ></el-tree>
      <div class="foot_btn_box">
        <el-button type="primary" class="foot_btn" @click="confirm">确定</el-button>
        <el-button class="foot_btn" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleMenuSet",
  props: {
    templateList: { // 权限模板
      type: Array,
      default() {
        return []
      }
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "label"
        }
      }
    }
  },
  data() {
    return {
      checkedList: [] // 已选中的权限
    }
  },
  computed: {
    checkedIds() {
      return this.checkedList.map($ele => {
        return $ele.id
      })
    }
  },
  mounted() {
    this.filterChckedMenu();
  },
  methods: {
    /**
     * 筛选已有权限的按钮
     */
    filterChckedMenu() {
      const that = this;
      function mapCallback($element) {
        if ($element.have) { // 选出已有的权限
          that.checkedList.push($element);
        }
        return $element
      }
      return that.$g.utils.mapNestedArr(this.templateList, 'childrenMenus', mapCallback)
    },
    /**
     * 选择节点发生变化触发
     * @param $data 当前选择节点数据
     * @param $checked  当前选择节点是否选中
     * @param $hasChild  子节点中是否有选中项,此处节点不做关联无需处理
     */
    handleCheckChange($data, $checked, $hasChild) {
      const id = $data.id;
      const checkIndex = this.checkedIds.findIndex($checkedId => $checkedId === id);
      if ($checked) {
        if (checkIndex === -1) this.checkedList.push($data);
      } else {
        if (checkIndex !== -1) this.checkedList.splice(checkIndex, 1)
      }
    },
    confirm() {
      this.$emit('confirm', this.checkedIds, this.checkedList)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.RoleMenuSet {
  .m-tree-container {
    width: 100%;
    height: 700px;
    overflow-y: scroll;
  }
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
}
</style>
