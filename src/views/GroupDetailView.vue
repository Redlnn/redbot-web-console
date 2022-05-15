<template>
  <div ref="dialog" style="display: flex; justify-content: center; height: calc(100vh - 90px)">
    <div
      v-if="group.name"
      style="display: flex; flex-direction: column; height: 100%; max-width: 1600px; overflow: hidden"
    >
      <el-descriptions :column="1" :title="`${group.name} (${group.groupId})`">
        <el-descriptions-item label="Bot 名片">
          {{ group.accountName }}
          <span class="edit-name" @click="changeName"><Edit32Filled /></span>
        </el-descriptions-item>
        <el-descriptions-item label="Bot 权限">{{ group.accountPerm }}</el-descriptions-item>
        <el-descriptions-item label="成员数量">{{ group.members.length }}</el-descriptions-item>
      </el-descriptions>
      <div style="flex-grow: 1">
        <el-table :data="group.members" style="width: 100%" :max-height="height - 340" stripe lazy>
          <el-table-column label="群名片" min-width="310">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-avatar
                  :size="40"
                  :icon="Person12Filled"
                  :src="`http://q1.qlogo.cn/g?b=qq&nk=${scope.row.memberId}&s=640`"
                />
                <span style="margin-left: 10px">{{ scope.row.name }} ({{ scope.row.memberId }})</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="权限" width="80" align="center">
            <template #default="scope">
              <el-tag
                :type="scope.row.permission === '群主' ? 'success' : scope.row.permission === '管理员' ? '' : 'info'"
              >
                {{ scope.row.permission }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="头衔" width="130" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.specialTitle" type="warning">
                {{ scope.row.specialTitle }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="入群时间" prop="joinTimestamp" width="200"></el-table-column>
          <el-table-column label="上次发言时间" prop="joinTimestamp" width="200"></el-table-column>
          <el-table-column align="right" width="150">
            <template #default="scope">
              <el-dropdown split-button type="primary" trigger="click">
                查看资料
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item> 私聊 </el-dropdown-item>
                    <el-dropdown-item
                      v-if="group.accountPerm === '管理员' || group.accountPerm === '群主'"
                      @click="handleMute(scope.$index, scope.row)"
                    >
                      禁言
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="group.accountPerm === '管理员' || group.accountPerm === '群主'"
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      踢掉
                    </el-dropdown-item>
                    <el-dropdown-item v-if="group.accountPerm === '管理员' || group.accountPerm === '群主'">
                      修改名片
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="padding: 20px 20px 20px 0">
        <div style="float: right">
          <el-button type="success">发消息</el-button>
          <el-button v-if="group.accountPerm === '管理员' || group.accountPerm === '群主'" type="warning">
            全员禁言
          </el-button>
          <el-button type="danger">退群</el-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="text-align: center">
        <div style="font-size: 100px; padding-top: 100px">🤔</div>
        <div style="font-size: 35px">Bot 未加入该群噢</div>
        <div style="margin-top: 4px; margin-bottom: 20px">404 Not Found</div>
        <el-button onclick="window.history.back()">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Person12Filled, Edit32Filled } from '@vicons/fluent'
import { ElMessageBox, ElMessage } from 'element-plus'

interface Member {
  memberId: string // QQ 号
  name: string // 显示名称
  permission: string // 群权限
  specialTitle: string | null // 特殊头衔
  joinTimestamp: string | number | null // 加入时间
  lastSpeekTimestamp: string | number | null // 最后发言时间
}

interface Group {
  groupId: string // 群号
  name: string // 群名
  accountPerm: string // Bot 在群中的权限
  accountName: string // Bot 名片
  members: Array<Member>
}

export default defineComponent({
  components: {
    Edit32Filled,
  },
  setup() {
    const { width, height } = useWindowSize()
    return {
      width,
      height,
      Person12Filled,
    }
  },
  data() {
    return {
      tableHeight: 100,
      group: {} as Group,
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    changeName: function () {
      ElMessageBox.prompt('请输入要修改为的群名片', '修改群名片', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          ElMessage({
            type: 'success',
            message: `You input: ${value}`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          })
        })
    },
    handleMute(index: number, row: Group) {
      console.log(index, row)
    },
    handleDelete(index: number, row: Group) {
      console.log(index, row)
    },
    load() {
      if (this.$route.params.groupId !== '941310484') return
      this.group = {
        groupId: this.$route.params.groupId as string,
        name: 'Graia Framework Community',
        accountPerm: '管理员',
        accountName: 'Abot',
        members: [
          {
            memberId: '1846913566',
            name: 'GreyElaina',
            permission: '群主',
            specialTitle: null,
            joinTimestamp: new Date(1632061696000).toLocaleString(),
            lastSpeekTimestamp: new Date(1648045786000).toLocaleString(),
          },
          {
            memberId: '2907489501',
            name: '懒寄块',
            permission: '管理员',
            specialTitle: null,
            joinTimestamp: 1632061696000,
            lastSpeekTimestamp: 1648045786000,
          },
          {
            memberId: '2892771624',
            name: 'Bryock不可思议',
            permission: '管理员',
            specialTitle: null,
            joinTimestamp: 1632061696000,
            lastSpeekTimestamp: 1648045786000,
          },
          {
            memberId: '2948531755',
            name: '群菜鸮',
            permission: '成员',
            specialTitle: null,
            joinTimestamp: 1632061696000,
            lastSpeekTimestamp: 1648045786000,
          },
          {
            memberId: '2544704967',
            name: '霖念',
            permission: '成员',
            specialTitle: null,
            joinTimestamp: 1632061696000,
            lastSpeekTimestamp: 1648045786000,
          },
          {
            memberId: '731347477',
            name: '群菜狗',
            permission: '成员',
            specialTitle: null,
            joinTimestamp: 1632061696000,
            lastSpeekTimestamp: 1648045786000,
          },
        ],
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.edit-name {
  cursor: pointer;
  transition: color 0.2s;

  svg {
    height: 1.5em;
    vertical-align: middle;
  }

  &:hover {
    color: var(--el-text-color-primary);
  }

  &:active,
  &:focus {
    svg {
      transform: scale(0.9);
    }
  }
}

.el-avater {
  flex-shrink: 0;
}
</style>
