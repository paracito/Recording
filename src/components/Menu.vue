<template>
    <div id="wrap">
        <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
        >
            <router-link :to="item.link" v-for="item in menu_list" :key="item.index">
                <el-menu-item :index="item.index">
                    <el-icon><icon-menu /></el-icon>
                    <el-icon><histogram /></el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance()
        const route = useRoute()
        const menu_list = [
            {
                name: '首页',
                index: 1,
                icon: '',
                link: '/'
            },
            {
                name: '列表',
                index: 2,
                icon: '',
                link: '/recordlist'
            },
            {
                name: '打卡',
                index: 3,
                icon: '',
                link: '/clockin'
            },
        ]
        const state = reactive({
            user: ''
        })
        onMounted(() => {
            let wrap = document.getElementById('wrap')
            let height = proxy.globalVariables.srceenHeight
            wrap.style.height = height - 60 + 'px'
        })
        function linkTo (url) {

        }
        return { menu_list, state, linkTo }
    },
})
</script>
<style scoped>
#wrap {
    border-right:1px solid #ccc;
}
.el-menu {
    border-right: 0;
}
</style>
