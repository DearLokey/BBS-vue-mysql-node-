<template>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="登录">
          <div class="grid-content">
              <el-form ref="form" :model="loginform" :rules="rules" label-width="80px">
                  <el-form-item label="手机号" prop="account">
                    <el-input v-model="loginform.account" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="loginform.password" type="password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-button type="primary" round @click="login">登录</el-button>
              </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <div class="grid-content">
              <el-form ref="form" :model="registform" :rules="rules" label-width="80px">
                  <el-form-item label="手机号" prop="account">
                    <el-input v-model="registform.account" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="registform.password" type="password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="password">
                    <el-input v-model="registform.repass" type="password" placeholder="再次输入密码"></el-input>
                  </el-form-item>
                  <el-button type="primary" round @click="regist">注册</el-button>
              </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="8"><div class="grid-content"></div></el-col>
   </el-row>
</template>

<script>
import crypto from "crypto";
export default {
  name: "registLogin",
  data() {
    return {
      tabPosition: "left",
      loginform: {
        account: "",
        password: ""
      },
      registform: {
        account: "",
        password: "",
        repass: ""
      },
      rules: {
        account: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      phoneReg: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, //手机正则
      passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/ //密码正则，数组字母组成，6-12位
    };
  },
  methods: {
    login() {
      let loginform = this.loginform;
      if (loginform.account.match(this.phoneReg)) {
        let md5 = crypto.createHash("md5");
        md5.update(loginform.password);
        this.$http
          .post(
            "/api/user/login",
            {
              account: loginform.account,
              password: md5.digest("hex")
            },
            {}
          )
          .then(res => {
            if (res.data == -1) {
              this.$message("没有该用户");
            }
            if (res.data == -2) {
              this.$message("密码错误");
            }
            if (res.data == 0) {
              this.$message("登陆成功");
              sessionStorage.setItem("loginUser", loginform.account);
              this.$router.push({ path: "index" });
            }
          });
      }
    },
    regist() {
      let registform = this.registform;
      if (registform.account.match(this.phoneReg)) {
        if (registform.password == registform.repass) {
          if (registform.password.match(this.passReg)) {
            let md5 = crypto.createHash("md5");
            md5.update(registform.password);
            this.$http
              .post(
                "/api/user/regist",
                {
                  account: registform.account,
                  password: md5.digest("hex")
                },
                {}
              )
              .then(response => {
                if (response.data == -1) {
                  this.$message("该用户已存在");
                }
                if (response.data == 0) {
                  this.$message("注册成功");
                }
              });
          } else {
            this.$message("请输入数字字母格式的6-12位密码");
          }
        } else {
          this.$message("两次输入的密码不一致");
        }
      } else {
        this.$message("手机号格式不正确");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.grid-content {
  min-height: 36px;
}
</style>

