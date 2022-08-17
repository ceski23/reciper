import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'store';

import App from 'components/app/App';
import { ServiceWorker } from 'components/app/ServiceWorker';
import 'configure';

import 'photoswipe/dist/photoswipe.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading="Ładowanie pamięci..." persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>

    <ServiceWorker />
  </React.StrictMode>,
  document.getElementById('root'),
);
