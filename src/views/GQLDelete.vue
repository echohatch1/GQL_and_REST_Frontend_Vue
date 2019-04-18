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
                placeholder="All Products"
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

<v-flex d-flex v-for="product in products" xs12 lg6>
          
            <v-card color="cyan darken-2" class="white--text" style="padding-top: 20px;">
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

              <v-layout justify-space-between>
                  <v-flex xs2>
                      <v-btn color="warning" @click="deleteOneById(product.id)">Delete</v-btn>
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
      deleteOneById(id) {
        this.productId = id;
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
          console.log(res.data);
        })
        .catch(err => {
          this.error = err;
        });
    },
  },
  mounted() {

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
        /*
          .then(res => {
          console.log("Product" + this.productId + "deleted.")
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
