<template>
<el-container>
  <el-header>
    <bbsheader></bbsheader>
  </el-header>
  <el-main class="w"> 
    <div class="emptyBBS" v-if="hasBBS">
        暂无数据
    </div>
    <ul class="bbsList">
        <li class="bbs" v-for="bbs in allbbs">
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginUser: "",
      hasBBS: ""
    };
  },
  components: {
    bbsheader,
    bbsfooter
  },
  computed: mapState({
    allbbs: "allbbs"
  }),
  mounted: function() {
    console.log(localStorage.getItem("loginUser"));
    this.$store.dispatch("getallbbs");
    if (localStorage.getItem("loginuser")) {
      this.loginuser = localStorage.getItem("loginuser");
    }
  },
  methods: {
    bbsDetail(id) {
      this.$router.push({ path: "/bbsDetail/" + id });
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

