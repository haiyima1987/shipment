import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import '@/setup/font-awesome';
import YoValidator from '@/setup/yo-validator';
import apiHandler from '@/utils/handlers/ApiHandler';

apiHandler.setInterceptors(store);

const app = createApp(App);

app.config.globalProperties.$validator = YoValidator;
app.provide('$validator', YoValidator)

app.use(router)
  .use(store)
  .use(YoValidator)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
