<template>
  <div
    id="e3"
    style="max-width: 900px; margin: auto;"
    class="grey lighten-3"
  >

    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
      <h1>Products GQLALL</h1>
        <v-layout row wrap>

<v-flex d-flex v-for="product in products" xs12 lg6>
          
            <v-card color="cyan darken-2" class="white--text" style="padding-top: 20px;">
              <v-layout>
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

            </v-card>

          </v-flex>

        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
 //import axios from "axios"
 import gql from "graphql-tag"

export default {
  data() {
    return {
      info: "",
      products: []
    };
  },
  mounted() {
    // return axios
    //   .get("https://pokeapi.co/api/v2/pokemon/1")
    //   .then(response => (this.info = response));
  },
  apollo: {
    products: gql`query {
      products {
    id
    name
    desc
    price
  }
    }`,
  }
};
</script>

<style>

</style>
