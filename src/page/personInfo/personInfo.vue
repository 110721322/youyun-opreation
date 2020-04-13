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
        <el-form-item label="头像" prop="avatar">
          <el-upload
            v-if="!ruleForm.avatar"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
            :show-file-list="false"
          >
            <el-button class="upload-btn">
              <i class="el-icon-upload el-icon--left"></i>上传图片
            </el-button>
          </el-upload>
          <div v-if="ruleForm.avatar" class="avatar-box" style="position: relative">
            <img :src="ruleForm.avatar" alt class="avatar" />
            <i class="el-icon-close avatar-close" @click="onClick_deleteAvater"></i>
          </div>
        </el-form-item>
        <el-form-item label="花名" prop="alias">
          <el-input v-model="ruleForm.alias"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工号" prop="jobNum">
          <el-input v-model="ruleForm.jobNum"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="ruleForm.birthday" type="date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="ruleForm.passwd"></el-input>
        </el-form-item>
      </el-form>
      <div class="commit-box">
        <el-button type="primary" class="commit-btn" @click="onClick_submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonInfo",
  data() {
    return {
      ruleForm: {
        name: "",
        alias: "",
        jobNum: "",
        birthday: "",
        sex: "男",
        email: "",
        avatar:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        // avatar: "",
        passwd: ""
      },
      rules: {
        avatar: [{ required: true, message: "请选择头像", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        alias: [{ required: true, message: "请输入花名", trigger: "blur" }],
        jobNum: [{ required: true, message: "请输入工号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        passwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        birthday: [{ required: true, message: "请选择日期", trigger: "change" }]
      },
      fileList: []
    };
  },
  methods: {
    onClick_deleteAvater() {
      this.ruleForm.avatar = "";
    },
    handleChange() {},
    onClick_submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$router.push({ path: "/result" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-box {
  width: 66px;
  height: 66px;
  position: relative;
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
