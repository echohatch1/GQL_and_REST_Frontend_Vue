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
      <h1>GraphQL Server / Delete Products</h1>

<v-container id="dropdown-example" grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="queries"
                placeholder="Choose One"
                label="Queries (Get Data)"
                @change="$router.push(select)"
              ></v-select>

      </v-flex>

      <v-flex xs12 sm6>
            <v-select
                v-model="select"
                :items="mutations"
                placeholder="Delete a Product"
                label="Mutations (Create/Change Data)"
                @change="$router.push(select)"
              ></v-select>

      </v-flex>

    </v-layout>
  </v-container>


        <v-layout row wrap>

<v-flex v-for="(product, index) in products" xs12 lg6>
          
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

            <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="400"
  >
    <v-card-title>

      <span class="headline font-weight-bold" style="text-transform: capitalize">{{ product.name }}</span>
    </v-card-title>

    <v-card-text class="title font-weight-light">
      {{ product.desc }}
    </v-card-text>
    <v-card-text class="title font-weight-bold">
      ${{ product.price }}
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-btn color="warning" @click="deleteOneById(product.id, index)">Delete</v-btn>
      </v-list-tile>
    </v-card-actions>
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
      showing: true,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations
    };
  },
      methods: {
      deleteOneById(id, index) {
        this.productId = id;
        console.log("Deleted: " + this.products[index].name);
        this.products.splice(index, 1);

      this.$apollo.mutate({
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
    },
  },
  mounted() {/*

      this.$apollo
        .query({
          query: gql`
            query {
      products {
    id
    name
    desc
    price
  }
    }
          `,
        })
        
          .then(res => {
          this.products = res.data.products;
        })
        .catch(err => {
          this.error = err;
        });*/
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
