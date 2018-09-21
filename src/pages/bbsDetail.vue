<template>
<div>
    <p>{{bbsDetail.content}}</p>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" icon="el-icon-edit" circle @click="addComment"></el-button>
    <ul>
        <li v-for="comment in commentList">{{comment['content']}}</li>
    </ul>
</div>

</template>
<script>
export default {
  data() {
    return {
      bbsDetail: "",
      commentList: "",
      input: ""
    };
  },
  methods: {
    addComment() {
      this.$http
        .post(
          "/api/comment/addComment",
          { content: this.input, bbsid: this.bbsDetail.id },
          {}
        )
        .then(res => {
          if (res.data == "0") {
            this.$message("success");
          }
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
        "/api/comment/getCommentByBBSId",
        {
          params: {
            bbsid: routerParams
          }
        },
        {}
      )
      .then(res => {
        this.commentList = res.data;
      });
  }
};
</script>
<style lang="less">
</style>
