import Vue from "vue";
import VueMaterial from "vue-material";
import VueRouter from "vue-router";
import Vue2Filters from "vue2-filters";
import VueSimpleAlert from "vue-simple-alert";
import firebase from "firebase/app";
import "./dataservice";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import home from "./components/home";

import drink from "./components/drink";
import favorite from "./components/favorite";
import ingredient from "./components/ingredient";
import ingredients from "./components/ingredients";
import categories from "./components/categories";
import category from "./components/category";
import search from "./components/search";

import Login from "./components/Login";

import Register from "./components/Register";

Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(Vue2Filters);
Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/favorite",
      name: "favorite",
      component: favorite,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/drink/:id",
      name: "drink",
      component: drink
    },
    {
      path: "/ingredient/:ingredient",
      name: "ingredient",
      component: ingredient
    },
    {
      path: "/categories",
      name: "categories",
      component: categories
    },
    {
      path: "/category/:category",
      name: "category",
      component: category
    },
    {
      path: "/ingredients",
      name: "ingredients",
      component: ingredients
    },
    {
      path: "/search",
      name: "search",
      component: search
    },

    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },

    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //Check if not logged in
    if (!firebase.auth().currentUser) { 
      //Go to login page
     alert("You must be logged in to see this page!");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    //Check if logged in
    if (firebase.auth().currentUser) {
      //Go to home
      next({
        path: "/home",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to route
      next();
    }
  } else {
    //Proceed to route
    next();
  }
});

export default router;
