<template>
  <div ref="card">
    <el-dialog v-model="dialogTableVisible" fullscreen destroy-on-close @closed="handleCloseDialog">
      <router-view />
    </el-dialog>
    <el-card style="margin: 25px">
      <h3>已加入的群列表</h3>
      <el-table :data="tableData" style="width: 100%" :max-height="height - 215" stripe lazy>
        <el-table-column label="群名称" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center; cursor: pointer">
              <el-avatar
                :size="40"
                :icon="PhotoRound"
                :src="`http://p.qlogo.cn/gh/${scope.row.groupId}/${scope.row.groupId}/0`"
              />
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="群号" prop="groupId" width="100"></el-table-column>
        <el-table-column label="权限" prop="accountPerm" width="80"></el-table-column>
        <el-table-column label="群成员" prop="memCount" min-width="70"></el-table-column>
        <el-table-column align="right" width="120">
          <template #default="scope">
            <el-button type="success" @click="handleClickRow(scope)">详细信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PhotoRound } from '@vicons/material'

interface Group {
  groupId: string
  name: string
  accountPerm: string
  memCount: number
}

export default defineComponent({
  beforeRouteUpdate(to, from, next) {
    const re = new RegExp(`^/dashboard/group/(\\d+)$`)
    if (to.path === '/dashboard/group' || to.path === '/dashboard/group/') {
      this.dialogTableVisible = false
    } else if (re.test(to.path)) {
      this.dialogTableVisible = true
    }
    next()
  },
  setup() {
    const { height } = useWindowSize()
    return {
      height,
      PhotoRound,
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      tableData: [
        {
          groupId: '941310484',
          name: 'Graia Framework Community',
          accountPerm: '管理员',
          memCount: 304,
        } as Group,
        {
          groupId: '228573653',
          name: 'Bot Test',
          accountPerm: '群成员',
          memCount: 8,
        } as Group,
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.$route.params.groupId) {
        this.dialogTableVisible = true
      }
    }, 300) // 必须得加延迟不然没动画
  },
  methods: {
    handleCloseDialog() {
      if (this.$route.params.groupId) {
        this.$router.push('/dashboard/group')
      }
    },
    // eslint-disable-next-line
    handleClickRow(scope: any) {
      this.dialogTableVisible = true
      this.$router.push('/dashboard/group/' + scope.row.groupId)
    },
  },
})
</script>

<style lang="scss" scoped>
.el-avatar {
  flex-shrink: 0;
}

:deep() .el-dialog__headerbtn .el-dialog__close {
  color: var(--el-color-info-dark-2);
  font-size: 25px;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
