import Vue from "vue";
import App from "./App.vue";
import router from "./index";
import Vue2Filters from "vue2-filters";
import firebase from "firebase/app";
import "./dataservice";

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      mixins: [Vue2Filters.mixin],
      router,
      render: (h) => h(App)
    }).$mount("#app");
  }
});
