import Vue from 'vue'
import Router from 'vue-router'
import registLogin from '@/pages/registLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'registLogin',
      component: registLogin
    }
  ]
})
