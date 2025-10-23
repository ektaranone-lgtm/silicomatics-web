import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Debug logging for GitHub Pages
console.log('App starting...', {
  baseUrl: import.meta.env.BASE_URL,
  mode: import.meta.env.MODE
})

const app = createApp(App)

app.use(router)

// Wait for router to be ready before mounting
router.isReady().then(() => {
  console.log('Router ready, mounting app...')
  app.mount('#app')
}).catch(err => {
  console.error('Router error:', err)
})
