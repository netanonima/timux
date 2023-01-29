import { createApp } from 'vue'
import moment from 'moment';
import App from './App.vue'

moment.locale('fr');

const app = createApp(App);

app.config.globalProperties.moment=moment;

app.mount('#app');
