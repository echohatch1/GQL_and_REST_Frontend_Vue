import Vue from "vue";
import Router from "vue-router";
import GQLAll from "./views/GQL/GQLAll.vue"
import GQLFindId from "./views/GQL/GQLFindId"
import GQLFindName from "./views/GQL/GQLFindName"
import GQLDelete from "./views/GQL/GQLDelete"
import GQLCreate from "./views/GQL/GQLCreate"
import GQLUpdate from "./views/GQL/GQLUpdate"
import RESTAll from "./views/REST/RESTAll.vue"
import RESTFindId from "./views/REST/RESTFindId"
import RESTFindName from "./views/REST/RESTFindName"
import RESTDelete from "./views/REST/RESTDelete"
import RESTCreate from "./views/REST/RESTCreate"
import RESTUpdate from "./views/REST/RESTUpdate"


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
    {
      path: "/RESTAll",
      name: "RESTAll",
      component: RESTAll
    },
    {
      path: "/RESTFindId",
      name: "RESTFindId",
      component: RESTFindId
    },
    {
      path: "/RESTFindName",
      name: "RESTFindName",
      component: RESTFindName
    },
    {
      path: "/RESTDelete",
      name: "RESTDelete",
      component: RESTDelete
    },
    {
      path: "/RESTCreate",
      name: "RESTCreate",
      component: RESTCreate
    },
    {
      path: "/RESTUpdate",
      name: "RESTUpdate",
      component: RESTUpdate
    },
  ]
});