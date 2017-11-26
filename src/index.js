import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { GC_AUTH_TOKEN } from './constants'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// apollo upgrade - https://github.com/apollographql/apollo-client/blob/master/Upgrade.md

const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjadpogyz4tzi0149d28ltj1l' })

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem(GC_AUTH_TOKEN) || null
    }
  });
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// 4
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
registerServiceWorker() 