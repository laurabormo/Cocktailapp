<template>
  <div class="md-layout md-alignment-center md-gutter">
    <div class="md-layout-item">
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <span class="md-headline"> A short story about the drinks</span>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <p>
            Mixed drinks called punch were being made as far back as the 1500s,
            but the invention of the cocktail itself can be traced to the 1800s.
            The word “cocktail” was first published in a newspaper in 1806, but
            the first publication of a bartenders’ guide which included cocktail
            recipes came in 1862, titled How to Mix Drinks; or, The Bon Vivant’s
            Companion, by “Professor” Jerry Thomas. The book is still a standard
            reference work today as the recipes are still used all over the
            world. Along with recipes for punches, sours, slings, cobblers,
            shrubs, toddies, flips, and a variety of other mixed drinks are ten
            recipes for “cocktails”.
          </p>
        </md-card-content>
      </md-card>
    </div>
    <div class="card-expansion md-layout-item">
      <md-card v-for="drink in drinks" :key="drink.idDrink">
        <md-card-header>
          <md-card-header-text>
            <span class="md-headline"> {{ drink.strDrink }}</span>
            <div id="ingredienti">
              <span class="md-subhead">Ingredients</span>
              <p>{{ drink.strMeasure1 }} {{ drink.strIngredient1 }}</p>
              <p>{{ drink.strMeasure2 }} {{ drink.strIngredient2 }}</p>
              <p>{{ drink.strMeasure3 }} {{ drink.strIngredient3 }}</p>
              <p>{{ drink.strMeasure4 }} {{ drink.strIngredient4 }}</p>
              <p>{{ drink.strMeasure5 }} {{ drink.strIngredient5 }}</p>
              <p>{{ drink.strMeasure6 }} {{ drink.strIngredient6 }}</p>
              <p>{{ drink.strMeasure7 }} {{ drink.strIngredient7 }}</p>
              <p>{{ drink.strMeasure8 }} {{ drink.strIngredient8 }}</p>
              <p>{{ drink.strMeasure9 }} {{ drink.strIngredient9 }}</p>
              <p>{{ drink.strMeasure10 }} {{ drink.strIngredient10 }}</p>
              <p>{{ drink.strMeasure11 }} {{ drink.strIngredient11 }}</p>
              <p>{{ drink.strMeasure12 }} {{ drink.strIngredient12 }}</p>
              <p>{{ drink.strMeasure13 }} {{ drink.strIngredient13 }}</p>
              <p>{{ drink.strMeasure14 }} {{ drink.strIngredient14 }}</p>
              <p>{{ drink.strMeasure15 }} {{ drink.strIngredient15 }}</p>
            </div>
          </md-card-header-text>
          <md-card-media md-big>
            <img :src="drink.strDrinkThumb" />
          </md-card-media>
        </md-card-header>
        <md-card-content>
          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              <div>
                <div v-if="!isSaved" v-on:click="saveFavourite(drink.idDrink)">
                  <md-button class="md-primary md-raised"> Save </md-button>
                </div>
                <div v-if="isSaved" v-on:click="removeFavourite(drink.idDrink)">
                  <md-button class="md-primary md-raised">
                    Remove from Saved
                  </md-button>
                </div>
              </div>
              <md-card-expand-trigger>
                <md-button class="md-icon-button">
                  <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
              </md-card-expand-trigger>
            </md-card-actions>
            <md-card-expand-content>
              <md-card-content>
                <div id="glass">
                  <span class="md-title">Correct glass:</span>
                </div>
                <p>{{ drink.strGlass }}</p>
                <span class="md-title">How to do:</span>
                <p>{{ drink.strInstructions }}</p>
              </md-card-content>
            </md-card-expand-content>
          </md-card-expand>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item">
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <span class="md-headline"> Did you know?</span>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <p>
            Traditionally, what we referred to as a cocktail was a mixture of
            spirits, sugar, water, and bitters. The key ingredient separating
            cocktails from other drinks in Thomas’ book was the use of bitters.
            Popular mixed drinks of today which conform to this original meaning
            of “cocktail” include the Old Fashioned whiskey cocktail and the
            Manhattan cocktail.
          </p>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import DataService from "../dataservice";
import { db } from "../dataservice";
export default {
  name: "homepage",
  data() {
    return {
      drinks: [],
      isSaved: false,
    };
  },
  created: function () {
    DataService.getOne().then(async (data) => {
      this.drinks = data.data.drinks;
      var user = firebase.auth().currentUser;
      if (user) {
        const favouriteRef = db.collection("favourites");
        let queryRef = favouriteRef
          .where("userEmail", "==", user.email)
          .where("favouriteDrinks", "array-contains-any", [
            data.data.drinks[0].idDrink,
          ]);
        const res = await queryRef.get();
        if (!res.empty) {
          this.isSaved = true;
        }
      }
    });
  },
  methods: {
    saveFavourite: function (idDrink) {
      var user = firebase.auth().currentUser;
      if (user) {
        var favouriteRef = db.collection("favourites").doc(user.uid);

        favouriteRef.update({
          favouriteDrinks: firebase.firestore.FieldValue.arrayUnion(idDrink),
        });
        this.$alert("The drink has been succesfully saved!");
        this.isSaved = true;
      } else {
        // No user is signed in.
        this.$alert("You must be logged in");
      }
    },
    removeFavourite: function (idDrink) {
      var user = firebase.auth().currentUser;
      if (user) {
        var favouriteRef = db.collection("favourites").doc(user.uid);

        favouriteRef.update({
          favouriteDrinks: firebase.firestore.FieldValue.arrayRemove(idDrink),
        });
        this.$alert("The drink has been succesfully removed from favourites!");
        this.isSaved = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.md-card {
  max-width: 500px;
  margin: 10px;
  display: inline-block;
  vertical-align: center;
}
</style>