<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>RESTfull and </span>
        <span class="font-weight-light">GraphQL Servers</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-card height="55px" flat>

    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
    >
    <v-layout>

    <router-link to="/gqlall">
      <v-btn
        color="teal"
        flat
        value="GQL All Products"
      >
      
        <span>GraphQL All Products</span>
        
      </v-btn>
      </router-link>

<router-link to="/Test">
      <v-btn
        color="teal"
        flat
        value="Test"
      >
      
        <span>Test</span>
        
      </v-btn>
      </router-link>

<router-link to="/Test">
      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>Nearby</span>
      </v-btn>
</router-link>
    </v-layout>
    </v-bottom-nav>
  </v-card>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  methods: {
        
  },
  data () {
    return {

    }
  }
}
</script>
