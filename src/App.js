import React, { Component } from 'react';
import { BackTop } from 'antd';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout'
import routers from './router/index.js';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layout>
          <Switch>
          {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
          </Switch>
          <BackTop/>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
