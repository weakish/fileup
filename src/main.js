import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import LC from "leancloud-storage";
LC.init({
  appId: "your-app-id",
  appKey: "your-app-key",
  serverURL: "https://your-domain.example.com",
});


Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
