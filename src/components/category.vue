<template>
  <div>
    <md-list>
      <div v-for="drink of limitBy(drinks, limit)" :key="drink.idDrink">
        <md-list-item :to="'/drink/' + drink.idDrink">
          <md-avatar class="md-large">
            <img :src="drink.strDrinkThumb" />
          </md-avatar>
          <span class="md-list-item-text">{{ drink.strDrink }}</span>
        </md-list-item>
        <md-divider> </md-divider>
      </div>
    </md-list>
    <div v-if="drinks[limit]">
      <md-button class="md-primary md-raised" @click="more">See more</md-button>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
import Vue2Filters from "vue2-filters";
export default {
  name: "drinks",
  data() {
    return {
      drinks: [],
      limit: 15,
    };
  },
  created: function () {
    DataService.getCockbyCateg(this.$route.params.category).then((data) => {
      this.drinks = data.data.drinks;
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

<style >
</style>
