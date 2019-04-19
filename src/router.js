import Vue from "vue";
import Router from "vue-router";
import GQLAll from "./views/GQLAll.vue"
import Test from "./views/Test.vue"
import GQLFindId from "./views/GQLFindId"
import GQLFindName from "./views/GQLFindName"
import GQLDelete from "./views/GQLDelete"
import GQLCreate from "./views/GQLCreate"
import GQLUpdate from "./views/GQLUpdate"


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: GQLAll
    },
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
    {
      path: "/gqldelete",
      name: "GQLDelete",
      component: GQLDelete
    },
    {
      path: "/gqlcreate",
      name: "GQLCreate",
      component: GQLCreate
    },
    {
      path: "/gqlupdate",
      name: "GQLUpdate",
      component: GQLUpdate
    },
  ]
});