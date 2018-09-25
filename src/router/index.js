import Vue from "vue";
import Router from "vue-router";
import registLogin from "@/pages/registLogin";
import index from "@/pages/index";
import bbsdetail from "@/pages/bbsDetail";
import test from "@/pages/test"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index 
    },
    {
      path: "/registLogin",
      name: "registLogin",
      component: registLogin,
    },
    {
      path:'/bbsDetail/:id',
      name:'bbsDetail',
      component:bbsdetail,
    },
    {
      path:'/test',
      component:test
    }
  ]
});
