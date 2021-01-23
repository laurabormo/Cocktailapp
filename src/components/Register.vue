<template>
  <div class="md-layout md-alignment-center-center">
    <md-card
      class="md-layout-item md-size-30 md-xsmall-size-100 md-medium-size-50"
    >
      <md-card-header>
        <span class="md-title">Register</span>
      </md-card-header>
      <md-card-content>
        <md-field>
          <md-input type="text" v-model="email" id="email"></md-input>
          <label>Email</label>
        </md-field>
        <md-field>
          <md-input type="password" v-model="password" id="password"></md-input>
          <label>Password</label>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary md-raised" v-on:click="register"
          >Register
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../dataservice.js";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register: function (e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            let uid = firebase.auth().currentUser.uid;
            let email = firebase.auth().currentUser.email;
            db.collection("favourites")
              .doc(uid)
              .set({ userEmail: email, favouriteDrinks: [] });
            this.$alert("Account successfully created!");
            this.$router.push("/home");
          },
          (err) => {
            this.$alert(err.message);
          }
        );
    },
  },
};
</script>

<style>
</style>