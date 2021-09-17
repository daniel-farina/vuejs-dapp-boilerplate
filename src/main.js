import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Bootstrap stuff (css)
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//Toast alerts
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
    // You can set your default options here
};

createApp(App).use(Toast, {position: POSITION.BOTTOM_RIGHT,  timeout: 2000 }).use(store).use(router).mount('#app')
