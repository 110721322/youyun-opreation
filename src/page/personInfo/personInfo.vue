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
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-form-item prop="date1">
            <el-date-picker v-model="ruleForm.date1" type="date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="ruleForm.passwd"></el-input>
        </el-form-item>
      </el-form>
      <div class="commit-box">
        <el-button type="primary" class="commit-btn">提交</el-button>
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
        avatar: "",
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
        birthday: [
          {
            type: "data",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      fileList: []
    };
  }
};
</script>
<style lang="scss" scoped>
.person-box {
  background: #fbfbfb;
  height: 100%;
  .form-box {
    padding: 1rem;
  }
}
.commit-box {
  margin-top: 50px;
  text-align: center;
}
.commit-btn {
  width: 50%;
}
</style>
