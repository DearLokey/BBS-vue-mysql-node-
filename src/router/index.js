import Vue from "vue";
import Router from "vue-router";

const index = r => require.ensure([], () => r(require('@/pages/index')), 'index')
const registLogin = r => require.ensure([], () => r(require('@/pages/registLogin')), 'registLogin')
const bbsdetail = r => require.ensure([], () => r(require('@/pages/bbsdetail')), 'bbsdetail')
const about = r => require.ensure([], () => r(require('@/pages/about')), 'about')

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
