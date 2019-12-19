import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import Buefy from 'buefy'
import firebaseConfig from './firebaseConfig'

Vue.use(Buefy);


firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});