import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

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
    path: '/coaches/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/coaches/SignUp.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/requests',
    name: 'Requests',
    component: () =>
      import(
        /* webpackChunkName: "requests" */ '../views/requests/RequestsView.vue'
      ),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/signup',
    name: 'UserSignUp',
    component: () =>
      import(
        /* webpackChunkName: "userSignUp" */ '../views/auth/UserSignUp.vue'
      ),
    meta: {
      requiresUnAuth: true,
    },
  },
  {
    path: '/user/login',
    name: 'UserAuth',
    component: () =>
      import(/* webpackChunkName: "userAuth" */ '../views/auth/UserLogin.vue'),
    meta: {
      requiresUnAuth: true,
    },
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

router.beforeEach(function (to, from, next) {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.userId) {
    next({ name: 'UserAuth' })
  } else if (to.meta.requiresUnAuth && authStore.userId) {
    next({ name: 'Coaches' })
  } else {
    next()
  }
})
export default router
