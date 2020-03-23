<template>
  <div class>
    <div class="tab_head">
      <span class="title">乐刷风控详情</span>
    </div>

    <transition name="fade">
      <div>
        <el-alert
          v-if="showComponents.showRejectTitle"
          class="detail-alert"
          :title="rejectTitle"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
        <detailMode
          :img-width="4"
          :rule-form="ruleForm.baseData"
          :config-data="configData.baseData"
          :current-type="currentType"
        >
          <template v-slot="{ currentType }">
            <div class="current-type">
              <template v-if="currentType === 'pass'">
                <img :src="passImg" alt />
              </template>
              <template v-if="currentType === 'checking'">
                <img :src="approvalImg" alt />
              </template>
              <template v-if="currentType === 'reject'">
                <img :src="refuseImg" alt />
              </template>
            </div>
          </template>
        </detailMode>
        <detailMode
          :img-width="4"
          :rule-form="ruleForm.appealData"
          :config-data="configData.appealData"
        ></detailMode>
        <div class="table_box">
          <div class="title">审核记录</div>
          <div v-for="(item,index) in appealData" :key="index" class="item">
            <div class="time">{{ item.time }}</div>
            <div class="channel">{{ item.channel }}</div>
            <div class="status">
              <span class="dot" :class="item.dotName"></span>
              {{ item.status }}
            </div>
            <div class="reason">{{ item.reason?'原因：' + item.reason:"" }}</div>
          </div>
        </div>
        <div v-if="showComponents.showOperBtns" class="btn-box">
          <div class="btn_download" @click="onClick_download">
            <i class="el-icon-download"></i>打包下载
          </div>
          <div class="btn_pass" @click="onClick_sign">资料已全部检查并提交申诉</div>
          <div class="btn-reject" @click="onClick_reject">驳回</div>
        </div>
        <div v-if="showComponents.showDownload" class="btn-box">
          <div class="btn_download" @click="onClick_download">
            <i class="el-icon-download"></i>打包下载
          </div>
        </div>
      </div>
    </transition>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        :foot-btn-label="'确定'"
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import passImg from "@/assets/img/pass.png";
import refuseImg from "@/assets/img/refuse.png";
import approvalImg from "@/assets/img/approval.png";
import detailMode from "@/components/detailMode/detailMode2.vue";
import Form from "@/components/form/index.vue";
import { FORM_CONFIG } from "../formConfig/leRiskListDetailConfig";

