<template>
  <div id="saved">
    <div v-if="drinks == 0">
      <h3>There is no saved drink</h3>
    </div>
    <md-list>
      <div v-for="drink in drinks" :key="drink.idDrink">
        <md-list-item :to="'/drink/' + drink.idDrink">
          <md-avatar class="md-large">
            <img :src="drink.strDrinkThumb" />
          </md-avatar>
          <span class="md-list-item-text">{{ drink.strDrink }}</span>
        </md-list-item>
        <md-divider> </md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import firebase from "firebase";
import DataService, { db } from "../dataservice";
//import {db} from "../dataservice";
export default {
  name: "drinks",
  data() {
    return {
      drinks: [],
    };
  },
  created: function () {
    var user = firebase.auth().currentUser;

    if (user) {
      let userFavourites = db.collection("favourites").doc(user.uid);
      //let favouriteDrinks = [];
      userFavourites.get().then((doc) => {
        if (doc.exists) {
          doc.data().favouriteDrinks.forEach((item) => {
            DataService.getDrink(item).then((data) => {
              this.drinks.push(data.data.drinks[0]);
            });
          });
        } else {
          this.$alert("Something went wrong");
        }
        // doc.data() will be undefined in this case
      });
    } else {
      this.$alert("You must be logged in");
    }
  },
};
</script>

<style >
</style>



