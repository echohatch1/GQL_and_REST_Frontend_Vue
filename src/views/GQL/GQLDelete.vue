<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>GraphQL Server <span class="page-name">| Delete a Product</span></h1>

        <v-container id="dropdown-example" grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="queries"
                placeholder="Choose One"
                label="Queries (Get Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="mutations"
                placeholder="Delete a Product"
                label="Mutations (Create/Change Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>

        <v-layout row wrap>
          <v-flex v-for="(product, index) in products" xs12 lg6>
            <v-card class color="#2d2d2d" dark max-width="400">
              <v-card-title>
                <span
                  class="headline font-weight-bold"
                  style="text-transform: capitalize"
                >{{ product.name }}</span>
              </v-card-title>

              <v-card-text class="title font-weight-light">{{ product.desc | uppercase(product.desc, true) }}</v-card-text>

              <v-card-text class="title font-weight-bold">${{ product.price }}</v-card-text>
              <v-card-text class="title font-weight-light">Weight: {{ product.weight }}</v-card-text>
              <v-card-text class="title font-weight-light" style="text-transform: capitalize">Manufacturer: {{ product.manuf }}</v-card-text>

              <v-layout>
                <v-flex xs12 md2>
                  <v-btn color="warning" @click="deleteOneById(product.id, index)">Delete</v-btn>
                </v-flex>
              </v-layout>
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
      productId: null,
      showing: true,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations
    };
  },
  methods: {
    runRoute: function() {
      this.$router.push(this.select);
    },
    deleteOneById(id, index) {
      this.productId = id;
      console.log("Deleted: " + this.products[index].name);
      this.products.splice(index, 1);

      this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteOne($id: ID) {
              deleteProduct(where: { id: $id }) {
                id
                name
              }
            }
          `,
          variables: {
            id: this.productId
          }
        })
        .then(res => {
          this.info = res.data;
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  apollo: {
    products: gql`
      query {
        products {
          id
          name
          desc
          price
          weight
          manuf
        }
      }
    `
  }
};
</script>

<style>
</style>
