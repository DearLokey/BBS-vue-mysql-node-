<template>
<el-container class="w">
  <el-header>
    <bbsheader></bbsheader>
  </el-header>
  <el-container>
    <el-aside width="200px"></el-aside>
    <el-container>
      <el-main>
        <h1 style="font-size:36px;text-align:center">{{bbsDetail.title}}</h1>
        <p>{{bbsDetail.content}}</p>
        <el-input v-model="floorInput" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-edit" circle @click="addFloor"></el-button>
        <ul class="floorList">
            <li class="floor" v-for="(floor, floorindex) in floorList">
              <p>floor:{{floorindex+1}}</p>
              <p>用户名:{{floor['user_account']}}</p>
              <p>内容:{{floor['content']}}</p>
              <ul class="commentList">
                <p>评论</p>
                <li class="comment" v-for="comment in floor['commentList']">
                  <p>{{comment['user_account']}}：{{comment['content']}}</p>
                  <p v-if="comment['user_account2']">{{comment['user_account']}} 回复 {{comment['user_account2']}}:{{comment['content']}}</p>
                  <el-button type="text" round @click="replyComment(comment['user_account'])">回复</el-button>
                </li>
              </ul>
              <div class="comment">
                <el-input placeholder="请输入内容" v-model="commentInput"></el-input>
                <el-button type="text" @click="doComment(floor['id'])">发表</el-button>
              </div>
            </li>
        </ul>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import bbsheader from "@/components/head";
export default {
  data() {
    return {
      bbsDetail: "",
      floorList: "", //楼层列表
      floorInput: "", //楼层狂内容
      commentInput: "", //评论框内容
      commentList: "" //评论列表
    };
  },
  components: {
    bbsheader
  },
  methods: {
    addFloor() {
      this.$http
        .post(
          "/api/bbs/addFloor",
          { bbs_id: this.bbsDetail.id, content: this.floorInput },
          {}
        )
        .then(res => {
          this.floorList = res.data;
        });
    },
    replyComment(commentaccount) {
      this.commentInput = "回复 " + commentaccount + ":";
    },
    doComment(id) {
      if (this.commentInput == "") {
        this.$message("评论内容不能为空");
      } else {
        let commentcontent;
        let commentaccount;
        if (
          this.commentInput.includes("回复") &&
          this.commentInput.includes(":")
        ) {
          let params = this.commentInput.split(":");
          commentaccount = params[0].substring(2, this.commentInput.length - 1);
          commentcontent = params[1];
        } else {
          commentcontent = this.commentInput;
          commentaccount = "";
        }
        this.$message(commentaccount + commentcontent);
        this.$http
          .post(
            "/api/comment/addComment",
            {
              floorid: id,
              content: commentcontent,
              commentaccount: commentaccount
            },
            {}
          )
          .then(res => {
            this.$message("success");
            this.commentList = res.data;
          });
      }
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
ul.floorList {
  li.floor {
    padding: 20px;
    background: #ffffff;
    margin-bottom: 20px;
  }
}
</style>
