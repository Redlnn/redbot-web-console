<template>
  <div ref="appwrapper" class="app-wrapper">
    <div class="sidebar" :style="sidebarSytles">
      <div class="sidebar-info">
        <img height="34" :style="{ marginRight: hideSidebarText ? '0' : '5px' }" src="@/assets/logo.png" />
        <span v-if="!hideSidebarText">Redbot Admin</span>
      </div>
      <el-scrollbar style="height: calc(100vh - 120px)">
        <el-menu
          class="sidebar-menu"
          background-color="#232121"
          text-color="#a5a3a3"
          active-text-color="#fffdfd"
          :collapse="sidebarCollapsed"
          :default-active="
            '/' +
            $route.path.split('/')[1] +
            ($route.path.split('/').length >= 3 ? '/' + $route.path.split('/')[2] : '')
          "
          router
        >
          <el-menu-item index="/dashboard">
            <el-icon><AreaChartTwotone /></el-icon>
            <template #title>概览</template>
          </el-menu-item>
          <el-menu-item index="">
            <el-icon><Person20Filled /></el-icon>
            <template #title>好友管理</template>
          </el-menu-item>
          <el-menu-item index="/dashboard/group">
            <el-icon><People20Filled /></el-icon>
            <template #title>群组管理</template>
          </el-menu-item>
          <el-menu-item index="">
            <el-icon><AppFolder24Filled /></el-icon>
            <template #title>模块管理</template>
          </el-menu-item>
          <el-menu-item index="">
            <el-icon><FolderTwotone /></el-icon>
            <template #title>文件管理</template>
          </el-menu-item>
          <el-menu-item index="">
            <el-icon><TerminalTwotone /></el-icon>
            <template #title>控制台</template>
          </el-menu-item>
          <el-menu-item index="/dashboard/test">
            <el-icon><Debug /></el-icon>
            <template #title>测试页</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
      <div
        class="sidebar-info"
        :style="{
          padding: sidebarCollapsed ? '0' : '0 20px',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
        }"
      >
        <span style="display: flex; align-items: center">
          <el-avatar
            :size="34"
            :style="{ marginRight: hideSidebarText ? '0' : '5px' }"
            :icon="PhotoRound"
            :src="`http://q1.qlogo.cn/g?b=qq&nk=${getUserId()}&s=100`"
          />
          <span v-if="!hideSidebarText" style="display: inline-block">
            <p style="margin: 0; margin-bottom: 3px; line-height: 1em">{{ getUserId() }}</p>
            <p
              style="
                font-size: 0.8em;
                margin: 0;
                font-weight: normal;
                line-height: 1em;
                color: var(--el-text-color-placeholder);
              "
            >
              管理员
            </p>
          </span>
        </span>
        <span v-if="!hideSidebarText" class="logout-btn" @click="logout">
          <el-icon>
            <ExitToAppTwotone />
          </el-icon>
        </span>
      </div>
    </div>
    <transition name="fade">
      <div v-if="mask" class="mask" @click="hideMask"></div>
    </transition>
    <div class="container">
      <div ref="navbar" class="navbar" :style="{ backgroundColor: isDark ? '#232121' : '#fff' }">
        <ul class="navbar-items-group-left">
          <li class="navbar-item icon-btn hide-sidebar-btn" index="">
            <el-icon @click="sidebarButtomHandler">
              <MenuOpenRound />
            </el-icon>
          </li>
          <li class="navbar-item" index="/dashboard">控制台</li>
          <li class="navbar-item" index="/about">关于</li>
          <li class="navbar-item" index="/login">登录</li>
        </ul>
        <ul class="navbar-items-group-right">
          <li class="navbar-item icon-btn" index="">
            <a href="https://github.com/Redlnn/redbot-web-console" target="_blank">
              <el-icon>
                <LogoGithub />
              </el-icon>
            </a>
          </li>
          <li class="navbar-item icon-btn" index="">
            <div @click="toggleDark()">
              <el-icon v-if="isDark">
                <WbSunnyTwotone />
              </el-icon>
              <el-icon v-else>
                <WeatherMoon16Filled />
              </el-icon>
            </div>
          </li>
        </ul>
      </div>
      <div class="backtop">
        <el-scrollbar>
          <n-back-top />
          <!-- <el-backtop target=".backtop .el-scrollbar__wrap" /> -->
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWindowSize, useEventListener } from '@vueuse/core'
import {
  AreaChartTwotone,
  ExitToAppTwotone,
  FolderTwotone,
  MenuOpenRound,
  TerminalTwotone,
  PhotoRound,
  WbSunnyTwotone,
} from '@vicons/material'
import { Debug, LogoGithub } from '@vicons/carbon'
import { AppFolder24Filled, People20Filled, Person20Filled, WeatherMoon16Filled } from '@vicons/fluent'
import { isDark, toggleDark } from '@/composables'

