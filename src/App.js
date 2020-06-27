// React
import React from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store/store'; //Import the store
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Layouts
import { Home, DevicesListContainer, DeviceForm } from './Layouts/index';
// Css
import 'antd/dist/antd.css';
import DeviceLogs from './Layouts/device/DeviceLogs';

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
          // eslint-disable-next-line no-restricted-globals
          render={() => <DeviceForm mode="new" />}
        />
        <Route
          exact
          path={[`/devices/:deviceId`]}
          // eslint-disable-next-line no-restricted-globals
          render={() => (
            <DeviceForm
              mode="edit"
              deviceId={window.location.pathname
                .toString()
                .substr(9, window.location.pathname.toString().length - 9)}
            />
          )}
        />
                <Route
          exact
          path={[`/devices/:deviceId/logs`]}
          // eslint-disable-next-line no-restricted-globals
          render={() => (
            <DeviceLogs
              mode="edit"
              deviceId={window.location.pathname
                .toString()
                .substr(9, window.location.pathname.toString().length - 14)}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
