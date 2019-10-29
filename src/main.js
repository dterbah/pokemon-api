import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import VueApexCharts from 'vue-apexcharts';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts)

require('./StringExtension.js');

new Vue({
  el: '#app',
  router: require('./routes/router.js').default,
  render: h => h(require('./App.vue').default)
})
