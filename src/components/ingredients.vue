<template>
  <div>
    <md-list>
      <div
        v-for="ingredient of limitBy(ingredients, limit)"
        :key="ingredient.strIngredient1"
      >
        <md-list-item :to="'/ingredient/' + ingredient.strIngredient1">
          <span class="md-list-item-text">{{ ingredient.strIngredient1 }}</span>
          <md-icon>keyboard_arrow_right</md-icon>
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
    <div v-if="ingredients[limit]">
      <md-button class="md-primary md-raised" @click="more">See more</md-button>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
import Vue2Filters from "vue2-filters";
export default {
  name: "ingredient",
  data() {
    return {
      ingredients: [],
      limit: 15,
    };
  },
  created: function () {
    DataService.getIngredients().then((data) => {
      this.ingredients = data.data.drinks;
    });
  },
  methods: {
    more: function () {
      this.limit += 15;
    },
  },
  mixins: [Vue2Filters.mixin],
};
</script>

<style>
</style>