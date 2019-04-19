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
      <router-view></router-view>
    </v-content>

    <v-card height="55px" flat>

    <v-bottom-nav
      :value="true"
      fixed
    >


      <v-btn
        color="teal"
        flat
        value="GraphQL Server"
        @click="$router.push('gqlall')"
      >
      
        <span>GraphQL Server</span>
        
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="Test"
        @click="$router.push('test')"
      >
      
        <span>Test</span>
        
      </v-btn>

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

<style>

</style>

