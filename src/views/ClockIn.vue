<template>
    <div class="wrap">
        <el-form class="form" ref="form" v-model="state.form">
            <el-form-item label="标题">
                <el-input v-model="state.form.title"></el-input>
            </el-form-item>
            <el-form-item label="日期">
                <el-input v-model="state.form.date" disabled></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-checkbox-group v-model="state.label_selected">
                    <el-checkbox v-for="item in state.label_list" :value="item" :label="item" :key="item" @change="element => selectLabel(element, item)" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="时长">
                <div v-for="item in state.label_selected" :key="item">
                    <el-input-number v-model="state.form.label[item]" size="small" :min="0.5" :max="10" :step="0.5" step-strictly />
                    <el-tag style="margin-left:10px" effect="plain">{{item}}</el-tag>
                </div>
                <!-- <el-input-number v-model="state.form.time" :min="0" :max="10" :step="0.5" step-strictly /> -->
            </el-form-item>
            <el-form-item label="评分">
                <el-rate
                    v-model="state.form.score"
                    :texts="['terrible', 'oops', 'so so', 'great', 'wonderful']"
                    show-text
                >
                </el-rate>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="state.form.content" type="textarea" :rows="5"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="clockin_btn" type="primary" @click="submitData">打卡</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { getUserInfo, getTodayRecord, addRecord, updateRecord } from '../../static/fs.js'
import { getDate } from '../../static/common.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance()
        const router = useRouter()
        const state = reactive({
            label_list: [],
            label_selected: [],
            form: {
                account: proxy.globalVariables.account,
                name: proxy.globalVariables.name,
                title: '',
                date: '',
                label: {},
                time: 0,
                score: 0,
                content: '',
            },
        })
        onBeforeMount(() => {
            state.form.date = getDate()
            getUserInfo(proxy.globalVariables.account).then(res => {
                state.label_list = res[0].attributes.label_list
            })
        })
        function selectLabel(value, item) {
            if(value) {
                state.form.label[item] = 0.5
            }else {
                delete state.form.label[item]
            }
            console.log(state.form.label)
        }
        function submitData () {
            for(let item in state.form.label) {
                state.form.time += state.form.label[item]
            }
            for(let item in state.form) {
                if(state.form[item] == '' || state.form[item] == 0) {

                }
            }
            getTodayRecord(state.form.account, state.form.date).then((res) => {
                console.log(res)
                if(res.length == 0) {
                    addRecord(state.form)
                    ElMessage.success('提交成功！')
                    updateRecord(state.form)
                    state.label_selected = []
                    state.form = {
                        account: proxy.globalVariables.account,
                        name: proxy.globalVariables.name,
                        title: '',
                        date: '',
                        label: {},
                        time: 0,
                        score: 0,
                        content: '',
                    }
                    router.push({name: 'RecordList'})
                }else {
                    ElMessageBox.confirm('今天已经打过卡，重复提交会覆盖当日打卡，确认提交？', '', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                    }).then(() => {
                        ElMessage.success('提交成功！')
                        updateRecord(state.form)
                        state.label_selected = []
                        state.form = {
                            account: proxy.globalVariables.account,
                            name: proxy.globalVariables.name,
                            title: '',
                            date: '',
                            label: {},
                            time: 0,
                            score: 0,
                            content: '',
                        }
                        router.push({name: 'RecordList'})
                    }).catch(() => {
                        ElMessage.info('已取消！')
                    })
                }
            }).catch(error => {
                console.log(error)
            })
            // addRecord(state.form).then((res) => {
            //     console.log(res)
            // })
        }
        return { state, selectLabel, submitData }
    },
})
</script>
<style scoped>
.wrap {
    /* width: 50%; */
    position: relative;
}
.form {
    width: 50%;
    position: absolute;
    left: 20%;
}
.clockin_btn {
    width: 80px;
    position: relative;
    left: 50%;
    margin-left: -40px;
}
</style>
