<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  min-height: 100%;
}
body {
  background: url(assets/images/back.jpg);
}
.w {
  width: 1200px;
  margin: auto;
}
.l {
  float: left;
}
.r {
  float: right;
}
.el-container {
  color: #333;
}
.el-header,
.el-footer {
  text-align: center;
  background: #ffffff;
}

.el-aside {
  text-align: center;
  background: #ffffff;
}

ul {
  list-style-type: none;
}
</style>


