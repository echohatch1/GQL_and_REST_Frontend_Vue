<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>GraphQL Server / Create a Product</h1>

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
            <!--<v-card color="cyan darken-2" class="white--text" style="padding-top: 20px;" height="100%">
              <v-layout row wrap>
                <v-flex xs5>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline" style="text-transform: capitalize"><b>{{ product.name }}</b></div>
                      <p><b>Description: </b>{{ product.desc | uppercase(product.desc, true) }}</p>
                      <p><b>Price:</b> ${{ product.price }}</p>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout align-content-end justify-end>
                <v-flex>
                  <v-card-actions>
                      <v-btn color="warning" @click="deleteOneById(product.id)">Delete</v-btn>
                  </v-card-actions>
                  </v-flex>
              </v-layout>
            </v-card>-->

            <v-card class="mx-auto" color="#26c6da" dark max-width="400">
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
      price: null,
      desc: null,
      name: null,
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
      //this.$router.go();
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
              ) {
                createProduct(
                  data: { name: $name, price: $price, desc: $desc }
                ) {
                  name
                  price
                  desc
                }
              }
            `,
            variables: {
              name: this.name,
              price: parseInt(this.price, 10),
              desc: this.desc
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
