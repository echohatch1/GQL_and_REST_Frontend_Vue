import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'
import store from "./store";

Vue.config.productionTip = false
Vue.filter ("uppercase", function(value, onlyFirstCharacter) {
    if (!value) {
      return '';
    }
    
    value = value.toString();
    
    if (onlyFirstCharacter) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return value.toUpperCase();
    }
  }
)


new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
