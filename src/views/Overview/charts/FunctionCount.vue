<template>
  <div ref="functionCount" class="function-count">
    <div ref="chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts'

let chart: echarts.ECharts

export default defineComponent({
  name: 'FunctionCount',
  data() {
    return {
      divWidth: 0,
      data: [] as object[],
    }
  },
  watch: {
    data: {
      handler: function () {
        this.load()
      },
      deep: true,
    },
    divWidth: function () {
      if (this.data.length === 0) return
      chart.resize()
      this.load()
    },
  },
  mounted() {
    useResizeObserver(this.$refs.functionCount as HTMLDivElement, (entries) => {
      const entry = entries[0]
      const { width } = entry.contentRect
      this.divWidth = width
    })
    chart = echarts.init(this.$refs.chart as HTMLDivElement)
    this.getFunctionUsed()
  },
  methods: {
    load: function () {
      let center: string[]
      let radius: string[]

      if (this.divWidth < 390) {
        center = ['70%', '50%']
        radius = ['50%', '60%']
      } else if (this.divWidth < 500) {
        center = ['77%', '50%']
        radius = ['50%', '70%']
      } else {
        center = ['75%', '50%']
        radius = ['60%', '85%']
      }

      const option = {
        legend: {
          type: 'scroll',
          orient: 'vertical',
          x: 'left',
          y: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        series: {
          type: 'pie',
          radius: radius,
          center: center,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            fontSize: '20',
            fontWeight: 'bold',
            position: 'center',
            formatter: '{b}\n\n{c}',
          },
          minAngle: 10,
          data: [] as any[], // eslint-disable-line
        },
      }

      for (const item of this.data) {
        option.series.data.push({
          name: item['function_name'],
          value: item['function_called_count'],
        })
      }

      option.series.data.sort((a: { value: number }, b: { value: number }) => b.value - a.value)
      option.series.data[0].selected = true
      option.series.data[0].label = { show: true }

      chart.setOption(option)
    },
    getFunctionUsed: function () {
      this.$lib.requests.get({
        url: window.$apiUrl + '/overview/get_function_called',
        // eslint-disable-next-line
        success: (res: any) => {
          this.data = res.called
        },
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.function-count {
  width: 450px;
  height: 250px;
}

@media screen and (max-width: 530px) {
  .function-count {
    width: 300px;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1300px) {
  .function-count {
    width: 300px;
  }
}

@media screen and (min-width: 1500px) {
  .function-count {
    width: 500px;
  }
}

.function-count > div {
  width: 100%;
  height: 100%;
}
</style>
