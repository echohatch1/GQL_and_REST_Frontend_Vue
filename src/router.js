import Vue from "vue";
import Router from "vue-router";
import GQLAll from "./views/GQLAll.vue"
import Test from "./views/Test.vue"


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: "/gqlall",
      name: "GQLAll",
      component: GQLAll
    },
    {
      path: "/Test",
      name: "Test",
      component: Test
    },
  ]
});