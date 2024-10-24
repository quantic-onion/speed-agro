import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// font-awesome-icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// font-awesome-icons
library.add(fas);
library.add(far);
library.add(fab);
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
