<template>
  <div class="crud">
    <!--crud头部，包含可操作按钮-->

    <!--crud主体内容区，展示表格内容-->
    <el-table
      :ref="refName"
      v-loading="listLoading"
      :data="showGridData"
      style="width: 100%;font-size:14px"
      :height="tableHeight"
      :border="border"
      :row-key="rowKey"
      :default-expand-all="defaultExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="headerCellStyle"
      :expand-row-keys="expands"
      @selection-change="handleSelectionChange"
      @sort-change="sortDate"
    >
      <el-table-column v-if="isSelect" type="selection" width="55" />
      <el-table-column
        v-if="isExpand"
        type="expand"
        :class-name="hideExpendColumn?'hide-expand-icon':''"
        :width="hideExpendColumn?1:55"
      >
        <template slot-scope="scope">
          <slot :row="scope.row" />
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in gridConfig"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :min-width="item.width ? item.width : ''"
        :fixed="item.isFixed || false"
        :sortable="item.sortable"
      >
        <template slot-scope="scope">
          <i v-if="item.hasIcon" class="el-icon-caret-top icon-increase"></i>
          <Cell
            v-if="item.render"
            :row="scope.row"
            :column="item"
            :index="scope.$index"
            :render="item.render"
          />
          <span v-else>
            <template v-if="scope.row.edit&&item.isEdit">
              <el-input v-model="scope.row[item.prop]" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="medium"
                type="text"
                @click="cancelEdit(scope.row)"
              >取消</el-button>
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
            <template v-if="item.hasImg">
              <img
                :src="item.imgUrl"
                :style="item.imgStyle"
                @click="onClick_handleToggle(scope.row)"
              />
            </template>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!hideEditArea"
        fixed="right"
        label="操作"
        :width="gridEditWidth ? gridEditWidth : 200"
      >
        <template slot-scope="scope">
          <el-button
            v-if="gridBtnConfig.update"
            size="medium"
            type="primary"
            @click="createOrUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-if="gridBtnConfig.delete"
            size="medium"
            type="danger"
            @click="remove(scope.row)"
          >删除</el-button>
          <el-button
            v-if="gridBtnConfig.view"
            size="medium"
            type="primary"
            @click="view(scope.row)"
          >查看</el-button>
          <!--扩展按钮-->
          <span v-for="(item, index) in gridBtnConfig.expands" :key="index">
            <span v-if="isShowFun(item, scope)">
              <el-button
                size="medium"
                :style="item.style"
                :type="item.type ? item.type : 'primary'"
                @click="handleEmit(item.emitName, scope.row)"
              >{{ item.name }}</el-button>
              <span
                v-if="index !== gridBtnConfig.expands.length - 1"
                style="color:#EBEEF5;margin:0 3px"
              >|</span>
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!--crud的分页组件-->
    <div class="crud-pagination">
      <!--如果不是异步请求展示数据，需要隐藏分页-->
      <el-pagination
        v-if="isAsync"
        size="medium"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Cell from "./expand";

