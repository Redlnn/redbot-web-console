<template>
  <div ref="signinCount" class="signin-count">
    <div ref="chart" :style="{ width: divWidth }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useResizeObserver, useWindowSize } from '@vueuse/core'
import * as echarts from 'echarts'

let chart: echarts.ECharts

export default defineComponent({
  name: 'SigninCount',
  setup() {
    const { width } = useWindowSize()
    return {
      width,
    }
  },
  data() {
    return {
      divWidth: '100%',
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
    useResizeObserver(this.$refs.signinCount as HTMLDivElement, (entries) => {
      const entry = entries[0]
      const { width } = entry.contentRect
      this.divWidth = width > 550 ? '550px' : '100%'
      chart.resize()
    })
    chart = echarts.init(this.$refs.chart as HTMLDivElement)
    this.getsigninAnalysis()
    setTimeout(chart.resize, 10)
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
        axisPointer: {
          link: { xAxisIndex: 'all' },
        },
        grid: [
          {
            top: '20%',
            left: '8%',
            bottom: '10%',
            right: '8%',
          },
        ],
        xAxis: [
          {
            type: 'category',
            inverse: true,
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
            name: '签到人数',
            type: 'bar',
            label: {
              show: false,
            },
            itemStyle: {
              borderRadius: [8, 8, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#409effCC',
                },
                {
                  offset: 1,
                  color: '#409eff99',
                },
              ]),
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
    getsigninAnalysis: function () {
      this.data = {
        周四: Math.round(Math.random() * 100),
        周五: Math.round(Math.random() * 100),
        周六: Math.round(Math.random() * 100),
        周日: Math.round(Math.random() * 100),
        周一: Math.round(Math.random() * 100),
        昨天: Math.round(Math.random() * 100),
        今天: Math.round(Math.random() * 100),
      }
      // this.$lib.requests.get({
      //   url: window.$apiUrl + '/overview/get_signin_sent_freq',
      //   // eslint-disable-next-line
      //   success: (res: any) => {
      //     this.data = res
      //   },
      // })
    },
  },
})
</script>

<style scoped>
.signin-count {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 215px;
}

.signin-count > div {
  height: 100%;
}
</style>
