<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">待办事项</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">待处理</el-menu-item>
        <el-menu-item index="2">未结算</el-menu-item>
        <el-menu-item index="3">已结算</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
        <div style="display:flex;">
            <el-tree 
            :data="menuConfig" 
            :props="defaultProps" 
            @node-click="handleNodeClick" 
            node-key="id"
            :default-expanded-keys="[0,1]"
            class="tree"
            >
                <span class="custom-tree-node" slot-scope="{ data }">
                    <span>{{ data.label}}</span>
                    <span>{{ data.num}}</span>
                </span>
            </el-tree>
        </div>
    </transition>
  </div>
</template>

<script>

export default {
    name: 'Theme',
    components: {  },
    // components: {  dataMode, BaseCrud },

    data () {
        return {
            searchMaxHeight: '240',
            activeIndex: '1',
            configData: {},
            testData: [],
            isChangeMode: true,
            isOpen: true,
            menuConfig:[
                {
                    id:0,
                    label:"日常任务",
                    num:50,
                    children:[
                        {label: "商户结算失败",num:5},
                        {label: "商户入件审核",num:5},
                        {label: "服务商到期",num:5},
                        {label: "佣金结算",num:5},
                        {label: "预约沟通",num:5},
                        {label: "新服务商沟通",num:5},
                        {label: "客单价异常",num:5},
                        {label: "交易数据异常",num:5},
                        {label: "服务商资料补全",num:5},
                        {label: "设备订购出库",num:5},
                        {label: "工单",num:5},
                        {label: "乐刷申诉审核",num:5},
                        {label: "平台商户资料申诉审核",num:5},
                    ]
                },
                {
                    id:1,
                    label:"审批任务",
                    num:50,
                    children:[
                        {label: "运营佣金结算",num:5},
                        {label: "财务佣金结算",num:5},
                        {label: "开通服务商",num:5},
                        {label: "冻结服务商",num:5},
                        {label: "群发短信",num:5},
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    mounted () {
        this.getTableData();
    },
    methods: {
        getTableData () {
            this.testData = [
                {
                    id: '1',
                    tel: '15184318420',
                    name: '小白',
                    email: '412412@qq.com',
                    status: '1',
                    create_time: '2018-04-20',
                    expand: '扩展信息一',
                    role: ['2'],
                },
                {
                    id: '2',
                    tel: '13777369283',
                    name: '小红',
                    email: '456465@qq.com',
                    status: '0',
                    create_time: '2018-03-23',
                    expand: 'hashashashas',
                    role: ['1'],
                },
            ];
        },
        selectionChange ($val) {
            // eslint-disable-next-line no-console
            console.log($val);
        },
        go_detail () {
            // eslint-disable-next-line no-console
            this.$router.push('/agent/list/detail');
        },
        handleSelect () {
            // eslint-disable-next-line no-console
            // this.activeIndex = $item;
            // switch ($item) {
            //     case '1':
            //         this.configData = ERR_CONFIG;
            //         break;
            //     case '2':
            //         this.configData = UNEWTTLED_CONFIG;
            //         break;
            //     case '3':
            //         this.configData = SUCCESS_CONFIG;
            //         break;
            // }
            // this.isChangeMode = false;
            // setTimeout(() => {
            //     this.isChangeMode = true;
            // }, 500);
            // // 模拟获取数据
            // setTimeout(() => {
            //     this.getTableData();
            // }, 1000);
        },
        handleNodeClick () {

        },
        search ($form, $obj) {
            // eslint-disable-next-line no-console
            console.log($form, $obj);
        },
    },
};
</script>

<style scoped>
.tree {
    width:240px;
    background:rgba(255,255,255,1);
    padding: 16px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:240px;
    font-size: 14px;
  }
</style>
<style>
.el-tree-node__content {
    height:37px;
}
</style>
