import Vue from "vue";
import Router from "vue-router";
import registLogin from "@/pages/registLogin";
import index from "@/pages/index";
import bbsdetail from "@/pages/bbsDetail";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "registLogin",
      component: registLogin
    },
    {
      path: "/index",
      name: "index",
      component: index,
    },
    {
      path:'/bbsDetail/:id',
      name:'bbsDetail',
      component:bbsdetail,
    }
  ]
});
