<template>
  <div v-if="state.login_flag">
    <Header />
    <el-row>
      <el-col :span="4">
        <Menu />
      </el-col>
      <el-col :span="20" style="padding:20px">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
  <Login v-else/>
</template>

<script>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Login from './views/Login.vue'
import { defineComponent, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { getCookie } from '../static/common'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Menu,
    Login
  },
  setup() {
      const { proxy } = getCurrentInstance()
      const state = reactive({
          login_flag: 0
      })
      onBeforeMount(() => {
        console.log('cookie:', document.cookie)
        const account = getCookie('account')
        if(account) {
          state.login_flag = 1
          proxy.globalVariables.account = account
          proxy.globalVariables.name = name
        }else {
          state.login_flag = 0
        }
      })
      return { state }
  },
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50;
  margin-top: 60px; */
}
</style>
