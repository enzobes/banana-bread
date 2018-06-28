import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyApJwpo63b_fj_ibC_01JeUaPprWdsxTvc",
  authDomain: "enzobes-74279.firebaseapp.com",
  databaseURL: "https://enzobes-74279.firebaseio.com",
  projectId: "enzobes-74279",
  storageBucket: "enzobes-74279.appspot.com",
  messagingSenderId: "309101797079"
}
Vue.use(Vuetify)

Vue.config.productionTip = false
firebase.initializeApp(config)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
