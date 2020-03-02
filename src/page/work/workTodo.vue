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
        <el-menu-item index="2">已处理</el-menu-item>
        <el-menu-item index="3">已发起</el-menu-item>
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
            :indent="0"
            class="tree"
            >
                <span class="custom-tree-node" slot-scope="{ data }">
                    <span>{{ data.label}}</span>
                    <span>{{ data.num}}</span>
                </span>
            </el-tree>
            <div class="content-box">
                <div class="form-box">
                <el-form class="form">
                    <el-form-item label="精准筛选：" label-width="100px">
                        <el-input
                        placeholder="请输入内容"
                        class="input-with-select"
                        size="large"
                        v-model="inputForm"
                        >
                            <el-select
                                slot="prepend"
                                v-model="inputSelect"
                                style="width:184px"
                                placeholder="请选择"
                            >
                                <el-option
                                v-for="(item, key) in inputOptions"
                                :key="key"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-input>
                <div class="btn_list" style="margin-bottom:0">
                    <el-button
                    type="primary"
                    size="large"
                    @click="onClick_search"
                    >
                    搜索</el-button
                    >
                    <el-button plain size="large" @click="onClick_reset">重置</el-button>
                    <el-button plain size="large" @click="onClick_toCheckAll" class="btn_checkall" v-if="canCheckAll">批量沟通</el-button>
                </div>
                </el-form-item>
                </el-form>
                <div>
                    <!-- <taskList
                    :listData="taskListConfig.dailyListData"
                    :type="taskListConfig.dailyType"
                    :cssConfig ="taskListConfig.dailyCssConfig"
                    >
                    </taskList> -->
                    
                    <!-- <taskList
                    :listData="taskListConfig.approvalListData"
                    :type="taskListConfig.approvalType"
                    :cssConfig ="taskListConfig.approvalCssConfig"
                    >
                    </taskList> -->
                    
                    <!-- <taskList
                    :listData="taskListConfig.handleListData"
                    :type="taskListConfig.handleType"
                    :cssConfig ="taskListConfig.dailyCssConfig"
                    >
                    </taskList> -->

                    <!-- <taskList
                    :listData="taskListConfig.handleListData"
                    :type="taskListConfig.handleType"
                    :cssConfig ="taskListConfig.approvalCssConfig"
                    >
                    </taskList> -->

                    <taskList
                    :listData="configData.listData"
                    :type="configData.type"
                    :cssConfig ="configData.cssConfig"
                    :isCheck = "isCheck"
                    @handleCheckList="handleCheckList"
                    :isCheckAll = "isCheckAll"
                    >
                    </taskList>
                </div>
            </div>
            
            <div class="check-bottom" v-if="isCheck">
                <span class="confim_text">请选择要批量沟通的任务（已选 {{checkedListLength}} 个任务）</span> 
                <el-button plain class="confim_btn">
                    确定
                </el-button>
                <span class="cancel_btn" @click="onClick_cancelCheckAll">取消</span> 
                <span class="checkall_btn" @click="onClick_doCheckAll">全选</span> 
            </div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import taskList from "./components/taskList.vue"
import { TASKLIST_CONFIG } from "./tableConfig/taskListConfig"


