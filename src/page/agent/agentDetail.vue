<template>
  <div class="main_page">

    <div class="p_head_detail">
      <div class="top">
        <span>杭州网络科技有限公司</span>
        <el-dropdown trigger="click">
          <div class="el-dropdown-link">
            <div class="doit"></div>
            <div>
              下拉菜单 <i class="el-icon-caret-bottom el-icon--right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="tags">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          size="small"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        >
      </div>
    </div>

    <detailMode
      :ruleForm="ruleForm"
      :configData="configData"
      @edit="itemEdit"
    ></detailMode>

    <detailMode :ruleForm="ruleForm" :configData="configData"></detailMode>

    <div class="bg_box">
      <div class="title">应用</div>
      <el-row>
        <el-col :span="8" class="app">
          <img
            src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4"
            alt=""
          />
          <div>订购设备</div>
        </el-col>
        <el-col :span="8" class="app">
          <img
            src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4"
            alt=""
          />
          <div>佣金结算</div>
        </el-col>
        <el-col :span="8" class="app border_none">
          <img
            src="https://avatars1.githubusercontent.com/u/23054546?s=64&v=4"
            alt=""
          />
          <div>第三方对接</div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="9">
        <div class="bg_box" style="margin-right:0;margin-top:0;height:314px">
          <div class="title">沟通数据</div>

          <el-select
            v-model="value"
            size="medium"
            placeholder="请选择"
            style="margin:32px;width:calc(100% - 64px)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-row>
            <el-col :span="8" class="data_item" style="height:58px">
              <div class="data_item_title">客情维护</div>
              <div>55次</div>
            </el-col>
            <el-col :span="8" class="data_item" style="height:58px">
              <div class="data_item_title">客情维护</div>
              <div>55次</div>
            </el-col>
            <el-col :span="8" class="data_item border_none" style="height:58px">
              <div class="data_item_title">客情维护</div>
              <div>55次</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="bg_box" style="margin-left:0;margin-top:0;height:314px">
          <img class="title_img" src="@/assets/img/clock.png" alt="" />
          <div class="title">
            待沟通3次
            <el-button type="primary" style="float:right;margin:10px 24px"
              >添加沟通计划</el-button
            >
          </div>

          <BaseCrud
            :grid-config="tableConfigData.gridConfig"
            :grid-btn-config="tableConfigData.gridBtnConfig"
            :grid-data="testData"
            :form-config="tableConfigData.formConfig"
            :form-data="tableConfigData.formModel"
            :grid-edit-width="100"
            :tableHeight="212"
            form-title="用户"
            :is-async="false"
            style="margin:24px;border:1px solid #EBEEF5;height:212px;overflow:hidden"
          >
          </BaseCrud>
        </div>
      </el-col>
    </el-row>
    <div class="bg_box" style="height:411px;margin-top:0;">
      <div class="title">
        历史沟通记录
        <el-button type="primary" style="float:right;margin:10px 24px">
          添加沟通计划
        </el-button>
        <el-button style="float:right;margin:10px 0px">查看联系人</el-button>
      </div>

      <BaseCrud
        :grid-config="tableConfigData.gridConfig"
        :grid-btn-config="tableConfigData.gridBtnConfig"
        :grid-data="testData"
        :form-config="tableConfigData.formConfig"
        :form-data="tableConfigData.formModel"
        :grid-edit-width="100"
        :tableHeight="309"
        form-title="用户"
        :is-async="false"
        style="margin:24px;border:1px solid #EBEEF5;height:309px;overflow:hidden"
      >
      </BaseCrud>
    </div>

    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="p_head">
        {{ fromConfigData.title }}
      </div>
      <Form
        :formBaseData="fromConfigData.formData"
        :showFootBtn="fromConfigData.showFootBtn"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import Form from '@/components/form/index.vue';
import BaseCrud from '@/components/table/BaseCrud.vue';
import detailMode from '@/components/detailMode/detailMode.vue';
import { USER_CONFIG } from './tableConfig/config_communicate';
import { FORM_CONFIG } from './formConfig/agentDetail';

