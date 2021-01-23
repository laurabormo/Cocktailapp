<template>
  <div>
    <md-list>
      <div
        v-for="category of limitBy(categories, 2)"
        :key="category.strCategory"
      >
        <md-list-item :to="'/category/' + category.strCategory">
          <span class="md-list-item-text">{{ category.strCategory }}</span>
        </md-list-item>
        <md-divider></md-divider>
      </div>
      <div
        v-for="category of limitBy(categories, 2, 4)"
        :key="category.strCategory"
      >
        <md-list-item :to="'/category/' + category.strCategory">
          <span class="md-list-item-text">{{ category.strCategory }}</span>
        </md-list-item>
        <md-divider></md-divider>
      </div>
      <div
        v-for="category of limitBy(categories, 1, 7)"
        :key="category.strCategory"
      >
        <md-list-item :to="'/category/' + category.strCategory">
          <span class="md-list-item-text">{{ category.strCategory }}</span>
        </md-list-item>
        <md-divider></md-divider>
      </div>
      <div
        v-for="category of limitBy(categories, 1, 9)"
        :key="category.strCategory"
      >
        <md-list-item :to="'/category/' + category.strCategory">
          <span class="md-list-item-text">{{ category.strCategory }}</span>
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import DataService from "../dataservice";
import Vue2Filters from "vue2-filters";
export default {
  name: "category",
  data() {
    return {
      categories: [],
    };
  },

  created: function () {
    DataService.getCategories().then((data) => {
      this.categories = data.data.drinks;
    });
  },
  mixins: [Vue2Filters.mixin],
};
</script>

<style>
</style>