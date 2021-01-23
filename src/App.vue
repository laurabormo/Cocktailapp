<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary" md-elevation="1">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <md-button to="/home">
          <span class="md-title">CocktailAPP</span>
        </md-button>
        <div class="md-toolbar-section-end" :key="$route.fullPath">
          <div v-if="!isLoggedin">
            <md-button class="md-primary"  to="/login">
              <md-icon>login</md-icon> Login</md-button
            >
          </div>
          <div v-if="isLoggedin">
            <md-button class="md-primary" v-on:click="logout">
              <md-icon>logout</md-icon> Logout</md-button
            >
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <md-list-item to="/home">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
          <md-list-item to="/categories">
            <md-icon>local_bar</md-icon>
            <span class="md-list-item-text">Types of drinks</span>
          </md-list-item>
          <md-list-item to="/ingredients">
            <md-icon>local_drink</md-icon>
            <span class="md-list-item-text">Ingredients list</span>
          </md-list-item>
          <md-list-item to="/favorite">
            <md-icon>star</md-icon>
            <span class="md-list-item-text">Saved</span>
          </md-list-item>
          <md-list-item to="/search">
            <md-icon>search</md-icon>
            <span class="md-list-item-text">Search</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  max-height: 100%; //1200px;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
import firebase from "firebase/app";

//import DataService from "./dataservice";
export default {
  name: "Reveal",
  data: () => ({
    menuVisible: false,
    isLoggedin: false,
    currentuser: false,
  }),
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedin = true;
      this.currentUser = firebase.auth().currentUser.uid;
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLoggedin = false;
          this.$confirm(
            "You are logout successfully. You want to login again?"
          ).then(
            () => {
              this.$router.push("/login");
            },

            () => {}
          );
        });
    },
   
  },
};
</script>