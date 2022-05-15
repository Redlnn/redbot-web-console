/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module './assets/*'
declare module '@/assets/*'

declare interface Window {
  $axiosRequestsList: AbortController[]
  $loginUrl: string
  $apiUrl: string
  $icp: string
}

declare interface Document {
  title: string
}
