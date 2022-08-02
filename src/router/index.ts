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
    component: () =>
      import(
        /* webpackChunkName: "coaches" */ '../views/coaches/CoachesView.vue'
      ),
  },
  {
    path: '/coaches/:id',
    name: 'Coach',
    component: () =>
      import(/* webpackChunkName: "coach" */ '../views/coaches/CoachView.vue'),
    children: [
      {
        path: 'contact',
        name: 'Contact',
        component: () =>
          import(
            /* webpackChunkName: "contact" */ '../views/requests/ContactView.vue'
          ),
      },
    ],
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/coaches/SignUp.vue'),
  },
  {
    path: '/requests',
    name: 'Requests',
    component: () =>
      import(
        /* webpackChunkName: "requests" */ '../views/requests/RequestsView.vue'
      ),
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
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 100, top: 100 }
  },
})

export default router
