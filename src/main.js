// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import VueResource from "vue-resource";
import store from "./vuex/store";
import router from "./router";
import App from "./App";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(require("vue-moment"));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
