import { createApp } from 'vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import { MotionPlugin } from '@vueuse/motion'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import naive from 'naive-ui'

import Common from '@/lib/common'
import Requests from '@/lib/requests'

import '@/assets/styles/index.scss'
import '@/assets/styles/var.scss'

window.$axiosRequestsList = []
window.$loginUrl = 'http://' + location.hostname + ':8000/login'
window.$apiUrl = 'http://' + location.hostname + ':8000/api'
window.$icp = '沪ICP备13002172号-3'

const app = createApp(App)

app.use(MotionPlugin)

app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(naive)
app.config.globalProperties.$lib = {
  common: new Common(),
  requests: new Requests(),
}
app.mount('#app')
