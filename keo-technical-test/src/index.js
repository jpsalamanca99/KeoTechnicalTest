import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseConfig from "./firebaseConfig";
import { FirebaseAppProvider } from "reactfire";

ReactDOM.render((
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={'Conectando a firebase...'}>
      <App />
    </Suspense>
  </FirebaseAppProvider>
),
  document.getElementById('root')
);
