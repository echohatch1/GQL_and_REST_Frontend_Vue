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
      <h1>GraphQL Server / Update a Product</h1>

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
    class="mx-auto mb-4"
    color="#26c6da"
    max-width="400"
  >
  <v-layout>
      <v-flex>
  <v-card-title>
      <span class="headline font-weight-bold" style="text-transform: capitalize">Edit</span>
    </v-card-title>
      </v-flex>
  </v-layout>
    <!--<v-card-title>

      <span class="headline font-weight-bold" style="text-transform: capitalize">{{ product.name }}</span>
    </v-card-title>

    <v-card-text class="title font-weight-light">
      {{ product.desc }}
    </v-card-text>
    <v-card-text class="title font-weight-bold">
      ${{ product.price }}
    </v-card-text>-->

    <v-form @submit.prevent="updateOne()" ref="form">
  <v-layout row wrap class="mx-2">

  <v-flex xs12>
              <v-text-field solo label="Product Name"  v-model="products[key].name"></v-text-field>
              <v-text-field type="number" solo label="Product Price" v-model="products[key].price"></v-text-field>
              <v-textarea solo label="Product Description" v-model="products[key].desc"></v-textarea>
  </v-flex>
  </v-layout>
  <v-layout>
  <v-flex xs12 md2>
              <v-btn
                @click="updateOne(key)"
                class="blue white--text"
              >Update</v-btn>
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
 //import axios from "axios"
 import gql from "graphql-tag"

export default {
  data() {
    return {
      info: "",
      products: [],
      select: null,
        price: null,
        desc: null,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations,
      
    };
  },
      methods: {
                  runRoute: function() {
      this.$router.push(this.select);
      //this.$router.go();
    },
      updateOne(key) {
          console.log("Updating " + this.products[key].name);

      this.$apollo.mutate({
          mutation: gql`mutation updateProduct(
  $name: String!
  $price: Int!
  $desc: String!
  $id: ID!
) {
  updateProduct(
    data: { name: $name, price: $price, desc: $desc }
    where: { id: $id }
  ) {
    name
    price
    desc
  }
}`,
          variables: {
            name: this.products[key].name,
            price: parseInt(this.products[key].price, 10),
            desc: this.products[key].desc,
            id: this.products[key].id
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
    apollo: {
    products: gql`query {
      products {
    id
    name
    desc
    price
  }
    }`,
  },

};
</script>

<style>

</style>
