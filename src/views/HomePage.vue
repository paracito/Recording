<template>
    <div>
        homepage
    </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount } from 'vue'

export default defineComponent({
    setup() {
        const state = reactive({
            user: ''
        })
        onBeforeMount(() => {})
        return { state }
    },
})
</script>