export default {
    name: 'Theme',
    data () {
        return {
            drawer: false,
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            configData: {
                name: '基本信息',
                child: [
                    {
                        name: '基本资料',
                        modelName: 'basicData',
                        models: [
                            {
                                items: [
                                    {
                                        name: '公司名称',
                                        key: 'name1',
                                    },
                                    {
                                        name: '法人手机号',
                                        key: 'name',
                                    },
                                ],
                            },
                            {
                                items: [
                                    {
                                        name: '邮箱',
                                        key: 'email',
                                    },
                                    {
                                        name: '营业执照图',
                                        key: 'pic',
                                        type: 'img',
                                    },
                                ],
                            },
                            {
                                items: [
                                    {
                                        name: '法人姓名',
                                        key: 'name3',
                                    },
                                    {
                                        name: '公司地址',
                                        key: 'name',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: '财务',
                        modelName: 'finance',
                        models: [
                            {
                                items: [
                                    {
                                        name: '结算卡类型',
                                        key: 'name1',
                                    },
                                    {
                                        name: '开户支行地区',
                                        key: 'name',
                                    },
                                ],
                            },
                            {
                                items: [
                                    {
                                        name: '开户名',
                                        key: 'email',
                                    },
                                    {
                                        name: '开户支行',
                                        key: 'pic',
                                        type: 'img',
                                    },
                                ],
                            },
                            {
                                items: [
                                    {
                                        name: '银行卡号',
                                        key: 'name3',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: '邮寄地址',
                        modelName: 'mailAddress',
                        models: [
                            {
                                items: [
                                    {
                                        name: '收件人',
                                        key: 'name1',
                                    },
                                    {
                                        name: '详细地址',
                                        key: 'name',
                                    },
                                ],
                            },
                            {
                                items: [
                                    {
                                        name: '手机号',
                                        key: 'email',
                                    },
                                ],
                            },
                            {
                                items: [
                                    {
                                        name: '地区',
                                        key: 'name3',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            value: '',
            options: [
                {
                    value: 1,
                    label: 'a',
                },
            ],
            testData: [],
            tableConfigData: USER_CONFIG,
            fromConfigData: [],
            ruleForm: {
                name: '1',
                name1: '2',
                name2: '3',
                name3: '4',
                email: '12312312@163.com',
                pic:
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
            },
        };
    },
    components: { detailMode, BaseCrud, Form },
    mounted () {
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
                id: '1',
                tel: '15184318420',
                name: '小白',
                email: '412412@qq.com',
                status: '1',
                create_time: '2018-04-20',
                expand: '扩展信息一',
                role: ['2'],
            },
        ];
    },
    methods: {
        handleClose (tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput () {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm () {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        selectionChange ($val) {
            // eslint-disable-next-line no-console
            console.log($val);
        },
        go_detail () {
            // eslint-disable-next-line no-console
            this.$router.push('/agent/list/detail');
        },
        itemEdit ($model) {
            this.drawer = true;
            this.fromConfigData = FORM_CONFIG[$model];
            // eslint-disable-next-line no-console
            console.log(this.fromConfigData);
        },
        cancel () {
            this.drawer = false;
        },
    },
};
</script>

<style lang="scss">
.p_head_detail {
  height: 114px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .top {
    margin: 24px 32px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    span {
      margin-right: 24px;
    }
  }
  .doit {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: red;
    float: left;
    margin-top: 5px;
    margin-right: 5px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #333335;
    width: 100px;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: top;
    height: 23px;
    line-height: 23px;
  }
  .tags {
    margin-left: 32px;
  }
  .el-input--mini .el-input__inner {
    height: 24px !important;
    line-height: 24px !important;
  }
}

.bg_box {
  margin: 24px;
  background: #fff;
  overflow: hidden;
  .title {
    height: 54px;
    line-height: 54px;
    padding-left: 32px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    border-bottom: 1px solid #ebeef5;
  }
  .title_img {
    width: 20px;
    height: 20px;
    margin: 18px 24px 0;
    float: left;
  }
}
.app {
  border-right: 1px solid #ebeef5;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 88px;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
}

.data_item {
  border-right: 1px solid #ccc;
  margin-top: 16px;
  .data_item_title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    border: none;
    text-align: center;
    margin: 3px 0 17px;
  }
  div {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
}

.border_none {
  border: none;
}
</style>
