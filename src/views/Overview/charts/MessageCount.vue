<template>
  <div ref="messageCount" class="message-count">
    <div ref="chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useResizeObserver, useWindowSize } from '@vueuse/core'
import * as echarts from 'echarts'

let chart: echarts.ECharts

export default defineComponent({
  name: 'MessageCount',
  setup() {
    const { width } = useWindowSize()
    return {
      width,
    }
  },
  data() {
    return {
      data: {} as object,
    }
  },
  watch: {
    data: {
      handler: function () {
        this.load()
      },
      deep: true,
    },
    width: 'handleResize',
  },
  mounted() {
    useResizeObserver(this.$refs.messageCount as HTMLDivElement, () => setTimeout(this.handleResize, 50))
    chart = echarts.init(this.$refs.chart as HTMLDivElement)
    this.getMessageAnalysis()
  },
  methods: {
    handleResize: function () {
      if (!chart) return
      chart.resize()
    },
    load: function () {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: true,
          },
        },
        legend: {
          data: ['发送消息数量'],
        },
        axisPointer: {
          link: { xAxisIndex: 'all' },
        },
        grid: [
          {
            bottom: '10%',
          },
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: { onZero: true },
            axisLabel: { show: true },
            data: [] as string[],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        color: ['#5f75ed'],
        series: [
          {
            name: '发送消息数量',
            type: 'line',
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 221, 255)',
                },
                {
                  offset: 1,
                  color: 'rgba(77, 119, 255)',
                },
              ]),
            },
            label: {
              show: false,
            },
            data: [] as number[],
            smooth: true,
          },
        ],
      }

      for (const time in this.data) {
        option.xAxis[0].data.unshift(time)
        option.series[0].data.unshift(this.data[time])
      }

      chart.setOption(option)
    },
    getMessageAnalysis: function () {
      this.$lib.requests.get({
        url: window.$apiUrl + '/overview/get_message_sent_freq',
        // eslint-disable-next-line
        success: (res: any) => {
          this.data = res
        },
      })
    },
  },
})
</script>

<style scoped>
.message-count {
  width: 100%;
  height: 260px;
}

.message-count > div {
  width: 100%;
  height: 100%;
}
</style>
