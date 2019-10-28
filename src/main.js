import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'

Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: require('./routes/router.js').default,
  render: h => h(require('./App.vue').default)
})
