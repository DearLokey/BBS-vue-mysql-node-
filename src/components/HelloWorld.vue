<template>
<el-row>
  <el-col :span="8"></el-col>
  <el-col :span="8">
    <div class="grid-content bg-purple-dark">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
        <el-input v-model="form.account" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
        <el-input v-model="form.repass" type="password" placeholder="再次输入密码"></el-input>
        </el-form-item>
        <el-button round @click="addUser">注册</el-button>
      </el-form>
    </div>
  </el-col>
  <el-col :span="8"></el-col>
</el-row>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      form: {
        account: "",
        password: "",
        repass: ""
      }
    };
  },
  methods: {
    addUser() {
      var form = this.form;
      var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //手机正则
      var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/; //密码正则，数组字母组成，6-12位
      if (form.account.match(phoneReg)) {
        if (form.password == form.repass) {
          if (form.password.match(passReg)) {
            this.$http
              .post(
                "/api/user/addUser",
                {
                  account: form.account,
                  password: form.password
                },
                {}
              )
              .then(response => {
                if (response.data == -1) {
                  alert("该用户已存在");
                }
              });
          } else {
            this.$message("密码格式不正确");
          }
        } else {
          this.$message("两次密码不一致");
        }
      } else {
        this.$message("手机号格式不正确");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
