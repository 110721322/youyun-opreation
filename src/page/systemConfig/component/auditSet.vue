
<template>
  <div>
    <div class="p_head">审批设置</div>
    <el-form ref="form" label-width="120px" style="margin: 24px;">
      <el-form-item label="复制成员权限:">
        <el-select v-model="bindEmployee" placeholder="请选择成员" @change="changeEmployee">
          <el-option
            v-for="(person,index) in employeeList"
            :key="index"
            :label="person.label"
            :value="person"
          >
          </el-option>
        </el-select>
        <div style="margin-top:16px">
          <el-button type="primary" @click="copyEmployee">复制</el-button>
          <el-button @click="resetEmployee">重置</el-button>
        </div>
      </el-form-item>
      <!-- 菜单树开始 -->
      <div class="m-tree-container">
        <el-tree
          :data="templateMapList"
          label="icon"
          node-key="checkedId"
          show-checkbox
          default-expand-all
          :default-checked-keys="checkedIds"
          :check-strictly="true"
          :expand-on-click-node="false"
          @check-change="handleCheckChange"
        >
          <span slot-scope="{node,data}" class="custom-tree-node">
            <span>
              <img v-if="data.type=='menu'" class="trre_icon" src="@/assets/img/page_icon.png" alt />
              <img v-if="data.type=='button'" class="trre_icon" src="@/assets/img/btn_icon.png" alt />
            </span>
            <span>
              <i :class="node.icon"></i>
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
      <!-- 菜单树结束 -->
    </el-form>
    <div class="foot_btn_box">
      <el-button type="primary" size="normal" @click="confirm">确定</el-button>
      <el-button size="normal" @click="cancle">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AuditSet",
  props: {
    templateList: {
      type: Array,
      default() {
        return []
      }
    },
    apiService: Function
  },
  data() {
    return {
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
      })
    },
    checkedMenus() {
      return this.checkedList.filter($ele => $ele.type === 'menu');
    },
    checkedButtons() {
      return this.checkedList.filter($ele => $ele.type === 'button');
    }
  },
  created() {
    this.checkedList = [];
    this.templateListClone = this.templateList;
    this.templateMapList = this.templateMap();
  },
  methods: {
    /**
     * 适配elment-tree组件
     */
    templateMap() {
      const that = this;
      function mapCallback($element) {
        // 添加label
        $element.label = $element.page + '-' + $element.buttonName;
        $element.type = 'button';
        $element.checkedId = $element.buttonId; // 由于菜单id与按钮id以"-"拼接父级id和当前id作为唯一识别key
        if ($element.have) { // 选出已有的权限
          that.checkedList.push($element);
        }
        return $element
      }
      return this.templateListClone.map(mapCallback)
    },
    /**
     * 选择节点发生变化触发
     * @param $data 当前选择节点数据
     * @param $checked  当前选择节点是否选中
     * @param $hasChild  子节点中是否有选中项,此处节点不做关联无需处理
     */
    handleCheckChange($data, $checked, $hasChild) {
      const checkedId = $data.checkedId;
      const checkIndex = this.checkedIds.findIndex($checkedId => $checkedId === checkedId);
      if ($checked) {
        if (checkIndex === -1) this.checkedList.push($data);
      } else {
        if (checkIndex !== -1) this.checkedList.splice(checkIndex, 1)
      }
    },
    confirm() {
      const checkedButtonIds = this.checkedButtons.map($button => {
        return {
          menuId: $button.menuId,
          buttonId: $button.buttonId
        }
      })
      this.$emit('confirm', {approvalButtons: checkedButtonIds});
    },
    cancle() {
      this.$emit('cancle');
    },
    /**
     * 切换成员
     */
    changeEmployee($option) {
      this.queryParams = {
        userId: $option.id,
        roleId: $option.roleId,
        system: 'operation'
      }
    },
    /**
     * 复制权限
     */
    copyEmployee() {
      if (this.queryParams) {
        this.apiService(this.queryParams).then(res => {
          this.checkedList = [];
          this.templateListClone = res.datas;
          this.templateMapList = this.templateMap();
        })
      }
    },
    /**
     * 重置
     */
    resetEmployee() {
      this.bindEmployee = null;
      this.queryParams = null;
      this.checkedList = [];
      this.templateListClone = this.templateList;
      this.templateMapList = this.templateMap();
    }
  }
};
</script>
<style lang="scss" scoped>
.foot_btn_box {
  width: 500px;
  border-top: 1px solid #ebeef5;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 16px 0;
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
.m-tree-container{
  width: 100%;
  // height: 622px;
  overflow-y: scroll;
}
.trre_icon {
  width: 16px;
  height: 16px;
}
</style>
