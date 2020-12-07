<template>
  <div class="person-box">
    <div class="form-box">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="55px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="headerImageSrc">
          <el-upload
            v-if="!ruleForm.headerImageSrc"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            :show-file-list="false"
          >
            <el-button class="upload-btn">
              <i class="el-icon-upload el-icon--left"></i>上传图片
            </el-button>
          </el-upload>
          <div v-if="ruleForm.headerImageSrc" class="avatar-box">
            <img :src="ruleForm.headerImageSrc" alt="图标" class="avatar" />
            <i class="el-icon-close avatar-close" @click="clickDeleteAvater"></i>
          </div>
        </el-form-item>
        <el-form-item label="花名" prop="nickName">
          <el-input v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="ruleForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="jobNumber">
          <el-input v-model="ruleForm.jobNumber"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="ruleForm.birthday" type="date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="commit-box">
        <el-button type="primary" class="commit-btn" @click="clickSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_login";
export default {
  name: "PersonInfo",
  data() {
    return {
      ruleForm: {
        realName: "",
        nickName: "",
        jobNumber: "",
        birthday: "",
        sex: "男",
        email: "",
        headerImageSrc:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        // headerImageSrc: "",
        password: ""
      },
      rules: {
        headerImageSrc: [
          { required: true, message: "请选择头像", trigger: "blur" }
        ],
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        nickName: [{ required: true, message: "请输入花名", trigger: "blur" }],
        jobNumber: [{ required: true, message: "请输入工号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        birthday: [{ required: true, message: "请选择日期", trigger: "change" }]
      },
      fileList: [],
      id: this.$route.query.id
    };
  },
  methods: {
    clickDeleteAvater() {
      this.ruleForm.headerImageSrc = "";
    },

    clickSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          api.perfectUpdate({
            nickName: this.ruleForm.nickName,
            sex: this.ruleForm.sex,
            realName: this.ruleForm.realName,
            headerImageSrc: this.ruleForm.headerImageSrc,
            jobNumber: this.ruleForm.jobNumber,
            email: this.ruleForm.email,
            id: this.id,
            password: this.ruleForm.password,
            birthday: this.ruleForm.birthday
          }).then(res => {
            if (res.status === 0) {
              this.$router.push({ path: "/result" });
            }
          })
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-box {
  position: relative;
  width: 66px;
  height: 66px;

  .avatar-close {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size: 8px;
  }
}

.avatar {
  width: 66px;
  height: 66px;
}

.person-box {
  background: #fbfbfb;
  height: 100%;

  .form-box {
    padding: 1rem;
  }
}

.upload-btn {
  width: 119px;
  height: 36px;
  background: rgba(245, 245, 245, 1);
  border-radius: 4px;
  border: 1px solid rgba(199, 200, 205, 1);
}

.commit-box {
  margin-top: 50px;
  text-align: center;
}

.commit-btn {
  width: 50%;
}
</style>
