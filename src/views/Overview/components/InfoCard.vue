<template>
  <div
    class="info-card"
    :style="{
      height: height,
      alignItems: yCenter ? 'center' : 'normal',
      justifyContent: xCenter ? 'center' : 'normal',
    }"
  >
    <span v-if="title" class="title">{{ title }}</span>
    <span v-if="subtitle" class="subtitle">{{ subtitle }}</span>
    <div :style="{ marginTop: marginTop, flex: maxWidth ? '1' : 'unset', ...(style || {}) }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '@/composables'

export default defineComponent({
  props: {
    title: String,
    subtitle: String,
    margin: String,
    style: Object,
    height: {
      type: String,
      default: 'unset',
    },
    maxWidth: {
      type: Boolean,
      default: false,
    },
    xCenter: {
      type: Boolean,
      default: false,
    },
    yCenter: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      isDark,
    }
  },
  data() {
    return {
      marginTop: '0',
    }
  },
  mounted() {
    if (!this.margin) {
      if (this.title && this.subtitle) {
        this.marginTop = '60px'
      } else if (this.title) {
        this.marginTop = '40px'
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.info-card {
  display: flex;
  position: relative;
  margin: 10px;
  padding: 25px;
  background-color: var(--el-bg-color);
  border-radius: 10px;
  box-shadow: var(--el-box-shadow-lighter);

  .title {
    position: absolute;
    left: 25px;
    top: 20px;
    font-weight: bold;
    font-size: 20px;
  }

  .subtitle {
    position: absolute;
    left: 25px;
    top: 47px;
    font-size: 15px;
    color: var(--el-text-color-secondary);
  }
}
</style>