export default defineComponent({
  components: {
    AppFolder24Filled,
    AreaChartTwotone,
    Debug,
    ExitToAppTwotone,
    FolderTwotone,
    LogoGithub,
    MenuOpenRound,
    People20Filled,
    Person20Filled,
    TerminalTwotone,
    WbSunnyTwotone,
    WeatherMoon16Filled,
  },
  beforeRouteUpdate(to, from, next) {
    for (const group of (this.$refs.navbar as HTMLDivElement).childNodes) {
      for (const item of group.childNodes) {
        ;(item as HTMLElement).classList.remove('is-actived')
        const index = (item as HTMLElement).getAttribute('index')
        if (index) {
          if (index === to.path) {
            ;(item as HTMLElement).classList.add('is-actived')
            continue
          }
          useEventListener(item as HTMLElement, 'click', () => {
            this.$router.push(index)
          })
        }
      }
    }
    next()
  },
  setup() {
    const { width, height } = useWindowSize()

    return {
      width,
      height,
      PhotoRound,
      isDark,
      toggleDark,
    }
  },
  data() {
    return {
      sidebarCollapsed: false,
      sidebarHided: false,
      sidebarSytles: {} as object,
      hideSidebarText: false,
      mask: false,
    }
  },
  watch: {
    width: 'hideSidebar',
  },
  mounted() {
    this.hideSidebar()
    for (const group of (this.$refs.navbar as HTMLDivElement).childNodes) {
      for (const item of group.childNodes) {
        ;(item as HTMLElement).classList.remove('is-actived')
        const index = (item as HTMLElement).getAttribute('index')
        if (index) {
          if (index === this.$route.path) {
            ;(item as HTMLElement).classList.add('is-actived')
            continue
          }
          useEventListener(item as HTMLElement, 'click', () => {
            this.$router.push(index)
          })
        }
      }
    }
  },
  methods: {
    getUserId: function () {
      return '731347477'
    },
    navbarItemClickHandler: function (index: string) {
      return () => {
        this.$router.push(index)
      }
    },
    sidebarButtomHandler: function () {
      if (this.width > 900) this.collapseSidebar()
      else {
        this.sidebarSytles['transition'] = 'left 0.2s ease'
        this.mask = true
        this.sidebarHided = false
        this.sidebarSytles['left'] = '0'
      }
    },
    hideMask: function () {
      this.mask = false
      this.sidebarHided = true
      this.sidebarSytles['left'] = '-255px'
    },
    hideSidebar: function () {
      const appwrapper = this.$refs.appwrapper as HTMLDivElement

      if (this.width <= 900) {
        if (this.sidebarHided) return
        this.sidebarSytles['transition'] = 'left var(--el-transition-duration) linear'
        appwrapper.classList.add('sidebar-hide')
        this.sidebarHided = true
        if (this.mask)
          setTimeout(() => {
            if (this.width <= 900) this.sidebarSytles['left'] = '-255px'
            else this.hideSidebar()
          }, 300)
        else this.sidebarSytles['left'] = '-255px'
        if (this.sidebarCollapsed) setTimeout(this.collapseSidebar, 300)
      } else {
        if (!this.sidebarHided) return
        this.sidebarSytles['transition'] = ''
        appwrapper.classList.remove('sidebar-hide')
        this.sidebarHided = false
        this.sidebarSytles['left'] = '0'
      }
      if (this.mask) setTimeout(() => (this.mask = false), 300)
    },
    collapseSidebar: function () {
      const appwrapper = this.$refs.appwrapper as HTMLDivElement
      if (!this.sidebarCollapsed) {
        appwrapper.classList.add('sidebar-collapse')
        this.hideSidebarText = true
      }
      if (this.sidebarCollapsed) {
        appwrapper.classList.remove('sidebar-collapse')
        setTimeout(() => {
          this.hideSidebarText = false
        }, 300)
      }
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    logout: function () {
      this.$lib.common.removeData('token')
      this.$router.push('/login')
    },
  },
})
</script>

<style lang="scss" scoped>
@import './sidebar.scss';
@import './navbar.scss';

.app-wrapper {
  position: relative;
  background-color: var(--el-fill-color);
  min-height: 100%;
  width: 100%;
  overflow: hidden;
}

.backtop {
  width: 100%;
  height: calc(100vh - 59px);
}

.sidebar-collapse {
  .container,
  .navbar {
    margin-left: 64px;
  }
  .navbar {
    width: calc(100vw - 64px);
  }
}

.sidebar-hide {
  .container,
  .navbar {
    width: 100%;
    margin-left: unset;
  }
}

.container {
  position: relative;
  min-height: 100vh;
  margin-left: 250px;
  padding-top: 59px;
  transition: margin-left var(--el-transition-duration) linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}

.slide-fade-enter-active {
  position: absolute;
  width: 100%;
  transition: all var(--el-transition-duration) cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-fade-leave-active {
  position: absolute;
  width: 100%;
  transition: all var(--el-transition-duration) cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
