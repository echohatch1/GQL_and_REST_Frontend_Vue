<template>
  <v-app>
    <v-toolbar app color="info" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>RESTful and </span>
        <span class="font-weight-light">GraphQL Servers</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs
        v-model="tab"
        right
        style="width: auto"
        slider-color="#fff"
      >
        <v-tab :to="{ name: 'RESTAll' }">RESTful Server</v-tab>
        <v-tab :to="{ name: 'GQLAll' }">GraphQL Server</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      tab: null,
    }
  },
  watch: {
    // Keep tab in sync with route
    $route: {
      immediate: true,
      handler(to) {
        if (to.name === 'GQLAll') this.tab = 0
        else if (to.name === 'RESTAll') this.tab = 1
      }
    }
  }
}
</script>

<style>
h1 {
  color: #fb8c00;
}
.page-name {
  color: #2d2d2d;
}
</style>
