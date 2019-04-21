<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>RESTful Server <span class="page-name">| Create a Product</span></h1>

        <v-container id="dropdown-example" grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="getRoutes"
                placeholder="Choose One"
                label="GET Routes (Get Data)"
                @change="runRoute()"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="otherRoutes"
                placeholder="Create a Product"
                label="Other Routes (POST/PUT/DELETE)"
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

            <v-card class="mx-auto" color="#2d2d2d" dark max-width="400">
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
      price: null,
      desc: null,
      name: null,
      getRoutes: this.$store.state.getRoutes,
      otherRoutes: this.$store.state.otherRoutes,
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
        axios.post('https://shrouded-hollows-45616.herokuapp.com/products', {
          name: this.name,
	        price: this.price,
	        desc: this.desc
  })
            .then(response => {
        this.products.push(response.data)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
      }
    }
  }
};
</script>

<style>
</style>
