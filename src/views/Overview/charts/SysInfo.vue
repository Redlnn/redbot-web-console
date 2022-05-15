<template>
  <div class="descriptions">
    <div class="descriptions__cell" style="width: 120px">
      <div class="descriptions__label">CPU核心数</div>
      <div class="descriptions__content">{{ data.cpu_logical_count }}</div>
    </div>
    <div class="descriptions__cell" style="width: 130px">
      <div class="descriptions__label">内存大小</div>
      <div class="descriptions__content">{{ data.memory_total }}G</div>
    </div>
    <div class="descriptions__cell">
      <div class="descriptions__label">系统版本</div>
      <div class="descriptions__content">{{ data.system_type }} {{ data.system_version }}</div>
    </div>
  </div>
  <div class="progress">
    <div class="title">CPU</div>
    <div style="flex: 1">
      <el-progress
        :text-inside="true"
        :stroke-width="10"
        :format="() => ''"
        :percentage="data.cpu_percent"
        :indeterminate="loading"
      />
    </div>
    <div class="num">{{ data.cpu_percent }}%</div>
  </div>
  <div class="progress">
    <div class="title">内存</div>
    <div style="flex: 1">
      <el-progress
        :text-inside="true"
        :stroke-width="10"
        :format="() => ''"
        :percentage="data.memory_percent"
        :indeterminate="loading"
      />
    </div>
    <div class="num">{{ data.memory_percent }}%</div>
  </div>
  <div class="progress">
    <div class="title">储存</div>
    <div style="flex: 1">
      <el-progress
        :text-inside="true"
        :stroke-width="10"
        :format="() => ''"
        :percentage="data.disk_percent"
        :indeterminate="loading"
      />
    </div>
    <div class="num">{{ data.disk_percent }}%</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useIntervalFn } from '@vueuse/core'

export default defineComponent({
  name: 'SysInfo',
  data() {
    return {
      loading: true,
      data: {
        system_type: 'Unknown',
        system_version: 'Unknown',
        cpu_logical_count: 0,
        cpu_percent: 50,
        memory_total: 0,
        memory_percent: 50,
        disk_percent: 50,
      },
    }
  },
  mounted() {
    this.getSysInfo()
    useIntervalFn(this.getSysInfo, 60000)
  },
  methods: {
    getSysInfo: function () {
      this.$lib.requests.get({
        url: window.$apiUrl + '/overview/get_sys_info',
        // eslint-disable-next-line
        success: (res: any) => {
          this.data = res
          this.loading = false
        },
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: center;
  margin: 8px 0;

  .title {
    width: 45px;
  }

  .num {
    color: var(--el-text-color-regular);
    text-align: right;
    width: 45px;
  }
}

.descriptions {
  &__cell {
    display: inline-flex;
    margin-top: 8px;
    align-items: center;
  }

  &__label {
    display: inline;
    margin-right: 16px;
    white-space: nowrap;
  }

  &__content {
    display: inline;
    color: var(--el-text-color-regular);
  }
}
</style>
