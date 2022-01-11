import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About')
  },
  {
    path: '/Page1',
    name: 'Page1',
    component: () => import(
      /* webpackChunkName: 'page' */
      '@/views/Page1'
    )
  },
  {
    path: '/Page2',
    name: 'Page2',
    component: () => import(
      /* webpackChunkName: 'page' */
      '@/views/Page2'
    )
  },
  {
    path: '/Page3',
    name: 'Page3',
    component: () => import(
      /* webpackChunkName: 'page' */
      '@/views/Page3'
    )
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
