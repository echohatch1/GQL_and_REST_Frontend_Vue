<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>RESTful Server <span class="page-name">| Delete a Product</span></h1>

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
                placeholder="Delete a Product"
                label="Other Routes (POST/PUT/DELETE)"
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
                  <v-btn color="warning" @click="deleteOneById(product._id, index)">Delete</v-btn>
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
import axios from "axios"

export default {
  data() {
    return {
      info: "",
      products: [],
      select: null,
      productId: null,
      showing: true,
      getRoutes: this.$store.state.getRoutes,
      otherRoutes: this.$store.state.otherRoutes,
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

              axios.delete('https://landon-restful-server.onrender.com/products/id/' + this.productId)

            .then(response => {
        console.log(response.data.message)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    }
  },
  mounted() {
        axios
      .get('https://landon-restful-server.onrender.com/products/')
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
};
</script>

<style>
</style>
