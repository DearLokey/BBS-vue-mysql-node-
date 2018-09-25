<template>
<el-container class="w">
  <el-header>
    <router-link to="/">
      <img src="../assets/images/logo.png" alt="" width="60px" height="60px">
    </router-link>
    <div class="login" v-if="loginUser==''">
      <p>登录用户：{{loginUser}}</p>
      <el-button type="text" @click="logout">注销</el-button>
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
    </div>
    <div class="not-login" v-if="!loginUser">
      <router-link tag="" to="/">
        <el-button type="primary">登录</el-button>
      </router-link>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>
        <p>{{bbsDetail.content}}</p>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-edit" circle @click="addFloor"></el-button>
        <ul class="floorList">
            <li class="floor" v-for="floor in floorList">{{floor['content']}}</li>
        </ul>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
export default {
  data() {
    return {
      bbsDetail: "",
      floorList: "",
      input: ""
    };
  },
  methods: {
    addFloor() {
      this.$http
        .post(
          "/api/bbs/addFloor",
          { bbs_id: this.bbsDetail.id, content: this.input },
          {}
        )
        .then(res => {
          this.floorList = res.data;
        });
    }
  },
  mounted: function() {
    let routerParams = this.$route.params.id;
    this.$http
      .get(
        "/api/bbs/getBBSById",
        {
          params: {
            id: routerParams
          }
        },
        {}
      )
      .then(res => {
        this.bbsDetail = res.data[0];
      });
    this.$http
      .get(
        "/api/bbs/getAllFloor",
        {
          params: {
            bbs_id: routerParams
          }
        },
        {}
      )
      .then(res => {
        this.floorList = res.data;
      });
  }
};
</script>
<style lang="less">
ul{
  list-style: none;
}
</style>
