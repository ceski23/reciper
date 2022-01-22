import React from 'react';
import ReactDOM from 'react-dom';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import App from 'App';

import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import { wrapHistory } from 'oaf-react-router';
import { ServiceWorker } from 'components/ServiceWorker';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const history = createBrowserHistory();

wrapHistory(history, {
  restorePageStateOnPop: false,
  repairFocus: false,
  announcePageNavigation: false,
});

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
