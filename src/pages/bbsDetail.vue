<template>
<el-container class="w">
  <el-header>
    <bbsheader></bbsheader>
  </el-header>
  <el-container>
    <el-container>
      <el-main>
        <div class="bbscontent">
          <h1 style="font-size:36px;text-align:center">{{bbsDetail.title}}{{bbsDetail.user_head}}</h1>
          <img src="" alt="">
          <p>发帖人:{{bbsDetail.user_account}}</p>
          <p>内容:{{bbsDetail.content}}</p>
          <div class="floor r">
            <span>回复：</span>
            <el-input v-model="floorInput" placeholder="请输入内容" style="width:400px;"></el-input>
            <el-button type="primary" icon="el-icon-edit" circle @click="addFloor"></el-button>
          </div>
        </div>
        <ul class="floorList">
            <li class="floor" v-for="(floor, floorindex) in floorList">
              <p>floor:{{floorindex+1}}</p>
              <p>用户名:{{floor['user_account']}}</p>
              <p>内容:{{floor['content']}}</p>
              <el-button type="text" v-show="!commentFlag[floorindex]" @click="showCommentInput(floorindex)">回复</el-button>
              <el-button type="text" v-show="commentFlag[floorindex]" @click="hideCommentInput(floorindex)">收起回复</el-button>
              <ul class="commentList">
                <h1>评论区</h1>
                <hr>
                <li class="comment" v-for="comment in floor['commentList']">
                  <p v-if="comment['user_account2']==''">{{comment['user_account']}}：{{comment['content']}}</p>
                  <p v-if="comment['user_account2']">{{comment['user_account']}} 回复 {{comment['user_account2']}}:{{comment['content']}}</p>
                  <el-button type="text" round @click="replyComment(comment['user_account'],floorindex)">回复</el-button>
                </li>
                <div class="comment" v-if="commentFlag[floorindex]">
                  <el-input placeholder="请输入内容" v-model="commentInput[floorindex]"></el-input>
                  <el-button type="primary" @click="doComment(floor['id'],floorindex)">发表</el-button>
                </div>
              </ul>
            </li>
        </ul>
      </el-main>
      <el-footer><bbsfooter></bbsfooter></el-footer>
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
      routerParams: this.$route.params.id, //路由参数
      loginUser: "", //登录用户
      bbsDetail: "", //帖子详情
      floorList: "", //楼层列表
      floorInput: "", //楼层框内容
      commentList: "", //评论列表
      commentInput: [], //评论框数组
      secondComment: false, //二级评论
      commentFlag: [] //评论框是否显示
    };
  },
  components: {
    bbsheader,
    bbsfooter
  },
  methods: {
    addFloor() {
      this.$http
        .post(
          "/api/bbs/addFloor",
          {
            user_account: this.loginUser,
            bbs_id: this.bbsDetail.id,
            content: this.floorInput
          },
          {}
        )
        .then(res => {
          this.floorList = res.data;
        });
    },
    getAllFloor() {
      this.$http
        .get(
          "/api/bbs/getAllFloor",
          {
            params: {
              bbs_id: this.routerParams
            }
          },
          {}
        )
        .then(res => {
          this.floorList = res.data;
        });
    },
    showCommentInput(floorindex) {
      this.$set(this.commentFlag, floorindex, true);
    },
    hideCommentInput(floorindex) {
      this.$set(this.commentFlag, floorindex, false);
    },
    replyComment(commentaccount, floorindex) {
      if (this.loginUser == "") {
        this.$message("暂未登录");
      } else {
        this.commentFlag[floorindex] = true;
        this.commentInput[floorindex] = "回复 " + commentaccount + ":";
        this.secondComment = true;
      }
    },
    doComment(floorid, floorIndex) {
      if (this.loginUser == "") {
        this.$message("暂未登录");
      } else if (this.commentInput[floorIndex] == "") {
        this.$message("评论内容不能为空");
      } else {
        let commentcontent;
        let commentaccount;
        if (this.secondComment) {
          let params = this.commentInput[floorIndex].split(":");
          commentaccount = params[0].substring(
            2,
            this.commentInput[floorIndex].length - 1
          );
          commentcontent = params[1];
        } else {
          commentcontent = this.commentInput[floorIndex];
          commentaccount = "";
        }
        this.$http
          .post(
            "/api/comment/addComment",
            {
              floorid: floorid,
              content: commentcontent,
              commentaccount: commentaccount,
              user_account: this.loginUser
            },
            {}
          )
          .then(res => {
            this.getAllFloor();
            this.commentInput[floorIndex] = "";
            this.$http
              .post(
                "/api/comment/addAbout",
                {
                  comment_id: res.data,
                  comment_account: commentaccount
                },
                {}
              )
              .then(res1 => {});
          });
      }
    }
  },
  mounted: function() {
    this.$http
      .get(
        "/api/bbs/getBBSById",
        {
          params: {
            id: this.routerParams
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
            bbs_id: this.routerParams
          }
        },
        {}
      )
      .then(res => {
        this.floorList = res.data;
        for (var i = 0; i < this.floorList.length; i++) {
          this.commentInput.push("");
          this.commentFlag.push(false);
        }
      });
    if (localStorage.getItem("loginUser")) {
      this.loginUser = localStorage.getItem("loginUser");
    }
  }
};
</script>
<style lang="less">
div.bbscontent {
  background: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  div.floor {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &::after {
    content: ".";
    clear: both;
    display: block;
    overflow: hidden;
    font-size: 0;
    height: 0;
  }
}
ul.floorList {
  li.floor {
    padding: 20px;
    background: #ffffff;
    margin-bottom: 20px;
  }
}
ul.commentList {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
  padding: 20px;
  margin: 10px;
  li.comment {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
div.comment {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
