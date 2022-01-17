<template>
    <Live2d />
    <el-row>
        <el-col :span="8" :offset="8">
            <el-card class="card_wrap" v-if="state.login_register">
                <el-form ref="form">
                    <el-form-item label="账号">
                        <el-input v-model="state.login_form.account" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="state.login_form.password" show-password placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
                <span @click="()=>{state.login_register = !state.login_register}" class="toggle">去注册 ></span>
            </el-card>
            <el-card class="card_wrap" v-else>
                <el-form ref="form">
                    <el-form-item label="账号">
                        <el-input v-model="state.register_form.account" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="state.register_form.password" show-password placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="state.register_form.name" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="userRegister">注册</el-button>
                    </el-form-item>
                </el-form>
                <span @click="()=>{state.login_register = !state.login_register}" class="toggle">去登录 ></span>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import Live2d from '../components/Live2d.vue'
import GlobalVariables from '../components/GlobalVariables'
import { getUserInfo, register } from '../../static/fs.js'
import { ElMessage } from 'element-plus'
import { setCookie } from '../../static/common.js'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  components: {
    Live2d: Live2d
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const state = reactive({
      user: '',
      password: '',
      login_form: {
          account: '',
          password: ''
      },
      register_form: {
          account: '',
          password: '',
          name: ''
      },
      login_register: 1,
    })
    onBeforeMount(() => {})
    function login () {
        if(state.login_form.account == '' || state.login_form.password == '') {
            ElMessage.warning('请输入账号密码！')
        }else {
            getUserInfo(state.login_form.account).then((res) => {
                console.log(res)
                if(res.length == 0) {
                    ElMessage.error('哦豁，账号密码错误！')
                }else {
                    let user_info = res[0].attributes
                    let psd = user_info.password
                    if(psd == state.login_form.password) {
                        ElMessage.success('登陆成功，欢迎回来！')
                        proxy.globalVariables.user = user_info.name
                        proxy.globalVariables.account = user_info.account
                        setCookie('name', user_info.name, 7)
                        setCookie('account', user_info.account, 7)
                        // router.push({name: 'HomePage'})
                        window.location.reload()
                    }else {
                        ElMessage.error('哦豁，账号密码错误！')
                    }
                }
            })
        }
        
        console.log(GlobalVariables.user)
    }
    function userRegister () {
        getUserInfo(state.register_form.account).then(res => {
            console.log(res)
            if(res.length > 0) {
                ElMessage.error('账号已存在，请直接登录！')
            }else {
                register(state.register_form)
                ElMessage.success('注册成功，请登录！')
                state.login_register = 1
                state.register_form = {
                    account: '',
                    password: '',
                    name: ''
                }
            }
        })
    }
    function remove () {
      localStorage.removeItem('user')
    }
    return { state, login, userRegister, remove }
  }
})
</script>

<style scoped>
.card_wrap {
    position: relative;
    top: 25vh;
    padding-bottom: 20px;
}
.btn {
     width:70px;
     position:absolute;
     left:50%;
     margin-left:-35px;
}
.toggle {
    font-size: 12px;
    color: #409eff;
    float: right;
    cursor: pointer;
}
</style>
