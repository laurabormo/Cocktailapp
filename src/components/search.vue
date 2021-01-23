<template>
  <div>
    <md-card
      class="md-layout-item md-size-30 md-xsmall-size-100 md-medium-size-50"
    >
      <md-card-header>
        <md-field md-clearable>
          <label>Search</label>
          <md-input v-model="SearchOption" required></md-input>
        </md-field>
      </md-card-header>
      <md-button class="md-primary md-raised" @click="search">search</md-button>
    </md-card>

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
import DataService from "../dataservice";
export default {
  data() {
    return {
      drinks: [],
      SearchOption: null,
    };
  },

  methods: {
    search: function (SearchOption) {
      DataService.search(this.SearchOption).then((data) => {
        this.drinks = data.data.drinks;
      });
    },
  },
};
</script>

<style >
.md-card {
  margin: 10px;
  display: inline-block;
  vertical-align: top;
}
</style>
