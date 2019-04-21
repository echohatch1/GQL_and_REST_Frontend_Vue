<template>
  <div id="e3" style="max-width: 900px; margin: auto;" class="grey lighten-3">
    <v-card>
      <v-container fluid grid-list-lg>
        <h1>GraphQL Server <span class="page-name">| All Products</span></h1>

        <v-container id="dropdown-example" grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-select
                v-model="select"
                :items="queries"
                placeholder="All Products"
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
        </v-container>

        <v-layout row wrap>
          <v-flex v-for="product in products" xs12 lg6>
            <v-card class color="#2d2d2d" dark max-width="400">
              <v-card-title>
                <span
                  class="headline font-weight-bold"
                  style="text-transform: capitalize"
                >{{ product.name }}</span>
              </v-card-title>

              <v-card-text class="title font-weight-light">{{ product.desc }}</v-card-text>

              <v-card-text class="title font-weight-bold">${{ product.price }}</v-card-text>

              <v-card-text>{{ product.id }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  methods: {
    runRoute: function() {
      this.$router.push(this.select);
    }
  },
  data() {
    return {
      info: "",
      products: [],
      select: null,
      queries: this.$store.state.queries,
      mutations: this.$store.state.mutations
    };
  },
  mounted() {

  },
  apollo: {
    products: gql`
      query {
        products {
          id
          name
          desc
          price
        }
      }
    `
  }
};
</script>

<style>
</style>
