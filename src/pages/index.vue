<template>
<el-container class="w">
  <el-header>
    <bbsheader></bbsheader>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-button type="success" @click="BBSdialog = true" v-if="loginUser">发帖</el-button>
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
    </el-aside>
    <el-container>
      <el-main>
        <div class="emptyBBS" v-if="hasBBS">
            暂无数据
        </div>
        <ul class="bbsList">
            <li class="bbs" v-for="bbs in bbsList">
                <p @click="bbsDetail(bbs['id'])">{{bbs['title']}}</p>
                <p>{{bbs['create_time']|moment("YYYY/MM/DD HH:mm")}}</p>
            </li>
        </ul>
      </el-main>
      <el-footer>
        <bbsfooter></bbsfooter>
      </el-footer>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import bbsheader from "@/components/head";
import bbsfooter from "@/components/footer";
export default {
  data() {
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
      bbsList: "",
      hasBBS: ""
    };
  },
  components: {
    bbsheader,
    bbsfooter
  },
  methods: {
    bbsDetail(id) {
      this.$router.push({ path: "/bbsDetail/" + id });
    },
    addBBS() {
      let form = this.form;
      this.$http
        .post(
          "/api/bbs/addBBS",
          { title: form.title, content: form.content },
          {}
        )
        .then(res => {
          this.$message("success");
          this.BBSdialog = false;
          this.bbsList = res.data;
        });
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
    if (sessionStorage.getItem("loginUser")) {
      this.loginUser = sessionStorage.getItem("loginUser");
    }
  }
};
</script>
<style lang="less">
ul.bbsList {
  list-style-type: none;
  text-align: left;
  li {
    border-bottom: 2px solid gray;
    background: #ffffff;
    padding: 20px;
    p {
      cursor: pointer;
    }
  }
}
</style>

