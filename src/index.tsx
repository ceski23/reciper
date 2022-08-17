import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'store';

import App from 'components/app/App';
import { ServiceWorker } from 'components/app/ServiceWorker';
import 'configure';

import 'photoswipe/dist/photoswipe.css';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <PersistGate loading="Ładowanie pamięci..." persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>

    <ServiceWorker />
  </React.StrictMode>,
  document.getElementById('root'),
);
