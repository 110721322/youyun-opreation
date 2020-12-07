<template>
  <div class="RoleMenuSet">
    <div class="p-head">编辑权限</div>
    <div class="m-tree-container">
      <el-tree
        ref="tree"
        :data="templateList"
        show-checkbox
        node-key="id"
        :check-strictly="true"
        :default-checked-keys="checkedIds"
        :props="defaultProps"
        default-expand-all
        style="margin: 24px;"
        @check="handleCurrentChange"
      ></el-tree>
    </div>
    <div class="foot_btn_box">
      <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="checkAllChange">全选</el-checkbox>
      <div class="btn-list">
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
      allCheckOption: [],
      checkAll: false,
      checkedList: [] // 已选中的权限
    }
  },
  computed: {
    checkedIds() {
      return this.checkedList.map($ele => {
        return $ele.id
      })
    },
    indeterminate() {
      if (this.checkedList.length === 0) {
        return false;
      } else if (this.checkedList.length === this.allCheckOption.length) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    checkedList() {
      if (this.indeterminate || this.checkedList.length === 0) {
        this.checkAll = false;
      } else {
        this.checkAll = true;
      }
    }
  },
  mounted() {
    this.filterChckedMenu();
    this.allCheckOption = this.$g.utils.getNestedArr(this.templateList, 'childrenMenus')
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
     * @param $currentNode  当前已选节点
     */
    handleCurrentChange($data, $currentNode) {
      if ($currentNode.checkedKeys.indexOf($data.id) === -1) { // 不选中
        const filterList = this.$g.utils.getNestedArr($data.childrenMenus, 'childrenMenus').map(item => { return item.id })
        this.checkedList = $currentNode.checkedNodes.filter(item => filterList.indexOf(item.id) === -1)
      } else { // 选中
        const addList = this.$g.utils.getNestedArr($data.childrenMenus, 'childrenMenus')
        let parentNodes = this.$g.utils.filterNestedArr3(this.$g.utils.deepClone(this.templateList), 'childrenMenus', filterParent)
        parentNodes = this.$g.utils.getNestedArr(parentNodes, 'childrenMenus')
        this.checkedList = this.checkedList.concat(addList).concat(parentNodes)
      }
      let checkedIds = this.checkedList.map(item => {
        return item.id
      });
      checkedIds = Array.from(new Set(checkedIds));
      this.checkedList = checkedIds.map(item => {
        return this.checkedList.filter(ele => ele.id === item)[0]
      })
      this.$refs.tree.setCheckedKeys(this.checkedIds)

      function filterParent($item) {
        if ($item.id === $data.id) {
          return true;
        }
      }
    },
    checkAllChange() {
      if (this.indeterminate || this.checkAll) {
        this.checkedList = this.allCheckOption;
      } else {
        this.$refs.tree.setCheckedKeys([]);
        this.checkedList = []
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
    height: calc(100vh - 172px);
    overflow: auto;
    overflow-y: scroll;
  }
  .foot_btn_box {
    width: 100%;
    padding-left: 32px;
    border-top: 1px solid #ebeef5;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    .btn-list {
      display: flex;
      height: 96px;
      margin-left: 64px;
      flex-direction: row;
      align-content: center;
      .foot_btn {
        height: 40px;
        padding: 0 20px;
        margin-top: 28px;
        margin-right: 16px;
        margin-left: 0;
      }
      .foot_btn:last-child {
        margin-right: 0;
      }
    }
    .el-checkbox {
      display: block;
    }
    .form_box {
      margin: 0 59px;
    }
  }
}
</style>
