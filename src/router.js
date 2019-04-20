import Vue from "vue";
import Router from "vue-router";
import GQLAll from "./views/GQL/GQLAll.vue"
import Test from "./views/REST/Test.vue"
import GQLFindId from "./views/GQL/GQLFindId"
import GQLFindName from "./views/GQL/GQLFindName"
import GQLDelete from "./views/GQL/GQLDelete"
import GQLCreate from "./views/GQL/GQLCreate"
import GQLUpdate from "./views/GQL/GQLUpdate"


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: "/",
      name: "GQLall",
      redirect: "GQLall",
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