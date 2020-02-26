<template>
  <div class="crud">
    <!--crud头部，包含可操作按钮-->

    <!--crud主体内容区，展示表格内容-->
    <el-table
      :data="showGridData"
      v-loading="listLoading"
      style="width: 100%;font-size:14px"
      @selection-change="handleSelectionChange"
      :height="tableHeight"
    >
      <el-table-column v-if="isSelect" type="selection" width="55">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in gridConfig"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :min-width="item.width ? item.width : ''"
        :fixed="item.isFixed||false"
      >
        <template slot-scope="scope">
          <Cell
            v-if="item.render"
            :row="scope.row"
            :column="item"
            :index="scope.$index"
            :render="item.render"
          ></Cell>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        v-if="!hideEditArea"
        label="操作"
        :width="gridEditWidth ? gridEditWidth : 200"
      >
        <template slot-scope="scope">
          <el-button
            size="medium"
            v-if="gridBtnConfig.update"
            type="primary"
            @click="createOrUpdate(scope.row)"
            >修改
          </el-button>
          <el-button
            size="medium"
            v-if="gridBtnConfig.delete"
            type="danger"
            @click="remove(scope.row)"
            >删除</el-button
          >
          <el-button
            size="medium"
            v-if="gridBtnConfig.view"
            type="primary"
            @click="view(scope.row)"
            >查看</el-button
          >
          <!--扩展按钮-->
          <span :key="index" v-for="(item, index) in gridBtnConfig.expands">
            <span v-if="isShowFun(item, scope)">
              <el-button
                size="medium"
                @click="handleEmit(item.emitName, scope.row)"
                :style="item.style"
                :type="item.type ? item.type : 'primary'"
              >
                {{ item.name }}
              </el-button>
              <span
                style="color:#EBEEF5;margin:0 3px"
                v-if="index !== gridBtnConfig.expands.length - 1"
                >|</span
              >
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
        size='medium'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal"
      >
      </el-pagination>
    </div>


  </div>
</template>

<script>
import Cell from './expand';

export default {
    name: 'base-crud',
    components: {
        Cell,
    },
    props: [
    // 表单标题，例如用户、角色
        'formTitle',
        // 表单配置
        'formConfig',
        // 表单的model数据
        'formData',
        // 表格配置
        'gridConfig',
        // 表格按钮配置
        'gridBtnConfig',
        // 表格死数据
        'gridData',
        // 数据接口
        'apiService',
        // 判断是否是异步数据
        'isAsync',
        //  表格编辑区域宽度
        'gridEditWidth',
        //  是否隐藏表格操作
        'hideEditArea',
        //  是否可进行选择
        'isSelect',
        //  设置表高度（是否固定表头）
        'tableHeight',
    ],
    data () {
        return {
            // 新增修改模态框title
            dialogTitle: '',
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
            listLoading: false,
        };
    },
    mounted () {
        this.getData();
    },
    methods: {
    // 获取列表数据
        getData () {
            this.listLoading = true;
            // let params = {
            //   page: this.currentPage,
            //   limit: this.currentPageSize
            // }

            this.showGridData = [];
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
        handleEmit (emitName, row) {
            this.$emit(emitName, row);
        },
        handleCurrentChange (page) {
            this.currentPage = page;
            this.getData();
        },
        handleSizeChange (size) {
            this.currentPageSize = size;
            this.getData();
        },
        // 模态框数据提交
        dialogSubmit (data) {
            this.apiService[data.userId ? 'update' : 'create'](data).then(() => {
                this.getData();
                this.$message.success(this.dialogTitle + '成功！');
            });
        },
        isShowFun ($row, $scope) {
            if ($row.isShow) {
                return $row.isShow($scope.row);
            } else {
                return true;
            }
        },
        handleSelectionChange (val) {
            this.$emit('selectionChange', val);
        },
    },
    watch: {
    // 防止表格预置数据不成功，涉及生命周期问题
        gridData () {
            this.showGridData = this.gridData;
        },
    },
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
</style>
