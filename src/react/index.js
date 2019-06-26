import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { client } from '@/apollo'
import HistoricalBalancePage from '@/react/HistoricalBalance/HistoricalBalancePage'
import AssetsOverviewPage from '@/react/Assets/AssetsOverviewPage'

export default (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path='/labs/balance' component={HistoricalBalancePage} />
        <Route exact path='/assets' component={AssetsOverviewPage} />
      </Switch>
    </Router>
  </ApolloProvider>
)
