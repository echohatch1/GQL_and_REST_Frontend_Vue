<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>GraphQL Server / Find Products by Name</h1>

        <v-container id="dropdown-example" grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="queries"
                placeholder="Find by Name"
                label="Queries (Get Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="mutations"
                placeholder="Choose One"
                label="Mutations (Create/Change Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>
          </v-layout>

          <form @submit.prevent="getOneById()">
            <v-layout row wrap>
              <v-flex xs12 md10>
                <v-text-field solo label="Product Name" v-model="productName"></v-text-field>
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
//import axios from "axios"
import gql from "graphql-tag";

export default {
  data() {
    return {
      info: "",
      products: [],
      select: null,
      productName: null,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations
    };
  },
  methods: {
    runRoute: function() {
      this.$router.push(this.select);
    },
    getOneById: function() {
      this.$apollo
        .query({
          query: gql`
            query getOne($name: String!) {
              products(where: { name: $name }) {
                id
                name
                desc
                price
              }
            }
          `,
          variables: {
            name: this.productName.toLowerCase()
          }
        })
        .then(res => {
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
};
</script>

<style>
</style>
