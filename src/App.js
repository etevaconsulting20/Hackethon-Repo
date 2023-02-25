import React from 'react';
/**
 * @css
 */
import "semantic-ui-css/semantic.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "./App.scss";
import { ToastContainer } from 'react-toastify';
import LoadingOverlay from './components/LoadingOverlay';
import RootContainer from "./pages/RootContainer";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';
import 'src/locales/i18n';

/**
 * @plugin dayjs
 */
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <ToastContainer />
          <LoadingOverlay />
          <RootContainer />
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
