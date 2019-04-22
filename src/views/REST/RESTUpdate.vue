<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>RESTful Server <span class="page-name">| Update a Product</span></h1>

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
                placeholder="Update a Product"
                label="Other Routes (POST/PUT/DELETE)"
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
import axios from "axios";

export default {
  data() {
    return {
      info: "",
      products: [],
      select: null,
      price: null,
      desc: null,
      getRoutes: this.$store.state.getRoutes,
      otherRoutes: this.$store.state.otherRoutes,
    };
  },
  methods: {
    runRoute: function() {
      this.$router.push(this.select);
    },
    updateOne(key) {
      console.log("Updating " + this.products[key].name);

        axios.put('https://shrouded-hollows-45616.herokuapp.com/products/id/' + this.products[key]._id, {
          name: this.products[key].name.toLowerCase(),
	        price: parseInt(this.products[key].price, 10),
	        desc: this.products[key].desc.toLowerCase(),
	        weight: this.products[key].weight,
	        manuf: this.products[key].manuf.toLowerCase(),
  })
            .then(response => {
        console.log(response.data)
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
      .get('https://shrouded-hollows-45616.herokuapp.com/products/')
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
