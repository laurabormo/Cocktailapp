import axios from "axios";
import firebase from "@firebase/app";
import "@firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBfldswe-nIHEgwbOCh6T2Bp74Qdp6nV9w",
  authDomain: "cocktailapp-c1d23.firebaseapp.com",
  projectId: "cocktailapp-c1d23"
});

export let db = firebase.firestore();

export default {
  getOne() {
    return axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
  },
  getDrink(id) {
    return axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id
    );
  },
  getCategories() {
    return axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    );
  },
  getIngredients() {
    return axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    );
  },
  getCockbyIngr(ingredient) {
    return axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient
    );
  },
  getCockbyCateg(category) {
    return axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category
    );
  },
  search(name) {
    return axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name
    );
  }
};
