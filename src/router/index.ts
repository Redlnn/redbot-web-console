import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

import { createPageLoadingGuard } from './gurad/pageLoadingGuard'
// import { createVerifyTokenGuard } from './gurad/verifyTokenGuard'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title as string
  for (const controller of window.$axiosRequestsList) {
    controller.abort()
  }
  window.$axiosRequestsList = []
  next()
})

createPageLoadingGuard(router)
// createVerifyTokenGuard(router)

export default router
