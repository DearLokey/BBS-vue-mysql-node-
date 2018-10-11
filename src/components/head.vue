<template>
  <div class="header">
    <router-link to="/" class="l">
      <img src="../assets/images/logo.png" alt="" width="50px" height="50px">
    </router-link>
    <div class="r login" v-if="loginUser">
      <p>登录用户：{{loginUser}}</p>
      <router-link to="/about">
        <el-button type="danger" v-if="hasAbout">新消息：{{aboutNum}}</el-button>
      </router-link>
      <el-button type="success" @click="BBSdialog = true" v-if="loginUser">发帖</el-button>
      <el-button @click="logout">注销</el-button>
      <el-dialog title="发帖" :visible.sync="BBSdialog">
          <el-form :model="form" :rules="rules">
              <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                  <el-input v-model="form.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                  <el-input type="textarea" :rows="2" v-model="form.content" placeholder=""></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="BBSdialog = false">取 消</el-button>
              <el-button type="primary" @click="addBBS">确 定</el-button>
          </div>
      </el-dialog>
    </div>
    <div class="r not-login" v-if="loginUser==''">
      <router-link tag="a" :to="{ path: '/registLogin'}" append exact-active-class = "_active">
        <el-button type="primary">登录</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: function() {
    return {
      loginUser: "",
      BBSdialog: false,
      form: {
        title: "",
        content: ""
      },
      formLabelWidth: "50px",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      aboutNum: "", //与我相关
      hasAbout: ""
    };
  },
  computed:mapState({
    user:"user",//登录用户
  }),
  mounted: function() {
    if (localStorage.getItem("loginUser")) {
      this.loginUser = localStorage.getItem("loginUser");
    }
    this.$http
      .get("/api/about/getAbout", {
        params: {
          user_account: this.loginUser
        }
      })
      .then(res => {
        if (res.data != 0) {
          this.aboutNum = res.data.length;
          console.log("aboutNum" + this.aboutNum);
          this.hasAbout = true;
        } else {
          this.hasAbout = false;
        }
      });
  },
  methods: {
    logout() {
      localStorage.setItem("loginUser", "");
      location.reload();
    },
    addBBS() {
      let form = this.form;
      this.$http
        .post(
          "/api/bbs/addBBS",
          {
            title: form.title,
            content: form.content,
            user_account: this.loginUser
          },
          {}
        )
        .then(res => {
          this.BBSdialog = false;
          this.$store.state.allbbs = res.data
        });
    }
  }
};
</script>
<style lang="less">
div.header {
  margin-top: 10px;
}
ul.bbsList {
  list-style-type: none;
  text-align: left;
  text-indent: 20px;
  li {
    border-bottom: 2px solid gray;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    p {
      cursor: pointer;
    }
    span {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
div.r {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>

