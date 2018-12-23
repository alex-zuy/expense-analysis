import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import 'purecss/build/base.css';
import 'purecss/build/buttons.css';
import 'purecss/build/forms.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')!
);
registerServiceWorker();