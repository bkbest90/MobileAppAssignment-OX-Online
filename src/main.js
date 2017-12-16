import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import createRoom from './components/createRoom'
import joinRoom from './components/joinRoom'
import playRoom from './components/playRoom'
import index from './components/index'
import './components/firebase'
import VueFire from 'vuefire'

Vue.use(VueRouter)
Vue.use(VueFire)
/* eslint-disable no-new */
const routes = [
  { path: '/playRoom/:id', component: playRoom },
  { path: '/createRoom', component: createRoom },
  { path: '/joinRoom', component: joinRoom },
  { path: '/', component: index }
]
const router = new VueRouter({
  routes // short for routes: routes
});
(function (d, s, id) {
  var js
  var fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s); js.id = id
  js.src = '//connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

new Vue({
  router,
  template: '<App/>',
  components: { App },
  el: '#app',
  render: h => h(App) // Start component App.vue
}).$mount('#app')

/* eslint-disable no-new */
