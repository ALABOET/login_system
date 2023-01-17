import { createApp } from 'vue'
import App from './App.vue'
import router from './containers/LoginSystem/routes/router';
import { store } from './containers/LoginSystem/stores/store';

createApp(App).use(router).use(store).mount('#app')
