<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>RESTful Server <span class="page-name">| Find Products by Id</span></h1>

        <v-container id="dropdown-example" grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="getRoutes"
                placeholder="Find a Product by Id"
                label="GET Routes (Get Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="otherRoutes"
                placeholder="Choose One"
                label="Other Routes (POST/PUT/DELETE)"
                @change="runRoute()"
              ></v-select>
            </v-flex>
          </v-layout>

          <form @submit.prevent="getOneById()">
            <v-layout row wrap>
              <v-flex xs12 md10>
                <v-text-field solo label="Product Id" v-model="productId"></v-text-field>
              </v-flex>
              <v-flex xs12 md2>
                <v-btn @click="getOneById()" class="blue white--text">Search</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-container>

        <v-layout row wrap>
          <v-flex v-for="product in products" xs12 lg6>
            <v-card class color="#2d2d2d" dark max-width="400">
              <v-card-title>
                <span
                  class="headline font-weight-bold"
                  style="text-transform: capitalize"
                >{{ product.name }}</span>
              </v-card-title>

              <v-card-text class="title font-weight-light">{{ product.desc }}</v-card-text>
              <v-card-text class="title font-weight-bold">${{ product.price }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      info: "",
      products: [],
      select: null,
      productId: null,
      getRoutes: this.$store.state.getRoutes,
      otherRoutes: this.$store.state.otherRoutes,
    };
  },
  methods: {
    runRoute: function() {
      this.$router.push(this.select);
    },
    getOneById: function() {
    axios
      .get('https://shrouded-hollows-45616.herokuapp.com/products/id/' + this.productId)
      .then(response => {
        this.products.push(response.data)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    }
  },
};
</script>

<style>
</style>
