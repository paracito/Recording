import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import ElementPlus from 'element-plus'
import ElementPlusIcons from 'element-plus'
import 'element-plus/dist/index.css'
import globalVariables from './components/GlobalVariables'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(ElementPlusIcons)

app.config.globalProperties.globalVariables = globalVariables

app.mount('#app')
