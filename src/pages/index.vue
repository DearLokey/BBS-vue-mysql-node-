<template>
    <div class="index">
         <h2>登录成功</h2>
         <p>欢迎{{loginUser}}</p>
        <el-button type="text" @click="dialogFormVisible = true">发帖</el-button>
        <el-dialog title="发帖" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
                    <el-input type="textarea" :rows="2" v-model="form.content" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBBS">确 定</el-button>
            </div>
        </el-dialog>
        <div v-if="hasBBS">
            暂无数据
        </div>
        <ul>
            <li v-for="bbs in bbsList">{{bbs['title']}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
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
            this.dialogFormVisible = false;
            location.reload();
          }
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
    this.loginUser = sessionStorage.getItem("loginUser");
  }
};
</script>
<style lang="less" scoped>
</style>

