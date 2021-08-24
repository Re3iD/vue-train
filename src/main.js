import { createApp } from 'vue'

import App from './App'
import components from "./components/UI"
import router from './router/router'
import directives from "./directives/index"
import store from './store'

const app = createApp(App)

components.forEach(comp=>{
    app.component(comp.name,comp)
})

directives.forEach(dir=>{
    app.directive(dir.name, dir)
})

app
    .use(store)
    .use(router)
    .mount('#app')