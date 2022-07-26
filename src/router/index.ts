import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
  },
  {
    path: '/coaches',
    name: 'Coaches',
    component: () => null,
  },
  {
    path: '/coaches/:id',
    name: 'Coach',
    component: () => null,
    children: [
      {
        path: '/contact',
        name: 'Contact',
        component: () => null,
      },
    ],
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => null,
  },
  {
    path: '/requests',
    name: 'Requests',
    component: () => null,
  },

  // 404 Page
  {
    path: '/:catchAll(.*)*', // regex, catch any route that doesn't exists
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/404View.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
