import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import Root from './container/Root';
import './index.css';


ReactDOM.render(
  <Root store={store} />,
    document.getElementById('root')
);
