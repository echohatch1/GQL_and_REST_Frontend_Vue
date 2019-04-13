import Vue from "vue";
import Router from "vue-router";
import GQLAll from "./views/GQLAll.vue"
import Test from "./views/Test.vue"
import GQLFindId from "./views/GQLFindId"
import GQLFindName from "./views/GQLFindName"


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: "/gqlall",
      name: "GQLAll",
      component: GQLAll
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: "/gqlfindid",
      name: "GQLFindId",
      component: GQLFindId
    },
    {
      path: "/gqlfindname",
      name: "GQLFindName",
      component: GQLFindName
    },
  ]
});