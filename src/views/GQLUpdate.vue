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
    class="mx-auto mb-4 px-4 py-4"
    color="#26c6da"
    dark
    max-width="400"
  >
    <!--<v-card-title>

      <span class="headline font-weight-bold" style="text-transform: capitalize">{{ product.name }}</span>
    </v-card-title>

    <v-card-text class="title font-weight-light">
      {{ product.desc }}
    </v-card-text>
    <v-card-text class="title font-weight-bold">
      ${{ product.price }}
    </v-card-text>-->

    <v-form @submit.prevent="createOne()" ref="form">
  <v-layout row wrap>

  <v-flex xs12 md10>
              <v-text-field solo label="Product Name" :value="product.name" :placeholder="product.name.toString()" v-model="name[key]"></v-text-field>
              <v-text-field type="number" solo label="Product Price" :value="product.price" :placeholder="product.price.toString()" v-model="price[key]"></v-text-field>
              <v-textarea solo label="Product Description" :value="product.desc" :placeholder="product.desc.toString()" v-model="desc[key]"></v-textarea>
  </v-flex>
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
        name: [],
        price: [],
        desc: [],
        productId: null,
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
          this.productId = this.products[key].id;
            console.log(this.productId);
            console.log(this.name[key]);
            console.log(this.price[key]);
            console.log(this.desc[key]);

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
            name: this.name,
            price: parseInt(this.price, 10),
            desc: this.desc,
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
  created() {
        var i = 0;
        for (i = 0; i < this.products.length; i++){
            this.$set(this.name, i, 0) // This is the vuejs-way of setting array values
        }
        var iTwo = 0;
        for (iTwo = 0; iTwo < this.products.length; iTwo++){
            this.$set(this.price, iTwo, 0) // This is the vuejs-way of setting array values
        }
        var iThree = 0;
        for (iThree = 0; iThree < this.products.length; iThree++){
            this.$set(this.desc, iThree, 0) // This is the vuejs-way of setting array values
        }
    }

};
</script>

<style>

</style>
