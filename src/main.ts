import { createApp } from 'vue'

import { VueQueryPlugin } from "@tanstack/vue-query";


import './style.css'
import App from './App.vue'

const app = createApp(App);

//app.use(VueQueryPlugin)
VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000*120, // 2 minutos
        refetchOnReconnect: 'always'
      }
    }
  }
})
app.mount('#app')
