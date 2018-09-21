<template>
    <div class="index">
      <div class="loginstatus" v-if="loginUser!=''">
         <p>当前登录用户：{{loginUser}}</p>
         <el-button type="text" @click="logout">退出当前账户</el-button>
      </div>
        
        <router-link v-if="loginUser==''" tag="li" to="/">
          <el-button type="primary">登录</el-button>
        </router-link>
        <el-button type="text" @click="BBSdialog = true">发帖</el-button>
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
        <div class="emptyBBS" v-if="hasBBS">
            暂无数据
        </div>
        <ul class="bbsList">
            <li v-for="bbs in bbsList">
                <p @click="bbsDetail(bbs['id'])">{{bbs['title']}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
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
      bbsList: "",
      hasBBS: "",
      loginUser: ""
    };
  },
  methods: {
    addBBS() {
      let form = this.form;
      this.$http
        .post(
          "/api/bbs/addBBS",
          { title: form.title, content: form.content },
          {}
        )
        .then(res => {
          if (res.data == "0") {
            this.$message("success");
            this.BBSdialog = false;
            location.reload();
          }
        });
    },
    logout() {
      sessionStorage.setItem("loginUser", "");
      this.$router.push({ path: "/" });
    },
    bbsDetail(id) {
      this.$router.push({ path: "/bbsDetail/" + id });
    }
  },
  mounted: function() {
    this.$http.get("/api/bbs/getAll", {}).then(res => {
      if (res.data.length != 0) {
        this.bbsList = res.data;
        this.hasBBS = false;
      } else {
        this.hasBBS = true;
      }
    });
    this.loginUser = sessionStorage.getItem("loginUser");
  }
};
</script>
<style lang="less" scoped>
ul.bbsList {
  list-style-type: none;
  text-align: left;
  text-indent: 20px;
  cursor: pointer;
  li {
    border-bottom: 2px solid gray;
  }
}
</style>

