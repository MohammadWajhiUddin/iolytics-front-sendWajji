import React from "react"
import ReactDOM from 'react-dom/client';
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import {HashRouter as Route  } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"

import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <Route basename={process.env.PUBLIC_URL}>
        <App />
      </Route>
  
    </Provider>
);

serviceWorker.unregister()
