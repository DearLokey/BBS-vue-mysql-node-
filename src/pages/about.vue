<template>
<el-container>
  <el-header>
    <bbsheader></bbsheader>
  </el-header>
  <el-main class="w">
    <ul>
      <li v-for="about in aboutList" class="about">
        <p>{{about.commentDetail.user_account}}回复您：{{about.commentDetail.content}}</p>
        <p>关联帖子：</p>
        <h1 class="bbstitle" @click="bbsDetail(about.commentDetail.bbs_id,about.id)">{{about.bbsDetail.content}}</h1>
      </li>
    </ul>
  </el-main>
  <el-footer><bbsfooter></bbsfooter></el-footer>
</el-container>
</template>
<script>
import bbsheader from "@/components/head";
import bbsfooter from "@/components/footer";
export default {
  data() {
    return {
      aboutList: ""
    };
  },
  components: {
    bbsheader,
    bbsfooter
  },
  mounted: function() {
    this.$http
      .get(
        "/api/about/getAbout",
        {
          params: {
            user_account: localStorage.getItem("loginUser")
          }
        },
        {}
      )
      .then(res => {
        this.aboutList = res.data;
        this.$message(res.data);
      });
  },
  methods: {
    bbsDetail(bbs_id, about_id) {
      this.$router.push({ path: "/bbsDetail/" + bbs_id });
      this.$http
        .post("/api/about/updateAbout", { about_id: about_id }, {})
        .then(res => {});
    }
  },
};
</script>
<style lang="less" scoped>
li.about {
  background: #ffffff;
  padding: 20px;
  margin: 20px 0;
}
h1.bbstitle {
  font-size: 36px;
  cursor: pointer;
}
</style>
