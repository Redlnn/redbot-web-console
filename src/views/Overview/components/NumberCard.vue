<template>
  <div class="number-card" :style="{ backgroundColor: color, color: textColor }">
    <div style="margin-right: 10px">
      <span style="font-weight: bold; font-size: 40px">{{ num }}</span>
      <span>{{ unit }}</span>
    </div>
    <div style="display: flex; flex-direction: column">
      <span>{{ desc1 }}</span>
      <span>{{ desc2 }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'var(--el-color-primary)',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
    num: {
      type: [String, Number],
      default: '0',
    },
    unit: [String, Number],
    desc1: [String, Number],
    desc2: [String, Number],
  },
})
</script>

<style lang="scss" scoped>
.number-card {
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px 20px;
  height: 70px;
  border-radius: 10px;
  white-space: nowrap;
}
</style>
