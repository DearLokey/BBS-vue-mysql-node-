import Vue from "vue";
import Router from "vue-router";
import registLogin from "@/pages/registLogin";
import index from "@/pages/index";
import bbsdetail from "@/pages/bbsDetail";
import about from "@/pages/about";

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
      component: registLogin
    },
    {
      path: "/bbsDetail/:id",
      name: "bbsDetail",
      component: bbsdetail
    },
    {
      path: "/about",
      name: "about",
      component: about
    }
  ]
});
