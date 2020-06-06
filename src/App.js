// React
import React from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store/store'; //Import the store
// Router
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// Layouts
import { Home } from './Layouts/index';
import DevicesListContainer from './Layouts/device/DevicesList';
import DeviceForm from './Layouts/device/DeviceForm';
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
          // eslint-disable-next-line no-restricted-globals
          render={() => <DeviceForm />}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
