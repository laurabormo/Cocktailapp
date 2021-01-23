<template>
  <div class="md-layout md-alignment-center-center">
    <md-card
      class="md-layout-item md-size-30 md-xsmall-size-100 md-medium-size-50"
    >
      <md-card-header>
        <span class="md-title">Login</span>
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
        <md-button class="md-primary md-raised" v-on:click="login"
          >Sign in
        </md-button>
      </md-card-actions>
      <md-card-actions>
        <md-button to="/register">Not registered? Register now</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      isLoggedin: false,
    };
  },
  methods: {
    login: function (e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.isLoggedin = true;
            this.$alert("You have successfully logged in!");
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
