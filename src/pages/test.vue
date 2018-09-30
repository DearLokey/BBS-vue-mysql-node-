<template>


<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>
        <ul>
          <li v-for="(item, index) in list">
            <button @click="show(index)">show</button>
            <div v-show="flagList[index]">
              <input v-model="list[index]" />
              <button @click="submit(index)">提交</button>
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
export default {
  data() {
    return {
      flagList: [],
      list: []
    };
  },
  mounted: function() {
    for (var i = 0; i < 5; i++) {
      this.list.push("");
      this.flagList.push(false);
    }
  },
  methods: {
    show(index) {
      this.$set(this.flagList,index,true);
      console.log(this.flagList)
    },
    submit(index) {
      console.log(this.list[index]);
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>