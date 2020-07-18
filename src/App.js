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
  DevicesListContainer,
  DeviceForm,
  DeviceLogs,
  LogForm,
} from './Layouts/index';
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
          render={() => <DevicesListContainer />}
        />
        <Route
          exact
          path={[`/devices/create`]}
          render={() => <DeviceForm mode='new' />}
        />
        <Route
          exact
          path={[`/devices/:deviceId`]}
          render={() => (
            <DeviceForm
              mode='edit'
              deviceId={window.location.pathname
                .toString()
                .substr(9, window.location.pathname.toString().length - 9)}
            />
          )}
        />
        <Route
          exact
          path={[`/devices/:deviceId/logs`]}
          render={() => (
            <DeviceLogs
              deviceId={window.location.pathname
                .toString()
                .substr(9, window.location.pathname.toString().length - 14)}
            />
          )}
        />
        <Route
          exact
          path={[`/devices/:deviceId/logs/create`]}
          render={() => (
            <LogForm
              mode='new'
              deviceId={window.location.pathname
                .toString()
                .substr(9, window.location.pathname.toString().length - 21)}
            />
          )}
        />
        <Route
          exact
          path={[`/devices/:deviceId/logs/createrange`]}
          render={() => (
            <LogForm
              mode='range'
              deviceId={window.location.pathname
                .toString()
                .substr(9, window.location.pathname.toString().length - 21)}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