export default {
    name: 'WorkToDo',
    components: { taskList },
    // components: {  dataMode, BaseCrud },
    
    data () {
        return {
            checkList:[],
            checkedListLength:0,
            activeIndex: '1',
            configData: {
                listData : TASKLIST_CONFIG.dailyListData,
                type : TASKLIST_CONFIG.dailyType,
                cssConfig : TASKLIST_CONFIG.dailyCssConfig
            },
            testData: [],
            isChangeMode: true,
            inputForm:"",
            inputSelect:"",
            taskListConfig:TASKLIST_CONFIG,
            isCheck: false,
            isCheckAll: false,
            canCheckAll: true,
            inputOptions: [
                {
                    label: '公司名称',
                    value: 'companyName',
                },
                {
                    label: '法人姓名',
                    value: 'name',
                },
                {
                    label: '法人手机号',
                    value: 'phone',
                },
            ],
            menuConfig:[
                {
                    id:0,
                    label:"日常任务",
                    num:50,
                    children:[
                        {label: "商户结算失败",num:5,type:'daily'},
                        {label: "商户入件审核",num:5,type:'daily'},
                        {label: "服务商到期",num:5,type:'daily'},
                        {label: "佣金结算",num:5,type:'daily'},
                        {label: "预约沟通",num:5,type:'daily'},
                        {label: "新服务商沟通",num:5,type:'daily'},
                        {label: "客单价异常",num:5,type:'daily'},
                        {label: "交易数据异常",num:5,type:'daily'},
                        {label: "服务商资料补全",num:5,type:'daily'},
                        {label: "设备订购出库",num:5,type:'daily'},
                        {label: "工单",num:5,type:'daily'},
                        {label: "乐刷申诉审核",num:5,type:'daily'},
                        {label: "平台商户资料申诉审核",num:5,type:'daily'},
                    ]
                },
                {
                    id:1,
                    label:"审批任务",
                    num:50,
                    children:[
                        {label: "运营佣金结算",num:5,type:'approval'},
                        {label: "财务佣金结算",num:5,type:'approval'},
                        {label: "开通服务商",num:5,type:'approval'},
                        {label: "冻结服务商",num:5,type:'approval'},
                        {label: "群发短信",num:5,type:'approval'},
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
        onClick_doCheckAll(){
            this.isCheckAll = true;
        },
        handleCheckList($data){
            this.checkList = $data;
            this.checkedListLength = 0;
            // eslint-disable-next-line no-console
            console.log(this.checkList);
            for(var i =0; i<=this.checkList.length;i++){
                if(this.checkList[i]===true){
                    this.checkedListLength++;
                }
            }
        },
        onClick_reset() {

        },
        onClick_toCheckAll() {
            this.isCheck = true;
        },
        onClick_cancelCheckAll() {
            this.isCheck = false;
        },
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
        onClick_search() {

        },
        handleSelect ($item) {
            this.activeIndex = $item;
            switch ($item) {
                case '1':
                    this.configData.listData = TASKLIST_CONFIG.dailyListData;
                    this.configData.type = TASKLIST_CONFIG.dailyType;
                    this.configData.cssConfig = TASKLIST_CONFIG.dailyCssConfig;
                    this.canCheckAll = true;
                    break;
                case '2':
                    this.configData.listData = TASKLIST_CONFIG.handleListData;
                    this.configData.type = TASKLIST_CONFIG.handleType;
                    this.configData.cssConfig = TASKLIST_CONFIG.approvalCssConfig;
                    this.canCheckAll = false;
                    break;
                case '3':
                    break;
            }
            this.isChangeMode = false;
            setTimeout(() => {
                this.isChangeMode = true;
            }, 500);
            // 模拟获取数据
            setTimeout(() => {
                this.getTableData();
            }, 1000);
        },
        handleNodeClick ($data) {
            if($data.type==="daily"){
                this.configData.listData = TASKLIST_CONFIG.dailyListData;
                this.configData.type = TASKLIST_CONFIG.dailyType;
                this.configData.cssConfig = TASKLIST_CONFIG.dailyCssConfig;
                this.canCheckAll = true;
            }else if($data.type==="approval"){
                this.configData.listData = TASKLIST_CONFIG.approvalListData;
                this.configData.type = TASKLIST_CONFIG.approvalType;
                this.configData.cssConfig = TASKLIST_CONFIG.approvalCssConfig;
                this.canCheckAll = false;
            }
        },
        search ($form, $obj) {
            // eslint-disable-next-line no-console
            console.log($form, $obj);
        },
    },
};
</script>

<style scoped>
.btn_list {
    margin-left: 24px;
    display: inline-block;
}
.input-with-select {
  width: 490px;
}
.tree {
    width:240px;
    background:rgba(255,255,255,1);
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:240px;
    font-size: 14px;
    padding: 0 16px;
  }
  .form {
    width: calc(100% + 50px);
    min-width:992px;
    height:88px;
    background:rgba(255,255,255,1);
    padding:24px;
  }
  .content-box {
      position:relative;
  }
  .form-box {
      padding:24px;
  }
  .check-bottom {
    position:absolute;
    width:100%;
    height:60px;
    background:rgba(22,138,255,1);
    bottom:0;
    padding:14px 0;
  }
  .btn_checkall {
    margin-left: 71px;
  }
  .confim_text {
    margin-left: 236px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:20px;
    opacity:0.8;
  }
  .confim_btn {
      margin-left: 33px;
      width:85px;
      height:32px;
  }
  .cancel_btn {
    margin-left: 32px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(247,248,250,1);
    line-height:22px;
    opacity:0.8;
  }
  .checkall_btn {
    margin-left: 220px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(247,248,250,1);
    line-height:22px;
    opacity:0.8;
  }
</style>

<style>
.el-tree-node__content {
    height: 37px;
}
</style>
