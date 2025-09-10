<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <br />
        <h1 class="display-2 font-weight-bold mb-3">GraphQL Queries</h1>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <h2>All Products</h2>
          </v-card-title>
          <v-card-text>
            <div v-if="loading">Loading...</div>
            <div v-else-if="gqlError" class="error--text">
              <p>
                <strong>Could not connect to the GraphQL server.</strong>
              </p>
              <p>Please make sure the local server is running. See <a href="https://github.com/echohatch1/GraphQL_Server">https://github.com/echohatch1/GraphQL_Server</a></p>
              <p>Details: {{ gqlError.message }}</p>
            </div>
            <div v-else>
              <p v-for="product in products" :key="product.id">
                {{ product.id }} - {{ product.name }} - ${{ product.price }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import gql from "graphql-tag";

export default {
  name: "GQLAll",
  apollo: {
    products: gql`
      query {
        products {
          id
          name
          price
        }
      }
    `
  },
  computed: {
    ...mapGetters(["gqlError"]),
    loading() {
      return this.$apollo.queries.products.loading;
    }
  }
};
</script>