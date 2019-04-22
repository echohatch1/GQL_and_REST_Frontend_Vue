<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>GraphQL Server <span class="page-name">| Update a Product</span></h1>

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
                placeholder="Update a Product"
                label="Mutations (Create/Change Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>

        <v-layout row wrap>
          <v-flex v-for="(product, key) in products" xs12 lg6>
            <v-card class="mx-auto mb-2" color="#2d2d2d" max-width="400" dark>
              <v-layout>
                <v-flex>
                  <v-card-title>
                    <span
                      class="headline font-weight-bold"
                      style="text-transform: capitalize"
                    >Edit Product</span>
                  </v-card-title>
                </v-flex>
              </v-layout>

              <v-form @submit.prevent="updateOne()" ref="form">
                <v-layout row wrap class="mx-2">
                  <v-flex xs12>
                    <v-text-field solo label="Name" v-model="products[key].name"></v-text-field>
                    <v-text-field solo type="number" label="Price" v-model="products[key].price"></v-text-field>
                    <v-textarea solo label="Description" v-model="products[key].desc"></v-textarea>
                    <v-textarea solo label="Weight" v-model="products[key].weight"></v-textarea>
                    <v-textarea solo label="Manufacturer" v-model="products[key].manuf"></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 md2>
                    <v-btn @click="updateOne(key)" class="blue white--text">Update</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      info: "",
      products: [],
      select: null,
      price: null,
      desc: null,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations
    };
  },
  methods: {
    runRoute: function() {
      this.$router.push(this.select);
    },
    updateOne(key) {
      console.log("Updating " + this.products[key].name);

      this.$apollo
        .mutate({
          mutation: gql`
            mutation updateProduct(
              $name: String!
              $price: Int!
              $desc: String!
              $id: ID!
              $weight: String
              $manuf: String
            ) {
              updateProduct(
                data: { name: $name, price: $price, desc: $desc, weight: $weight, manuf: $manuf }
                where: { id: $id }
              ) {
                name
                price
                desc
                weight
                manuf
              }
            }
          `,
          variables: {
            name: this.products[key].name.toLowerCase(),
            price: parseInt(this.products[key].price, 10),
            desc: this.products[key].desc.toLowerCase(),
            id: this.products[key].id,
            weight: this.products[key].weight,
	          manuf: this.products[key].manuf.toLowerCase(),
          }
        })
        .then(res => {
          console.log(res.data);
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
