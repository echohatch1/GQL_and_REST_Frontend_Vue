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
      <h1>GraphQL Server / Find Products by Id</h1>

<v-container id="dropdown-example" grid-list-xl>

<v-layout row wrap>

      <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="queries"
                placeholder="Find by Id"
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
              <v-text-field solo label="Product Id" v-model="productId"></v-text-field>
  </v-flex>
  <v-flex xs12 md2>
              <v-btn
                @click="getOneById()"
                class="blue white--text"
              >Search</v-btn>
  </v-flex>
</v-layout>
</form>


    
  </v-container>


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
      products: [],
      select: null,
      productId: null,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations
    };
  },
    methods: {
          runRoute: function() {
      this.$router.push(this.select);
      //this.$router.go();
    },
      getOneById: function() {
      this.$apollo
        .query({
          query: gql`
            query getOne($id: ID) {
              products(where: { id: $id }) {
                id
                name
                desc
                price
              }
            }
          `,
          variables: {
            id: this.productId
          }
        })
          .then(res => {
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch(err => {
          this.error = err;
        });
        
        
    },
  },
  mounted() {
    // return axios
    //   .get("https://pokeapi.co/api/v2/pokemon/1")
    //   .then(response => (this.info = response));
  },
};
</script>

<style>

</style>
