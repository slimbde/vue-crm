import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: () => import(/* webpackChunkName: "home" */ './views/Home')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main', auth: true },
    component: () => import(/* webpackChunkName: "categories" */ './views/Categories')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "login" */ './views/Login')
  },
  {
    path: '/detail-record/:id',
    name: 'DetailRecord',
    meta: { layout: 'main', auth: true },
    component: () => import(/* webpackChunkName: "detail-record" */ './views/DetailRecord')
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import(/* webpackChunkName: "history" */ './views/History')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main', auth: true },
    component: () => import(/* webpackChunkName: "planning" */ './views/Planning')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import(/* webpackChunkName: "profile" */ './views/Profile')
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main', auth: true },
    component: () => import(/* webpackChunkName: "record" */ './views/Record')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "register" */ './views/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// auth middleware
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.auth) && !firebase.auth().currentUser)
    next('/login?message=login-required');

  else
    next();
})


export default router
