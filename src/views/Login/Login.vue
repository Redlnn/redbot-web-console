<template>
  <div class="login-container" style="overflow: hidden">
    <motion style="z-index: 100">
      <div class="login-box">
        <h1 class="title">login</h1>
        <div ref="user" class="input-group">
          <el-icon v-model:color="iconColor.user" class="input-icon user"><User /></el-icon>
          <input
            v-model="form.username"
            type="text"
            placeholder="帐号"
            class="input user"
            @focus="onUserFocus"
            @blur="onUserBlur"
          />
        </div>
        <div ref="pwd" class="input-group">
          <el-icon v-model:color="iconColor.pwd" class="input-icon pwd"><Lock /></el-icon>
          <input
            v-model="form.password"
            type="password"
            placeholder="密码"
            class="input pwd"
            @focus="onPwdFocus"
            @blur="onPwdBlur"
            @keyup.enter="onLogin"
          />
        </div>
        <button class="login-btn" @click="onLogin">登录</button>
        <span style="color: #5c5c5c">没有帐号？不能注册噢~</span>
        <button @click="$router.push('/')">直接进入</button>
      </div>
    </motion>
    <div class="square">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="circle">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <p class="icp">{{ icp }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElNotification } from 'element-plus'
import { User, Lock } from '@vicons/fa'
import Motion from './components/Motion.vue'

export default defineComponent({
  components: {
    Motion,
    User,
    Lock,
  },
  // beforeRouteEnter(to, from, next) {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     const jwt = JSON.parse(atob(token.split('.')[1]))
  //     if (jwt.exp * 1000 > Date.now()) {
  //       ElNotification.info('你已经登录过了，不用重复登录，正在跳转……')
  //       const redirect = from.query.redirect //如果来源路由有query
  //       if (!redirect || to.path === redirect) {
  //         next({ path: '/' })
  //       } else {
  //         next({ path: redirect.toString() }) //跳转到目的路由
  //       }
  //     } else {
  //       localStorage.removeItem('token')
  //       next()
  //     }
  //     return
  //   }
  //   next()
  // },
  data() {
    return {
      iconColor: {
        user: '#ccc',
        pwd: '#ccc',
      },
      form: {
        username: '',
        password: '',
      },
      icp: window.$icp,
    }
  },
  methods: {
    onUserFocus() {
      this.iconColor.user = '#888'
    },
    onUserBlur() {
      this.iconColor.user = '#ccc'
    },
    onPwdFocus() {
      this.iconColor.pwd = '#888'
    },
    onPwdBlur() {
      this.iconColor.pwd = '#ccc'
    },
    onLogin() {
      if (this.form.username.length === 0) {
        ElNotification.error({
          title: '错误',
          message: '用户名不能为空',
        })
        return
      }
      if (this.form.password.length === 0) {
        ElNotification.error({
          title: '错误',
          message: '密码不能为空',
        })
        return
      }

      this.$lib.requests.post({
        url: window.$loginUrl,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: this.form,
        sendSuccessMessage: true,
        success: () => {
          this.$router.push('/')
        },
        error: () => {
          this.onUserBlur()
          this.onPwdBlur()
        },
      })
    },
  },
})
</script>

<style lang="scss" scoped>
$input-width: 260px;

.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right top, #ffc5f8, #b5c9ff);
  overflow: hidden;
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 450px;
  background: #ffffffaa;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  span {
    font-size: 0.8em;
  }
}

.title {
  margin: 60px auto 20px auto;
  color: #2c2c2c;
  font-size: 26px;
  font-weight: normal;
  text-transform: uppercase;
}

.input-group {
  display: flex;
  justify-content: center;
  width: 100%;
}

.input {
  margin: 15px auto;
  width: $input-width;
  height: 30px;
  text-indent: 26px;
  background: none;
  border: none;
  border-bottom: solid 1px #ccc;
  outline: none;
  transition: all 0.3s;

  & {
    background: no-repeat;
    background-position: 8px center;
    background-size: 5%;
  }

  &::placeholder {
    color: #bbb;
  }

  &:hover {
    border-bottom: solid 1px #a0a0a0;
  }

  &:focus {
    border-bottom: solid 1px #888;
  }
}

.input-icon {
  position: absolute;
  left: 50px;
  transition: all 0.2s;

  &.user {
    top: 145px;
  }

  &.pwd {
    top: 205px;
  }
}

.login-btn {
  margin: 30px auto 45px auto;
  width: $input-width;
  height: 40px;
  border: none;
  border-radius: 25px;
  color: #fff;
  text-shadow: 0px 0px 10px #55555555;
  text-indent: 8px;
  letter-spacing: 8px;
  cursor: pointer;
  background: linear-gradient(-200deg, #ffc3f8, #adc9ff);
  opacity: 0.8;
  transition: opacity 0.2s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover,
  &:focus {
    opacity: 1;
  }

  &:active {
    transform: scale(0.98);
  }
}

ul li {
  position: absolute;
  background: #ffffffcc;
  width: 30px;
  height: 30px;
  list-style: none;
  opacity: 0;
}

.square {
  width: 0;

  li {
    border-radius: 4px;
    animation: square 5s linear infinite;

    &:nth-child(1) {
      top: 40vh;
      left: 60vw;
    }
    &:nth-child(2) {
      top: 80vh;
      left: 20vw;
      animation-delay: 2s;
    }
    &:nth-child(3) {
      top: 80vh;
      left: 85vw;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      top: 10vh;
      left: 70vw;
      animation-delay: 6s;
    }
    &:nth-child(5) {
      top: 10vh;
      left: 10vw;
      animation-delay: 8s;
    }
  }
}

@keyframes square {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(4) rotateY(1000deg);
    opacity: 0;
  }
}

.circle {
  width: 0;

  li {
    animation: circle 5s linear infinite;

    &:nth-child(1) {
      bottom: 0;
      left: 15vw;
    }
    &:nth-child(2) {
      left: 35vw;
      animation-delay: 2s;
    }
    &:nth-child(3) {
      left: 55vw;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 75vw;
      animation-delay: 6s;
    }
    &:nth-child(5) {
      left: 90vw;
      animation-delay: 8s;
    }
  }
}

@keyframes circle {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
    bottom: 0;
    border-radius: 0%;
  }
  100% {
    transform: scale(4) rotate(1000deg);
    opacity: 0;
    bottom: 90vh;
    border-radius: 50%;
  }
}

.icp {
  position: absolute;
  bottom: 0px;
  color: #ffffffaa;
}
</style>
