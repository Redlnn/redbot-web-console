import Common from '@/lib/common'
import Requests from '@/lib/requests'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $lib: {
      common: Common
      requests: Requests
    }
  }
}

export {}
