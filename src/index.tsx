import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
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
