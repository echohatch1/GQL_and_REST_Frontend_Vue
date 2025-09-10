import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'
import store from './store'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint = process.env.PORT || 'http://localhost:5555'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    store.commit('setGqlError', networkError);
  }
})

// Call this in the Vue app file
export function createProvider () {
  const httpLink = createHttpLink({
    uri: httpEndpoint,
  })

  // Create the subscription websocket link
  const wsLink = new WebSocketLink({
    uri: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:5555',
    options: {
      reconnect: true,
      lazy: true,
      connectionCallback: (error) => {
        if (error) {
          // This will be called on connection error, but we can leave it empty
          // to prevent logging to the console. The onError link will still catch it.
        }
      },
    },
  })

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: errorLink.concat(link),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  // This is a property that the old `onLogin` and `onLogout` functions expect.
  // Since we are not using them, we can remove them, but for now, we'll keep it
  // to avoid breaking changes if they are used elsewhere.
  // To properly handle this, we would need to implement a restart of the wsLink.
  apolloClient.wsClient = wsLink.subscriptionClient

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })

  return apolloProvider
}

// The onLogin/onLogout functions are now obsolete with this manual setup
// as they rely on the `restartWebsockets` function from the vue-cli-plugin,
// which we are no longer using in the same way.
// You can remove them if you are not using authentication tokens.