export default {
  name: "BaseCrud",
  components: {
    Cell
  },
  props: [
    // 表单标题，例如用户、角色
    "formTitle",
    // 表单配置
    "formConfig",
    // 表单的model数据
    "formData",
    // 表格配置
    "gridConfig",
    // 表格按钮配置
    "gridBtnConfig",
    // 表格死数据
    "gridData",
    // 数据接口
    "apiService",
    // 判断是否是异步数据
    "isAsync",
    //  表格编辑区域宽度
    "gridEditWidth",
    //  是否隐藏表格操作
    "hideEditArea",
    //  是否可进行选择
    "isSelect",
    //  设置表高度（是否固定表头）
    "tableHeight",
    // 表 格是否可以展开
    "isExpand",
    // 表 格子项拓展
    "rowKey",
    // 表 格子项默认是否全部展开
    "defaultExpandAll",
    "headerCellStyle",
    "border",
    "expands",
    "refName",
    "hideExpendColumn"
  ],
  data() {
    return {
      // 新增修改模态框title
      dialogTitle: "",
      // 展示的表格数据，数据来源可能是父组件传递的固定数据，可能是接口请求数据
      showGridData: [],
      // 当前页码
      currentPage: 1,
      // 每页显示数量
      currentPageSize: 10,
      // 列表数据总数
      dataTotal: 0,
      // 表单数据
      formModel: {},
      //  表格加载状态
      listLoading: false
    };
  },

  watch: {
    // 防止表格预置数据不成功，涉及生命周期问题
    gridData() {
      this.showGridData = this.gridData;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    onClick_handleToggle($row) {
      if (this.$refs[this.refName]) {
        this.$refs[this.refName].toggleRowExpansion($row);
      }
    },
    sortDate: function(val) {
      if (undefined === this.showGridData || this.showGridData.length === 0) {
        return;
      }
      const list = JSON.parse(JSON.stringify(this.showGridData));
      const isDesc = val.order === "descending";
      const key = val.prop;
      const pattPerc = /^\d+%$/;
      this.showGridData = list.sort(function(a, b) {
        var dateA = a[key];
        var dateB = b[key];
        var aIsPerc = pattPerc.test(dateA);
        var bIsPerc = pattPerc.test(dateA);
        if (aIsPerc) {
          dateA = dateA.replace("%", "");
        }
        if (bIsPerc) {
          dateB = dateB.replace("%", "");
        }
        if (isDesc) {
          return Number(dateA) <= Number(dateB) ? 1 : -1;
        } else {
          return Number(dateA) >= Number(dateB) ? 1 : -1;
        }
      });
    },
    // 获取列表数据
    getData() {
      this.listLoading = true;
      // let params = {
      //   page: this.currentPage,
      //   limit: this.currentPageSize
      // }

      this.showGridData = [];
      this.showGridData = this.gridData;
      this.dataTotal = 0;
      this.listLoading = false;
      // this.apiService.list(params).then(
      //   res => {
      //     this.showGridData = res.data.list
      //     this.dataTotal = res.data.total
      //     this.listLoading = false
      //   },
      //   err => {
      //     this.listLoading = false
      //   }
      // )
    },

    // 处理相应父组件的事件方法
    handleEmit(emitName, row) {
      this.$emit(emitName, row);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getData();
    },
    handleSizeChange(size) {
      this.currentPageSize = size;
      this.getData();
    },
    // 模态框数据提交
    dialogSubmit(data) {
      this.apiService[data.userId ? "update" : "create"](data).then(() => {
        this.getData();
        this.$message.success(this.dialogTitle + "成功！");
      });
    },
    isShowFun($row, $scope) {
      if ($row.isShow) {
        return $row.isShow($scope.row);
      } else {
        return true;
      }
    },
    handleSelectionChange(val) {
      this.$emit("selectionChange", val);
    },
    cancelEdit($item) {
      $item.edit = false;
      this.$emit("cancelEdit", $item);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.crud {
  .crud-header {
    margin-bottom: 10px;
    line-height: 40px;
  }

  .crud-pagination {
    text-align: right;
    margin-top: 25px;
  }
}
.icon-increase {
  color: #3abd2d;
  margin-right: 8px;
}
.edit-input {
  width: 200px;
}
.cancel-btn {
  margin-left: 20px;
  color: #efa911;
}

.crud .el-table__row .el-table__expand-column .cell {
  display: none;
}
//dot为通道状态乐刷新大陆网商前面小点
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #52c41a;
  vertical-align: middle;
  margin: 0 5px;
  &.opened {
    background-color: #52c41a;
  }
  &.review {
    background-color: #ffc620;
  }
  &.reject {
    background-color: #f5222d;
  }
  &.unused {
    background-color: #9c9c9c;
  }
}
</style>
<style>
.hide-expand-icon .el-table__expand-icon {
  visibility: hidden;
}
</style>
