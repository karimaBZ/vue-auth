import Vue from 'vue';
import * as VueMaterial from 'vue-material';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;
Vue.use(VueMaterial.default);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