export default {
  name: "LeRiskListDetail",
  components: { detailMode, Form },

  data() {
    return {
      passImg: passImg,
      refuseImg: refuseImg,
      approvalImg: approvalImg,
      isAlrealyDownload: false,
      fromConfigData: {},
      drawer: false,
      rejectTitle: "驳回原因：商户名称与营业执照不符合",
      showComponents: {
        showRejectTitle: false,
        showOperBtns: false,
        showDownload: false
      },
      // pass通过 preApproval预审核 checking审核中 reject驳回
      currentType: "",
      ruleForm: {
        baseData: {
          merName: "329438980213098094",
          address: "浙江省杭州市西湖区黄姑山路工专路交叉路口",
          kind: "餐饮类",
          peopleName: "金柒柒",
          phone: "18409098920",
          idCard: "3310281995009208899"
        },
        appealData: {
          pic:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic2:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic3:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic4:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic5:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic6:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic7:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic8:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          pic9:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          video:
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        }
      },
      configData: {
        baseData: {
          name: "基本信息",
          items: [
            {
              name: "商户ID",
              key: "merName"
            },
            {
              name: "商户名称",
              key: "address"
            },
            {
              name: "乐刷商户号",
              key: "kind"
            },
            {
              name: "所属服务商ID",
              key: "peopleName"
            },

            {
              name: "所属服务商名称",
              key: "phone"
            },
            {
              name: "商户经营情况",
              key: "idCard"
            }
          ]
        },
        appealData: {
          name: "商户信息",
          items: [
            {
              name: "法人手持营业执照",
              key: "pic",
              type: "image"
            },
            {
              name: "法人手持身份证正面",
              key: "pic2",
              type: "image"
            },
            {
              name: "法人身份证原件正面",
              key: "pic3",
              type: "image"
            },
            {
              name: "手持银行卡原件正面",
              key: "pic4",
              type: "image"
            },
            {
              name: "商户门店照片",
              key: "pic5",
              type: "image"
            },
            {
              name: "其他照片",
              key: "pic6",
              type: "image"
            },
            {
              name: "商户机打指定小票照片1",
              key: "pic7",
              type: "image"
            },
            {
              name: "商户机打指定小票照片2",
              key: "pic8",
              type: "image"
            },
            {
              name: "商户机打指定小票照片3",
              key: "pic9",
              type: "image"
            },
            {
              name: "视频",
              key: "video",
              type: "video"
            }
          ]
        }
      },
      testData: [],
      appealData: [
        {
          time: "AAAAAA",
          channel: "AAAAAA",
          status: "AAAAAA",
          dotName: "pass"
        },
        {
          time: "AAAAAA",
          channel: "AAAAAA",
          status: "AAAAAA",
          reason: "AAAAAA",
          dotName: "unused"
        }
      ]
    };
  },
  watch: {
    currentType: function($val) {
      switch ($val) {
        case "pass":
          this.$set(this.showComponents, "showDownload", true);
          break;
        case "preApproval":
          this.$set(this.showComponents, "showOperBtns", true);
          break;
        case "checking":
          this.$set(this.showComponents, "showDownload", true);
          break;
        case "reject":
          this.$set(this.showComponents, "showDownload", true);
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.currentType = "pass";
  },
  methods: {
    handleEdit($ruleForm) {
      console.log($ruleForm);
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.detailEdit;
    },
    onClick_sign() {
      if (!this.isAlrealyDownload) {
        this.$confirm(
          "未打包下载资料，确定已提交资料到支付宝开发平台了吗?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    onClick_download() {
      this.isAlrealyDownload = true;
      // 然后下载操作
    },
    cancel(done) {
      done();
    },
    onClick_reject() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.rejectData;
    },
    getTableData() {
      this.testData = [
        {
          id: 0,
          type: "设备品牌",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          amount: "222.22",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          reason: "银行卡账号错误，服务商无法联系"
        },
        {
          id: 1,
          type: "设备型号",
          taskName: "商户结算失败",
          num: "4",
          oper: "提醒",
          name: "XXXX店铺",
          time: "20:00:23",
          image:
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          amount: "222.22",
          reason: "银行卡账号错误，服务商无法联系"
        }
      ];
    },
    onClick_edit($item) {
      $item.edit = true;
    },
    onClick_okEdit($item) {
      $item.edit = false;
    },
    onClick_cancelEdit($item) {
      $item.edit = false;
    },
    getHeadClass() {
      return "background:#EFEFEF";
    }
  }
};
</script>

<style lang="scss" scoped>
.current-type {
  position: absolute;
  top: -25px;
  right: 0;
  img {
    width: 75px;
    height: 75px;
  }
}
.btn-box {
  display: flex;
  justify-content: center;
  text-align: center;
  .btn_download {
    font-size: 14px;
    font-weight: 400;
    color: #1989fa;
    line-height: 40px;
    letter-spacing: 1px;
  }
  .btn_pass {
    margin-left: 60px;
    width: 205px;
    height: 40px;
    background: #1989fa;
    border-radius: 4px;
    line-height: 40px;
    color: #ffffff;
  }
  .btn-reject {
    width: 113px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(199, 200, 205, 1);
    line-height: 40px;
    color: #606266;
    margin-left: 24px;
  }
}
.table_box {
  position: relative;
  margin: 24px;
  overflow: hidden;
  background: #fff;
  padding-bottom: 80px;
  .title {
    line-height: 64px;
    padding-left: 32px;
    border-bottom: 1px solid #ebeef5;
    font-size: 16px;
    color: #333335;
  }
  .item {
    display: flex;
    justify-content: space-between;
    line-height: 72px;
    padding: 0 24px;
    border-bottom: 1px solid #ebeef5;
    .time {
      width: 25%;
      color: #606266;
    }
    .channel {
      width: 25%;
      color: #606266;
    }
    .status {
      width: 25%;
      color: #979797;
    }
    .reason {
      width: 25%;
      color: #f5222d;
    }
  }
}
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
.detail-alert {
  margin: 24px;
  padding: 9px 24px;
  background-color: #ffe8e9;
  border: 1px solid #ff7f85;
  color: #f5222d;
  width: auto;
}
</style>
