<script lang="ts" setup>
import appprovider from './AppProvider.vue'
</script>

<template>
  <n-config-provider>
    <n-loading-bar-provider
      :loading-bar-style="{
        loading: 'background-color: var(--el-color-primary)',
      }"
    >
      <n-dialog-provider>
        <n-message-provider placement="top">
          <n-notification-provider :max="3">
            <slot />
            <appprovider></appprovider>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
