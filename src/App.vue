<script lang="ts" setup>
import appprovider from './components/GlobalAppProvider/AppComponents.vue'
</script>

<template>
  <appprovider>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </appprovider>
</template>

<style lang="scss">
@import 'element-plus/theme-chalk/dark/css-vars.css';

#app {
  width: 100vw;
  height: 100vh;
  color: var(--el-text-color-primary);
}

* {
  transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
