import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import currencyFilter from './filters/currency.filter'
import firebase from 'firebase/app'
import Loader from './components/Loader'
import tooltipDirective from './directives/tooltip.directive'
import 'firebase/auth'
import 'firebase/database'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter("currencyFilter", currencyFilter)
Vue.component("Loader", Loader)
Vue.directive('tooltip', tooltipDirective)


const firebaseConfig = {
  apiKey: "AIzaSyBH7kbHaSEHO13Z8JcQemsfHc_slkxboMk",
  authDomain: "vuejs-5484b.firebaseapp.com",
  databaseURL: "https://vuejs-5484b.firebaseio.com",
  projectId: "vuejs-5484b",
  storageBucket: "vuejs-5484b.appspot.com",
  messagingSenderId: "256175631528",
  appId: "1:256175631528:web:320ab1bbec07670358e69d"
};

let app;

firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(() => {
  if (!app)
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
})


