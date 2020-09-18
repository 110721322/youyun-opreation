<template>
  <div>
    <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
    />
    <!-- <data-mode></data-mode> -->
    <div class="table_box">
      <div class="add-btn">
        <button @click="onClick_add">创建优惠码</button>
      </div>
      <BaseCrud
          ref="child"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="300"
          form-title="用户"
          :is-async="true"
          :is-select="false"
          :params="params"
          :api-service="api"
          @extension="extension"
          @detail="goDetail"
          @stopAcitive="stopAcitive"
      />
    </div>
    <el-dialog
        title="领取优惠码"
        :visible.sync="dialogVisible"
        width="420px"
        height="394px"
        :before-close="handleClose"
    >
      <div class="dialog_code">
        <img :src="couponForm.ossUrl" alt="">
      </div>
      <div class="option-btn">
        <div class="copy-btn" @click="copyActiveCode($event,couponForm.shortUrl )">
          <img src="../../assets/img/copy_icon.png" alt="">
          <div>复制链接</div>
        </div>
        <span></span>
        <div class="down-btn" @click="downloadCodeImg">
          <img src="../../assets/img/down_icon.png" alt="">
          <div>点击下载</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getsPromoCode">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import api from "@/api/api_coupon.js"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/couponConfig";
import { FORM_CONFIG } from "./formConfig/couponSearch";
import Clipboard from "clipboard";
export default {
  name: "Coupon",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "320",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      params: {
        activityBeginTime: this.$g.utils.getToday(),
        activityEndTime: this.$g.utils.getToday(),
        currentPage: 0,
        id: '',
        // pageSize: '',
        state: ''
      },
      api: api.promoCodeQueryByPage,
      dialogVisible: false,
      couponForm: {}
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    search($ruleForm) {
      console.log(11111)
      const params = {
        activityBeginTime: $ruleForm.date ? $ruleForm.date[0] : null,
        activityEndTime: $ruleForm.date ? $ruleForm.date[1] : null,
        state: $ruleForm.state,
        id: $ruleForm.inputForm ? $ruleForm.inputForm : null
      };
      this.params = params;
    },
    extension($row) {
      api.queryQrCodeDetail({
        qrCodeNo: $row.qrCodeNo
      }).then(res => {
        if (res.object) {
          this.dialogVisible = true
          this.couponForm = res.object
        }
      })
    },
    handleClose() {
      this.couponForm = {}
      this.dialogVisible = false
    },
    goDetail($row) {
      this.$router.push({
        name: "couponDetail",
        query: {
          activityNo: $row.activityNo,
          id: $row.id
        }
      })
    },
    stopAcitive(row) {
      this.$confirm("确认结束该活动吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          api.closeActivity({
            activityNo: row.activityNo,
            id: row.id
          }).then(() => {
            this.$message({
              type: "info",
              message: "已结束"
            });
            this.$refs.child.getData();
          }).catch(err => {
            console.error(err);
          });
        })
        .catch(() => {
        });
    },
    onClick_add() {
      this.$router.push({
        name: "addCoupon"
      })
    },
    getsPromoCode() {
      // api.getsPromoCode({
      //   activityNo: this.couponForm.activityNo,
      //   id: this.couponForm.id
      // }).then(res => {
      //   if (res.object) {
      //     this.dialogVisible = false
      //     this.$message({
      //       type: "info",
      //       message: "领取成功"
      //     });
      //   }
      // })
      this.dialogVisible = false
    },
    copyActiveCode(e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    },
    downloadCodeImg() {
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      var _this = this;
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/jpg");// 得到图片的base64编码数据
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = _this.projectName || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = this.couponForm.ossUrl;
    }
  }
}
</script>

<style scoped lang="scss">
  .table_box {
    margin: 24px;
    padding: 24px;
    overflow: hidden;
    background: #fff;
    min-width: 1000px;
    .add-btn{
      width: 100%;
      padding: 0 0 17px 0;
      button {
        width: 102px;
        height: 32px;
        background: #1989FA;
        color: #ffffff;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    padding: 0 0;
  }
  .dialog_code {
    width: 100%;
    img {
      display: block;
      width: 164px;
      height: 164px;
      margin: 0 auto;
    }
  }
  .option-btn {
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
    .copy-btn,.down-btn {
      display: flex;
      img {
        width: 16px;
        height: 16px;
        display: block;
        margin-right: 2px;
      }
    }
    .copy-btn {
      margin-left: 90px;
      color: #1989FA;
    }
    .down-btn {
      margin-right: 90px;
    }
    span {
      display: block;
      width: 1px;
      height: 16px;
      background: #DCDFE6;
    }
  }
</style>
