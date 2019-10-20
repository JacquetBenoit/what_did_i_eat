import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './../node_modules/bulma/css/bulma.css'
import 'bulma/css/bulma.css'
import firebase from 'firebase'

import firebaseConfig from './firebaseConfig'


firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});