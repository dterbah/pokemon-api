
import Vue from 'vue'
import Vuex from 'vuex';

import VueApexCharts from 'vue-apexcharts';
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import AsyncComputed from 'vue-async-computed';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueApexCharts);
Vue.use(AsyncComputed);

Vue.component('apexchart', VueApexCharts)

require('./StringExtension.js');

new Vue({
  el: '#app',
  router: require('./routes/router.js').default,
  render: h => h(require('./App.vue').default)
})
