import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Secure from '../components/Secure.vue';
import Register from '../components/Register.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true, // to make Private route
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: {
        requiresAuth: true, // to make Private route
      },
    },
  ],
});
// check for unauthorized access
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
