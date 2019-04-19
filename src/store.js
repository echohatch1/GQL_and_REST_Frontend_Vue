import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    queries: [
        {text: 'All Products', value: 'gqlall'},
        {text: 'Find by Id', value: 'gqlfindid'},
        {text: 'Find by Name', value: 'gqlfindname'}
        ],
      mutations: [
        {text: 'Create a Product', value: 'gqlcreate'}, 
        {text: 'Update a Product', value: 'gqlupdate'},
        {text: 'Delete a Product', value: 'gqldelete'},
        ],
  },
  mutations: {},
  actions: {}
});