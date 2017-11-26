import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { GC_AUTH_TOKEN } from './constants'
// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// 2
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjadpogyz4tzi0149d28ltj1l' })

// networkInterface.use([{
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {}
//     }
//     const token = localStorage.getItem(GC_AUTH_TOKEN)
//     req.options.headers.authorization = token ? `Bearer ${token}` : null
//     next()
//   }
// }])

// 3
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