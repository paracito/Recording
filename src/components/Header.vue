<template>
    <div class="header">
        <el-row>
            <el-col :span="12">
                <div style="display:flex; align-items:center">
                    <img src="../assets/logo.png" alt="" style="height: 60px">
                    <span>咔哒咔哒打打卡卡</span>
                </div>
            </el-col>
            <el-col :span="3" :offset="8">
                <div class="user_name">
                    <el-avatar style="cursor: pointer;" :size="40" @click="showPersonalInfo" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    <span style="cursor: pointer;margin-left:10px" @click="showPersonalInfo">{{ state.user_info.name }}</span>
                </div>
            </el-col>
            <el-col :span="1">
                <!-- <el-icon><back /></el-icon> -->
                <img style="height:20px;margin-top:20px;cursor:pointer" src="../assets/log_out.png" @click="logOut" alt="">
            </el-col>
        </el-row>
        <el-dialog
            v-model="state.personal_info_flag"
            title="个人信息"
            width="50%"
            :before-close="handleClose"
        >
            <el-form class="form" ref="form">
                <el-form-item label="账号">
                    <el-input v-model="state.user_info.account" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="state.user_info.name" :disabled="state.edit_flag"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-tag style="margin-right:10px" :closable="state.edit_flag" @close="deleteLabel(item)"
                    v-for="item in state.user_info.label_list" :key="item">
                        {{ item }}
                    </el-tag>
                    <el-input
                        v-if="state.input_visible"
                        ref="InputRef"
                        v-model="state.new_tag"
                        class="w-50 m-2"
                        size="small"
                        :autofocus="state.input_visible"
                        @keyup.enter="addLabel"
                        @blur="addLabel"
                        style="width:80px"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag ml-1" size="small" @click="() => {state.input_visible = true}">
                        + New Tag
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <div style="display:flex;justify-content:center">
                        <el-button class="clockin_btn" type="primary" @click="submitData">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { getCookie } from '../../static/common'
import { getUserInfo, modifyUserInfo } from '../../static/fs'
import { ElMessage } from 'element-plus'
import { Back } from '@element-plus/icons-vue'
import { setCookie } from '../../static/common'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    components: {
        // Back
    },
    setup() {
        const { proxy } = getCurrentInstance()
        const route = useRoute()
        const router = useRouter()
        const state = reactive({
            user_info: {
                account: '',
                name: '',
                label_list: [],
            },
            edit_flag:true,
            input_visible: false,
            new_tag: '',
            personal_info_flag: false
        })
        onBeforeMount(() => {
            state.user_info.account = getCookie('account')
            state.user_info.name = getCookie('name')
            getUserInfo(state.user_info.account).then(res => {
                console.log(res[0].attributes)
                state.user_info.label_list = res[0].attributes.label_list
            })
        })
        function showPersonalInfo () {
            state.personal_info_flag = true
        }
        function logOut () {
            setCookie('account', '', -1)
            ElMessage.success('已注销登录！')
            // router.push({name: 'Login'})
            window.location.reload()
        }
        function addLabel () {
            if (state.new_tag) {
                state.user_info.label_list.push(state.new_tag)
            }
            state.input_visible = false
            state.new_tag = ''
        }
        function deleteLabel (value) {
            state.user_info.label_list.splice(state.user_info.label_list.indexOf(value), 1)
        }
        function submitData () {
            modifyUserInfo(state.user_info)
            state.personal_info_flag = false
        }
        return { state, showPersonalInfo, logOut, addLabel, deleteLabel, submitData }
    },
})
</script>
<style scoped>
.header {
    border-bottom: 1px solid #ccc;
    /* border-bottom: 1px solid #ccc; */
    height: 60px;
}
.user_name {
    height: 100%;
    display: flex;
    align-items: center;
}
.clockin_btn {
    margin: 0 auto;
}
</style>
