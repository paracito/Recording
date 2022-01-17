<template>
    <div class="content">
        <el-collapse accordion class="content_list">
            <el-collapse-item v-for="item in state.record_list" :name="item.id" :key="item.id">
                <template #title>
                    <h3>{{ item.title }}</h3>
                    <span class="date">{{ item.date }}</span>
                </template>
                <el-divider class="divider">
                    <el-icon><star-filled /></el-icon>
                    <el-icon v-if="item.score >= 2"><star-filled /></el-icon>
                    <el-icon v-if="item.score >= 3"><star-filled /></el-icon>
                    <el-icon v-if="item.score >= 4"><star-filled /></el-icon>
                    <el-icon v-if="item.score >= 5"><star-filled /></el-icon>
                </el-divider>
                <div>
                    <el-tag v-for="(value, key) in item.label_list" :key="key">{{ key+': '+value+'h' }}</el-tag>
                </div>
                <p class="detail">
                    {{ item.content }}
                </p>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { query, getRecordList } from '../../static/fs.js'
import {
  StarFilled
} from '@element-plus/icons-vue'

export default defineComponent({
    components: {
        StarFilled
    },
    setup() {
        const { proxy } = getCurrentInstance()
        const state = reactive({
            record_list: []
        })
        onBeforeMount(() => {
            getData()
        })
        function getData () {
            getRecordList(proxy.globalVariables.account).then((res) => {
                console.log(res)
                for(let item of res) {
                    state.record_list.push(item.attributes)
                }
            })
        }
        return { state }
    },
})
</script>
<style scoped>
.content {
    position: relative;
    padding: 0 20px;
}
.content_list {
    position: relative;
}
.el-collapse-item__header {
    border-bottom: 1px solid #333 !important;
}
h3 {
    font-size: 18px;
}
.date {
    position: absolute;
    right: 50px;
    font-size: 16px;
    color: #aaa;
}
.divider {
    width:90%;
    margin-left: 5%;
}
.detail {
    margin-top: 20px;
    font-size: 14px;
    padding-left: 10px;
    border-left: 3px solid #000;
}
</style>
