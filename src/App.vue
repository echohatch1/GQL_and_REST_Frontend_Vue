<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>RESTfull and </span>
        <span class="font-weight-light">GraphQL Servers</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn-toggle v-model="toggle_one" mandatory>
      <v-btn style="color: #e5e5e5; padding: 0 20px;" large color="info" @click="$router.push('gqlall')">GraphQL Server</v-btn>

      <v-btn style="color: #e5e5e5; padding: 0 20px;" large color="info" @click="$router.push('test')">RESTfull Server</v-btn>
      </v-btn-toggle>
    </v-toolbar>



    <v-content>
      <router-view></router-view>
    </v-content>

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
      text: 'center',
        icon: 'justify',
        toggle_one: 0,
    }
  }
}
</script>

<style>
h1 {
  color: #fb8c00;
}
</style>

