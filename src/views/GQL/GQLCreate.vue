<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>GraphQL Server <span class="page-name">| Create a Product</span></h1>

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
                placeholder="Create a Product"
                label="Mutations (Create/Change Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-card class="mx-auto" color="#2d2d2d" dark>
            <v-form @submit.prevent="createOne()" ref="form" v-model="valid" lazy-validation>
              <v-layout row wrap class="ml-2 pt-2">
                <v-flex xs12 md10>
                  <v-text-field
                    :rules="formNameRules"
                    required
                    solo
                    label="Product Name"
                    v-model="name"
                  ></v-text-field>
                  <v-text-field
                    type="number"
                    :rules="formPriceRules"
                    required
                    solo
                    label="Product Price"
                    v-model="price"
                  ></v-text-field>
                  <v-textarea
                    :rules="formDescRules"
                    required
                    solo
                    label="Product Description"
                    v-model="desc"
                  ></v-textarea>
                                    <v-text-field
                    required
                    solo
                    label="Product Weight"
                    v-model="weight"
                  ></v-text-field>
                  <v-text-field
                    required
                    solo
                    label="Product Manufacturer"
                    v-model="manuf"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-btn :disabled="!valid" @click="createOne()" class="blue white--text">Create</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-container>

        <v-layout row wrap>
          <v-flex v-for="product in products" xs12 lg6>

            <v-card class="mx-auto" color="#2d2d2d" dark max-width="400">
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
      name: null,
      weight: null,
      manuf: null,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations,
      valid: true,
      formName: "",
      formNameRules: [v => !!v || "Product name is required"],
      formDesc: "",
      formDescRules: [v => !!v || "Product description is required"],
      formPrice: "",
      formPriceRules: [v => !!v || "Product price is required"]
    };
  },
  methods: {
    runRoute: function() {
      this.$router.push(this.select);
    },
    createOne() {
      if (this.$refs.form.validate()) {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation createProduct(
                $name: String
                $price: Int
                $desc: String
                $weight: String
                $manuf: String
              ) {
                createProduct(
                  data: { name: $name, price: $price, desc: $desc, weight: $weight, manuf: $manuf }
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
              name: this.name.toLowerCase(),
              price: parseInt(this.price, 10),
              desc: this.desc.toLowerCase(),
              weight: this.weight,
              manuf: this.manuf.toLowerCase()
            }
          })
          .then(res => {
            this.products = res.data;
            console.log(this.products[0].data.name + " created");
          })
          .catch(err => {
            this.error = err;
          });
      }
    }
  }
};
</script>

<style>
</style>
