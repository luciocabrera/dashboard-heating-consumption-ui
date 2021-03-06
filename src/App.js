// React
import React from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store/store'; //Import the store
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Layouts
import {
  Home,
  DevicesList,
  DeviceForm,
  DeviceLogs,
  LogForm,
} from './features/index';
// Css
import 'antd/dist/antd.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={`/`} render={() => <Home />} />
        {/* <Route path="/implicit/callback" component={LoginCallback} /> */}
        <Route
          exact
          path={[`/devices`]}
          render={() => <DevicesList />}
        />
        <Route
          exact
          path={[`/devices/create`, `/devices/:deviceId`]}
          render={() => <DeviceForm />}
        />
        <Route
          exact
          path={[`/devices/:deviceId/logs`]}
          render={() => <DeviceLogs />}
        />
        <Route
          exact
          path={[`/devices/:deviceId/logs/create`]}
          render={() => <LogForm mode='new' />}
        />
        <Route
          exact
          path={[`/devices/:deviceId/logs/createrange`]}
          render={() => <LogForm mode='range' />}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
