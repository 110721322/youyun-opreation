<template>
  <div class="main_page">
    <div class="p_head">审批任务详情</div>

    <detailMode :rule-form="ruleForm" :config-data="configData" :is-show-call-btn="true" :span-width="24">
      <template v-slot:step>
        <div class="step-box">
          <el-steps :active="2" align-center>
            <el-step v-for="(item,index) in stepData" :key="index">
              <template slot="icon">
                <div class="step-border">
                  <img
                    :src="item.img"
                    class="step-img"
                    :class="[item.isApproval?'step-imgborder':'']"
                  />
                  <i v-if="item.isCheck" class="el-icon-check step-check"></i>
                </div>
              </template>
              <template slot="title">
                <div
                  v-if="item.title"
                  class="step-title"
                  :class="[item.isApproval?'step-title_blue':item.isUndo?'step-title_gray':'step-title_normal']"
                >{{ item.title }}</div>
              </template>
              <template slot="description">
                <div v-if="item.name" class="step-description">{{ item.name }}</div>
                <div v-if="item.time" class="step-time">{{ item.time }}</div>
                <div v-if="item.note" class="step-note">{{ item.note }}</div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </template>
      <template v-slot:operatingTop>
        <span class="task-time status">
          {{ status+":" }}
          <transformTime :time="new Date(new Date().getTime()-3600*24*3*1000)"></transformTime>
        </span>
      </template>
      <template v-slot:operatingBottom>
        <div class="opearting-bottom">
          <el-button type="primary" class="btn_oper">同意</el-button>
          <el-button plain class="btn_oper btn_operno">拒绝</el-button>
        </div>
      </template>
    </detailMode>
  </div>
</template>
<script>
import detailMode from "@/components/detailMode/detailMode.vue";
import transformTime from "./components/transformTime.vue";

export default {
  name: "ApprovalDetail",
  components: {
    detailMode,
    transformTime
  },
  data() {
    return {
      stepData: [
        {
          img:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          isCheck: true,
          isApproval: false,
          isUndo: false,
          title: "发起申请",
          name: "运营: 曲丽丽",
          time: "2016-12-12 12:30",
          note: ""
        },
        {
          img:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          isCheck: true,
          isApproval: false,
          isUndo: false,
          title: "已同意",
          name: "运营主管: 曲丽丽",
          time: "2016-12-12 12:30",
          note: "没啥问题"
        },
        {
          img:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          isCheck: false,
          isApproval: true,
          isUndo: false,
          title: "审批中",
          name: "财务: 曲丽丽",
          time: "",
          note: ""
        },
        {
          img:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          isCheck: false,
          isApproval: false,
          isUndo: true,
          title: "已完成",
          name: "",
          time: "",
          note: ""
        }
      ],
      status: "任务已创建",
      ruleForm: {
        name: "1",
        name1: "2",
        name2: "3",
        name3: "4",
        email: "12312312@163.com",
        pic:
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      },
      configData: {
        name: "佣金结算通过申请",
        child: [
          {
            name: "发起人提交信息",
            modelName: "basicData",
            models: [
              {
                items: [
                  {
                    name: "服务商ID",
                    key: "name1"
                  },
                  {
                    name: "发起人备注",
                    key: "name1"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "服务商名称",
                    key: "name"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "建议结算金额",
                    key: "email"
                  }
                ]
              }
            ]
          },
          {
            name: "服务商提交信息",
            modelName: "finance",
            models: [
              {
                items: [
                  {
                    name: "发票照片",
                    key: "pic",
                    type: "img"
                  },
                  {
                    name: "备用联系方式",
                    key: "name1"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "发票快递单号",
                    key: "name"
                  },
                  {
                    name: "服务商备注",
                    key: "name3"
                  }
                ]
              },
              {
                items: [
                  {
                    name: "结算账户",
                    key: "email"
                  },
                  {
                    name: "结算金额",
                    key: "name3"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.task-time {
  float: right;
  margin-right: 32px;
  margin-top: 13px;
}
.status {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(144, 147, 153, 1);
  line-height: 22px;
}
.btn_oper {
  width: 113px;
  height: 40px;
}
.btn_operno {
  margin-left: 24px;
}
.step-box {
  padding: 56px 24px 24px;
  .step-title {
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 53, 1);
    line-height: 22px;
  }
  .step-title_normal {
    color: rgba(51, 51, 53, 1);
  }
  .step-title_blue {
    color: rgba(25, 137, 250, 1);
  }
  .step-title_gray {
    color: rgba(144, 147, 153, 1);
  }
  .step-description {
    height: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
  }
  .step-time {
    margin-top: 4px;
    height: 12px;
    font-size: 12px;
    font-family: HelveticaNeue;
    color: rgba(0, 0, 0, 0.45);
    line-height: 12px;
  }
  .step-note {
    margin: 10px auto 0;
    width: 70px;
    height: 26px;
    background: rgba(246, 246, 246, 1);
    border-radius: 4px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 26px;
  }
  .step-border {
    position: relative;
    flex-shrink: 0;
    background-color: #fff;
    width: 82px;
    height: 44px;
    text-align: center;
  }
  .step-check {
    position: absolute;
    right: 17px;
    bottom: 0;
    color: #fff;
    width: 18px;
    height: 18px;
    background: rgba(25, 137, 250, 1);
    border-radius: 50%;
    line-height: 18px;
  }
  .step-img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  .step-imgborder {
    padding: 5px;
    border: 2px solid rgba(25, 137, 250, 1);
    box-sizing: content-box;
    margin-top: -14px;
  }
}
.opearting-bottom {
  padding: 8px 0 32px;
  text-align: center;
}
</style>
