import Vue from 'vue';

import App from './App';
import router from './router';

console.log('This is a console in main js');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')