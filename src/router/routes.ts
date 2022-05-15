import OverView from '@/views/Overview/Overview.vue'
import AppMain from '@/views/AppMain/AppMain.vue'
import Login from '@/views/Login/Login.vue'
import NotFound from '@/views/error/404NotFound.vue'

export default [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: AppMain,
    children: [
      {
        path: '',
        component: OverView,
        meta: {
          title: '概览',
          requireAuth: true,
        },
      },
      {
        path: 'group',
        component: () => import('../views/GroupView.vue'),
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: ':groupId(\\d+)',
            component: () => import('../views/GroupDetailView.vue'),
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: 'test',
        component: () => import('../views/Test.vue'),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: ':catchAll(.*)',
        component: NotFound,
        meta: {
          title: '你走丢了吗？',
        },
      },
    ],
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: {
      title: '你走丢了吗？',
    },
  },
]
