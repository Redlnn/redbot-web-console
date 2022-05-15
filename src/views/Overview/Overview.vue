<template>
  <div ref="container">
    <el-row style="margin: 15px">
      <el-col v-loading="loading" :span="24">
        <div style="display: flex; flex-wrap: wrap">
          <NumberCard
            color="#EE4266"
            :num="infoCardData.today_msg_count"
            unit="条"
            desc1="今日"
            desc2="消息接收数"
          ></NumberCard>
          <NumberCard
            color="#540D6E"
            :num="infoCardData.function_called_count"
            unit="次"
            desc1="今日"
            desc2="Bot调用数"
          ></NumberCard>
          <NumberCard
            color="#FFD23F"
            text-color="#303133"
            :num="infoCardData.running_time.duration"
            :unit="infoCardData.running_time.unit"
            desc1="持续运行时长"
          ></NumberCard>
          <NumberCard color="#3BCEAC" :num="infoCardData.joined_group_count" unit="个" desc1="加入群组数"></NumberCard>
          <NumberCard
            color="#0EAD69"
            :num="infoCardData.module_loaded_count"
            unit="个"
            desc1="已加载模块数"
          ></NumberCard>
        </div>
      </el-col>
      <el-col :sm="24" :lg="12">
        <InfoCard title="调用统计" subtitle="今天调用次数前5的功能" height="300px" :x-center="true" :y-center="true">
          <function-count />
        </InfoCard>
      </el-col>
      <el-col :sm="24" :lg="12">
        <InfoCard title="消息统计" height="300px" margin="0" max-width>
          <message-count />
        </InfoCard>
      </el-col>
      <el-col :sm="24" :lg="12">
        <InfoCard title="签到统计" height="265px" margin="0" :x-center="true" max-width>
          <signin-count />
        </InfoCard>
      </el-col>
      <el-col :sm="24" :lg="12">
        <InfoCard title="系统信息" subtitle="每分钟更新一次" height="265px" :y-center="true" max-width>
          <sys-info />
        </InfoCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NumberCard from './components/NumberCard.vue'
import InfoCard from './components/InfoCard.vue'
import FunctionCount from './charts/FunctionCount.vue'
import MessageCount from './charts/MessageCount.vue'
import SysInfo from './charts/SysInfo.vue'
import SigninCount from './charts/SigninCount.vue'

export default defineComponent({
  components: {
    FunctionCount,
    InfoCard,
    MessageCount,
    NumberCard,
    SysInfo,
    SigninCount,
  },
  data() {
    return {
      loading: true,
      infoCardData: {
        today_msg_count: 0,
        function_called_count: 0,
        joined_group_count: 0,
        module_loaded_count: 0,
        running_time: {
          duration: 0,
          unit: 's',
        },
      },
    }
  },
  mounted() {
    this.getInfoCardData()
  },
  methods: {
    getInfoCardData: function () {
      this.$lib.requests.get({
        url: window.$apiUrl + '/overview/get_info_card',
        // eslint-disable-next-line
        success: (res: any) => {
          this.infoCardData = res
        },
        complete: () => {
          this.loading = false
        },
      })
    },
  },
})
</script>

<style lang="scss" scoped></style>
