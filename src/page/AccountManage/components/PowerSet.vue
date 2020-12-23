<template>
  <div class="content-drawer">
    <yun-form
        class="m-form"
        ref="roleForm"
        :show-foot-btn="false"
        :form-base-data="formConfig"
    ></yun-form>
    <!-- 菜单树开始 -->
    <div class="m-tree-container">
      <el-checkbox
          class="f-fz-14"
          style="margin-bottom: 4px"
          v-model="checkAll"
          :indeterminate="indeterminate"
          @change="changeAll"
      >全部模块</el-checkbox>
      <el-tree
          ref="tree"
          :data="templateMapList"
          label="icon"
          node-key="checkedId"
          show-checkbox
          default-expand-all
          :default-checked-keys="checkedIds"
          :check-strictly="true"
          @check="handleCurrentChange"
      >
        <span slot-scope="{node,data}" class="custom-tree-node">
          <span>
            <img class="trre-icon" src="@/assets/img/icon_page.png" alt="icon"/>
          </span>
          <span>
            <i :class="node.icon"></i>
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 菜单树结束 -->
  </div>
</template>
<script>
  export default {
    name: "PowerSet",
    props: {
      templateList: {
        type: Array,
        default() {
          return []
        }
      },
      formConfig: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        allCheckOption: [],
        checkAll: false,
        bindEmployee: null,
        queryParams: null,
        checkedList: [],
        templateListClone: [],
        templateMapList: [],
        employeeList: this.$store.state.system.employeeList // 成员列表
      };
    },
    computed: {
      checkedIds() {
        return this.checkedList.map($ele => {
          return $ele.checkedId
        });
      },
      checkedMenus() {
        return this.checkedList.filter($ele => $ele.type === 'menu');
      },
      checkedButtons() {
        return this.checkedList.filter($ele => $ele.type === 'button');
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
        if (this.checkedList.length === this.allCheckOption.length) {
          this.checkAll = true
        }
      }
    },
    created() {
      this.checkedList = [];
      this.templateListClone = this.$g.utils.deepClone(this.templateList);
      this.templateMapList = this.templateMap();
      this.allCheckOption = this.$g.utils.getNestedArr(this.templateMapList, 'children')
    },
    methods: {
      templateMap() {
        const that = this;

        //  映射模板列表的回调函数,处理逻辑部分，将模板列表映射为elemment-tree规范的数组高维数组
        function mapCallback($element) {
          // 拼接按钮列表和菜单列表
          let childrenMenus = [];
          let systemButtons = [];
          that.$g.utils.isArr($element.childrenMenus) ? childrenMenus = $element.childrenMenus : [];
          that.$g.utils.isArr($element.systemButtons) ? systemButtons = $element.systemButtons : [];
          $element.children = childrenMenus.concat(systemButtons);
          // 添加label，区分菜单和按钮
          if ($element.menuName) {
            $element.label = $element.menuName;
            $element.type = 'menu';
            $element.checkedId = $element.parentMenuId + '-' + $element.id; // 由于菜单id与按钮id以"-"拼接父级id和当前id作为唯一识别key
          } else if ($element.buttonName) {
            $element.label = $element.buttonName;
            $element.type = 'button';
            $element.checkedId = $element.menuId + '-' + $element.id; // 由于菜单id与按钮id以"-"拼接父级id和当前id作为唯一识别key
          } else {
            $element.label = ""
          }
          if ($element.have) { // 选出已有的权限
            that.checkedList.push($element);
          }
          return $element
        }

        return that.$g.utils.mapNestedArr(this.templateListClone, 'children', mapCallback)
      },

      /**
       * 选择节点发生变化触发
       * @param $data 当前选择节点数据
       * @param $currentNode  当前已选节点
       */
      handleCurrentChange($data, $currentNode) {
        if ($currentNode.checkedKeys.indexOf($data.checkedId) === -1) { // 不选中
          const filterList = this.$g.utils.getNestedArr($data.children, 'children').map(item => {
            return item.checkedId
          })
          this.checkedList = $currentNode.checkedNodes.filter(item => filterList.indexOf(item.checkedId) === -1)
        } else { // 选中
          const addList = this.$g.utils.getNestedArr($data.children, 'children')
          let parentNodes = this.$g.utils.filterNestedArr3(this.$g.utils.deepClone(this.templateMapList), 'children', filterParent)
          parentNodes = this.$g.utils.getNestedArr(parentNodes, 'children')
          this.checkedList = this.checkedList.concat(addList).concat(parentNodes)
        }
        let checkedIds = this.checkedList.map(item => {
          return item.checkedId
        });
        checkedIds = Array.from(new Set(checkedIds));
        this.checkedList = checkedIds.map(item => {
          return this.checkedList.filter(ele => ele.checkedId === item)[0]
        })
        this.$refs.tree.setCheckedKeys(this.checkedIds)

        function filterParent($item) {
          if ($item.checkedId === $data.checkedId) {
            return true;
          }
        }
      },

      changeAll() {
        if (this.indeterminate || this.checkAll) {
          this.checkedList = this.allCheckOption;
        } else {
          this.$refs.tree.setCheckedKeys([]);
          this.checkedList = []
        }
      },

      clickConfirm() {
        const ruleForm = this.$refs.roleForm.clickFootBtn();
        if (!ruleForm) {
          this.$message('请完善信息');
          return false
        }
        const checkedButtonIds = this.checkedButtons.map($button => {
          return {
            menuId: $button.menuId,
            buttonId: $button.id
          }
        })
        const checkedMenuIds = this.checkedMenus.map($menu => {
          return $menu.id;
        });
        if (checkedMenuIds.length === 0) {
          this.$message('请勾选角色权限');
          return false
        }
        const result = {
          buttons: checkedButtonIds,
          menuIds: checkedMenuIds,
          ruleForm: ruleForm
        };
        this.$emit('confirm', result);
        return result
      }
    }
  };
</script>
<style lang="scss" scoped>
  .m-form {
    margin: 24px 20px 0;
    border-bottom: 1px solid #EBEEF5;
  }

  .foot-btn-box {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    border-top: 1px solid #ebeef5;
    width: 100%;

    .btn-list {
      display: flex;
      margin-left: 64px;
      flex-direction: row;
      align-content: center;
      height: 96px;

      .foot-btn {
        padding: 0 20px;
        margin-top: 28px;
        margin-right: 16px;
        margin-left: 0;
        height: 40px;
      }

      .foot-btn:last-child {
        margin-right: 0;
      }
    }

    .el-checkbox {
      display: block;
    }

    .form-box {
      margin: 0 59px;
    }
  }

  .custom-tree-node {
    font-size: 14px;
  }

  .m-tree-container {
    height: 420px;
    margin: 24px 40px;
    overflow-y: auto;

    /deep/ .el-tree-node__content {
      margin: 4px 0;
    }
  }

  .trre-icon {
    width: 16px;
    height: 16px;
  }
</style>
