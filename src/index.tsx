import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <Game />
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 6000
      }}
    />
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <template id="beerClickNumber">
      <span className="number"></span>
    </template>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
