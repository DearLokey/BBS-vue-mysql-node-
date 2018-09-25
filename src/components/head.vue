<template>
  <div>
    <router-link to="/" class="l">
      <img src="../assets/images/logo.png" alt="" width="60px" height="60px">
    </router-link>
    <div class="r login" v-if="loginUser">
      <p>登录用户：{{loginUser}}</p>
      <el-button type="text" @click="logout">注销</el-button>
    </div>
    <div class="r not-login" v-if="loginUser==''">
      <router-link tag="" to="/">
        <el-button type="primary">登录</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: "",
    };
  },
  methods: {
    logout() {
      sessionStorage.setItem("loginUser", "");
      this.$router.push({ path: "/registLogin" });
    },
    
  },
  mounted: function() {
    this.loginUser = sessionStorage.getItem("loginUser");
  }
};
</script>
<style lang="less">
ul.bbsList {
  list-style-type: none;
  text-align: left;
  text-indent: 20px;
  li {
    border-bottom: 2px solid gray;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    p {
      cursor: pointer;
    }
    span {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
div.login{
  display: flex;
  flex-direction: row;
}
</style>

