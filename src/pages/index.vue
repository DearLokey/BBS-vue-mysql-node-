<template>
<el-container class="w">
  <el-header>
    <bbsheader></bbsheader>
  </el-header>
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
</template>
<script>
import bbsheader from "@/components/head";
import bbsfooter from "@/components/footer";
export default {
  data() {
    return {
      loginUser: "",
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
    if (localStorage.getItem("loginUser")) {
      this.loginUser = localStorage.getItem("loginUser");
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

